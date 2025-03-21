
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Sparkle } from 'lucide-react';
import { Icons } from '@/components/icons';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile?tab=dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-seftec-slate dark:bg-seftec-darkNavy p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-white/5 shadow-lg rounded-lg p-8 border border-seftec-navy/10 dark:border-white/10 backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <Icons.logo className="h-10 w-10 text-seftec-gold dark:text-seftec-teal" />
          </div>
          
          <div className="mb-6 text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-slate/50 border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90 mx-auto">
              <Sparkle size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal animate-sparkle" />
              Welcome Back
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-3 text-center text-seftec-navy dark:text-white">Sign In to seftec.store</h1>
          <p className="text-seftec-navy/70 dark:text-white/70 text-center mb-8">
            Access your personalized financial insights and business analytics
          </p>
          
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
