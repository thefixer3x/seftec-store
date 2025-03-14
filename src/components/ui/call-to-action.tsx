
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-seftec-navy to-seftec-navy/90 py-16 px-8 text-center',
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-up">{title}</h2>
        
        {description && (
          <p className="text-white/80 text-lg mb-8 animate-fade-up animate-delay-100">{description}</p>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-200">
          <Button
            size="lg"
            onClick={primaryButtonAction}
            className="bg-white text-seftec-navy hover:bg-white/90 transition-all duration-300 custom-btn"
          >
            {primaryButtonText}
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
