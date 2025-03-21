
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  Shield, 
  Wallet, 
  Percent, 
  Settings, 
  Store
} from 'lucide-react';
import SidebarItem from './SidebarItem';

const DashboardSidebar = () => {
  const { profile, user } = useAuth();

  const sidebarItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Inventory', path: '/dashboard/inventory' },
    { icon: Shield, label: 'Bill Payment', path: '/dashboard/bills' },
    { icon: Wallet, label: 'Account', path: '/dashboard/account' },
    { icon: Percent, label: 'Transaction', path: '/dashboard/transactions' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: Store, label: 'My Stores', path: '/dashboard/stores' }
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="text-xl font-bold">Seftec Dashboard</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {profile?.first_name && profile?.last_name 
            ? `${profile.first_name} ${profile.last_name}` 
            : user?.email}
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {sidebarItems.map((item, index) => (
            <SidebarItem 
              key={index}
              item={item}
              isActive={index === 0} // Highlight home as active
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
