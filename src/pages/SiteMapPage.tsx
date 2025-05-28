
import React from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, MapPin } from 'lucide-react';
import { useAdminAccess } from '@/hooks/use-admin-access';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SiteMapPageContent = () => {
  const { isAdmin, isLoading } = useAdminAccess();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/profile/dashboard');
    }
  }, [isLoading, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-seftec-navy dark:border-white"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  const siteRoutes = [
    { path: '/', name: 'Home', description: 'Landing page' },
    { path: '/auth', name: 'Authentication', description: 'Login/Register' },
    { path: '/profile/dashboard', name: 'Dashboard', description: 'Main user dashboard' },
    { path: '/profile/wallet', name: 'Wallet', description: 'User wallet management' },
    { path: '/profile/settings', name: 'Settings', description: 'User settings' },
    { path: '/profile/account', name: 'Account', description: 'Account management' },
    { path: '/profile/developer', name: 'Developer Tools', description: 'Admin developer tools' },
    { path: '/profile/sitemap', name: 'Site Map', description: 'This page - site navigation overview' },
    { path: '/defi-leadership', name: 'DeFi Leadership', description: 'DeFi leadership content' },
  ];

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-seftec-navy dark:text-white flex items-center">
            <MapPin className="mr-2 h-6 w-6 text-amber-500" />
            Site Map
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete navigation overview for super admin access
          </p>
        </div>
      </div>

      <Alert variant="destructive" className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-700 dark:text-amber-400">Super Admin Access</AlertTitle>
        <AlertDescription className="text-amber-600 dark:text-amber-300">
          This site map is only accessible to super administrators for navigation and debugging purposes.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
            Application Routes
          </CardTitle>
          <CardDescription>Complete list of application routes and their purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {siteRoutes.map((route) => (
              <div key={route.path} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div>
                  <div className="font-medium text-seftec-navy dark:text-white">{route.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{route.description}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {route.path}
                  </code>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SiteMapPage = withErrorBoundary(SiteMapPageContent, {
  onError: (error, errorInfo) => {
    console.error("Site map page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Site Map Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading the site map. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default SiteMapPage;
