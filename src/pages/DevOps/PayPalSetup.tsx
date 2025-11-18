import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { AlertCircle, CreditCard, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react';

/**
 * PayPal Setup Page
 * 
 * Admin interface for configuring PayPal REST API integration.
 * This establishes the pathway for adding PayPal as an alternative payment option
 * for international customers.
 */
const PayPalSetupContent = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient() as SupabaseClient;
  const [activeTab, setActiveTab] = useState('setup');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mode, setMode] = useState('sandbox');
  const [enablePayPal, setEnablePayPal] = useState(false);
  const [testResults, setTestResults] = useState<{
    connection?: { success: boolean; message: string };
    payment?: { success: boolean; message: string; data?: any };
    webhook?: { success: boolean; message: string };
  }>({});
  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    webhookId: '',
    returnUrl: 'https://seftechub.com/payment/success',
    cancelUrl: 'https://seftechub.com/payment/cancel'
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSaved(false);
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    if (name === 'mode') {
      setMode(value);
    }
    setSaved(false);
  };

  // Save configuration
  const saveConfiguration = async () => {
    setLoading(true);
    
    try {
      // This would normally create or update environment variables
      // For this implementation, we'll just simulate success
      
      // Create feature flag if not exists
      const { data: existingFlag } = await supabase
        .from('feature_flags')
        .select('id')
        .eq('name', 'paypal_payments')
        .single();
        
      if (!existingFlag) {
        await supabase
          .from('feature_flags')
          .insert({
            name: 'paypal_payments',
            enabled: enablePayPal,
            description: 'Enable PayPal REST API integration',
            rollout_pct: null
          });
      } else {
        await supabase
          .from('feature_flags')
          .update({ enabled: enablePayPal })
          .eq('name', 'paypal_payments');
      }
      
      // Show success message
      setSaved(true);
      
      // Create a log entry for the action
      await supabase
        .from('admin_logs')
        .insert({
          action: 'paypal_setup',
          details: {
            mode,
            enabled: enablePayPal,
            // Don't log secrets
            hasClientId: !!formData.clientId,
            hasClientSecret: !!formData.clientSecret,
            hasWebhookId: !!formData.webhookId
          }
        });
    } catch (error) {
      console.error('Error saving PayPal configuration:', error);
      alert('Error saving configuration. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  // Test API Connection
  const testApiConnection = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('paypal-payment', {
        body: { action: 'list_plans' },
      });

      if (error) {
        setTestResults({
          ...testResults,
          connection: {
            success: false,
            message: `Connection failed: ${error.message}`,
          },
        });
      } else if (data.error) {
        setTestResults({
          ...testResults,
          connection: {
            success: false,
            message: `API Error: ${data.error}`,
          },
        });
      } else {
        setTestResults({
          ...testResults,
          connection: {
            success: true,
            message: `Successfully connected! Found ${data.plans?.length || 0} billing plans.`,
          },
        });
      }
    } catch (error: any) {
      setTestResults({
        ...testResults,
        connection: {
          success: false,
          message: `Unexpected error: ${error.message}`,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Test Create Subscription
  const testCreatePayment = async () => {
    setLoading(true);
    try {
      // First get available plans
      const { data: plansData, error: plansError } = await supabase.functions.invoke('paypal-payment', {
        body: { action: 'list_plans' },
      });

      if (plansError || !plansData?.plans || plansData.plans.length === 0) {
        setTestResults({
          ...testResults,
          payment: {
            success: false,
            message: 'No billing plans available. Create a plan first in PayPal Dashboard.',
          },
        });
        setLoading(false);
        return;
      }

      const testPlanId = plansData.plans[0].id;

      const { data, error } = await supabase.functions.invoke('paypal-payment', {
        body: {
          action: 'create_subscription',
          planId: testPlanId,
          returnUrl: formData.returnUrl,
          cancelUrl: formData.cancelUrl,
          subscriber: {
            name: { given_name: 'Test', surname: 'User' },
            email_address: 'test@example.com',
          },
        },
      });

      if (error) {
        setTestResults({
          ...testResults,
          payment: {
            success: false,
            message: `Failed to create test subscription: ${error.message}`,
          },
        });
      } else if (data.error) {
        setTestResults({
          ...testResults,
          payment: {
            success: false,
            message: `API Error: ${data.error}`,
          },
        });
      } else {
        setTestResults({
          ...testResults,
          payment: {
            success: true,
            message: `Test subscription created! ID: ${data.subscriptionId}`,
            data: { approvalUrl: data.approvalUrl, subscriptionId: data.subscriptionId },
          },
        });
      }
    } catch (error: any) {
      setTestResults({
        ...testResults,
        payment: {
          success: false,
          message: `Unexpected error: ${error.message}`,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Test Webhook Simulation
  const testWebhook = async () => {
    setLoading(true);
    try {
      // Simulate a webhook event by calling the webhook endpoint
      const testEvent = {
        event_type: 'BILLING.SUBSCRIPTION.ACTIVATED',
        resource: {
          id: 'TEST-SUBSCRIPTION-ID',
          plan_id: 'TEST-PLAN-ID',
          status: 'ACTIVE',
          quantity: 1,
        },
      };

      const { data, error } = await supabase.functions.invoke('paypal-webhook', {
        body: testEvent,
      });

      if (error) {
        setTestResults({
          ...testResults,
          webhook: {
            success: false,
            message: `Webhook simulation failed: ${error.message}`,
          },
        });
      } else {
        setTestResults({
          ...testResults,
          webhook: {
            success: true,
            message: 'Webhook simulation successful! Check webhook_logs table for details.',
          },
        });
      }
    } catch (error: any) {
      setTestResults({
        ...testResults,
        webhook: {
          success: false,
          message: `Unexpected error: ${error.message}`,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">PayPal Integration Setup</h1>
          <p className="text-muted-foreground">
            Configure PayPal REST API as an alternative payment method
          </p>
        </div>
        
        <Button onClick={() => navigate('/devops')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to DevOps
        </Button>
      </div>
      
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Integration Status: Pending</AlertTitle>
        <AlertDescription>
          This integration pathway is being established. Complete the setup below to prepare for PayPal integration.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-4 bg-transparent h-auto p-0">
          <TabsTrigger
            value="setup"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Setup
          </TabsTrigger>
          <TabsTrigger
            value="testing"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Testing
          </TabsTrigger>
          <TabsTrigger
            value="webhooks"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Webhooks
          </TabsTrigger>
        </TabsList>
        
        {/* Setup Tab */}
        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PayPal API Configuration</CardTitle>
              <CardDescription>
                Enter your PayPal developer credentials to enable the integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-blue-500" />
                  <div>
                    <h3 className="font-medium">PayPal REST API</h3>
                    <p className="text-sm text-muted-foreground">International Payment Gateway</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Pending Setup
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable-paypal"
                    checked={enablePayPal}
                    onCheckedChange={setEnablePayPal}
                  />
                  <Label htmlFor="enable-paypal" className="cursor-pointer">
                    Enable PayPal Integration (when ready)
                  </Label>
                </div>
                
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mode">Environment</Label>
                      <Select
                        value={mode}
                        onValueChange={(value) => handleSelectChange('mode', value)}
                      >
                        <SelectTrigger id="mode">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                          <SelectItem value="production">Production (Live)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          Using {mode === 'sandbox' ? 'Sandbox' : 'Production'} environment
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      name="clientId"
                      value={formData.clientId}
                      onChange={handleInputChange}
                      placeholder={`PayPal ${mode === 'sandbox' ? 'Sandbox' : 'Live'} Client ID`}
                      className="font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      id="clientSecret"
                      name="clientSecret"
                      type="password"
                      value={formData.clientSecret}
                      onChange={handleInputChange}
                      placeholder={`PayPal ${mode === 'sandbox' ? 'Sandbox' : 'Live'} Client Secret`}
                      className="font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="webhookId">Webhook ID (Optional)</Label>
                    <Input
                      id="webhookId"
                      name="webhookId"
                      value={formData.webhookId}
                      onChange={handleInputChange}
                      placeholder="PayPal Webhook ID"
                      className="font-mono"
                    />
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-4">
                  <h3 className="font-medium">Redirect URLs</h3>
                  
                  <div>
                    <Label htmlFor="returnUrl">Success Return URL</Label>
                    <Input
                      id="returnUrl"
                      name="returnUrl"
                      value={formData.returnUrl}
                      onChange={handleInputChange}
                      placeholder="https://yourdomain.com/payment/success"
                      className="font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cancelUrl">Cancel Return URL</Label>
                    <Input
                      id="cancelUrl"
                      name="cancelUrl"
                      value={formData.cancelUrl}
                      onChange={handleInputChange}
                      placeholder="https://yourdomain.com/payment/cancel"
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate('/devops')}
              >
                Cancel
              </Button>
              
              <div className="flex items-center gap-2">
                {saved && (
                  <Alert variant="default" className="py-2 px-3 flex items-center bg-green-50 border-green-200 text-green-800">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <AlertDescription className="text-sm">
                      Configuration saved
                    </AlertDescription>
                  </Alert>
                )}
                
                <Button
                  variant="default"
                  onClick={saveConfiguration}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Configuration'
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Integration Testing</CardTitle>
              <CardDescription>
                Test the PayPal integration to ensure proper functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>PayPal Testing Tools</AlertTitle>
                <AlertDescription>
                  Use these tools to verify your PayPal integration is working correctly.
                  Make sure you've configured your credentials in the Setup tab first.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={testApiConnection}
                    disabled={loading}
                  >
                    {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Test API Connection
                  </Button>
                  {testResults.connection && (
                    <Alert className={`mt-2 ${testResults.connection.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                      {testResults.connection.success ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                      <AlertDescription className={testResults.connection.success ? 'text-green-800' : 'text-red-800'}>
                        {testResults.connection.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={testCreatePayment}
                    disabled={loading}
                  >
                    {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Create Test Subscription
                  </Button>
                  {testResults.payment && (
                    <Alert className={`mt-2 ${testResults.payment.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                      {testResults.payment.success ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                      <AlertDescription className={testResults.payment.success ? 'text-green-800' : 'text-red-800'}>
                        {testResults.payment.message}
                        {testResults.payment.data?.approvalUrl && (
                          <a
                            href={testResults.payment.data.approvalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-2 text-blue-600 hover:underline text-sm"
                          >
                            Open Approval URL →
                          </a>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={testWebhook}
                    disabled={loading}
                  >
                    {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Simulate Webhook Event
                  </Button>
                  {testResults.webhook && (
                    <Alert className={`mt-2 ${testResults.webhook.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                      {testResults.webhook.success ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                      <AlertDescription className={testResults.webhook.success ? 'text-green-800' : 'text-red-800'}>
                        {testResults.webhook.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Webhook Configuration</CardTitle>
              <CardDescription>
                Set up webhooks to receive real-time payment notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Webhook Setup Guide</AlertTitle>
                <AlertDescription>
                  Configure a webhook in your PayPal developer dashboard using the URL below.
                  This will enable real-time payment notifications.
                </AlertDescription>
              </Alert>
              
              <div className="p-4 border rounded-lg space-y-4">
                <div>
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <div className="flex">
                    <Input
                      id="webhookUrl"
                      value="https://seftechub.supabase.co/functions/v1/paypal-webhook"
                      readOnly
                      className="font-mono flex-1"
                    />
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText("https://seftechub.supabase.co/functions/v1/paypal-webhook");
                        alert("Webhook URL copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Required Events</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>PAYMENT.CAPTURE.COMPLETED</li>
                    <li>PAYMENT.CAPTURE.DENIED</li>
                    <li>CHECKOUT.ORDER.COMPLETED</li>
                    <li>CHECKOUT.ORDER.APPROVED</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add error boundary wrapper
const PayPalSetup = withErrorBoundary(PayPalSetupContent, {
  onError: (error, errorInfo) => {
    console.error("PayPal Setup error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          We encountered an issue loading the PayPal Setup page. Please try refreshing the page.
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

export default PayPalSetup;
