import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { CreditCard, AlertCircle, RefreshCw, CheckCircle, ArrowUpRight } from 'lucide-react';

/**
 * SaySwitch Admin
 * 
 * Admin interface for managing and testing the SaySwitch payment gateway integration.
 * Includes transaction monitoring, API testing, and configuration options.
 */
const SaySwitchAdminContent = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [testAmount, setTestAmount] = useState("1000");
  const [testResult, setTestResult] = useState<null | { success: boolean; message: string }>(null);
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Check admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(!!data);
        
        if (data) {
          loadRecentTransactions();
        }
      } catch (error) {
        console.error('Exception checking admin status:', error);
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [supabase]);

  // Load recent transactions
  const loadRecentTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('say_orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      setRecentTransactions(data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  // Run test payment
  const runTestPayment = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      const amount = parseFloat(testAmount);
      
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount");
      }
      
      const { data, error } = await supabase.functions.invoke('sayswitch-payment', {
        body: {
          action: 'test_payment',
          amount,
          reference: `TEST-${Date.now()}`,
          is_admin_test: true
        }
      });
      
      if (error) throw error;
      
      if (data.success) {
        setTestResult({
          success: true,
          message: `Test payment successful. Reference: ${data.reference}`
        });
        
        // Refresh transactions list
        loadRecentTransactions();
      } else {
        throw new Error(data.error || "Payment test failed");
      }
    } catch (error) {
      console.error('Test payment error:', error);
      setTestResult({
        success: false,
        message: error.message || "An unexpected error occurred"
      });
    } finally {
      setLoading(false);
    }
  };

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
        
        <Button onClick={() => navigate('/devops')} variant="default">
          Return to DevOps Dashboard
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">SaySwitch Management</h1>
          <p className="text-muted-foreground">
            Configuration and testing for SaySwitch payment gateway
          </p>
        </div>
        
        <Button onClick={() => navigate('/devops')} variant="outline">
          Back to DevOps
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-4 bg-transparent h-auto p-0">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="testing"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Testing
          </TabsTrigger>
          <TabsTrigger
            value="config"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Configuration
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SaySwitch Status</CardTitle>
              <CardDescription>Integration status and recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-purple-500" />
                  <div>
                    <h3 className="font-medium">SaySwitch API</h3>
                    <p className="text-sm text-muted-foreground">Nigerian Payment Gateway</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Operational
                </Badge>
              </div>
              
              <h3 className="font-medium mb-2">Recent Transactions</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-2 p-3 bg-muted text-xs font-medium">
                  <div>Reference</div>
                  <div>Type</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>
                
                {recentTransactions.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No transactions found
                  </div>
                ) : (
                  recentTransactions.map((transaction: any) => (
                    <div key={transaction.id} className="grid grid-cols-5 gap-2 p-3 border-t text-sm">
                      <div className="font-mono text-xs">{transaction.reference}</div>
                      <div>{transaction.type}</div>
                      <div>₦{transaction.amount.toLocaleString()}</div>
                      <div>
                        <Badge variant={
                          transaction.status === 'completed' || transaction.status === 'success' 
                            ? 'success' 
                            : transaction.status === 'pending' || transaction.status === 'processing'
                              ? 'secondary'
                              : 'destructive'
                        }>
                          {transaction.status}
                        </Badge>
                      </div>
                      <div>{new Date(transaction.created_at).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SaySwitch Testing</CardTitle>
              <CardDescription>Run test transactions to verify integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="testAmount">Test Payment Amount (NGN)</Label>
                      <Input
                        id="testAmount"
                        type="number"
                        value={testAmount}
                        onChange={(e) => setTestAmount(e.target.value)}
                        min="100"
                        className="font-mono"
                      />
                    </div>
                    
                    <Button 
                      onClick={runTestPayment} 
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Run Test Payment
                        </>
                      )}
                    </Button>
                    
                    {testResult && (
                      <Alert variant={testResult.success ? "default" : "destructive"} className="mt-4">
                        {testResult.success ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertTitle>{testResult.success ? "Success" : "Error"}</AlertTitle>
                        <AlertDescription>{testResult.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Other Test Options</h3>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/devops/sayswitch/test-bill-payment')}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Test Bill Payment
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/devops/sayswitch/test-transfer')}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Test Money Transfer
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/devops/sayswitch/test-virtual-account')}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Test Virtual Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configuration Tab */}
        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SaySwitch Configuration</CardTitle>
              <CardDescription>API keys and integration settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Environment Variables</AlertTitle>
                <AlertDescription>
                  SaySwitch credentials are stored as environment variables for security. 
                  Use Supabase Dashboard to modify these values.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Current Configuration</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">API Base URL:</div>
                    <div className="font-mono">************************************</div>
                    
                    <div className="font-medium">Public Key:</div>
                    <div className="font-mono">pk_****************************</div>
                    
                    <div className="font-medium">Secret Key:</div>
                    <div className="font-mono">sk_****************************</div>
                  </div>
                </div>
                
                <Button
                  variant="default"
                  onClick={() => window.open('https://ptnrwrgzrsbocgxlpvhd.supabase.co/dashboard/settings/general', '_blank')}
                >
                  Manage in Supabase Dashboard
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
const SaySwitchAdmin = withErrorBoundary(SaySwitchAdminContent, {
  onError: (error, errorInfo) => {
    console.error("SaySwitch Admin error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          We encountered an issue loading the SaySwitch Admin panel. Please try refreshing the page.
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

export default SaySwitchAdmin;
