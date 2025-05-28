import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEdocIntegration } from '@/hooks/useEdocIntegration';
import { useSubscription } from '@/hooks/use-subscription';
import { BankConnectionForm } from './BankConnectionForm';
import { TransactionsList } from './TransactionsList';
import { FinancialInsights } from './FinancialInsights';

interface BankAccount {
  id: string;
  bank_name: string;
  consent_status: string;
  created_at: string;
  last_sync?: string;
}

const EdocBankConnection: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { 
    getUserConsents, 
    syncTransactions, 
    revokeConsent,
    getFinancialInsights 
  } = useEdocIntegration();
  const { subscription, loading: subscriptionLoading } = useSubscription();

  const isPaidUser = subscription?.status === 'active' && subscription?.plan_id !== 'free';

  useEffect(() => {
    loadBankAccounts();
  }, []);

  const loadBankAccounts = async () => {
    try {
      setLoading(true);
      const consents = await getUserConsents();
      if (consents) {
        setBankAccounts(consents);
      }
    } catch (err) {
      setError('Failed to load bank accounts');
      console.error('Error loading bank accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncTransactions = async (consentId: string) => {
    try {
      setError(null);
      await syncTransactions(consentId);
      await loadBankAccounts(); // Refresh to update last sync time
    } catch (err) {
      setError('Failed to sync transactions');
      console.error('Error syncing transactions:', err);
    }
  };

  const handleRevokeConsent = async (consentId: string) => {
    try {
      setError(null);
      await revokeConsent(consentId);
      await loadBankAccounts(); // Refresh the list
    } catch (err) {
      setError('Failed to revoke bank consent');
      console.error('Error revoking consent:', err);
    }
  };

  if (subscriptionLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isPaidUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Bank Statement Analysis
          </CardTitle>
          <CardDescription>
            Connect your bank accounts for AI-powered financial insights and business planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Bank statement analysis is available for Pro and Business plan subscribers only. 
              Upgrade your subscription to access this feature.
            </AlertDescription>
          </Alert>
          <Button className="mt-4" disabled>
            Upgrade to Access Bank Integration
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Bank Statement Analysis
          </CardTitle>
          <CardDescription>
            Connect your Nigerian bank accounts for automated transaction analysis and business insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your data is encrypted and protected. We use bank-grade security and only access transaction data with your explicit consent.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="accounts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="accounts">Connected Banks</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Your Connected Banks</h3>
                <BankConnectionForm onSuccess={loadBankAccounts} />
              </div>

              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : bankAccounts.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">No Banks Connected</h3>
                    <p className="text-gray-600 mb-4">
                      Connect your first bank account to start analyzing your financial data
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {bankAccounts.map((account) => (
                    <Card key={account.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{account.bank_name}</h4>
                            <p className="text-sm text-gray-600">
                              Connected: {new Date(account.created_at).toLocaleDateString()}
                            </p>
                            {account.last_sync && (
                              <p className="text-sm text-gray-600">
                                Last sync: {new Date(account.last_sync).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={account.consent_status === 'active' ? 'success' : 'secondary'}
                            >
                              {account.consent_status}
                            </Badge>
                            <div className="flex gap-2">
                              {account.consent_status === 'active' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSyncTransactions(account.id)}
                                >
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                  Sync
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRevokeConsent(account.id)}
                              >
                                Disconnect
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionsList bankAccounts={bankAccounts} />
            </TabsContent>

            <TabsContent value="insights">
              <FinancialInsights bankAccounts={bankAccounts} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EdocBankConnection;