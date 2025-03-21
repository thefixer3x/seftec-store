
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Plus, Download, BarChart3, Sparkles } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <Card className="mb-6 border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-seftec-navy dark:text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 group hover:bg-seftec-gold/5 dark:hover:bg-seftec-teal/5 border-seftec-navy/10 dark:border-white/10 text-seftec-navy dark:text-white"
          >
            <Plus className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal" />
            <span className="flex-1 text-left">New Transaction</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 group hover:bg-seftec-gold/5 dark:hover:bg-seftec-teal/5 border-seftec-navy/10 dark:border-white/10 text-seftec-navy dark:text-white"
          >
            <Download className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal" />
            <span className="flex-1 text-left">Export Reports</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 group hover:bg-seftec-gold/5 dark:hover:bg-seftec-teal/5 border-seftec-navy/10 dark:border-white/10 text-seftec-navy dark:text-white"
          >
            <BarChart3 className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal" />
            <span className="flex-1 text-left">View Analytics</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3 group bg-gradient-to-r from-seftec-gold/10 to-seftec-navy/5 border-seftec-gold/20 hover:from-seftec-gold/20 hover:to-seftec-navy/10 dark:from-seftec-teal/10 dark:to-seftec-purple/10 dark:border-seftec-teal/20 dark:hover:from-seftec-teal/20 dark:hover:to-seftec-purple/20 text-seftec-navy dark:text-white"
          >
            <Sparkles className="h-4 w-4 mr-2 text-seftec-gold dark:text-seftec-teal" />
            <span className="flex-1 text-left font-medium">AI Insights</span>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
