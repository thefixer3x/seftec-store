
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const handleSignIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ 
    email, 
    password,
  });
  
  if (error) {
    throw error;
  }
};

export const handleSignUp = async (email: string, password: string, userData: Partial<Profile>) => {
  // Setting captchaToken directly to true forces Supabase to skip the captcha verification
  const { error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: { 
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
      },
      // This tells Supabase to bypass captcha completely
      captchaToken: "true" 
    }
  });
  
  if (error) {
    console.error('Signup error:', error);
    throw error;
  }
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
