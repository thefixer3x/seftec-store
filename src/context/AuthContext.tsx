
import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AuthContextType, Profile } from '@/types/auth';
import { useAuthState } from '@/hooks/use-auth-state';
import {
  handleSignIn,
  handleSignUp,
  handleSignOut,
  handleSendVerificationEmail,
  handleResetPassword,
  handleUpdateProfile,
  handleSignInWithBiometric
} from '@/utils/auth-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { session, user, profile, loading, refreshProfile } = useAuthState();
  const { toast } = useToast();

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

  const value = {
    session,
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
    refreshProfile,
    sendVerificationEmail,
    resetPassword,
    updateProfile,
    signInWithBiometric,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
