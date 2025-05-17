
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Lock, Key, Mail, Shield, Bell, ChevronRight, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveSubTab?: (subTab: string) => void;
  activeSubTab?: string;
}

const SettingsSidebar = ({ activeTab, setActiveTab, setActiveSubTab, activeSubTab }: SettingsSidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);

  // On mobile, default to closed unless active
  useEffect(() => {
    if (isMobile) {
      setIsOpen(activeTab === 'business');
    } else {
      setIsOpen(true);
    }
  }, [isMobile, activeTab]);

  // Common styles for the main tab triggers
  const tabTriggerClasses = `rounded-none px-4 sm:px-6 py-3 sm:py-4 justify-start text-left border-l-4 text-sm`;
  
  const handleBusinessTab = (e: React.MouseEvent) => {
    // Don't need to do anything special here, the TabsTrigger component will handle the tab change
  };
  
  const handleCollapsibleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
      <TabsList className="flex flex-col items-stretch space-y-1 bg-transparent">
        <TabsTrigger 
          value="business" 
          className={`${tabTriggerClasses} ${activeTab === 'business' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
          onClick={handleBusinessTab}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Building className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
              <span className="text-xs sm:text-sm">Business Profile</span>
            </div>
            {isMobile && activeTab === 'business' && (
              <button
                type="button"
                onClick={handleCollapsibleToggle}
                className="ml-2"
              >
                {isOpen ? <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              </button>
            )}
          </div>
        </TabsTrigger>
        
        {activeTab === 'business' && setActiveSubTab && (
          <Collapsible open={isOpen || !isMobile} onOpenChange={setIsOpen}>
            <CollapsibleContent className="pl-8 sm:pl-10 bg-blue-50/50 border-l-4 border-l-blue-200">
              <Tabs value={activeSubTab} onValueChange={setActiveSubTab} orientation="vertical" className="w-full">
                <TabsList className="flex flex-col items-stretch space-y-1 bg-transparent">
                  <TabsTrigger 
                    value="business-profile" 
                    className={`rounded-none px-4 sm:px-6 py-2 sm:py-3 justify-start text-left border-l-4 text-2xs sm:text-sm ${activeSubTab === 'business-profile' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
                  >
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-2 sm:mr-3" />
                      Profile
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="business-account" 
                    className={`rounded-none px-4 sm:px-6 py-2 sm:py-3 justify-start text-left border-l-4 text-2xs sm:text-sm ${activeSubTab === 'business-account' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
                  >
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-2 sm:mr-3" />
                      Account
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="business-notifications" 
                    className={`rounded-none px-4 sm:px-6 py-2 sm:py-3 justify-start text-left border-l-4 text-2xs sm:text-sm ${activeSubTab === 'business-notifications' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'}`}
                  >
                    <div className="flex items-center">
                      <Bell className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-2 sm:mr-3" />
                      Notifications
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CollapsibleContent>
          </Collapsible>
        )}
        
        <TabsTrigger 
          value="personal" 
          className={`${tabTriggerClasses} ${activeTab === 'personal' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
        >
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm">Personal Profile</span>
          </div>
        </TabsTrigger>
        
        <TabsTrigger 
          value="password" 
          className={`${tabTriggerClasses} ${activeTab === 'password' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
        >
          <div className="flex items-center">
            <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm">Password</span>
          </div>
        </TabsTrigger>
        
        <TabsTrigger 
          value="pin" 
          className={`${tabTriggerClasses} ${activeTab === 'pin' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
        >
          <div className="flex items-center">
            <Key className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm">Pin</span>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SettingsSidebar;
