
import { supabase } from '@/integrations/supabase/client';
import { Profile, MFAFactor, UserSession } from '@/types/auth';

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId as string)
      .single();

    if (error) {
      throw error;
    }

    if (!data) return null;
    
    return data as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const handleSignIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    throw error;
  }
  
  // Store the email for future biometric login reference only
  localStorage.setItem('last_email', email);
  // Mark that biometric auth has been set up for this user
  localStorage.setItem('biometric_enabled', 'true');
};

export const handleSignInWithMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({ 
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth-callback`
    }
  });
  
  if (error) {
    throw error;
  }
};

export const handleSignInWithOAuth = async (provider: 'google' | 'facebook' | 'github' | 'apple') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth-callback?provider=${provider}`,
    },
  });
  
  if (error) {
    throw error;
  }
};

export const handleSignInWithBiometric = async () => {
  // Check if the browser supports WebAuthn
  if (!window.PublicKeyCredential) {
    throw new Error('WebAuthn is not supported in this browser');
  }

  // Check if biometric authentication is available
  const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  if (!available) {
    throw new Error('Biometric authentication is not available on this device');
  }
  
  const storedEmail = localStorage.getItem('last_email');
  const biometricEnabled = localStorage.getItem('biometric_enabled');
  
  if (!storedEmail || !biometricEnabled) {
    throw new Error('Please log in with email and password first before using biometric authentication');
  }
  
  // NOTE: Full WebAuthn implementation requires server-side credential storage and verification.
  // The proper flow would be:
  // 1. Call server to get a challenge
  // 2. Use navigator.credentials.get() with the challenge
  // 3. Send the signed credential to server for verification
  // 4. Server validates and returns a session token
  //
  // For now, biometric auth requires the user to re-enter their password.
  // This is a placeholder that prompts re-authentication rather than storing passwords.
  throw new Error('Biometric authentication requires password re-entry. Please use the password login.');
};

export const handleSignUp = async (email: string, password: string, userData: Partial<Profile>) => {
  const { error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: { 
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
      },
      emailRedirectTo: `${window.location.origin}/auth-callback`
    }
  });
  
  if (error) {
    throw error;
  }
  
  // Store the email for future biometric login reference only
  localStorage.setItem('last_email', email);
  // Mark that biometric auth can be set up for this user
  localStorage.setItem('biometric_enabled', 'true');
};

export const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
};

export const handleSendVerificationEmail = async (email: string) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth-callback`,
    }
  });
  
  if (error) {
    throw error;
  }
};

export const handleResetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) {
    throw error;
  }
};

export const handleUpdateProfile = async (
  userId: string, 
  data: { fullName: string; email: string; phone?: string }
) => {
  const { fullName, phone } = data;
  
  // Split full name into first and last name
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Update profile in database
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
    })
    .eq('id', userId);

  if (profileError) {
    throw profileError;
  }
  
  // Update user metadata
  const { error: userError } = await supabase.auth.updateUser({
    data: { 
      full_name: fullName,
      phone: phone || null
    }
  });

  if (userError) {
    throw userError;
  }

  return true;
};

export const handleSetupMFA = async () => {
  try {
    // Start MFA enrollment
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
    });
    
    if (error) throw error;
    
    return {
      qrCode: data.totp.qr_code,
      factorId: data.id
    };
  } catch (error) {
    console.error('MFA setup error:', error);
    throw error;
  }
};

export const handleVerifyMFA = async (factorId: string, code: string) => {
  try {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code
    });
    
    if (error) throw error;
    
    return !!data;
  } catch (error) {
    console.error('MFA verification error:', error);
    throw error;
  }
};

export const handleGetMFAFactors = async (): Promise<MFAFactor[]> => {
  try {
    const { data, error } = await supabase.auth.mfa.listFactors();
    
    if (error) throw error;
    
    return data.totp.map(factor => ({
      id: factor.id,
      type: 'totp' as const,
      status: factor.status === 'verified' ? 'verified' : 'unverified',
      createdAt: factor.created_at
    }));
  } catch (error) {
    console.error('Error fetching MFA factors:', error);
    return [];
  }
};

export const handleGetUserSessions = async (): Promise<UserSession[]> => {
  try {
    const { data, error } = await supabase
      .from('user_sessions')
      .select('*');
      
    if (error) throw error;
    
    return (data || []).map(session => ({
      id: session.id,
      deviceInfo: {
        browser: typeof session.device_info === 'object' && session.device_info !== null ? 
          (session.device_info as any).browser : undefined,
        os: typeof session.device_info === 'object' && session.device_info !== null ? 
          (session.device_info as any).os : undefined,
        device: typeof session.device_info === 'object' && session.device_info !== null ? 
          (session.device_info as any).device : undefined
      },
      ipAddress: session.ip_address,
      lastActive: session.last_active,
      createdAt: session.created_at
    }));
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    return [];
  }
};

export const handleRemoveSession = async (sessionId: string) => {
  try {
    const { error } = await supabase
      .from('user_sessions')
      .delete()
      .eq('id', sessionId);
      
    if (error) throw error;
  } catch (error) {
    console.error('Error removing session:', error);
    throw error;
  }
};
