
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
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30 overflow-hidden">
      <div className="p-0">
        <nav className={cn(
          "flex md:flex-col",
          isMobile ? "overflow-x-auto" : ""
        )}>
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
                  "flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors",
                  isMobile
                    ? "min-w-[100px] justify-center md:justify-start border-b-4 md:border-b-0 md:border-l-4"
                    : "border-l-4",
                  isActive 
                    ? isMobile
                      ? "border-b-seftec-gold bg-seftec-slate/50 text-seftec-navy font-medium dark:border-b-seftec-teal dark:bg-seftec-darkNavy/50 dark:text-white md:border-b-0 md:border-l-seftec-gold dark:md:border-l-seftec-teal" 
                      : "border-seftec-gold bg-seftec-slate/50 text-seftec-navy font-medium dark:border-seftec-teal dark:bg-seftec-darkNavy/50 dark:text-white"
                    : "border-transparent text-seftec-navy/70 hover:bg-seftec-slate/30 hover:text-seftec-navy dark:text-white/70 dark:hover:bg-seftec-darkNavy/20 dark:hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  isMobile ? "mr-0 md:mr-3" : "mr-3",
                  "text-seftec-gold dark:text-seftec-teal"
                )} />
                <span className={cn(
                  isMobile ? "hidden md:inline" : ""
                )}>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};

export default AccountSidebar;
