
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Plus, Download, BarChart3 } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button variant="outline" className="justify-start h-auto py-3 group">
            <Plus className="h-4 w-4 mr-2 text-blue-500" />
            <span className="flex-1 text-left">New Transaction</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-3 group">
            <Download className="h-4 w-4 mr-2 text-green-500" />
            <span className="flex-1 text-left">Export Reports</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-3 group">
            <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
            <span className="flex-1 text-left">View Analytics</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-3 group bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100 hover:from-blue-100 hover:to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-800/30">
            <Sparkle className="h-4 w-4 mr-2 text-amber-500" />
            <span className="flex-1 text-left font-medium">AI Insights</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
