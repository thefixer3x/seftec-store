
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sparkle } from 'lucide-react';

interface CallToActionProps {
  title: string;
  description?: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  className
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl py-16 px-8 text-center',
        'bg-gradient-to-br from-seftec-navy to-seftec-navy/90',
        'dark:from-seftec-darkNavy dark:to-seftec-charcoal',
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <Sparkle className="text-seftec-gold dark:text-seftec-teal mr-2 animate-sparkle" size={20} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-up">{title}</h2>
        
        {description && (
          <p className="text-white/80 text-lg mb-8 animate-fade-up animate-delay-100">{description}</p>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-200">
          <Button
            size="lg"
            onClick={primaryButtonAction}
            className="bg-white text-seftec-navy dark:bg-gradient-teal-purple dark:text-white hover:bg-white/90 dark:hover:opacity-90 transition-all duration-300 custom-btn group relative overflow-hidden"
          >
            <span className="relative z-10">{primaryButtonText}</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 group-hover:animate-shimmer bg-white"></span>
            </span>
          </Button>
          
          {secondaryButtonText && (
            <Button
              variant="outline"
              size="lg"
              onClick={secondaryButtonAction}
              className="border-white text-white hover:bg-white/10 transition-all duration-300 custom-btn"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
