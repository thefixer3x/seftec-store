
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import AccountProfile from '@/pages/AccountPreferences';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';

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
    </Route>
  </>
);
