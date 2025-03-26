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
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from "@/components/ui/theme-toggle";

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

  const SidebarContent = () => (
    <div className="py-4 flex flex-col h-full">
      <div className="px-3 py-2">
        <div className="flex items-center mb-6 px-3">
          <Icons.logo className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-2" />
          <h2 className="text-lg font-semibold text-seftec-navy dark:text-white">seftec.store</h2>
        </div>
      </div>
      <nav className="space-y-1 px-3 flex-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = currentPath === item.path || 
                          (item.path !== '/' && currentPath.startsWith(item.path));
                 
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-3 text-sm rounded-md group transition-colors hover:bg-white/40 dark:hover:bg-white/5",
                isActive 
                  ? "bg-seftec-gold/10 text-seftec-navy dark:bg-seftec-teal/10 dark:text-seftec-teal font-medium border-l-4 border-seftec-gold dark:border-seftec-teal" 
                  : "text-seftec-navy/70 dark:text-white/70 hover:text-seftec-navy dark:hover:text-white"
              )}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <item.icon className={cn(
                "h-5 w-5 mr-3", 
                isActive 
                  ? "text-seftec-gold dark:text-seftec-teal" 
                  : "text-seftec-navy/70 dark:text-white/70 group-hover:text-seftec-navy dark:group-hover:text-white"
              )} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="flex items-center p-4 border-b dark:border-seftec-darkNavy/50">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-seftec-navy dark:text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[240px] border-r border-border bg-seftec-slate dark:bg-seftec-darkNavy">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center ml-2">
            <Icons.logo className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-2" />
            <h2 className="text-lg font-semibold text-seftec-navy dark:text-white">seftec.store</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="dashboard-sidebar h-full md:w-64 flex-shrink-0 border-r border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy">
      <div className="flex items-center justify-between px-4 py-2 border-b border-seftec-navy/10 dark:border-white/10">
        <div className="font-semibold text-seftec-navy dark:text-white">Dashboard</div>
        <ThemeToggle />
      </div>
      <SidebarContent />
    </div>
  );
};

export default DashboardSidebar;
