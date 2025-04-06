
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Key, 
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const AccountSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    {
      title: 'Profile Settings',
      path: '/profile/account',
      icon: User,
      exact: true
    },
    {
      title: 'Password',
      path: '/profile/account/password',
      icon: Lock,
    },
    {
      title: 'PIN',
      path: '/profile/account/pin',
      icon: Key,
    },
    {
      title: 'Notifications',
      path: '/profile/account/notifications',
      icon: Bell,
    },
    {
      title: 'Bank Accounts',
      path: '/profile/account/bank',
      icon: CreditCard,
    },
    {
      title: 'Subscription',
      path: '/profile/account/subscription',
      icon: DollarSign,
    }
  ];

  return (
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30 overflow-hidden h-full">
      {isMobile ? (
        <ScrollArea className="w-full">
          <div className="flex overflow-x-auto py-1 px-1">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
                
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={cn(
                    "flex flex-col items-center min-w-[80px] sm:min-w-[100px] py-2 sm:py-3 px-1 sm:px-2 text-2xs sm:text-xs transition-colors border-b-4",
                    isActive 
                      ? "border-b-seftec-gold bg-seftec-slate/50 text-seftec-navy font-medium dark:border-b-seftec-teal dark:bg-seftec-darkNavy/50 dark:text-white"
                      : "border-transparent text-seftec-navy/70 hover:bg-seftec-slate/30 hover:text-seftec-navy dark:text-white/70 dark:hover:bg-seftec-darkNavy/20 dark:hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 mb-1 text-seftec-gold dark:text-seftec-teal"
                  )} />
                  <span className="text-center whitespace-nowrap">{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <nav className="flex flex-col py-2">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
                
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-4",
                    isActive 
                      ? "border-seftec-gold bg-seftec-slate/50 text-seftec-navy font-medium dark:border-seftec-teal dark:bg-seftec-darkNavy/50 dark:text-white"
                      : "border-transparent text-seftec-navy/70 hover:bg-seftec-slate/30 hover:text-seftec-navy dark:text-white/70 dark:hover:bg-seftec-darkNavy/20 dark:hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </ScrollArea>
      )}
    </Card>
  );
};

export default AccountSidebar;
