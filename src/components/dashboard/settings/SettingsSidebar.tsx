import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Lock, Key, Mail, Shield, Bell, ChevronRight, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveSubTab?: (subTab: string) => void;
  activeSubTab?: string;
}

const SettingsSidebar = ({ activeTab, setActiveTab, setActiveSubTab, activeSubTab }: SettingsSidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  const [subTabsValue, setSubTabsValue] = useState(activeSubTab || 'business-profile');

  // On mobile, default to closed unless active
  useEffect(() => {
    if (isMobile) {
      setIsOpen(activeTab === 'business');
    } else {
      setIsOpen(true);
    }
  }, [isMobile, activeTab]);

  // Update subTabsValue when activeSubTab changes
  useEffect(() => {
    if (activeSubTab) {
      setSubTabsValue(activeSubTab);
    }
  }, [activeSubTab]);

  // Handle sub tab change
  const handleSubTabChange = (value: string) => {
    setSubTabsValue(value);
    if (setActiveSubTab) {
      setActiveSubTab(value);
    }
  };

  // Common styles for the main tab triggers
  const tabTriggerClasses = `rounded-none px-4 sm:px-6 py-3 sm:py-4 justify-start text-left border-l-4 text-sm`;
  
  const handleBusinessTab = () => {
    setActiveTab('business');
  };
  
  const handleCollapsibleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="space-y-0">
        <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
          <TabsTrigger 
            value="business" 
            className={cn(tabTriggerClasses, activeTab === 'business' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent')}
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
          
          <TabsTrigger 
            value="personal" 
            className={cn(tabTriggerClasses, activeTab === 'personal' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent')}
          >
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
              <span className="text-xs sm:text-sm">Personal Profile</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="password" 
            className={cn(tabTriggerClasses, activeTab === 'password' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent')}
          >
            <div className="flex items-center">
              <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
              <span className="text-xs sm:text-sm">Password</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="pin" 
            className={cn(tabTriggerClasses, activeTab === 'pin' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent')}
          >
            <div className="flex items-center">
              <Key className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
              <span className="text-xs sm:text-sm">Pin</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === 'business' && setActiveSubTab && (
        <Collapsible open={isOpen || !isMobile} onOpenChange={setIsOpen}>
          <CollapsibleContent className="pl-8 sm:pl-10 bg-blue-50/50 border-l-4 border-l-blue-200">
            <Tabs value={subTabsValue} onValueChange={handleSubTabChange} orientation="vertical" className="space-y-0">
              <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                <TabsTrigger 
                  value="business-profile" 
                  className={cn(
                    "rounded-none px-4 sm:px-6 py-2 sm:py-3 justify-start text-left border-l-4 text-2xs sm:text-sm",
                    subTabsValue === 'business-profile' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'
                  )}
                >
                  <div className="flex items-center">
                    <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-2 sm:mr-3" />
                    Profile
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="business-account" 
                  className={cn(
                    "rounded-none px-4 sm:px-6 py-2 sm:py-3 justify-start text-left border-l-4 text-2xs sm:text-sm",
                    subTabsValue === 'business-account' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'
                  )}
                >
                  <div className="flex items-center">
                    <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-2 sm:mr-3" />
                    Account
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="business-notifications" 
                  className={cn(
                    "rounded-none px-4 sm:px-6 py-2 sm:py-3 justify-start text-left border-l-4 text-2xs sm:text-sm",
                    subTabsValue === 'business-notifications' ? 'border-blue-400 text-blue-700 font-medium' : 'border-transparent'
                  )}
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
    </div>
  );
};

export default SettingsSidebar;
