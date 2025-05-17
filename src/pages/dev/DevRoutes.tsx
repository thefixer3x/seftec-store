
import React from 'react';
import { Card } from '@/components/ui/card';
import RoutingDiagram from '@/components/dashboard/RoutingDiagram';
import { withErrorBoundary } from '@/components/ui/error-boundary';

const DevRoutesContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Application Routes Overview</h2>
          <p className="text-muted-foreground mb-6">
            This page displays all available routes in the application, including public and protected routes.
          </p>
          <RoutingDiagram />
        </div>
      </Card>
    </div>
  );
};

const DevRoutes = withErrorBoundary(DevRoutesContent, {
  onError: (error, errorInfo) => {
    console.error("DevRoutes error:", error, errorInfo);
  },
  fallback: (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Routes Display Error</h2>
      <p className="text-red-600 dark:text-red-300 mt-2">
        We encountered an issue while loading the routes overview. Please try refreshing the page.
      </p>
    </div>
  )
});

export default DevRoutes;
