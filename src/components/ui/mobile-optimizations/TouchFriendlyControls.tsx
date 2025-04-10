
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TouchControlProps {
  className?: string;
  children: React.ReactNode;
  onPress?: () => void;
  longPressThreshold?: number;
  onLongPress?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
}

/**
 * Touch-optimized control component for mobile interfaces
 * Provides larger touch targets and supports gesture interactions
 */
export const TouchControl: React.FC<TouchControlProps> = ({
  className,
  children,
  onPress,
  longPressThreshold = 500,
  onLongPress,
  disabled = false,
  fullWidth = false,
  size = 'default',
  variant = 'default'
}) => {
  const isMobile = useIsMobile();
  const [pressing, setPressing] = React.useState(false);
  const pressTimer = React.useRef<NodeJS.Timeout | null>(null);
  const touchStartPos = React.useRef({ x: 0, y: 0 });
  
  // Use standard button controls on desktop
  if (!isMobile) {
    return (
      <Button
        className={className}
        onClick={onPress}
        disabled={disabled}
        size={size}
        variant={variant}
        style={{ width: fullWidth ? '100%' : undefined }}
      >
        {children}
      </Button>
    );
  }
  
  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    // Record touch position for swipe detection
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    
    setPressing(true);
    
    // Set up timer for long press
    if (onLongPress) {
      pressTimer.current = setTimeout(() => {
        setPressing(false);
        onLongPress?.();
      }, longPressThreshold);
    }
  };
  
  // Handle touch end event
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled) return;
    
    // Clear long press timer
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    
    // Execute regular press if not already triggered long press
    if (pressing && onPress) {
      onPress();
    }
    
    setPressing(false);
  };
  
  // Handle touch move to cancel action if swiping
  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
    
    // If user moved finger more than threshold, cancel the press
    if (deltaX > 10 || deltaY > 10) {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
        pressTimer.current = null;
      }
      setPressing(false);
    }
  };
  
  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };
  }, []);
  
  return (
    <div
      className={cn(
        "relative select-none touch-manipulation",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        pressing ? "active:scale-95 transition-transform" : "",
        fullWidth ? "w-full" : "",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      role="button"
      aria-disabled={disabled}
    >
      <div className={cn(
        "mobile-touch-target px-4 py-2 rounded-md flex items-center justify-center",
        variant === 'default' ? "bg-primary text-primary-foreground" : 
        variant === 'secondary' ? "bg-secondary text-secondary-foreground" :
        variant === 'outline' ? "border border-input bg-background" :
        "hover:bg-accent",
        size === 'sm' ? "py-1.5 px-3 text-sm" :
        size === 'lg' ? "py-2.5 px-5 text-lg" :
        "py-2 px-4",
        pressing ? "bg-opacity-90" : ""
      )}>
        {children}
      </div>
    </div>
  );
};

/**
 * Container for mobile-optimized control groups
 */
export const TouchControlGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  vertical?: boolean;
}> = ({ children, className, vertical = false }) => {
  return (
    <div className={cn(
      "flex gap-2",
      vertical ? "flex-col" : "flex-row",
      className
    )}>
      {children}
    </div>
  );
};
