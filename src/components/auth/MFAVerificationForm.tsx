
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from "@/components/icons";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface MFAVerificationFormProps {
  factorId: string;
  onSuccess?: () => void;
}

export function MFAVerificationForm({ factorId, onSuccess }: MFAVerificationFormProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { verifyMFA } = useAuth();
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        variant: "destructive",
        title: "Verification code required",
        description: "Please enter the 6-digit code from your authenticator app",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await verifyMFA(factorId, code);
      
      if (success) {
        if (onSuccess) onSuccess();
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "The code you entered is incorrect. Please try again.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Failed to verify authentication code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code from your authenticator app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Authentication Code</Label>
            <Input
              id="code"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              maxLength={6}
              className="text-center text-lg tracking-wider"
              disabled={isLoading}
              autoComplete="one-time-code"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-xs text-center text-gray-500">
          The code expires in 30 seconds
        </p>
      </CardFooter>
    </Card>
  );
}
