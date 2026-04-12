
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, CalendarClock } from 'lucide-react';
import { format } from 'date-fns';
import BulkPaymentDetails, { BulkPaymentDetailsProps, PaymentItem } from './BulkPaymentDetails';

// Fetch bulk payments from database
const fetchBulkPayments = async (userId: string) => {
  const { data: bulkPayments, error } = await (supabase as any)
    .from('bulk_payments')
    .select(`
      *,
      payment_items (
        id,
        beneficiary:beneficiaries (
          account_name,
          account_number,
          bank_name
        ),
        amount,
        status
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;

  // Transform database data to match component interface
  return bulkPayments?.map((payment) => ({
    id: payment.id,
    title: payment.title,
    createdAt: new Date(payment.created_at),
    scheduledDate: payment.scheduled_date ? new Date(payment.scheduled_date) : undefined,
    totalAmount: payment.total_amount,
    recipientCount: payment.payment_items?.length || 0, // Use payment_items length instead of recipient_count
    status: payment.status as 'pending' | 'completed' | 'failed' | 'processing',
    items: payment.payment_items?.map((item: any) => ({
      id: item.id,
      beneficiaryName: item.beneficiary?.account_name || 'Unknown',
      accountNumber: item.beneficiary?.account_number || '',
      bankName: item.beneficiary?.bank_name || '',
      amount: item.amount,
      status: item.status as 'pending' | 'completed' | 'failed' | 'processing',
    })) || [],
  })) || [];
};

  const payments = bulkPayments || [];

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <CalendarClock className="h-3 w-3 mr-1" /> Processing
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" /> Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        );
    }
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-seftec-darkNavy/80 rounded-lg shadow-sm p-4">
        <p className="text-red-500">Error loading bulk payments: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-seftec-darkNavy/80 rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium mb-4">Recent Bulk Payments</h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-seftec-teal"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs">{payment.id.substring(4, 12)}</TableCell>
                  <TableCell className="font-medium">{payment.title}</TableCell>
                  <TableCell>{format(payment.createdAt, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{payment.recipientCount}</TableCell>
                  <TableCell className="text-right">₦{payment.totalAmount.toLocaleString('en-NG')}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewDetails(payment)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">View details</span>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        )}
      </div>

      {selectedPayment && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <BulkPaymentDetails
              id={selectedPayment.id}
              title={selectedPayment.title}
              createdAt={selectedPayment.createdAt}
              scheduledDate={selectedPayment.scheduledDate}
              totalAmount={selectedPayment.totalAmount}
              status={selectedPayment.status}
              items={selectedPayment.items}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BulkPaymentTransactions;
