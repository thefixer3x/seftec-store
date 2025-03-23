
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function AccountDetails() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
      });
    }
  };

  // Use dummy dates instead of actual user dates
  const createdAt = "January 15, 2023, 09:30 AM";
  const lastSignIn = "August 21, 2023, 02:45 PM";

  return (
    <div className="space-y-6">
      <Card className="border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
        <CardHeader>
          <CardTitle className="text-seftec-navy dark:text-white">Account Information</CardTitle>
          <CardDescription className="text-seftec-navy/70 dark:text-white/70">
            View your account details and manage your session
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
              <User className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
              Email Address
            </Label>
            <Input 
              id="email" 
              value="user@example.com" 
              readOnly 
              className="border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
              <Calendar className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
              Account Created
            </Label>
            <div className="text-sm text-seftec-navy/70 dark:text-white/70 py-2 px-3 bg-seftec-slate/50 dark:bg-seftec-darkNavy/50 rounded-md">
              {createdAt}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
              <Calendar className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
              Last Sign In
            </Label>
            <div className="text-sm text-seftec-navy/70 dark:text-white/70 py-2 px-3 bg-seftec-slate/50 dark:bg-seftec-darkNavy/50 rounded-md">
              {lastSignIn}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-seftec-navy/10 dark:border-white/10 pt-6">
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="border-seftec-navy/20 text-seftec-navy hover:bg-seftec-navy/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
