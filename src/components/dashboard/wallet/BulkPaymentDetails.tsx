
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Package } from 'lucide-react';

interface BulkPaymentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

const BulkPaymentDetails: React.FC<BulkPaymentDetailsProps> = ({
  isOpen,
  onClose,
  payment
}) => {
  if (!payment) return null;

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
  
  // Count transactions by status
  const statusCounts = payment.items?.reduce((acc: Record<string, number>, item: any) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <DialogTitle className="text-xl">{payment.title}</DialogTitle>
            <Badge className={getStatusColor(payment.status)}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Created</p>
            <p>{payment.created_at ? format(new Date(payment.created_at), 'PPpp') : 'N/A'}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-medium">
              {parseFloat(payment.total_amount).toLocaleString('en-NG', { 
                style: 'currency', 
                currency: payment.currency_code 
              })}
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Scheduled Date</p>
            <p>{payment.scheduled_date ? format(new Date(payment.scheduled_date), 'PPpp') : 'Immediate'}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status Summary</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusCounts || {}).map(([status, count]) => (
                <Badge key={status} variant="outline" className={getStatusColor(status)}>
                  {status}: {count}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recipient
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {payment.items?.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {item.beneficiaries?.name || 'Unknown'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">
                    {item.beneficiaries?.account_number || 'N/A'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {parseFloat(item.amount).toLocaleString('en-NG', { 
                      style: 'currency', 
                      currency: item.currency_code 
                    })}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                    {item.error_message && (
                      <p className="text-xs text-red-500 mt-1">{item.error_message}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkPaymentDetails;
