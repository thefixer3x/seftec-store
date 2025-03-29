import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import AccountProfile from '@/pages/AccountProfile';
import AccountPassword from '@/pages/AccountPassword';
import AccountNotifications from '@/pages/AccountNotifications';
import AccountBusiness from '@/pages/AccountBusiness';
import AccountBanking from '@/pages/AccountBanking';
import AccountPin from '@/pages/AccountPin';
import AccountPreferences from "@/pages/AccountPreferences";

export const profileRoutes = (
  <Route path="/account" element={<ProtectedLayout />}>
    <Route index element={<Navigate to="/account/profile" />} />
    <Route path="profile" element={<AccountProfile />} />
    <Route path="password" element={<AccountPassword />} />
    <Route path="notifications" element={<AccountNotifications />} />
    <Route path="business" element={<AccountBusiness />} />
    <Route path="banking" element={<AccountBanking />} />
    <Route path="pin" element={<AccountPin />} />
    <Route path="preferences" element={<AccountPreferences />} />
  </Route>
);
