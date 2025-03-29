
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProtectedLayout } from './ProtectedLayout';
import AccountSidebar from '@/components/account/AccountSidebar';

interface AccountPageLayoutProps {
  title: string;
  description: string;
  children?: ReactNode;
}

/**
 * Layout for account-related pages with consistent sidebar and auth check
 */
const AccountPageLayout = ({ title, description, children }: AccountPageLayoutProps) => {
  const isMobile = useIsMobile();

  const loadingComponent = (
    <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse text-lg text-seftec-navy dark:text-white">
        Loading account settings...
      </div>
    </div>
  );

  return (
    <ProtectedLayout loadingComponent={loadingComponent}>
      <div className="space-y-6 animate-fade-up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-seftec-navy dark:text-white">{title}</h1>
          <p className="text-seftec-navy/70 dark:text-white/70 mt-1">
            {description}
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-4 gap-6'}`}>
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-1'}`}>
            <AccountSidebar />
          </div>
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
            {children || <Outlet />}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default AccountPageLayout;
