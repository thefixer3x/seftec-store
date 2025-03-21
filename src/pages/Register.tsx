
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Create an Account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Join BizGenie to access personalized financial insights and business analytics
          </p>
          <AuthForm isRegister={true} />
        </div>
      </div>
    </div>
  );
};

export default Register;
