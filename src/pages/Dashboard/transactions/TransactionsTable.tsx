
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Transaction {
  id: string;
  date: string;
  from: string;
  accountNumber: string;
  referenceNumber: string;
  amount: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {new Date(transaction.date).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div>From {transaction.from}</div>
              <div className="text-sm text-gray-500">{transaction.accountNumber}</div>
              <div className="text-sm text-gray-500">{transaction.referenceNumber}</div>
            </TableCell>
            <TableCell className="text-right text-green-500 font-medium">
              {transaction.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
