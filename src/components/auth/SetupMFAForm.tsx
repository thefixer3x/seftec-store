
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from "@/components/icons";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SetupMFAFormProps {
  onSuccess?: () => void;
}

export function SetupMFAForm({ onSuccess }: SetupMFAFormProps) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { setupMFA, verifyMFA } = useAuth();
  const { toast } = useToast();

  const handleSetupMFA = async () => {
    setIsLoading(true);
    
    try {
      const result = await setupMFA();
      setQrCode(result.qrCode);
      setFactorId(result.factorId);
      setIsVerifying(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "MFA setup failed",
        description: error.message || "Failed to set up multi-factor authentication",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!factorId) return;
    
    if (!code.trim() || code.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: "Please enter a valid 6-digit code from your authenticator app",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await verifyMFA(factorId, code);
      
      if (success) {
        toast({
          title: "MFA enabled",
          description: "Two-factor authentication has been successfully enabled for your account.",
        });
        
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
        description: error.message || "Failed to verify the authentication code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
        <CardDescription>
          Enhance your account security by enabling two-factor authentication
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isVerifying ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h3 className="font-medium mb-2">Why enable 2FA?</h3>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Protect your account from unauthorized access</li>
                <li>Add an extra layer of security beyond your password</li>
                <li>Receive alerts about login attempts</li>
                <li>Comply with security best practices</li>
              </ul>
            </div>
            
            <Button 
              onClick={handleSetupMFA} 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                "Set Up Two-Factor Authentication"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {qrCode && (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-2 bg-white rounded-md">
                  <img 
                    src={qrCode} 
                    alt="QR Code for authenticator app" 
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Scan this QR code with your authenticator app<br />
                  (Google Authenticator, Authy, etc.)
                </p>
              </div>
            )}
            
            <form onSubmit={handleVerifyMFA} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="code">Enter Authentication Code</Label>
                <Input
                  id="code"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-wider"
                  disabled={isLoading}
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
                  "Verify and Enable 2FA"
                )}
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
