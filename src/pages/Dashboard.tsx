
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  BookOpen, 
  Shield, 
  Wallet, 
  Percent, 
  Settings, 
  Search, 
  ChevronDown, 
  ArrowRight, 
  Check, 
  Store,
  Plus,
  ArrowUpRight,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("payment");

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please sign in to view your dashboard",
        variant: "destructive",
      });
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) return null;

  const sidebarItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Inventory', path: '/dashboard/inventory' },
    { icon: Shield, label: 'Bill Payment', path: '/dashboard/bills' },
    { icon: Wallet, label: 'Account', path: '/dashboard/account' },
    { icon: Percent, label: 'Transaction', path: '/dashboard/transactions' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: Store, label: 'My Stores', path: '/dashboard/stores' }
  ];

  const dummyTransactions = [
    {
      id: '1',
      date: '2025-03-18T12:41:33.000+00:00',
      from: 'GTBank/ABBA EGA',
      accountNumber: '0000132503181340210000372044401',
      referenceNumber: '20625031800166790002',
      amount: '+100'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-xl font-bold">Seftec Dashboard</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {profile?.first_name && profile?.last_name 
              ? `${profile.first_name} ${profile.last_name}` 
              : user.email}
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-4">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.path} 
                  className={cn(
                    "flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    index === 0 && "border-l-4 border-yellow-500 bg-gray-100 dark:bg-gray-700" // Highlight home as active
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="max-w-xs"
              prefix={<Search className="w-4 h-4 text-gray-400" />}
            />
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                Go to Website
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, {profile?.first_name || 'User'}</h1>
            <p className="text-gray-500 dark:text-gray-400">Here's an overview of your account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Active Loan Card */}
            <Card className="bg-blue-100 dark:bg-blue-900 border-none">
              <CardContent className="pt-6">
                <div className="mb-2 text-sm text-blue-700 dark:text-blue-300">Active loan</div>
                <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">NGNO</div>
              </CardContent>
            </Card>

            {/* Loan Limit Card */}
            <Card className="bg-gradient-to-r from-blue-700 to-indigo-800 border-none text-white">
              <CardContent className="pt-6">
                <div className="mb-2 text-xl">Your Loan Limit is</div>
                <div className="text-5xl font-bold text-yellow-400">100.0K</div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-white" />
                    <span>Disbursement within 24hrs</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-white" />
                    <span>Pay small small</span>
                  </div>
                </div>
                <Button className="mt-4 bg-yellow-400 text-blue-900 hover:bg-yellow-500">
                  Request loan <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Balance */}
          <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-none">
            <CardContent className="pt-6">
              <div className="mb-2 text-sm text-green-700 dark:text-green-300">Wallet balance</div>
              <div className="text-4xl font-bold text-green-900 dark:text-green-100">NGN8,880.00</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
                  Send Money <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline">
                  Fund Wallet <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <Tabs 
                defaultValue="payment" 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList>
                  <TabsTrigger value="payment">Payment Transactions</TabsTrigger>
                  <TabsTrigger value="loan">Loan Transactions</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="payment" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>From {transaction.from}</div>
                          <div className="text-sm text-gray-500">{transaction.accountNumber}</div>
                          <div className="text-sm text-gray-500">{transaction.referenceNumber}</div>
                        </TableCell>
                        <TableCell className="text-right text-green-500 font-medium">
                          {transaction.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      Total Transaction Value
                    </div>
                    <div className="text-2xl font-bold">₦935,670.00</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="loan" className="mt-0">
                <div className="p-8 text-center text-gray-500">
                  No loan transactions available
                </div>
              </TabsContent>
            </CardContent>
          </Card>

          {/* My Stores Section */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Stores (2)</CardTitle>
                <Button>
                  Create Store
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shop Name</TableHead>
                    <TableHead>Stock Value</TableHead>
                    <TableHead>Stock Count</TableHead>
                    <TableHead>Low Stock</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Nimmy's store</TableCell>
                    <TableCell>₦820,800.00</TableCell>
                    <TableCell>213.92</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>0</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ELLA STORE</TableCell>
                    <TableCell>₦32,025.00</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>0</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
