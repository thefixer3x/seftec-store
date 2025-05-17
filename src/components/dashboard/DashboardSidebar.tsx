
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Wallet, 
  Settings, 
  Package, 
  ShoppingBag, 
  User, 
  CreditCard, 
  Briefcase, 
  Store, 
  FileText,
  Users,
  LayoutDashboard,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const SidebarLink = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent',
          isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </NavLink>
  )
}

export const DashboardSidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === "admin@seftec.com"; // Simple admin check - replace with proper role check

  return (
    <div className="w-full py-4">
      <nav className="space-y-2 px-2">
        <SidebarLink to="/profile/dashboard" icon={Home}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/profile/wallet" icon={Wallet}>
          Wallet
        </SidebarLink>
        <SidebarLink to="/profile/transaction" icon={CreditCard}>
          Transactions
        </SidebarLink>
        <SidebarLink to="/profile/trade-finance" icon={Briefcase}>
          Trade Finance
        </SidebarLink>
        <SidebarLink to="/profile/marketplace" icon={ShoppingBag}>
          Marketplace
        </SidebarLink>
        <SidebarLink to="/profile/bill-payment" icon={FileText}>
          Bill Payments
        </SidebarLink>
        <SidebarLink to="/profile/inventory" icon={Package}>
          Inventory
        </SidebarLink>
        <SidebarLink to="/profile/stores" icon={Store}>
          Stores
        </SidebarLink>
        <SidebarLink to="/profile/customers" icon={Users}>
          Customers
        </SidebarLink>
        <SidebarLink to="/profile/account" icon={User}>
          Account
        </SidebarLink>
        <SidebarLink to="/profile/settings" icon={Settings}>
          Settings
        </SidebarLink>
        
        {isAdmin && (
          <div className="pt-4 mt-4 border-t">
            <p className="px-2 mb-2 text-xs font-medium text-muted-foreground">Admin</p>
            <SidebarLink to="/dev/routes" icon={Code}>
              Dev Portal
            </SidebarLink>
          </div>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
