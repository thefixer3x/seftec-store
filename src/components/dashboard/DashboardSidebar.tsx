
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
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
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: Home, label: 'Home', path: '/profile?tab=dashboard' },
  { icon: Wallet, label: 'My Wallet', path: '/profile?tab=wallet' },
  { icon: BookOpen, label: 'Inventory', path: '/profile?tab=inventory' },
  { icon: Shield, label: 'Bill Payment', path: '/profile?tab=bill-payment' },
  { icon: CreditCard, label: 'Account', path: '/profile?tab=account' },
  { icon: Store, label: 'My Stores', path: '/profile?tab=stores' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/profile?tab=marketplace' },
  { icon: FileText, label: 'Invoices', path: '/profile?tab=invoices' },
  { icon: Users, label: 'My Customers', path: '/profile?tab=customers' },
  { icon: Percent, label: 'Transaction', path: '/profile?tab=transaction' },
  { icon: Settings, label: 'Settings', path: '/profile?tab=settings' },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  return (
    <aside className="w-64 border-r border-border bg-sidebar dark:bg-sidebar-background h-full flex-shrink-0">
      <div className="py-4 flex flex-col h-full">
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold mb-6 px-3">Dashboard</h2>
        </div>
        <nav className="space-y-1 px-3 flex-1">
          {sidebarItems.map((item) => {
            const isActive = currentPath.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 text-sm rounded-md group transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium border-l-4 border-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
