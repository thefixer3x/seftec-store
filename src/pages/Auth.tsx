
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Shield } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from state, or default to dashboard
  const from = location.state?.from || '/profile/dashboard';

  useEffect(() => {
    if (!loading && user) {
      console.log("User authenticated, redirecting to:", from);
      // Ensure we're using the correct domain pattern for redirection
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading...</div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <div className="flex justify-center mb-6">
              <Icons.logo className="h-10 w-10" />
            </div>
            
            <div className="mb-6 text-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm mx-auto">
                <Shield size={14} className="mr-2" />
                Secure Authentication
              </span>
            </div>
            
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <h1 className="text-2xl font-bold mb-3 text-center">Welcome Back</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                  Sign in to access your account
                </p>
                <AuthForm />
              </TabsContent>
              
              <TabsContent value="signup">
                <h1 className="text-2xl font-bold mb-3 text-center">Create Account</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                  Sign up to get started with Seftec
                </p>
                <AuthForm isRegister={true} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
