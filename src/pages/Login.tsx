import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Shield } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/profile/dashboard';

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-seftec-slate dark:bg-seftec-darkNavy">
        <div className="animate-pulse text-lg text-seftec-navy dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-seftec-slate dark:bg-seftec-darkNavy p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-white/5 shadow-lg rounded-lg p-8 border border-seftec-navy/10 dark:border-white/10 backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <Icons.logo className="h-10 w-10 text-seftec-gold dark:text-seftec-teal" />
          </div>
          
          <div className="mb-6 text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-seftec-slate/50 border border-seftec-navy/10 text-seftec-navy/90 font-medium text-sm dark:bg-white/10 dark:border-white/10 dark:text-white/90 mx-auto">
              <Shield size={14} className="mr-2 text-seftec-gold dark:text-seftec-teal" />
              Welcome Back
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-3 text-center text-seftec-navy dark:text-white">Sign In to seftec.store</h1>
          <p className="text-seftec-navy/70 dark:text-white/70 text-center mb-8">
            Access your personalized financial insights and business analytics
          </p>
          
          <AuthForm />
          
          <div className="mt-6 text-center">
            <Link to="/social-login-test">
              <Button variant="link" className="text-sm">
                Test Social Login Options
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
