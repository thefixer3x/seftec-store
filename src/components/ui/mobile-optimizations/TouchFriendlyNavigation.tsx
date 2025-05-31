
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItem {
  title: string;
  href?: string;
  children?: NavigationItem[];
  icon?: React.ReactNode;
}

interface TouchFriendlyNavigationProps {
  items: NavigationItem[];
  className?: string;
  onItemClick?: (item: NavigationItem) => void;
}

/**
 * Touch-friendly navigation component optimized for mobile devices
 * Features larger touch targets, collapsible menus, and smooth animations
 */
export const TouchFriendlyNavigation: React.FC<TouchFriendlyNavigationProps> = ({
  items,
  className,
  onItemClick
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.title);
    } else {
      onItemClick?.(item);
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  const NavigationItems = ({ items }: { items: NavigationItem[] }) => (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <button
            onClick={() => handleItemClick(item)}
            className={cn(
              'w-full flex items-center justify-between',
              'px-4 py-3 sm:px-6 sm:py-4', // Larger touch targets
              'text-left text-base sm:text-lg font-medium',
              'text-seftec-navy dark:text-white',
              'hover:bg-seftec-slate/50 dark:hover:bg-seftec-charcoal/50',
              'focus:bg-seftec-slate/50 dark:focus:bg-seftec-charcoal/50',
              'focus:outline-none focus:ring-2 focus:ring-seftec-teal',
              'transition-all duration-200',
              'rounded-lg touch-manipulation'
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className="text-seftec-gold dark:text-seftec-teal">
                  {item.icon}
                </span>
              )}
              <span>{item.title}</span>
            </div>
            
            {item.children && item.children.length > 0 && (
              <ChevronDown 
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  expandedItems.has(item.title) && 'rotate-180'
                )}
              />
            )}
          </button>
          
          {item.children && item.children.length > 0 && (
            <div className={cn(
              'overflow-hidden transition-all duration-300',
              expandedItems.has(item.title) 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            )}>
              <div className="pl-4 sm:pl-8 pt-2">
                <NavigationItems items={item.children} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <div className={className}>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'p-3 rounded-lg',
            'bg-white dark:bg-seftec-charcoal',
            'border border-seftec-navy/10 dark:border-white/10',
            'shadow-lg hover:shadow-xl',
            'transition-all duration-200',
            'touch-manipulation'
          )}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-seftec-navy dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-seftec-navy dark:text-white" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-seftec-darkNavy shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-seftec-navy/10 dark:border-white/10">
                <h2 className="text-lg font-semibold text-seftec-navy dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-seftec-slate/50 dark:hover:bg-seftec-charcoal/50 transition-colors"
                >
                  <X className="w-5 h-5 text-seftec-navy dark:text-white" />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                <NavigationItems items={items} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Navigation
  return (
    <nav className={cn('hidden md:block', className)}>
      <div className="flex items-center space-x-2">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            <button
              onClick={() => handleItemClick(item)}
              className={cn(
                'px-4 py-2 rounded-lg',
                'text-sm font-medium',
                'text-seftec-navy dark:text-white',
                'hover:bg-seftec-slate/50 dark:hover:bg-seftec-charcoal/50',
                'focus:outline-none focus:ring-2 focus:ring-seftec-teal',
                'transition-all duration-200'
              )}
            >
              <div className="flex items-center gap-2">
                {item.icon && item.icon}
                <span>{item.title}</span>
                {item.children && item.children.length > 0 && (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>
            
            {/* Desktop Dropdown */}
            {item.children && item.children.length > 0 && (
              <div className="absolute top-full left-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white dark:bg-seftec-darkNavy border border-seftec-navy/10 dark:border-white/10 rounded-lg shadow-xl p-2 min-w-48">
                  <NavigationItems items={item.children} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
