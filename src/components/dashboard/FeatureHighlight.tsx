
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkle, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type HighlightIconType = 'sparkle' | 'star' | 'zap';

interface FeatureHighlightProps {
  title: string;
  description: string;
  icon?: HighlightIconType;
  variant?: 'default' | 'purple' | 'blue' | 'orange';
  className?: string;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ 
  title, 
  description, 
  icon = 'sparkle',
  variant = 'default',
  className 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'sparkle': return <Sparkle className="h-5 w-5" />;
      case 'star': return <Star className="h-5 w-5" />;
      case 'zap': return <Zap className="h-5 w-5" />;
      default: return <Sparkle className="h-5 w-5" />;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'purple':
        return "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-800/30";
      case 'blue':
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/30";
      case 'orange':
        return "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-800/30";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 dark:from-gray-800/40 dark:to-gray-700/40 dark:border-gray-700/50";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case 'purple':
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case 'blue':
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case 'orange':
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <Card className={cn("border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden", 
      getVariantClasses(),
      className
    )}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={cn("p-2 rounded-full", getIconClasses())}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureHighlight;
