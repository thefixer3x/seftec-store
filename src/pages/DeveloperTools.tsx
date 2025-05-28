import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Loader2 } from 'lucide-react';
import RoutingDiagram from '@/components/dashboard/RoutingDiagram';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { Button } from '@/components/ui/button';
import { useAdminAccess } from '@/hooks/use-admin-access';
import { useNavigate } from 'react-router-dom';

const DeveloperToolsContent = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const { loading, adminRole } = useAdminAccess('superadmin');
  const navigate = useNavigate();

  // Redirect non-admin users even after hook has completed its check
  useEffect(() => {
    if (!loading && adminRole !== 'superadmin') {
      navigate('/profile/dashboard');
    }
  }, [loading, adminRole, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-seftec-navy dark:text-white" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  const tools = [
    {
      id: 'routes',
      name: 'Application Routes',
      description: 'View all application routes and navigation structure',
      component: <RoutingDiagram />
    },
    // Add more developer tools here as needed
  ];

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-seftec-navy dark:text-white flex items-center">
            <Shield className="mr-2 h-6 w-6 text-amber-500" />
            Developer Tools
          </h1>
          <p className="text-muted-foreground mt-1">
            Advanced diagnostic tools for super admin access only
          </p>
        </div>
      </div>

      <Alert variant="destructive" className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-700 dark:text-amber-400">Restricted Access Area</AlertTitle>
        <AlertDescription className="text-amber-600 dark:text-amber-300">
          These developer tools are for authorized personnel only. Unauthorized access or misuse may result in account termination.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Tools</CardTitle>
              <CardDescription>Select a tool to use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {tools.map(tool => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  {tool.name}
                  <Badge className="ml-2" variant="outline">Admin</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 md:col-span-3">
          {selectedTool ? (
            <Card>
              <CardHeader>
                <CardTitle>{tools.find(t => t.id === selectedTool)?.name}</CardTitle>
                <CardDescription>{tools.find(t => t.id === selectedTool)?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {tools.find(t => t.id === selectedTool)?.component}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Select a Developer Tool</h3>
                <p className="text-muted-foreground mt-2">
                  Choose a tool from the sidebar to view its contents
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const DeveloperTools = withErrorBoundary(DeveloperToolsContent, {
  onError: (error, errorInfo) => {
    console.error("Developer tools error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Developer Tools Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading the developer tools. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default DeveloperTools;