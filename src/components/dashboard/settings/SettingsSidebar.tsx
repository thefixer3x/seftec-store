
import React from 'react';
import { TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Lock, Key, Mail, Shield, Bell } from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveSubTab?: (subTab: string) => void;
  activeSubTab?: string;
}

const SettingsSidebar = ({ activeTab, setActiveSubTab, activeSubTab }: SettingsSidebarProps) => {
  return (
    <>
      <TabsTrigger 
        value="business" 
        className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'business' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
      >
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-3" />
          Business Profile
        </div>
      </TabsTrigger>
      
      {activeTab === 'business' && setActiveSubTab && (
        <div className="pl-10 bg-blue-50/50 border-l-4 border-l-blue-200">
          <TabsTrigger 
            value="business-profile" 
            className={`rounded-none px-6 py-3 justify-start text-left border-l-4 text-sm ${activeSubTab === 'business-profile' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
            onClick={() => setActiveSubTab('business-profile')}
          >
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-3" />
              Profile
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="business-account" 
            className={`rounded-none px-6 py-3 justify-start text-left border-l-4 text-sm ${activeSubTab === 'business-account' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
            onClick={() => setActiveSubTab('business-account')}
          >
            <div className="flex items-center">
              <Shield className="h-3.5 w-3.5 mr-3" />
              Account
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="business-notifications" 
            className={`rounded-none px-6 py-3 justify-start text-left border-l-4 text-sm ${activeSubTab === 'business-notifications' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
            onClick={() => setActiveSubTab('business-notifications')}
          >
            <div className="flex items-center">
              <Bell className="h-3.5 w-3.5 mr-3" />
              Notifications
            </div>
          </TabsTrigger>
        </div>
      )}
      
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
    </>
  );
};

export default SettingsSidebar;
