
import React from 'react';
import AccountPageLayout from '@/components/layout/AccountPageLayout';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <AccountPageLayout 
      title="Account Settings"
      description="Manage your account preferences and personal information"
    >
      {children}
    </AccountPageLayout>
  );
};

export default AccountLayout;
