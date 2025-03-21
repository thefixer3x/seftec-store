
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Lock, Key } from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: string;
}

const SettingsSidebar = ({ activeTab }: SettingsSidebarProps) => {
  return (
    <div className="sticky top-20">
      <TabsList className="flex flex-col w-full justify-start rounded-none bg-gray-50 p-0">
        <TabsTrigger 
          value="business" 
          className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'business' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
        >
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-3" />
            Business Profile
          </div>
        </TabsTrigger>
        <TabsTrigger 
          value="personal" 
          className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'personal' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
        >
          <div className="flex items-center">
            <User className="h-4 w-4 mr-3" />
            Personal Profile
          </div>
        </TabsTrigger>
        <TabsTrigger 
          value="password" 
          className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'password' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
        >
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-3" />
            Password
          </div>
        </TabsTrigger>
        <TabsTrigger 
          value="pin" 
          className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'pin' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
        >
          <div className="flex items-center">
            <Key className="h-4 w-4 mr-3" />
            Pin
          </div>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default SettingsSidebar;
