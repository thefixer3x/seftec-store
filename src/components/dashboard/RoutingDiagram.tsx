
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type RouteInfo = {
  path: string;
  description: string;
  accessLevel: 'public' | 'protected';
  status: 'active' | 'under development';
  component?: string;
  children?: RouteInfo[];
};

const RoutingDiagram = () => {
  const profileRoutes: RouteInfo[] = [
    {
      path: '/profile/dashboard',
      description: 'Main dashboard with user overview and quick actions',
      accessLevel: 'protected',
      status: 'active',
      component: 'Dashboard',
    },
    {
      path: '/profile/wallet',
      description: 'Wallet management and transaction history',
      accessLevel: 'protected',
      status: 'active',
      component: 'WalletPage',
    },
    {
      path: '/profile/account',
      description: 'Account settings',
      accessLevel: 'protected',
      status: 'active',
      component: 'AccountPage',
      children: [
        {
          path: '/profile/account',
          description: 'Profile settings',
          accessLevel: 'protected',
          status: 'active',
          component: 'ProfileSettings',
        },
        {
          path: '/profile/account/password',
          description: 'Password settings',
          accessLevel: 'protected',
          status: 'active',
          component: 'PasswordSettings',
        },
        {
          path: '/profile/account/pin',
          description: 'PIN settings',
          accessLevel: 'protected',
          status: 'active',
          component: 'PinSettings',
        },
        {
          path: '/profile/account/notifications',
          description: 'Notification preferences',
          accessLevel: 'protected',
          status: 'active',
          component: 'NotificationSettings',
        },
        {
          path: '/profile/account/bank',
          description: 'Bank account settings',
          accessLevel: 'protected',
          status: 'active',
          component: 'BankAccountSettings',
        },
        {
          path: '/profile/account/subscription',
          description: 'Subscription management',
          accessLevel: 'protected',
          status: 'active',
          component: 'AccountSubscription',
        },
      ],
    },
    {
      path: '/profile/inventory',
      description: 'Inventory management',
      accessLevel: 'protected',
      status: 'under development',
      component: 'InventoryPage',
    },
    {
      path: '/profile/bill-payment',
      description: 'Bill payment services',
      accessLevel: 'protected',
      status: 'under development',
      component: 'BillPaymentPage',
    },
    {
      path: '/profile/trade-finance',
      description: 'Trade finance solutions',
      accessLevel: 'protected',
      status: 'active',
      component: 'TradeFinancePage',
    },
    {
      path: '/profile/stores',
      description: 'Manage branches/stores',
      accessLevel: 'protected',
      status: 'active',
      component: 'StoresPage',
    },
    {
      path: '/profile/marketplace',
      description: 'Browse and manage marketplace items',
      accessLevel: 'protected',
      status: 'active',
      component: 'MarketplacePage',
    },
    {
      path: '/profile/invoices',
      description: 'Invoices management',
      accessLevel: 'protected',
      status: 'under development',
      component: 'InvoicesPage',
    },
    {
      path: '/profile/customers',
      description: 'Customer relationship management',
      accessLevel: 'protected',
      status: 'under development',
      component: 'CustomersPage',
    },
    {
      path: '/profile/transaction',
      description: 'Transaction history and details',
      accessLevel: 'protected',
      status: 'active',
      component: 'TransactionPage',
    },
    {
      path: '/profile/settings',
      description: 'Account and application settings',
      accessLevel: 'protected',
      status: 'active',
      component: 'SettingsPage',
    },
  ];

  const publicRoutes: RouteInfo[] = [
    {
      path: '/',
      description: 'Homepage with main marketing content',
      accessLevel: 'public',
      status: 'active',
      component: 'Index',
    },
    {
      path: '/about',
      description: 'About page with company information',
      accessLevel: 'public',
      status: 'active',
      component: 'About',
    },
    {
      path: '/login',
      description: 'User authentication',
      accessLevel: 'public',
      status: 'active',
      component: 'Login',
    },
    {
      path: '/register',
      description: 'New user registration',
      accessLevel: 'public',
      status: 'active',
      component: 'Register',
    },
    {
      path: '/contact',
      description: 'Contact information and form',
      accessLevel: 'public',
      status: 'active',
      component: 'Contact',
    },
    {
      path: '/solutions',
      description: 'Product and service solutions',
      accessLevel: 'public',
      status: 'active',
      component: 'Solutions',
    },
    {
      path: '/defi-leadership',
      description: 'DeFi leadership information and details',
      accessLevel: 'public',
      status: 'active',
      component: 'DefiLeadership',
    },
    {
      path: '/shop',
      description: 'E-commerce shop page',
      accessLevel: 'public',
      status: 'active',
      component: 'Shop',
    },
    {
      path: '/products',
      description: 'Product listings page',
      accessLevel: 'public',
      status: 'active',
      component: 'Products',
    },
    {
      path: '/reset-password',
      description: 'Password recovery',
      accessLevel: 'public',
      status: 'active',
      component: 'ResetPassword',
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Public Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Component</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publicRoutes.map((route) => (
                <TableRow key={route.path}>
                  <TableCell className="font-mono text-sm">{route.path}</TableCell>
                  <TableCell>{route.description}</TableCell>
                  <TableCell>
                    <Badge variant={route.status === 'active' ? 'default' : 'outline'}>
                      {route.status === 'active' ? 'Active' : 'In Development'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{route.component}</TableCell>
                  <TableCell>
                    <Link to={route.path}>
                      <Button variant="outline" size="sm">Visit</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Protected Profile Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Component</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profileRoutes.filter(route => !route.children).map((route) => (
                <TableRow key={route.path}>
                  <TableCell className="font-mono text-sm">{route.path}</TableCell>
                  <TableCell>{route.description}</TableCell>
                  <TableCell>
                    <Badge variant={route.status === 'active' ? 'default' : 'outline'}>
                      {route.status === 'active' ? 'Active' : 'In Development'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{route.component}</TableCell>
                  <TableCell>
                    <Link to={route.path}>
                      <Button variant="outline" size="sm">Visit</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Nested Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Component</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profileRoutes.find(route => route.path === '/profile/account')?.children?.map((route) => (
                <TableRow key={route.path}>
                  <TableCell className="font-mono text-sm">{route.path}</TableCell>
                  <TableCell>{route.description}</TableCell>
                  <TableCell>
                    <Badge variant={route.status === 'active' ? 'default' : 'outline'}>
                      {route.status === 'active' ? 'Active' : 'In Development'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{route.component}</TableCell>
                  <TableCell>
                    <Link to={route.path}>
                      <Button variant="outline" size="sm">Visit</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoutingDiagram;
