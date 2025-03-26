
import React from 'react';
import { Route } from 'react-router-dom';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import AccountLayout from '@/components/account/AccountLayout';
import ProfileSettings from '@/components/account/ProfileSettings';
import PasswordSettings from '@/components/account/PasswordSettings';
import NotificationSettings from '@/components/account/NotificationSettings';
import PinSettings from '@/components/account/PinSettings';
import BankAccountSettings from '@/components/account/BankAccountSettings';
import AccountSubscription from '@/components/account/AccountSubscription';
import WalletTab from '@/components/dashboard/WalletTab';
import SettingsTab from '@/components/dashboard/SettingsTab';
import DashboardContent from '@/components/dashboard/DashboardContent';

/**
 * Profile-related routes grouped together for better organization
 * and easier management
 */
export const profileRoutes = (
  <Route path="/profile" element={<Profile />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="wallet" element={<WalletTab />} />
    <Route path="inventory" element={<DashboardContent />} />
    <Route path="bill-payment" element={<DashboardContent />} />
    <Route path="trade-finance" element={<DashboardContent />} />
    
    {/* Account settings nested routes */}
    <Route path="account" element={<AccountLayout />}>
      <Route index element={<ProfileSettings />} />
      <Route path="password" element={<PasswordSettings />} />
      <Route path="notifications" element={<NotificationSettings />} />
      <Route path="pin" element={<PinSettings />} />
      <Route path="bank" element={<BankAccountSettings />} />
      <Route path="subscription" element={<AccountSubscription />} />
    </Route>
    
    <Route path="stores" element={<DashboardContent />} />
    <Route path="marketplace" element={<DashboardContent />} />
    <Route path="invoices" element={<DashboardContent />} />
    <Route path="customers" element={<DashboardContent />} />
    <Route path="transaction" element={<DashboardContent />} />
    <Route path="settings" element={<SettingsTab />} />
    <Route index element={<Dashboard />} />
  </Route>
);
