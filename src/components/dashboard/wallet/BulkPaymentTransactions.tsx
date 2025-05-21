
import React, { useState } from 'react';
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

// Sample data for testing
const SAMPLE_BULK_PAYMENTS = [
  {
    id: 'pay_123456789012',
    title: 'May Staff Salaries',
    createdAt: new Date('2025-05-10T10:30:00'),
    totalAmount: 1250000,
    recipientCount: 5,
    status: 'completed' as const,
    items: [
      {
        id: 'item_1',
        beneficiaryName: 'John Doe',
        accountNumber: '0123456789',
        bankName: 'First Bank',
        amount: 250000,
        status: 'completed' as const
      },
      {
        id: 'item_2',
        beneficiaryName: 'Jane Smith',
        accountNumber: '9876543210',
        bankName: 'Zenith Bank',
        amount: 250000,
        status: 'completed' as const
      },
      {
        id: 'item_3',
        beneficiaryName: 'Alice Johnson',
        accountNumber: '5678901234',
        bankName: 'Access Bank',
        amount: 250000,
        status: 'completed' as const
      },
      {
        id: 'item_4',
        beneficiaryName: 'Bob Williams',
        accountNumber: '4321098765',
        bankName: 'UBA',
        amount: 250000,
        status: 'completed' as const
      },
      {
        id: 'item_5',
        beneficiaryName: 'Charlie Brown',
        accountNumber: '1234567890',
        bankName: 'GTBank',
        amount: 250000,
        status: 'completed' as const
      }
    ]
  },
  {
    id: 'pay_987654321098',
    title: 'Vendor Payments - Q2',
    createdAt: new Date('2025-05-15T14:20:00'),
    scheduledDate: new Date('2025-05-20T08:00:00'),
    totalAmount: 780000,
    recipientCount: 3,
    status: 'pending' as const,
    items: [
      {
        id: 'item_6',
        beneficiaryName: 'Office Supplies Ltd',
        accountNumber: '1029384756',
        bankName: 'Fidelity Bank',
        amount: 180000,
        status: 'pending' as const
      },
      {
        id: 'item_7',
        beneficiaryName: 'Internet Services Co',
        accountNumber: '6574839201',
        bankName: 'Sterling Bank',
        amount: 350000,
        status: 'pending' as const
      },
      {
        id: 'item_8',
        beneficiaryName: 'Cleaning Services Inc',
        accountNumber: '8192837465',
        bankName: 'FCMB',
        amount: 250000,
        status: 'pending' as const
      }
    ]
  },
  {
    id: 'pay_456789012345',
    title: 'Consultant Fees',
    createdAt: new Date('2025-05-18T09:15:00'),
    totalAmount: 600000,
    recipientCount: 2,
    status: 'processing' as const,
    items: [
      {
        id: 'item_9',
        beneficiaryName: 'Marketing Experts LLC',
        accountNumber: '5647382910',
        bankName: 'Wema Bank',
        amount: 350000,
        status: 'processing' as const
      },
      {
        id: 'item_10',
        beneficiaryName: 'IT Solutions Provider',
        accountNumber: '2019384756',
        bankName: 'Unity Bank',
        amount: 250000,
        status: 'processing' as const
      }
    ]
  },
  {
    id: 'pay_654321098765',
    title: 'Project Team Bonuses',
    createdAt: new Date('2025-05-05T16:40:00'),
    totalAmount: 900000,
    recipientCount: 3,
    status: 'failed' as const,
    items: [
      {
        id: 'item_11',
        beneficiaryName: 'David Clark',
        accountNumber: '9876543210',
        bankName: 'Guaranty Trust Bank',
        amount: 300000,
        status: 'failed' as const
      },
      {
        id: 'item_12',
        beneficiaryName: 'Elizabeth Davis',
        accountNumber: '1234567890',
        bankName: 'First City Monument Bank',
        amount: 300000,
        status: 'failed' as const
      },
      {
        id: 'item_13',
        beneficiaryName: 'Frank Edwards',
        accountNumber: '5678901234',
        bankName: 'Access Bank',
        amount: 300000,
        status: 'failed' as const
      }
    ]
  }
];

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
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-seftec-darkNavy/80 rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium mb-4">Recent Bulk Payments</h2>
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
              {SAMPLE_BULK_PAYMENTS.map((payment) => (
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
