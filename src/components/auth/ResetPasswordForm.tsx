
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Mail } from 'lucide-react';

interface ResetPasswordFormProps {
  onBack: () => void;
}

export function ResetPasswordForm({ onBack }: ResetPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Email is required",
        description: "Please enter your email address",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setIsSent(true);
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Reset password failed",
        description: error.message || "Failed to send password reset email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="absolute top-4 left-2 h-8 pl-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <CardTitle className="text-center pt-2">Reset Password</CardTitle>
        <CardDescription className="text-center">
          {!isSent 
            ? "Enter your email and we'll send you a password reset link" 
            : "Check your email for the password reset link"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSent ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-sm text-muted-foreground max-w-xs">
              We've sent an email to <span className="font-medium text-foreground">{email}</span> with 
              a link to reset your password. Please check your inbox and spam folder.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
        >
          Back to sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
