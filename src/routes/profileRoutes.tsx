
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import AccountProfile from '@/pages/AccountPreferences';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import WalletPage from '@/pages/WalletPage';
import SettingsPage from '@/pages/SettingsPage';
import AccountPage from '@/pages/AccountPage';
import InventoryPage from '@/pages/InventoryPage';
import BillPaymentPage from '@/pages/BillPaymentPage';
import TradeFinancePage from '@/pages/TradeFinancePage';
import StoresPage from '@/pages/StoresPage';
import MarketplacePage from '@/pages/MarketplacePage';
import InvoicesPage from '@/pages/InvoicesPage';
import CustomersPage from '@/pages/CustomersPage';
import TransactionPage from '@/pages/TransactionPage';
import { ProfileSettings } from '@/components/account/ProfileSettings';
// Fix the imports by using default imports instead of named imports
import PasswordSettings from '@/components/account/PasswordSettings';
import PinSettings from '@/components/account/PinSettings'; 
import NotificationSettings from '@/components/account/NotificationSettings';
import BankAccountSettings from '@/components/account/BankAccountSettings';
import AccountSubscription from '@/components/account/AccountSubscription';

export const profileRoutes = (
  <>
    {/* Account section routes - for settings and preferences */}
    <Route path="/account" element={<ProtectedLayout />}>
      <Route index element={<Navigate to="/account/profile" />} />
      <Route path="profile" element={<AccountProfile />} />
      <Route path="preferences" element={<AccountProfile />} />
    </Route>
    
    {/* Profile section routes - for dashboard and other user-specific content */}
    <Route path="/profile" element={<Profile />}>
      <Route index element={<Navigate to="/profile/dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="wallet" element={<WalletPage />} />
      <Route path="settings" element={<SettingsPage />} />
      
      {/* Account settings nested routes */}
      <Route path="account" element={<AccountPage />}>
        <Route index element={<ProfileSettings />} />
        <Route path="password" element={<PasswordSettings />} />
        <Route path="pin" element={<PinSettings />} />
        <Route path="notifications" element={<NotificationSettings />} />
        <Route path="bank" element={<BankAccountSettings />} />
        <Route path="subscription" element={<AccountSubscription />} />
      </Route>
      
      <Route path="inventory" element={<InventoryPage />} />
      <Route path="bill-payment" element={<BillPaymentPage />} />
      <Route path="trade-finance" element={<TradeFinancePage />} />
      <Route path="stores" element={<StoresPage />} />
      <Route path="marketplace" element={<MarketplacePage />} />
      <Route path="invoices" element={<InvoicesPage />} />
      <Route path="customers" element={<CustomersPage />} />
      <Route path="transaction" element={<TransactionPage />} />
    </Route>
  </>
);
