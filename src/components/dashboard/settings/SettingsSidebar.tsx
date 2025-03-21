
import React, { useState } from 'react';
import { TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Lock, Key, Mail, Shield, Bell, ChevronRight, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveSubTab?: (subTab: string) => void;
  activeSubTab?: string;
}

const SettingsSidebar = ({ activeTab, setActiveSubTab, activeSubTab }: SettingsSidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);

  // On mobile, default to closed unless active
  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(activeTab === 'business');
    } else {
      setIsOpen(true);
    }
  }, [isMobile, activeTab]);

  // Common styles for the main tab triggers
  const tabTriggerClasses = `rounded-none px-6 py-4 justify-start text-left border-l-4`;
  
  return (
    <>
      <TabsTrigger 
        value="business" 
        className={`${tabTriggerClasses} ${activeTab === 'business' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-3" />
            Business Profile
          </div>
          {isMobile && activeTab === 'business' && (
            <CollapsibleTrigger 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="ml-2"
            >
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CollapsibleTrigger>
          )}
        </div>
      </TabsTrigger>
      
      {activeTab === 'business' && setActiveSubTab && (
        <Collapsible open={isOpen || !isMobile} onOpenChange={setIsOpen}>
          <CollapsibleContent className="pl-10 bg-blue-50/50 border-l-4 border-l-blue-200">
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
          </CollapsibleContent>
        </Collapsible>
      )}
      
      <TabsTrigger 
        value="personal" 
        className={`${tabTriggerClasses} ${activeTab === 'personal' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
      >
        <div className="flex items-center">
          <User className="h-4 w-4 mr-3" />
          Personal Profile
        </div>
      </TabsTrigger>
      
      <TabsTrigger 
        value="password" 
        className={`${tabTriggerClasses} ${activeTab === 'password' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
      >
        <div className="flex items-center">
          <Lock className="h-4 w-4 mr-3" />
          Password
        </div>
      </TabsTrigger>
      
      <TabsTrigger 
        value="pin" 
        className={`${tabTriggerClasses} ${activeTab === 'pin' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
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
