
import React from 'react';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import SettingsContainer from '@/components/dashboard/settings/SettingsContainer';

const SettingsPage = () => {
  return (
    <ProtectedLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-seftec-navy dark:text-white">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences and security settings
          </p>
        </div>
        
        <SettingsContainer />
      </div>
    </ProtectedLayout>
  );
};

export default SettingsPage;
