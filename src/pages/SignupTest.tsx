
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuth } from '@/context/AuthContext';
import { UserProfileDropdown } from '@/components/auth/UserProfileDropdown';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const SignupTest = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-500 text-transparent bg-clip-text">
              BizGenie
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="hidden md:inline-block text-gray-600 dark:text-white/80">
                Welcome, {user.email?.split('@')[0] || 'Guest'}
              </span>
            )}
            
            <Link to="/value-propositions/bizgenie" className="group relative overflow-hidden">
              <div className="hidden md:flex items-center bg-gradient-to-r from-teal-400 to-purple-500 rounded-full px-3 py-1 relative z-10">
                <Shield className="h-4 w-4 mr-1 text-white" />
                <span className="text-sm text-white font-medium">Secured by AI</span>
              </div>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 group-hover:animate-shimmer bg-white"></span>
            </Link>
            
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Authentication Test Dashboard</h1>
          
          {/* User Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Authentication Status</CardTitle>
              <CardDescription>
                See your current login status and account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md">
                    <p className="text-green-700 dark:text-green-400 font-medium">✓ You are currently signed in</p>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">Email:</p>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">{user.email}</p>
                    
                    <p className="text-sm font-medium mt-2">User ID:</p>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-auto">{user.id}</p>
                    
                    <p className="text-sm font-medium mt-2">Last Sign In:</p>
                    <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {user.last_sign_in_at ? 
                        new Date(user.last_sign_in_at).toLocaleString() : 
                        'Not available'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-md">
                    <p className="text-yellow-700 dark:text-yellow-400 font-medium">You are not signed in</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use the sign up form below to create a new account
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {user ? (
                <Button variant="outline" asChild>
                  <Link to="/profile">View Full Profile</Link>
                </Button>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sign up to access all features
                </p>
              )}
            </CardFooter>
          </Card>
          
          {/* Sign Up Form */}
          {!user && (
            <Card>
              <CardHeader>
                <CardTitle>Create a New Account</CardTitle>
                <CardDescription>
                  Sign up for a BizGenie account to access personalized financial insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />
              </CardContent>
            </Card>
          )}
          
          {/* Quick Links if logged in */}
          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Access Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal information and business preferences</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to="/profile">Go to Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">View Your Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Check your order history and purchase details</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to="/orders">View Orders</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupTest;
