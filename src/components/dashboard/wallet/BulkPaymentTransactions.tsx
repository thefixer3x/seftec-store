
import React, { useState, useEffect } from 'react';
import { useAuthState } from '@/hooks/use-auth-state';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { Package, Calendar, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import BulkPaymentDetails from './BulkPaymentDetails';
import { format } from 'date-fns';

const BulkPaymentTransactions = () => {
  const { user } = useAuthState();
  const [loading, setLoading] = useState<boolean>(true);
  const [bulkPayments, setBulkPayments] = useState<any[]>([]);
  const [expandedPaymentId, setExpandedPaymentId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      fetchBulkPayments();
    }
  }, [user]);

  const fetchBulkPayments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bulk_payments')
        .select('*, payment_items(count)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setBulkPayments(data || []);
    } catch (error: any) {
      console.error('Error fetching bulk payments:', error);
      toast({
        title: "Failed to load bulk payments",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (paymentId: string) => {
    setExpandedPaymentId(expandedPaymentId === paymentId ? null : paymentId);
  };

  const viewDetails = async (payment: any) => {
    try {
      // Fetch detailed information including payment items
      const { data, error } = await supabase
        .from('payment_items')
        .select('*, beneficiaries(*)')
        .eq('bulk_payment_id', payment.id);
        
      if (error) throw error;
      
      setSelectedPayment({
        ...payment,
        items: data || []
      });
      setIsDetailsModalOpen(true);
    } catch (error: any) {
      console.error('Error fetching payment details:', error);
      toast({
        title: "Failed to load payment details",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'canceled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
              <Skeleton className="h-6 w-[100px]" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (bulkPayments.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Bulk Payments</h3>
        <p className="text-gray-500 mt-2">You haven't created any bulk payments yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {bulkPayments.map((payment) => (
          <Card key={payment.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-seftec-navy dark:text-white" />
                  <h3 className="font-medium">{payment.title}</h3>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    {payment.payment_items[0].count} transactions | 
                    {' '}{parseFloat(payment.total_amount).toLocaleString('en-NG', { style: 'currency', currency: payment.currency_code })}
                  </p>
                  
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {payment.created_at 
                        ? format(new Date(payment.created_at), 'MMM d, yyyy')
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => viewDetails(payment)}
                >
                  <Eye className="h-4 w-4 mr-1" /> Details
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleExpand(payment.id)}
                >
                  {expandedPaymentId === payment.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {expandedPaymentId === payment.id && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p>{payment.created_at ? format(new Date(payment.created_at), 'MMM d, yyyy HH:mm') : 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Scheduled Date</p>
                    <p>{payment.scheduled_date ? format(new Date(payment.scheduled_date), 'MMM d, yyyy HH:mm') : 'Immediate'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Processed Date</p>
                    <p>{payment.processed_at ? format(new Date(payment.processed_at), 'MMM d, yyyy HH:mm') : 'Not processed'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Reference</p>
                    <p className="font-mono text-sm">{payment.id.substring(0, 8)}</p>
                  </div>
                </div>
                
                {payment.status === 'failed' && payment.last_error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md text-red-700 dark:text-red-300 text-sm">
                    Error: {payment.last_error}
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
      
      {selectedPayment && (
        <BulkPaymentDetails
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          payment={selectedPayment}
        />
      )}
    </>
  );
};

export default BulkPaymentTransactions;
