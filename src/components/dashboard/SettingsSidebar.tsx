
import React, { useState, useEffect } from 'react';
import { TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Lock, Key, Mail, Shield, Bell, ChevronRight, ChevronDown, Moon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import DarkModeSwitch from '@/components/ui/dark-mode-switch';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveSubTab?: (subTab: string) => void;
  activeSubTab?: string;
}

const SettingsSidebar = ({ activeTab, setActiveSubTab, activeSubTab }: SettingsSidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(activeTab === 'business');
    } else {
      setIsOpen(true);
    }
  }, [isMobile, activeTab]);

  const tabTriggerClasses = `rounded-none px-6 py-4 justify-start text-left border-l-4`;

  return (
    <>
      <TabsTrigger 
        value="business" 
        className={`${tabTriggerClasses} ${activeTab === 'business' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-400' : 'border-transparent'}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-3 flex-shrink-0" />
            <span>Business Profile</span>
          </div>
          {isMobile && activeTab === 'business' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="ml-2"
            >
              {isOpen ? <ChevronDown className="h-4 w-4 flex-shrink-0" /> : <ChevronRight className="h-4 w-4 flex-shrink-0" />}
            </button>
          )}
        </div>
      </TabsTrigger>
      
      {activeTab === 'business' && setActiveSubTab && (
        <Collapsible open={isOpen || !isMobile} onOpenChange={setIsOpen}>
          <CollapsibleContent className="pl-10 bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-l-blue-200 dark:border-l-blue-700/30">
            <TabsTrigger 
              value="business-profile" 
              className={`rounded-none px-6 py-3 justify-start text-left border-l-4 text-sm ${activeSubTab === 'business-profile' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
              onClick={() => setActiveSubTab('business-profile')}
            >
              <div className="flex items-center">
                <User className="h-3.5 w-3.5 mr-3 flex-shrink-0" />
                <span>Profile</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="business-account" 
              className={`rounded-none px-6 py-3 justify-start text-left border-l-4 text-sm ${activeSubTab === 'business-account' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
              onClick={() => setActiveSubTab('business-account')}
            >
              <div className="flex items-center">
                <Shield className="h-3.5 w-3.5 mr-3 flex-shrink-0" />
                <span>Account</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="business-notifications" 
              className={`rounded-none px-6 py-3 justify-start text-left border-l-4 text-sm ${activeSubTab === 'business-notifications' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
              onClick={() => setActiveSubTab('business-notifications')}
            >
              <div className="flex items-center">
                <Bell className="h-3.5 w-3.5 mr-3 flex-shrink-0" />
                <span>Notifications</span>
              </div>
            </TabsTrigger>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      <TabsTrigger 
        value="personal" 
        className={`${tabTriggerClasses} ${activeTab === 'personal' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-400' : 'border-transparent'}`}
      >
        <div className="flex items-center">
          <User className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Personal Profile</span>
        </div>
      </TabsTrigger>
      
      <TabsTrigger 
        value="password" 
        className={`${tabTriggerClasses} ${activeTab === 'password' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-400' : 'border-transparent'}`}
      >
        <div className="flex items-center">
          <Lock className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Password</span>
        </div>
      </TabsTrigger>
      
      <TabsTrigger 
        value="pin" 
        className={`${tabTriggerClasses} ${activeTab === 'pin' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-400' : 'border-transparent'}`}
      >
        <div className="flex items-center">
          <Key className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>Pin</span>
        </div>
      </TabsTrigger>

      <div className="border-t border-gray-200 dark:border-gray-700 mt-auto pt-4 px-6">
        <DarkModeSwitch />
      </div>
    </>
  );
};

export default SettingsSidebar;
