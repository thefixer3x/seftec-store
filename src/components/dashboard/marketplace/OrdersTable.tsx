
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Order } from './types';

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <ErrorBoundary fallback={<div className="p-8 text-center">Error loading order data. Please try again later.</div>}>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead className="font-medium">Order ID</TableHead>
            <TableHead className="font-medium">Product</TableHead>
            <TableHead className="font-medium">Value</TableHead>
            <TableHead className="font-medium">Distance</TableHead>
            <TableHead className="font-medium">Posted</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <TableRow 
                key={index} 
                className={`
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                  ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"}
                `}
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{order.value}</TableCell>
                <TableCell>{order.distance}</TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">{order.timePosted}</TableCell>
                <TableCell>
                  {order.status === 'pending' && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50">Pending</Badge>
                  )}
                  {order.status === 'complete' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50">Complete</Badge>
                  )}
                  {order.status === 'cancelled' && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50">Cancelled</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ErrorBoundary>
  );
};

export default OrdersTable;
