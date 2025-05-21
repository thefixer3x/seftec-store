
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Monitor, LogOut, RefreshCw, X, AlertTriangle, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { UserSession } from '@/types/auth';

const SessionManagement = () => {
  const { getUserSessions, removeSession, signOut, isAuthenticated } = useAuth();
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const userSessions = await getUserSessions();
      setSessions(userSessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({
        variant: "destructive",
        title: "Failed to load sessions",
        description: "There was an error fetching your active sessions.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = async (sessionId: string) => {
    try {
      await removeSession(sessionId);
      // Update sessions list
      setSessions(sessions.filter(session => session.id !== sessionId));
      toast({
        title: "Session ended",
        description: "The session has been successfully terminated.",
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        variant: "destructive",
        title: "Failed to end session",
        description: "There was an error terminating the session.",
      });
    }
  };

  const handleSignOutAllSessions = async () => {
    try {
      // End all sessions
      await Promise.all(sessions.map(session => removeSession(session.id)));
      // Sign out current session
      await signOut();
      toast({
        title: "Signed out from all devices",
        description: "You have been signed out from all active sessions.",
      });
    } catch (error) {
      console.error('Error signing out from all sessions:', error);
      toast({
        variant: "destructive",
        title: "Failed to sign out from all sessions",
        description: "There was an error signing out from all sessions.",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Session Management</h1>
            <p className="text-gray-500 dark:text-gray-400">
              View and manage all active sessions across your devices
            </p>
          </div>

          <Card className="border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-400">Security Recommendation</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Review all active sessions regularly and end any sessions you don't recognize.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-xl">Active Sessions</CardTitle>
                <CardDescription>
                  These are all your current active sessions
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={fetchSessions}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={handleSignOutAllSessions}
                  disabled={loading || sessions.length === 0}
                >
                  Sign out all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-20 text-center">
                  <div className="inline-block animate-spin rounded-full border-2 border-current border-t-transparent h-8 w-8 text-primary"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading your sessions...</p>
                </div>
              ) : sessions.length > 0 ? (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                          <Monitor className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <p className="font-medium">
                              {session.deviceInfo?.browser || "Unknown browser"} on {session.deviceInfo?.os || "Unknown device"}
                            </p>
                            {session.ipAddress && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                IP: {session.ipAddress}
                              </Badge>
                            )}
                          </div>
                          <div className="flex text-xs text-gray-500 space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Created: {format(new Date(session.createdAt), 'MMM d, yyyy')}
                            </span>
                            <span className="flex items-center">
                              <Shield className="h-3 w-3 mr-1" />
                              Last active: {format(new Date(session.lastActive), 'MMM d, h:mm a')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEndSession(session.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        End Session
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <LogOut className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No active sessions</h3>
                  <p className="text-gray-500 text-sm">
                    There are currently no active sessions for your account
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Tips</CardTitle>
              <CardDescription>
                Follow these best practices to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="font-medium">Enable Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">Use Strong Unique Passwords</p>
                <p className="text-sm text-gray-500">
                  Create strong, unique passwords for each account and avoid reusing passwords.
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">Review Sessions Regularly</p>
                <p className="text-sm text-gray-500">
                  Regularly check your active sessions and remove any that you don't recognize.
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">Sign Out from Shared Devices</p>
                <p className="text-sm text-gray-500">
                  Always sign out from your account when using shared or public computers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SessionManagement;
