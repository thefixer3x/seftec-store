
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

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
};

export const handleSignInWithBiometric = async () => {
  try {
    // Check if the browser supports WebAuthn
    if (!window.PublicKeyCredential) {
      throw new Error('WebAuthn is not supported in this browser');
    }

    // This is a simplified example of biometric authentication
    // In a real-world scenario, you would:
    // 1. Get a challenge from your server
    // 2. Create credential options based on the challenge
    // 3. Get credential from browser WebAuthn API
    // 4. Send the credential to your server for verification
    // 5. Receive a session token from your server

    // For this example, we'll simply check if the platform authenticator is available
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    if (!available) {
      throw new Error('Biometric authentication is not available on this device');
    }
    
    // Here we would normally call the WebAuthn API to get credentials
    // Since we can't implement the full flow without a backend, we'll use localStorage
    // to check if the user has previously logged in
    const storedEmail = localStorage.getItem('last_email');
    
    if (!storedEmail) {
      throw new Error('Please log in with email and password first before using biometric authentication');
    }
    
    // In a real implementation, this would be the result of a WebAuthn verification
    // For now, we'll simply use the stored email to sign in (simulate a successful biometric auth)
    const { error } = await supabase.auth.signInWithPassword({ 
      email: storedEmail,
      // This would not be used in actual biometric auth, but we need it for this simulation
      password: localStorage.getItem('temp_auth_key') || ''
    });
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Biometric authentication error:', error);
    throw error;
  }
};

export const handleSignUp = async (email: string, password: string, userData: Partial<Profile>) => {
  const { error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: { 
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
      }
    }
  });
  
  if (error) {
    throw error;
  }
  
  // Store the email for future biometric login
  localStorage.setItem('last_email', email);
  // This is just for our simulation - in real biometric auth, we wouldn't store the password
  localStorage.setItem('temp_auth_key', password);
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
  
  // Update user metadata
  const { error } = await supabase.auth.updateUser({
    data: { 
      full_name: fullName,
      phone: phone || null
    }
  });

  if (error) {
    throw error;
  }

  return true;
};
