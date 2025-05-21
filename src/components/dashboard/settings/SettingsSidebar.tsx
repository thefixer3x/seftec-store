
import React, { useState, useEffect } from 'react';
import { Building, User, Lock, Key } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveSubTab?: (subTab: string) => void;
  activeSubTab?: string;
}

const SettingsSidebar = ({ activeTab, setActiveTab, setActiveSubTab, activeSubTab }: SettingsSidebarProps) => {
  const isMobile = useIsMobile();
  const [businessExpanded, setBusinessExpanded] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setBusinessExpanded(activeTab === 'business');
    } else {
      setBusinessExpanded(true);
    }
  }, [isMobile, activeTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'business' && setActiveSubTab) {
      setActiveSubTab('business-profile');
    }
  };

  const handleSubTabClick = (subTab: string) => {
    if (setActiveSubTab) {
      setActiveSubTab(subTab);
    }
  };
  
  return (
    <div className="py-2">
      <nav className="space-y-1">
        <TabButton 
          isActive={activeTab === 'personal'}
          onClick={() => handleTabClick('personal')}
          icon={<User className="h-4 w-4 mr-2" />}
          label="Personal Profile"
        />
        
        <Collapsible
          open={activeTab === 'business' && businessExpanded} 
          onOpenChange={setBusinessExpanded}
          className="pt-1"
        >
          <CollapsibleTrigger className="w-full">
            <TabButton 
              isActive={activeTab === 'business'}
              onClick={() => handleTabClick('business')}
              icon={<Building className="h-4 w-4 mr-2" />}
              label="Business Profile"
              isExpandable={true}
              isExpanded={businessExpanded && activeTab === 'business'}
            />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="pl-6 pt-1">
            {activeTab === 'business' && setActiveSubTab && (
              <div className="space-y-1 border-l-2 border-blue-200 dark:border-blue-800 pl-2">
                <SubTabButton
                  isActive={activeSubTab === 'business-profile'}
                  onClick={() => handleSubTabClick('business-profile')}
                  label="Profile"
                />
                <SubTabButton
                  isActive={activeSubTab === 'business-account'}
                  onClick={() => handleSubTabClick('business-account')}
                  label="Account"
                />
                <SubTabButton
                  isActive={activeSubTab === 'business-notifications'}
                  onClick={() => handleSubTabClick('business-notifications')}
                  label="Notifications"
                />
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
        
        <TabButton 
          isActive={activeTab === 'password'}
          onClick={() => handleTabClick('password')}
          icon={<Lock className="h-4 w-4 mr-2" />}
          label="Password"
        />
        
        <TabButton 
          isActive={activeTab === 'pin'}
          onClick={() => handleTabClick('pin')}
          icon={<Key className="h-4 w-4 mr-2" />}
          label="PIN"
        />
      </nav>
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isExpandable?: boolean;
  isExpanded?: boolean;
}

const TabButton = ({ isActive, onClick, icon, label, isExpandable, isExpanded }: TabButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/30"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {isExpandable && (
        <span className="ml-auto">
          <ChevronIcon expanded={isExpanded} />
        </span>
      )}
    </button>
  );
};

interface SubTabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const SubTabButton = ({ isActive, onClick, label }: SubTabButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
        isActive 
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/20"
      )}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
};

const ChevronIcon = ({ expanded }: { expanded?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("transition-transform", expanded ? "rotate-180" : "")}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default SettingsSidebar;
