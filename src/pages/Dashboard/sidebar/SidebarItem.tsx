
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  item: {
    icon: LucideIcon;
    label: string;
    path: string;
  };
  isActive: boolean;
}

const SidebarItem = ({ item, isActive }: SidebarItemProps) => {
  const { icon: Icon, label, path } = item;
  
  return (
    <li>
      <a 
        href={path} 
        className={cn(
          "flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
          isActive && "border-l-4 border-yellow-500 bg-gray-100 dark:bg-gray-700"
        )}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span>{label}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
