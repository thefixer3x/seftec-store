
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FeatureGate } from '@/components/ui/feature-flags/FeatureFlagProvider';

interface ComingSoonProps {
  title?: string;
  description?: string;
  showNotifyOption?: boolean;
  expectedReleaseDate?: string;
}

export const ComingSoonInteractive: React.FC<ComingSoonProps> = ({
  title = "Interactive Demo",
  description = "We're working on an interactive product demo. Stay tuned for a hands-on experience!",
  showNotifyOption = true,
  expectedReleaseDate
}) => {
  const { toast } = useToast();
  
  const handleNotifyMe = () => {
    toast({
      title: "Notification Saved",
      description: "We'll let you know when the interactive demo is ready!",
      duration: 3000,
    });
  };
  
  return (
    <Card className="bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10">
      <CardHeader className="pb-3 space-y-1">
        <CardTitle className="text-xl flex items-center">
          <span className="mr-2 text-seftec-teal">{title}</span>
          <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-medium px-2 py-0.5 rounded-full">Coming Soon</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        
        {expectedReleaseDate && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>Expected release: {expectedReleaseDate}</span>
          </div>
        )}
        
        {showNotifyOption && (
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full sm:w-auto"
              onClick={handleNotifyMe}
            >
              <Mail className="h-4 w-4 mr-2" />
              Notify me when available
            </Button>
            
            <FeatureGate flag="interactive_demo">
              <Button 
                size="sm" 
                className="w-full sm:w-auto bg-gradient-to-r from-seftec-teal to-seftec-purple"
              >
                Try Beta Version
              </Button>
            </FeatureGate>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Default export for backward compatibility
const ComingSoon: React.FC<ComingSoonProps> = (props) => {
  return (
    <FeatureGate 
      flag="interactive_demo"
      fallback={<ComingSoonInteractive {...props} />}
    >
      <ComingSoonInteractive {...props} />
    </FeatureGate>
  );
};

export default ComingSoon;
