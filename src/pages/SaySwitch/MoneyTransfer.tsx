import React from 'react';
import { MoneyTransferForm } from '@/components/transfers/MoneyTransferForm';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Button } from '@/components/ui/button';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * Money Transfer page
 * 
 * Dedicated page for bank transfers including:
 * - Account verification
 * - Transfer to any Nigerian bank
 * - Saved beneficiaries management
 * - Transfer limits and security
 */
export default function MoneyTransferPage() {
  // Set document title
  useDocumentTitle('Money Transfer | SEFTEC');

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/sayswitch">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Money Transfer</h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription>
            Always verify account details before transferring money. All transfers are secured and monitored for fraud prevention.
          </AlertDescription>
        </Alert>
        
        <MoneyTransferForm />
        
        <div className="mt-8 text-sm text-center text-muted-foreground">
          <p>Powered by SaySwitch Payment Infrastructure</p>
          <p className="mt-1">For support, contact support@seftec.com</p>
        </div>
      </div>
    </div>
  );
}
