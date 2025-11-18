import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Mock authentication utilities
const mockHandleSignIn = vi.fn();
const mockHandleSignUp = vi.fn();
const mockHandleSignOut = vi.fn();
const mockHandleSendVerificationEmail = vi.fn();
const mockHandleResetPassword = vi.fn();
const mockHandleUpdateProfile = vi.fn();
const mockHandleSignInWithBiometric = vi.fn();
const mockHandleSignInWithOAuth = vi.fn();
const mockHandleSignInWithMagicLink = vi.fn();
const mockHandleSetupMFA = vi.fn();
const mockHandleVerifyMFA = vi.fn();
const mockHandleGetMFAFactors = vi.fn();
const mockHandleGetUserSessions = vi.fn();
const mockHandleRemoveSession = vi.fn();

vi.mock('@/utils/auth-utils', () => ({
  handleSignIn: mockHandleSignIn,
  handleSignUp: mockHandleSignUp,
  handleSignOut: mockHandleSignOut,
  handleSendVerificationEmail: mockHandleSendVerificationEmail,
  handleResetPassword: mockHandleResetPassword,
  handleUpdateProfile: mockHandleUpdateProfile,
  handleSignInWithBiometric: mockHandleSignInWithBiometric,
  handleSignInWithOAuth: mockHandleSignInWithOAuth,
  handleSignInWithMagicLink: mockHandleSignInWithMagicLink,
  handleSetupMFA: mockHandleSetupMFA,
  handleVerifyMFA: mockHandleVerifyMFA,
  handleGetMFAFactors: mockHandleGetMFAFactors,
  handleGetUserSessions: mockHandleGetUserSessions,
  handleRemoveSession: mockHandleRemoveSession,
  fetchUserProfile: vi.fn().mockResolvedValue(null),
}));

// Mock Supabase
const mockSupabase = {
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    }),
  },
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
  }),
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase,
}));

// Mock toast
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHandleGetMFAFactors.mockResolvedValue([]);
    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
    });
  });

  describe('Core Authentication Flows', () => {
    it('should sign in with valid credentials', async () => {
      mockHandleSignIn.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.signIn('test@example.com', 'password123');
      });

      expect(mockHandleSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Successfully signed in',
        })
      );
    });

    it('should handle sign in errors', async () => {
      const error = new Error('Invalid credentials');
      mockHandleSignIn.mockRejectedValue(error);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await expect(async () => {
        await result.current.signIn('test@example.com', 'wrongpassword');
      }).rejects.toThrow('Invalid credentials');

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'destructive',
          title: 'Sign in failed',
        })
      );
    });

    it('should sign up new user with valid data', async () => {
      mockHandleSignUp.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      const userData = { full_name: 'John Doe', phone: '+1234567890' };

      await act(async () => {
        await result.current.signUp('newuser@example.com', 'securepass123', userData);
      });

      expect(mockHandleSignUp).toHaveBeenCalledWith('newuser@example.com', 'securepass123', userData);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Account created successfully',
        })
      );
    });

    it('should handle sign up errors', async () => {
      const error = new Error('Email already exists');
      mockHandleSignUp.mockRejectedValue(error);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await expect(async () => {
        await result.current.signUp('existing@example.com', 'password', {});
      }).rejects.toThrow('Email already exists');

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'destructive',
          title: 'Sign up failed',
        })
      );
    });

    it('should sign out successfully', async () => {
      mockHandleSignOut.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.signOut();
      });

      expect(mockHandleSignOut).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Signed out',
        })
      );
    });
  });

  describe('Advanced Authentication', () => {
    it('should sign in with magic link', async () => {
      mockHandleSignInWithMagicLink.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.signInWithMagicLink('user@example.com');
      });

      expect(mockHandleSignInWithMagicLink).toHaveBeenCalledWith('user@example.com');
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Magic link sent',
        })
      );
    });

    it('should sign in with biometric', async () => {
      mockHandleSignInWithBiometric.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.signInWithBiometric();
      });

      expect(mockHandleSignInWithBiometric).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Biometric authentication successful',
        })
      );
    });

    it('should sign in with OAuth provider (Google)', async () => {
      mockHandleSignInWithOAuth.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.signInWithOAuth('google');
      });

      expect(mockHandleSignInWithOAuth).toHaveBeenCalledWith('google');
    });

    it('should handle OAuth errors', async () => {
      const error = new Error('OAuth failed');
      mockHandleSignInWithOAuth.mockRejectedValue(error);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await expect(async () => {
        await result.current.signInWithOAuth('github');
      }).rejects.toThrow('OAuth failed');

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'destructive',
          title: 'github authentication failed',
        })
      );
    });

    it('should send verification email', async () => {
      mockHandleSendVerificationEmail.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.sendVerificationEmail('user@example.com');
      });

      expect(mockHandleSendVerificationEmail).toHaveBeenCalledWith('user@example.com');
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Verification email sent',
        })
      );
    });

    it('should reset password', async () => {
      mockHandleResetPassword.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.resetPassword('user@example.com');
      });

      expect(mockHandleResetPassword).toHaveBeenCalledWith('user@example.com');
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Password reset email sent',
        })
      );
    });
  });

  describe('Multi-Factor Authentication (MFA)', () => {
    it('should setup MFA successfully', async () => {
      const mfaResult = {
        factorId: 'factor-123',
        qrCode: 'data:image/png;base64,abc123',
        secret: 'SECRET123',
      };
      mockHandleSetupMFA.mockResolvedValue(mfaResult);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      let setupResult;
      await act(async () => {
        setupResult = await result.current.setupMFA();
      });

      expect(mockHandleSetupMFA).toHaveBeenCalled();
      expect(setupResult).toEqual(mfaResult);
    });

    it('should handle MFA setup failure', async () => {
      mockHandleSetupMFA.mockResolvedValue(null);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await expect(async () => {
        await result.current.setupMFA();
      }).rejects.toThrow('Failed to setup MFA');

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'destructive',
          title: 'MFA setup failed',
        })
      );
    });

    it('should verify MFA with valid code', async () => {
      mockHandleVerifyMFA.mockResolvedValue(true);
      mockHandleGetMFAFactors.mockResolvedValue([
        { id: 'factor-123', status: 'verified', type: 'totp' },
      ]);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      let verifyResult;
      await act(async () => {
        verifyResult = await result.current.verifyMFA('factor-123', '123456');
      });

      expect(mockHandleVerifyMFA).toHaveBeenCalledWith('factor-123', '123456');
      expect(verifyResult).toBe(true);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'MFA verification successful',
        })
      );
    });

    it('should handle MFA verification failure', async () => {
      mockHandleVerifyMFA.mockRejectedValue(new Error('Invalid code'));

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      let verifyResult;
      await act(async () => {
        verifyResult = await result.current.verifyMFA('factor-123', 'wrongcode');
      });

      expect(verifyResult).toBe(false);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'destructive',
          title: 'MFA verification failed',
        })
      );
    });
  });

  describe('Session & Profile Management', () => {
    it('should get user sessions', async () => {
      const sessions = [
        { id: 'session-1', created_at: '2025-01-01', device: 'Chrome' },
        { id: 'session-2', created_at: '2025-01-02', device: 'Firefox' },
      ];
      mockHandleGetUserSessions.mockResolvedValue(sessions);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      let sessionsResult;
      await act(async () => {
        sessionsResult = await result.current.getUserSessions();
      });

      expect(mockHandleGetUserSessions).toHaveBeenCalled();
      expect(sessionsResult).toEqual(sessions);
    });

    it('should handle session fetch errors', async () => {
      mockHandleGetUserSessions.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      let sessionsResult;
      await act(async () => {
        sessionsResult = await result.current.getUserSessions();
      });

      expect(sessionsResult).toEqual([]);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'destructive',
          title: 'Failed to fetch sessions',
        })
      );
    });

    it('should remove specific session', async () => {
      mockHandleRemoveSession.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      await act(async () => {
        await result.current.removeSession('session-123');
      });

      expect(mockHandleRemoveSession).toHaveBeenCalledWith('session-123');
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Session removed',
        })
      );
    });
  });

  describe('Role-Based Access Control', () => {
    it('should check if user has a specific role', async () => {
      const mockFrom = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: [{ role: 'admin' }, { role: 'editor' }],
          }),
        }),
      });

      mockSupabase.from = mockFrom;
      mockSupabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            user: { id: 'user-123', email: 'admin@example.com' },
          },
        },
      });

      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      // Wait for roles to be fetched
      await waitFor(() => {
        expect(result.current.hasRole('admin')).toBe(true);
      });

      expect(result.current.hasRole('editor')).toBe(true);
      expect(result.current.hasRole('user')).toBe(false);
    });
  });

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });

    it('should provide isAuthenticated status', () => {
      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should provide hasMFA status', () => {
      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

      expect(result.current.hasMFA).toBe(false);
    });
  });
});
