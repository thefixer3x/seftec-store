import React from 'react';
import { BillPaymentHub } from '@/components/bills/BillPaymentHub';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Bill Payments page
 * 
 * Dedicated page for bill payments including:
 * - Airtime purchases
 * - Data bundles
 * - TV subscription payments
 * - Electricity bills
 */
export default function BillPaymentsPage() {
  // Set document title
  useDocumentTitle('Bill Payments | SEFTEC');

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/sayswitch">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Bill Payments</h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <BillPaymentHub />
        
        <div className="mt-8 text-sm text-center text-muted-foreground">
          <p>Powered by SaySwitch Payment Infrastructure</p>
          <p className="mt-1">For support, contact support@seftec.com</p>
        </div>
      </div>
    </div>
  );
}
