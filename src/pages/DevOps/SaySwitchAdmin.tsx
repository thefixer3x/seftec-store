import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseClient } from '@/hooks';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from "@/components/ui/switch";
import { CreditCard, AlertCircle, RefreshCw, CheckCircle, ArrowUpRight, Copy, ExternalLink, ClipboardList, Zap } from 'lucide-react';

/**
 * SaySwitch Admin
 * 
 * Admin interface for managing and testing the SaySwitch payment gateway integration.
 * Includes transaction monitoring, API testing, and configuration options.
 */
const SaySwitchAdminContent = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  useDocumentTitle('SaySwitch Admin');

  // Dynamic webhook URL based on environment
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mxtsdgkwzjzlttpotole.supabase.co';
  const webhookUrl = `${supabaseUrl}/functions/v1/sayswitch-webhook`;
  const dashboardUrl = supabaseUrl.replace('https://', 'https://').replace('.supabase.co', '.supabase.co/dashboard/settings/general');

  const [isProduction, setIsProduction] = useState(false);
  const [currentTab, setCurrentTab] = useState("general");
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
                
                <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Webhook Configuration</h3>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" /> Active
                    </Badge>
                  </div>
                  
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Configure these webhook settings in your SaySwitch dashboard to receive real-time payment notifications.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <div className="flex mt-1">
                        <Input
                          id="webhookUrl"
                          value={webhookUrl}
                          readOnly
                          className="font-mono flex-1"
                        />
                        <Button
                          variant="outline"
                          className="ml-2"
                          onClick={() => {
                            navigator.clipboard.writeText(webhookUrl);
                            alert("Webhook URL copied to clipboard");
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Required Headers</Label>
                      <div className="mt-1 p-3 bg-secondary/20 rounded font-mono text-xs">
                        <div className="mb-1">X-SaySwitch-Signature: [HMAC-SHA512 signature]</div>
                        <div>Content-Type: application/json</div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The webhook signature is automatically calculated using your public key and the payload, 
                        following SaySwitch's signing requirements. Our function validates this signature to ensure 
                        security.  
                      </p>
                    </div>
                    
                    <div>
                      <Label>Callback URL (Browser Redirect)</Label>
                      <div className="mt-1">
                        <Input
                          value="https://seftechub.com/payment/callback"
                          readOnly
                          className="font-mono"
                        />
                        <div className="flex mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => {
                              navigator.clipboard.writeText("https://seftechub.com/payment/callback");
                              toast({
                                title: "Copied!",
                                description: "Callback URL copied to clipboard",
                              });
                            }}
                          >
                            <Copy className="h-3.5 w-3.5 mr-1" /> Copy URL
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open("https://seftechub.com/payment/callback", "_blank")}
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Page
                          </Button>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          This is where users are redirected after completing a payment.
                          Can be overridden per transaction.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Supported Events</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-white dark:bg-slate-800 border rounded p-2 text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          charge.success
                        </div>
                        <div className="bg-white dark:bg-slate-800 border rounded p-2 text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                          charge.failed
                        </div>
                        <div className="bg-white dark:bg-slate-800 border rounded p-2 text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          transfer.success
                        </div>
                        <div className="bg-white dark:bg-slate-800 border rounded p-2 text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                          transfer.failed
                        </div>
                        <div className="bg-white dark:bg-slate-800 border rounded p-2 text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          bill.success
                        </div>
                        <div className="bg-white dark:bg-slate-800 border rounded p-2 text-sm">
                          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                          bill.failed
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Test Webhook</Label>
                      <div className="mt-2 flex">
                        <Button 
                          onClick={() => {
                            toast({
                              title: "Test event sent",
                              description: "A test charge.success event was sent to your webhook",
                            });
                          }}
                          className="mr-2"
                        >
                          <Zap className="h-4 w-4 mr-2" /> Send Test Event
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setCurrentTab("logs");
                          }}
                        >
                          <ClipboardList className="h-4 w-4 mr-2" /> View Webhook Logs
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Test your webhook integration by sending a sample event and checking the logs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="default"
                  onClick={() => window.open(dashboardUrl, '_blank')}
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
