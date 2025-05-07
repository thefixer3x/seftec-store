
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Store, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const ConnectAccountManager = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      fetchConnectAccount();
    }
  }, [user]);
  
  const fetchConnectAccount = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-connect', {
        body: { action: 'get_account' }
      });
      
      if (error) throw new Error(error.message);
      
      setAccount(data);
    } catch (error) {
      console.error('Error fetching Connect account:', error);
      toast({
        title: 'Account Error',
        description: 'Unable to fetch your Connect account details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const createConnectAccount = async () => {
    try {
      setProcessingAction(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-connect', {
        body: { action: 'create_account' }
      });
      
      if (error) throw new Error(error.message);
      
      // Redirect to Stripe Connect onboarding
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating Connect account:', error);
      toast({
        title: 'Account Error',
        description: 'Unable to create Connect account. Please try again.',
        variant: 'destructive',
      });
      setProcessingAction(false);
    }
  };
  
  if (loading) {
    return (
      <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-seftec-teal animate-spin" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Seller Account
            </CardTitle>
            <CardDescription>
              Manage your Stripe Connect account for marketplace payments
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!account?.exists ? (
          <div className="text-center p-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <Store className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Seller Account</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a Stripe Connect account to receive payments as a seller on our marketplace.
            </p>
            <Button 
              onClick={createConnectAccount} 
              disabled={processingAction}
              className="bg-seftec-purple hover:bg-seftec-purple/90 text-white"
            >
              {processingAction ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Store className="h-4 w-4 mr-2" />
              )}
              Create Seller Account
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  account.onboarding_complete 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-amber-100 dark:bg-amber-900/30'
                }`}>
                  <Store className={`h-6 w-6 ${
                    account.onboarding_complete 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-amber-600 dark:text-amber-400'
                  }`} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white">Stripe Connect Account</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {account.id?.slice(-8)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                {account.onboarding_complete ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Incomplete</span>
                  </div>
                )}
              </div>
            </div>
            
            {account.onboarding_complete ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Account Ready</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Your seller account is set up and ready to receive payments. You can now list products and receive payments through our marketplace.
                    </p>
                    
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">Identity verification complete</span>
                      </div>
                      
                      <div className="flex items-center text-sm mt-1">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">Banking information provided</span>
                      </div>
                      
                      <div className="flex items-center text-sm mt-1">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Payouts {account.payouts_enabled ? 'enabled' : 'pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Account Incomplete</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Your seller account requires additional information to start receiving payments. Please complete the onboarding process.
                    </p>
                    <Button 
                      onClick={createConnectAccount} 
                      className="mt-3 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Complete Onboarding
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="mb-2"><strong>Platform Fee:</strong> 5% of each transaction</p>
              <p><strong>Payout Schedule:</strong> 2 business days after successful transaction</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectAccountManager;
