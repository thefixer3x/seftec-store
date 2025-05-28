import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import {
  Settings,
  AlertCircle,
  CreditCard,
  Database,
  Server,
  Shield,
  Users,
  Activity,
  BarChart4,
  MessageSquare,
  ArrowRightCircle
} from 'lucide-react';

/**
 * DevOps Dashboard
 * 
 * Protected admin-only interface for backend operations, testing,
 * and system monitoring. Includes payment gateway management and
 * feedback collection for CI/CD improvements.
 */
const DevOpsDashboardContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const supabase = useSupabaseClient() as SupabaseClient;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [paymentStats, setPaymentStats] = useState({
    stripe: { count: 45, volume: 12680, status: 'operational' },
    sayswitch: { count: 23, volume: 8450, status: 'operational' },
    paypal: { count: 0, volume: 0, status: 'pending' }
  });

  // Check admin status
  React.useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(!!data);
      } catch (error) {
        console.error('Exception checking admin status:', error);
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [supabase, user]);

  // If not admin, show restricted access message
  if (isAdmin === false) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Restricted</AlertTitle>
          <AlertDescription>
            This area is restricted to administrative users only.
          </AlertDescription>
        </Alert>
        
        <Button onClick={() => navigate('/')} variant="default">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  // Loading state
  if (isAdmin === null) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-64">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Feature flag management
  const handleFeatureToggle = async (feature: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('feature_flags')
        .update({ enabled })
        .eq('name', feature);
      
      if (error) throw error;
      
      // Show success message
      alert(`Feature "${feature}" ${enabled ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
      console.error('Error toggling feature:', error);
      alert('Error updating feature flag. See console for details.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">DevOps Dashboard</h1>
          <p className="text-muted-foreground">
            System administration, monitoring, and testing tools
          </p>
        </div>
        
        <Badge variant="outline" className="px-3 py-1 text-sm bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
          <Shield className="h-3.5 w-3.5 mr-1" />
          Admin Access
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 gap-4 bg-transparent h-auto p-0">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Gateways
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Settings className="h-4 w-4 mr-2" />
            Feature Flags
          </TabsTrigger>
          <TabsTrigger
            value="database"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Database className="h-4 w-4 mr-2" />
            Database
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Feedback
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">152</div>
                <p className="text-muted-foreground text-sm">+12% from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                  Transaction Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₦{(paymentStats.stripe.volume + paymentStats.sayswitch.volume).toLocaleString()}</div>
                <p className="text-muted-foreground text-sm">Last 7 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Server className="h-5 w-5 mr-2 text-amber-500" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-lg font-medium">Operational</div>
                </div>
                <p className="text-muted-foreground text-sm">All systems normal</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => setActiveTab('payments')}
              >
                <CreditCard className="h-6 w-6 mb-2" />
                <span>Manage Payment Gateways</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => setActiveTab('features')}
              >
                <Settings className="h-6 w-6 mb-2" />
                <span>Toggle Feature Flags</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => navigate('/devops/logs')}
              >
                <Activity className="h-6 w-6 mb-2" />
                <span>View System Logs</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => navigate('/devops/users')}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>User Management</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Gateways Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Management</CardTitle>
              <CardDescription>
                Configure and monitor payment integration services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Stripe Section */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded mr-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Stripe</h3>
                        <p className="text-sm text-muted-foreground">Primary International Gateway</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {paymentStats.stripe.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-secondary/20 p-3 rounded">
                      <div className="text-sm text-muted-foreground">Transactions</div>
                      <div className="text-xl font-bold">{paymentStats.stripe.count}</div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded">
                      <div className="text-sm text-muted-foreground">Volume</div>
                      <div className="text-xl font-bold">₦{paymentStats.stripe.volume.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => navigate('/devops/payment-testing/stripe')}
                    >
                      Test Gateway
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/devops/payment-config/stripe')}
                    >
                      Configure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/devops/payment-logs/stripe')}
                    >
                      View Logs
                    </Button>
                  </div>
                </div>
                
                {/* SaySwitch Section */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded mr-3">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">SaySwitch</h3>
                        <p className="text-sm text-muted-foreground">Nigerian Payment Gateway</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {paymentStats.sayswitch.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-secondary/20 p-3 rounded">
                      <div className="text-sm text-muted-foreground">Transactions</div>
                      <div className="text-xl font-bold">{paymentStats.sayswitch.count}</div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded">
                      <div className="text-sm text-muted-foreground">Volume</div>
                      <div className="text-xl font-bold">₦{paymentStats.sayswitch.volume.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => navigate('/devops/payment-testing/sayswitch')}
                    >
                      Test Gateway
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/devops/payment-config/sayswitch')}
                    >
                      Configure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/devops/payment-logs/sayswitch')}
                    >
                      View Logs
                    </Button>
                  </div>
                </div>
                
                {/* PayPal Section */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded mr-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">PayPal</h3>
                        <p className="text-sm text-muted-foreground">International Alternative Gateway</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      {paymentStats.paypal.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-secondary/20 p-3 rounded">
                      <div className="text-sm text-muted-foreground">Transactions</div>
                      <div className="text-xl font-bold">{paymentStats.paypal.count}</div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded">
                      <div className="text-sm text-muted-foreground">Volume</div>
                      <div className="text-xl font-bold">${paymentStats.paypal.volume.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <Alert className="mb-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Integration Pending</AlertTitle>
                    <AlertDescription>
                      PayPal REST API integration is currently in development. Click "Set Up" to begin configuration.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => navigate('/devops/PayPalSetup')}
                    >
                      Set Up
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled
                    >
                      Test Gateway
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/devops/payment-integration')}
              >
                <ArrowRightCircle className="h-4 w-4 mr-2" />
                Add New Payment Gateway
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Feature Flags Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flag Management</CardTitle>
              <CardDescription>
                Control feature visibility and staged rollouts across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">SaySwitch Payments</h3>
                      <p className="text-sm text-muted-foreground">Enable payment processing via SaySwitch</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Global</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-green-50 hover:bg-green-100 text-green-700"
                        onClick={() => handleFeatureToggle('sayswitch_payments', true)}
                      >
                        Enable
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-50 hover:bg-red-100 text-red-700"
                        onClick={() => handleFeatureToggle('sayswitch_payments', false)}
                      >
                        Disable
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">SaySwitch Bills</h3>
                      <p className="text-sm text-muted-foreground">Enable bill payments via SaySwitch</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Global</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-green-50 hover:bg-green-100 text-green-700"
                        onClick={() => handleFeatureToggle('sayswitch_bills', true)}
                      >
                        Enable
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-50 hover:bg-red-100 text-red-700"
                        onClick={() => handleFeatureToggle('sayswitch_bills', false)}
                      >
                        Disable
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">SaySwitch Transfers</h3>
                      <p className="text-sm text-muted-foreground">Enable money transfers via SaySwitch</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Global</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-green-50 hover:bg-green-100 text-green-700"
                        onClick={() => handleFeatureToggle('sayswitch_transfers', true)}
                      >
                        Enable
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-50 hover:bg-red-100 text-red-700"
                        onClick={() => handleFeatureToggle('sayswitch_transfers', false)}
                      >
                        Disable
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">PayPal Integration</h3>
                      <p className="text-sm text-muted-foreground">Enable PayPal as payment option</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-secondary/20"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Database Tab */}
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>
                Database status, migrations, and monitoring tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 mr-3 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Supabase Database</h3>
                      <p className="text-sm text-muted-foreground">PostgreSQL Database</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Healthy
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => navigate('/devops/database/migrations')}
                  >
                    <Activity className="h-6 w-6 mb-2" />
                    <span>Migrations</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => navigate('/devops/database/backups')}
                  >
                    <Server className="h-6 w-6 mb-2" />
                    <span>Backups</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => navigate('/devops/database/query')}
                  >
                    <Database className="h-6 w-6 mb-2" />
                    <span>SQL Query</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
              <CardDescription>
                Customer feedback for product improvements and CI/CD
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Feedback System</AlertTitle>
                <AlertDescription>
                  The feedback collection system is being configured. This will gather user inputs for continuous improvement.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => navigate('/devops/feedback/setup')}
                >
                  Set Up Feedback Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add error boundary wrapper
const DevOpsDashboard = withErrorBoundary(DevOpsDashboardContent, {
  onError: (error, errorInfo) => {
    console.error("DevOps Dashboard error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          We encountered an issue loading the DevOps Dashboard. Please try refreshing the page.
        </AlertDescription>
      </Alert>
      
      <Button 
        onClick={() => window.location.reload()} 
        variant="default"
        className="mt-4"
      >
        Refresh Page
      </Button>
    </div>
  )
});

export default DevOpsDashboard;
