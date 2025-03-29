
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import AccountProfile from '@/pages/AccountPreferences';
import AccountPreferences from '@/pages/AccountPreferences';

export const profileRoutes = (
  <Route path="/account" element={<ProtectedLayout />}>
    <Route index element={<Navigate to="/account/profile" />} />
    <Route path="profile" element={<AccountProfile />} />
    <Route path="preferences" element={<AccountPreferences />} />
  </Route>
);
