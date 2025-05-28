
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, ExternalLink, Trash2 } from 'lucide-react';
import { useEdocIntegration } from '@/hooks/useEdocIntegration';
import { BankConnectionForm } from './BankConnectionForm';

const EdocBankConnection = () => {
  const {
    loading,
    error,
    listBankConsents,
    initializeBankConsent,
    checkConsentStatus,
    syncTransactions,
    checkBankDataConsent
  } = useEdocIntegration();

  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const [consents, setConsents] = useState<any[]>([]);

  useEffect(() => {
    fetchConsents();
  }, []);

  const fetchConsents = async () => {
    const result = await listBankConsents();
    if (result) {
      setConsents(result);
    }
  };

  const handleStartConnection = () => {
    setShowConnectionForm(true);
  };

  const handleCancelConnection = () => {
    setShowConnectionForm(false);
  };

  const handleSubmitConnection = async (email: string, bankCode: string, bankName: string) => {
    await initializeBankConsent(email, bankCode, bankName);
    setShowConnectionForm(false);
    fetchConsents();
  };

  const handleDeleteConsent = async (consentId: string) => {
    // Implementation for deleting consent would go here
    console.log(`Deleting consent: ${consentId}`);
    await fetchConsents();
  };

  const handleSyncTransactions = async (consentId: string) => {
    await syncTransactions(consentId);
  };

  const renderConsentStatus = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Active
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Expired
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Bank Account Connections</CardTitle>
          <CardDescription>
            Connect your business bank accounts to enable financial insights and automated bookkeeping
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>Error: {error}</span>
              </div>
            </div>
          )}

          {showConnectionForm ? (
            <BankConnectionForm 
              onSuccess={() => {
                setShowConnectionForm(false);
                fetchConsents();
              }}
            />
          ) : (
            <>
              {consents.length > 0 ? (
                <div className="space-y-4">
                  {consents.map((consent) => (
                    <div 
                      key={consent.id} 
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{consent.bank_name}</div>
                        <div className="text-sm text-gray-500">
                          Connected: {new Date(consent.created_at).toLocaleDateString()}
                        </div>
                        <div className="mt-1">
                          {renderConsentStatus(consent.consent_status)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {consent.consent_status === 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSyncTransactions(consent.id)}
                          >
                            Sync Data
                          </Button>
                        )}
                        {consent.consent_status === 'created' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => checkConsentStatus(consent.id)}
                          >
                            Check Status
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeleteConsent(consent.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={handleStartConnection}
                    className="mt-4"
                  >
                    Connect Another Bank
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4 text-gray-400">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mx-auto"
                    >
                      <rect x="3" y="8" width="18" height="12" rx="2" />
                      <path d="M7 8V6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="8" y1="16" x2="16" y2="16" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No bank accounts connected</h3>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    Connect your business bank accounts to enable financial insights, automated bookkeeping, and more.
                  </p>
                  <Button onClick={handleStartConnection}>
                    Connect Bank Account
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {consents.some(consent => consent.consent_status === 'active') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Data Access Permissions</CardTitle>
            <CardDescription>
              Manage what data we can access from your connected bank accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Transaction History</div>
                  <div className="text-sm text-gray-500">
                    Access to your account transactions and balances
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" /> Granted
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Account Information</div>
                  <div className="text-sm text-gray-500">
                    Access to account details and account holder information
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" /> Granted
                </Badge>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  Your data is securely encrypted and only used to provide the services you've requested.
                  You can revoke access at any time by disconnecting your bank account.
                </p>
                <div className="mt-2">
                  <Button variant="link" className="p-0 h-auto" onClick={() => window.open('#', '_blank')}>
                    <span>Learn more about data security</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EdocBankConnection;
