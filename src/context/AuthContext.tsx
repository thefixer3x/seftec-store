
import React, { createContext, useContext, ReactNode, useEffect, useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AuthContextType, Profile, MFAFactor, UserSession } from '@/types/auth';
import { useAuthState } from '@/hooks/use-auth-state';
import { supabase } from '@/integrations/supabase/client';
import {
  handleSignIn,
  handleSignUp,
  handleSignOut,
  handleSendVerificationEmail,
  handleResetPassword,
  handleUpdateProfile,
  handleSignInWithBiometric,
  handleSignInWithOAuth,
  handleSignInWithMagicLink,
  handleSetupMFA,
  handleVerifyMFA,
  handleGetMFAFactors,
  handleGetUserSessions,
  handleRemoveSession
} from '@/utils/auth-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { session, user, profile, loading, refreshProfile } = useAuthState();
  const { toast } = useToast();
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [mfaFactors, setMfaFactors] = useState<MFAFactor[]>([]);
  const isAuthenticated = !!user;
  const hasMFA = mfaFactors.some(factor => factor.status === 'verified');

  // Fetch user roles and MFA factors when user is authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          // Fetch user roles
          const { data: rolesData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
            
          if (rolesData) {
            setUserRoles(rolesData.map(row => row.role));
          }
          
          // Fetch MFA factors
          const factors = await handleGetMFAFactors();
          setMfaFactors(factors || []);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserRoles([]);
        setMfaFactors([]);
      }
    };
    
    fetchUserData();
  }, [user?.id]);

  const signIn = async (email: string, password: string) => {
    try {
      await handleSignIn(email, password);
      toast({
        title: "Successfully signed in",
        description: "Welcome back to Seftec.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
      });
      throw error;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      await handleSignInWithMagicLink(email);
      toast({
        title: "Magic link sent",
        description: "Please check your email for the login link.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Magic link failed",
        description: error.message || "Failed to send magic link email",
      });
      throw error;
    }
  };

  const signInWithBiometric = async () => {
    try {
      await handleSignInWithBiometric();
      toast({
        title: "Biometric authentication successful",
        description: "Welcome back to seftechub.com",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Biometric authentication failed",
        description: error.message || "Failed to authenticate with biometrics",
      });
      throw error;
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'facebook' | 'github' | 'apple') => {
    try {
      await handleSignInWithOAuth(provider);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `${provider} authentication failed`,
        description: error.message || `Failed to authenticate with ${provider}`,
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<Profile>) => {
    try {
      await handleSignUp(email, password, userData);
      toast({
        title: "Account created successfully",
        description: "Welcome to Seftec! Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await handleSignOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
      });
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      await handleSendVerificationEmail(email);
      toast({
        title: "Verification email sent",
        description: "Please check your email for the verification link.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send verification email",
        description: error.message || "An error occurred",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await handleResetPassword(email);
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Reset password failed",
        description: error.message || "An error occurred",
      });
      throw error;
    }
  };

  const updateProfile = async (data: { fullName: string, email: string, phone?: string }) => {
    try {
      if (!user) throw new Error("You must be logged in to update your profile");
      await handleUpdateProfile(user.id, data);
      await refreshProfile();
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "An error occurred while updating your profile",
      });
      throw error;
    }
  };

  const setupMFA = async () => {
    try {
      const result = await handleSetupMFA();
      if (!result) throw new Error("Failed to setup MFA");
      return result;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "MFA setup failed",
        description: error.message || "Failed to set up multi-factor authentication",
      });
      throw error;
    }
  };

  const verifyMFA = async (factorId: string, code: string) => {
    try {
      const result = await handleVerifyMFA(factorId, code);
      if (result) {
        toast({
          title: "MFA verification successful",
          description: "Two-factor authentication has been enabled for your account.",
        });
        // Refresh MFA factors
        const factors = await handleGetMFAFactors();
        setMfaFactors(factors || []);
      }
      return result;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "MFA verification failed",
        description: error.message || "Failed to verify the authentication code",
      });
      return false;
    }
  };

  const hasRole = (role: string) => {
    return userRoles.includes(role);
  };

  const getUserSessions = async () => {
    try {
      return await handleGetUserSessions();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to fetch sessions",
        description: error.message || "An error occurred while fetching user sessions",
      });
      return [];
    }
  };

  const removeSession = async (sessionId: string) => {
    try {
      await handleRemoveSession(sessionId);
      toast({
        title: "Session removed",
        description: "The selected session has been successfully terminated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to remove session",
        description: error.message || "An error occurred while removing the session",
      });
    }
  };

  const value = useMemo(() => ({
    session,
    user,
    profile,
    userRoles,
    signIn,
    signInWithMagicLink,
    signUp,
    signOut,
    loading,
    refreshProfile,
    sendVerificationEmail,
    resetPassword,
    updateProfile,
    signInWithBiometric,
    signInWithOAuth,
    setupMFA,
    verifyMFA,
    hasRole,
    getUserSessions,
    removeSession,
    isAuthenticated,
    hasMFA,
    mfaFactors,
  }), [session, user, profile, userRoles, loading, mfaFactors, hasMFA]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
