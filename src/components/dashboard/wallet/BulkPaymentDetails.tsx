
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { StatusBadge, StatusType } from '@/components/ui/status-badge';

export interface PaymentItem {
  id: string;
  beneficiaryName: string;
  accountNumber: string;
  bankName: string;
  amount: number;
  status: StatusType;
}

export interface BulkPaymentDetailsProps {
  id: string;
  title: string;
  createdAt: Date;
  scheduledDate?: Date;
  totalAmount: number;
  status: StatusType;
  items: PaymentItem[];
}

const BulkPaymentDetails = ({
  id,
  title,
  createdAt,
  scheduledDate,
  totalAmount,
  status,
  items,
}: BulkPaymentDetailsProps) => {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment ID</h3>
              <p className="mt-1 text-sm font-mono">{id.substring(0, 8)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</h3>
              <p className="mt-1 text-sm">{format(createdAt, 'MMM dd, yyyy HH:mm')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled</h3>
              <p className="mt-1 text-sm">
                {scheduledDate ? format(scheduledDate, 'MMM dd, yyyy HH:mm') : 'Immediate'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
              <div className="mt-1"><StatusBadge status={status} /></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white dark:bg-seftec-darkNavy/80 rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="mt-2 sm:mt-0">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Total Amount:</span>
            <span className="font-medium text-seftec-navy dark:text-white">₦{totalAmount.toLocaleString('en-NG')}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.beneficiaryName}</TableCell>
                  <TableCell className="font-mono text-xs">{item.accountNumber}</TableCell>
                  <TableCell>{item.bankName}</TableCell>
                  <TableCell className="text-right">₦{item.amount.toLocaleString('en-NG')}</TableCell>
                  <TableCell><StatusBadge status={item.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BulkPaymentDetails;
