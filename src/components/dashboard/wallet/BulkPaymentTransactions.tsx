
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import type { PostgrestError } from '@supabase/supabase-js';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, CalendarClock, Package } from 'lucide-react';
import { format } from 'date-fns';
import BulkPaymentDetails, { BulkPaymentDetailsProps, PaymentItem } from './BulkPaymentDetails';

type BulkPaymentRow = Tables<'bulk_payments'>;
type PaymentItemRow = Tables<'payment_items'>;
type BeneficiaryRow = Tables<'beneficiaries'>;

const isDeferredPaymentsSchemaError = (error: PostgrestError | null) => {
  if (!error) return false;
  const message = `${error.message} ${error.details ?? ''}`.toLowerCase();
  return (
    error.code === '42P01' ||
    error.code === 'PGRST204' ||
    error.code === 'PGRST301' ||
    message.includes('does not exist') ||
    message.includes('relationship') ||
    message.includes('schema cache')
  );
};

// Fetch bulk payments from database
const fetchBulkPayments = async (userId: string) => {
  const { data: bulkPayments, error: bulkPaymentsError } = await supabase
    .from('bulk_payments')
    .select('id, title, created_at, scheduled_date, total_amount, status')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (bulkPaymentsError) {
    if (isDeferredPaymentsSchemaError(bulkPaymentsError)) {
      console.warn('Bulk payments surface is deferred or not fully aligned yet:', bulkPaymentsError.message);
      return [];
    }
    throw bulkPaymentsError;
  }

  if (!bulkPayments || bulkPayments.length === 0) {
    return [];
  }

  const paymentIds = bulkPayments
    .map((payment: BulkPaymentRow) => payment.id)
    .filter((id): id is string => !!id);

  const { data: paymentItems, error: paymentItemsError } = await supabase
    .from('payment_items')
    .select('id, bulk_payment_id, beneficiary_id, amount, status')
    .in('bulk_payment_id', paymentIds);

  if (paymentItemsError) {
    if (isDeferredPaymentsSchemaError(paymentItemsError)) {
      console.warn('Payment items relation is deferred or unavailable:', paymentItemsError.message);
      return [];
    }
    throw paymentItemsError;
  }

  const beneficiaryIds = Array.from(
    new Set((paymentItems ?? []).map((item) => item.beneficiary_id).filter((id): id is string => !!id))
  );

  const { data: beneficiaries, error: beneficiariesError } =
    beneficiaryIds.length > 0
      ? await supabase
          .from('beneficiaries')
          .select('id, name, account_number, bank_code')
          .in('id', beneficiaryIds)
      : { data: [] as BeneficiaryRow[], error: null };

  if (beneficiariesError) {
    if (isDeferredPaymentsSchemaError(beneficiariesError)) {
      console.warn('Beneficiaries relation is deferred or unavailable:', beneficiariesError.message);
      return [];
    }
    throw beneficiariesError;
  }

  const beneficiaryMap = new Map<string, BeneficiaryRow>(
    (beneficiaries ?? [])
      .filter((beneficiary): beneficiary is BeneficiaryRow & { id: string } => !!beneficiary.id)
      .map((beneficiary) => [beneficiary.id, beneficiary])
  );

  const itemsByPaymentId = (paymentItems ?? []).reduce<Record<string, PaymentItem[]>>(
    (acc, item: PaymentItemRow) => {
      const paymentId = item.bulk_payment_id;
      if (!paymentId) return acc;

      if (!acc[paymentId]) {
        acc[paymentId] = [];
      }

      const beneficiary = item.beneficiary_id ? beneficiaryMap.get(item.beneficiary_id) : undefined;
      acc[paymentId].push({
        id: item.id ?? `${paymentId}-${item.beneficiary_id ?? 'beneficiary'}`,
        beneficiaryName: beneficiary?.name || 'Unknown',
        accountNumber: beneficiary?.account_number || '',
        bankName: beneficiary?.bank_code || '',
        amount: item.amount ?? 0,
        status: (item.status as 'pending' | 'completed' | 'failed' | 'processing' | null) ?? 'pending',
      });

      return acc;
    },
    {}
  );

  return bulkPayments.map((payment: BulkPaymentRow) => ({
    id: payment.id ?? '',
    title: payment.title ?? 'Bulk Payment',
    createdAt: payment.created_at ? new Date(payment.created_at) : new Date(),
    scheduledDate: payment.scheduled_date ? new Date(payment.scheduled_date) : undefined,
    totalAmount: payment.total_amount ?? 0,
    recipientCount: payment.id ? itemsByPaymentId[payment.id]?.length || 0 : 0,
    status: (payment.status as 'pending' | 'completed' | 'failed' | 'processing' | null) ?? 'pending',
    items: payment.id ? itemsByPaymentId[payment.id] || [] : [],
  }));
};

interface Payment {
  id: string;
  title: string;
  createdAt: Date;
  scheduledDate?: Date;
  totalAmount: number;
  recipientCount: number;
  status: 'pending' | 'completed' | 'failed' | 'processing';
  items: PaymentItem[];
}

const BulkPaymentTransactions = () => {
  const { user } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data: bulkPayments, isLoading, error } = useQuery({
    queryKey: ['bulk-payments', user?.id],
    queryFn: () => fetchBulkPayments(user!.id),
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000,
  });

  const payments = bulkPayments || [];

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            <CalendarClock className="h-3 w-3 mr-1" /> Processing
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        );
    }
  };

  if (error) {
    return (
      <div className="bg-background rounded-lg shadow-sm p-4">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="h-10 w-10 mb-3 text-destructive/50" />
          <p className="font-medium text-destructive">Failed to load bulk payments</p>
          <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium mb-4">Recent Bulk Payments</h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-12 w-12 mb-3 text-muted-foreground/30" />
            <p className="font-medium text-muted-foreground">No bulk payments yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Bulk payment batches will appear here once created.
            </p>
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
