
import React, { ReactNode } from 'react';
import DashboardSidebar from '../sidebar/DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
