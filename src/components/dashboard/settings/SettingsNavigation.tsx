
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, Building, Lock, Shield, Key } from 'lucide-react';

interface SettingsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SettingsNavigation = ({ activeTab, onTabChange }: SettingsNavigationProps) => {
  const navigationItems = [
    {
      id: 'personal',
      label: 'Personal Profile',
      icon: User,
      description: 'Manage your personal information'
    },
    {
      id: 'business',
      label: 'Business Profile',
      icon: Building,
      description: 'Business details and verification'
    },
    {
      id: 'password',
      label: 'Password',
      icon: Lock,
      description: 'Change your password'
    },
    {
      id: 'pin',
      label: 'Security PIN',
      icon: Key,
      description: 'Manage your security PIN'
    }
  ];

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "default" : "ghost"}
          className={cn(
            "w-full justify-start h-auto p-4 text-left",
            activeTab === item.id && "bg-seftec-navy text-white"
          )}
          onClick={() => onTabChange(item.id)}
        >
          <div className="flex items-start space-x-3">
            <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-xs opacity-75 mt-1">{item.description}</div>
            </div>
          </div>
        </Button>
      ))}
    </nav>
  );
};

export default SettingsNavigation;
