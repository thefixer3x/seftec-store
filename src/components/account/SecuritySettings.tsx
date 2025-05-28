
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SetupMFAForm } from '@/components/auth/SetupMFAForm';
import { useAuth } from '@/context/AuthContext';
import { Shield, Fingerprint, KeyRound, LogOut, Monitor, RefreshCw, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

export function SecuritySettings() {
  const { hasMFA, mfaFactors, getUserSessions, removeSession } = useAuth();
  const [showMFASetup, setShowMFASetup] = useState(false);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const sessions = await getUserSessions();
      setActiveSessions(sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async (sessionId: string) => {
    try {
      await removeSession(sessionId);
      fetchSessions();
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  const handleMFASuccess = () => {
    setShowMFASetup(false);
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-full overflow-hidden">
      <div className="px-2 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-seftec-navy dark:text-white">Security Settings</h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
          Manage your account security settings, multi-factor authentication, and active sessions.
        </p>
      </div>
      
      <div className="grid gap-4 md:gap-6 px-2 md:px-0">
        {/* Two-Factor Authentication Card */}
        <Card className="overflow-hidden">
          <CardHeader className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-row items-center justify-between space-y-0'} pb-3 md:pb-4`}>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base md:text-lg text-seftec-navy dark:text-white">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Add an extra layer of security to your account
              </CardDescription>
            </div>
            
            {hasMFA ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex-shrink-0">
                Enabled
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800 flex-shrink-0">
                Disabled
              </Badge>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-start space-x-4'}`}>
              <Shield className={`h-6 w-6 md:h-8 md:w-8 text-gray-400 ${isMobile ? 'mx-auto' : 'flex-shrink-0'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {hasMFA ? (
                    "Two-factor authentication is enabled. You're protected with an additional layer of security."
                  ) : (
                    "Protect your account with two-factor authentication. You'll need both your password and an authentication code to sign in."
                  )}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => setShowMFASetup(true)} 
                      variant={hasMFA ? "outline" : "default"} 
                      className="mt-4 w-full md:w-auto text-sm"
                    >
                      {hasMFA ? "Manage 2FA" : "Enable 2FA"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-base md:text-lg">Two-Factor Authentication</DialogTitle>
                      <DialogDescription className="text-sm">
                        {hasMFA ? "Manage your two-factor authentication settings" : "Set up two-factor authentication for your account"}
                      </DialogDescription>
                    </DialogHeader>
                    {showMFASetup && !hasMFA && <SetupMFAForm onSuccess={handleMFASuccess} />}
                    
                    {hasMFA && mfaFactors.map(factor => (
                      <div key={factor.id} className="p-3 md:p-4 border rounded-md flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm md:text-base text-gray-900 dark:text-white">Authenticator App</p>
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                            Setup on {format(new Date(factor.createdAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <Button variant="destructive" size="sm" className="text-xs w-full md:w-auto">
                          Remove
                        </Button>
                      </div>
                    ))}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Biometric Authentication */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Biometric Authentication</CardTitle>
              <CardDescription>Configure fingerprint or face recognition login</CardDescription>
            </div>
            <Badge variant="outline">
              Beta
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <Fingerprint className="h-8 w-8 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  Use your device's biometric capabilities for a faster, more secure login experience.
                </p>
                <Button variant="outline" className="mt-4">
                  Configure Biometrics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>Password Settings</CardTitle>
            <CardDescription>Update or change your password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <KeyRound className="h-8 w-8 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  Regularly update your password to maintain account security. Your password should be strong and unique.
                </p>
                <Button variant="outline" className="mt-4">
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Sessions Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your current login sessions</CardDescription>
            </div>
            <Button size="sm" variant="ghost" onClick={fetchSessions} disabled={isLoading}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin inline-block size-6 border-2 border-current border-t-transparent text-primary rounded-full mb-3"></div>
                <p className="text-sm text-gray-500">Loading sessions...</p>
              </div>
            ) : activeSessions.length > 0 ? (
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div key={session.id} className="p-3 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center">
                      <Monitor className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">
                          {session.deviceInfo?.browser || "Unknown browser"} on {session.deviceInfo?.os || "Unknown device"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last active: {format(new Date(session.lastActive), 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => handleEndSession(session.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <LogOut className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No active sessions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
