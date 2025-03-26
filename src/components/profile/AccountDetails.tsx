
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Calendar, User, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function AccountDetails() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        icon: <AlertCircle className="h-5 w-5" />
      });
    }
  };

  // Format dates nicely or use placeholders if not available
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not available";
    try {
      return format(new Date(dateString), "PPpp"); // Format: 'Apr 29, 2021, 5:34 PM'
    } catch (e) {
      return "Invalid date";
    }
  };

  // Use actual user data or fallbacks
  const email = user?.email || "user@example.com";
  const createdAt = formatDate(user?.created_at);
  const lastSignIn = formatDate(user?.last_sign_in_at);

  return (
    <div className="space-y-6">
      <Card className="border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
        <CardHeader>
          <CardTitle className="text-seftec-navy dark:text-white flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2 text-seftec-gold" />
            Account Information
          </CardTitle>
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
              value={email} 
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
          <Button 
            variant="outline"
            onClick={() => navigate('/profile/account/password')}
            className="border-seftec-navy/20 text-seftec-navy hover:bg-seftec-navy/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            Change Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
