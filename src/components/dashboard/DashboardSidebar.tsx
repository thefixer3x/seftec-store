
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Store, 
  ShoppingBag, 
  FileText, 
  Users, 
  BarChart4,
  Percent,
  Settings,
  BookOpen,
  CreditCard,
  Shield,
  Home,
  Briefcase,
  Menu,
  X,
  LifeBuoy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuthState } from "@/hooks/use-auth-state";

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Control Room', path: '/profile/dashboard' },
  { icon: Wallet, label: 'My Wallet', path: '/profile/wallet' },
  { icon: BookOpen, label: 'Inventory', path: '/profile/inventory' },
  { icon: Shield, label: 'Bill Payment', path: '/profile/bill-payment' },
  { icon: Briefcase, label: 'Trade Finance', path: '/profile/trade-finance' },
  { icon: CreditCard, label: 'Account', path: '/profile/account' },
  { icon: Store, label: 'My Branches', path: '/profile/stores' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/profile/marketplace' },
  { icon: FileText, label: 'Invoices', path: '/profile/invoices' },
  { icon: Users, label: 'My Customers', path: '/profile/customers' },
  { icon: Percent, label: 'Transaction', path: '/profile/transaction' },
  { icon: Settings, label: 'Settings', path: '/profile/settings' },
  { icon: Home, label: 'Back to Home', path: '/' },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthState();
  
  // Check if user is a super admin
  const isSuperAdmin = user?.email === 'superadmin@seftec.com' || 
                    user?.email?.includes('superadmin');
  
  const SidebarContent = () => (
    <div className="py-4 flex flex-col h-full">
      <div className="px-3 py-2">
        <div className="flex items-center mb-4 sm:mb-6 px-3">
          <Icons.logo className="h-5 w-5 sm:h-6 sm:w-6 text-seftec-gold dark:text-seftec-teal mr-2" />
          <h2 className="text-base sm:text-lg font-semibold text-seftec-navy dark:text-white">seftechub.com</h2>
        </div>
      </div>
      <ScrollArea className="flex-grow px-3 h-[calc(100vh-120px)]">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.path || 
                          (item.path !== '/' && currentPath.startsWith(item.path));
                 
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 sm:py-3 text-xs sm:text-sm rounded-md group transition-colors hover:bg-white/40 dark:hover:bg-white/5",
                  isActive 
                    ? "bg-seftec-gold/10 text-seftec-navy dark:bg-seftec-teal/10 dark:text-seftec-teal font-medium border-l-4 border-seftec-gold dark:border-seftec-teal" 
                    : "text-seftec-navy/70 dark:text-white/70 hover:text-seftec-navy dark:hover:text-white"
                )}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3", 
                  isActive 
                    ? "text-seftec-gold dark:text-seftec-teal" 
                    : "text-seftec-navy/70 dark:text-white/70 group-hover:text-seftec-navy dark:group-hover:text-white"
                )} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          {/* Super Admin Section */}
          {isSuperAdmin && (
            <>
              <Separator className="my-2" />
              <div className="pt-2">
                <p className="px-3 text-xs text-seftec-navy/50 dark:text-white/50 uppercase font-medium mb-1">
                  Admin Tools
                </p>
                <Link
                  to="/profile/developer"
                  className={cn(
                    "flex items-center px-3 py-2 sm:py-3 text-xs sm:text-sm rounded-md group transition-colors hover:bg-white/40 dark:hover:bg-white/5",
                    currentPath === "/profile/developer"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 font-medium border-l-4 border-amber-400" 
                      : "text-amber-600 dark:text-amber-400/70 hover:text-amber-700 dark:hover:text-amber-400"
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <LifeBuoy className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3", 
                    currentPath === "/profile/developer"
                      ? "text-amber-500 dark:text-amber-400" 
                      : "text-amber-500/70 dark:text-amber-400/70"
                  )} />
                  <span>Developer Tools</span>
                </Link>
              </div>
            </>
          )}
        </nav>
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="flex items-center p-3 sm:p-4 border-b dark:border-seftec-darkNavy/50">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 md:hidden">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-seftec-navy dark:text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[240px] sm:w-[280px] border-r border-border bg-seftec-slate dark:bg-seftec-darkNavy">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center ml-2">
            <Icons.logo className="h-5 w-5 sm:h-6 sm:w-6 text-seftec-gold dark:text-seftec-teal mr-2" />
            <h2 className="text-base sm:text-lg font-semibold text-seftec-navy dark:text-white">seftechub.com</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="dashboard-sidebar h-full md:w-64 flex-shrink-0 border-r border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-seftec-navy/10 dark:border-white/10">
        <div className="font-semibold text-seftec-navy dark:text-white">Dashboard</div>
        <ThemeToggle />
      </div>
      <ScrollArea className="flex-grow h-[calc(100vh-56px)]">
        <SidebarContent />
      </ScrollArea>
    </div>
  );
};

export default DashboardSidebar;
