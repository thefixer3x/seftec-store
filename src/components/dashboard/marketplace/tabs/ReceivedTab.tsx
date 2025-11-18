
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import OrdersTable from '../OrdersTable';
import TableSkeleton from '../TableSkeleton';
import { useMarketplaceOrders } from '@/hooks/use-marketplace-orders';
import { Order } from '../types';

interface ReceivedTabProps {
  isLoading: boolean;
}

const ReceivedTab: React.FC<ReceivedTabProps> = ({ isLoading: tabLoading }) => {
  const { orders, isLoading: ordersLoading } = useMarketplaceOrders();

  // Map database orders to the UI format
  const formattedOrders: Order[] = orders.map((order) => ({
    id: order.id.substring(0, 8).toUpperCase(), // Show first 8 chars of UUID
    product: order.shipping_address || 'N/A',  // Temporary - we'll enhance this
    value: `$${order.total_amount.toFixed(2)}`,
    distance: 'N/A',  // This field might not be relevant for all orders
    timePosted: new Date(order.created_at || order.order_date || '').toLocaleDateString(),
    status: order.status as 'pending' | 'complete' | 'cancelled',
  }));

  const loading = tabLoading || ordersLoading;

  return (
    <TabsContent value="received" className="m-0 p-0">
      {loading ? (
        <div className="p-6">
          <TableSkeleton />
        </div>
      ) : (
        <OrdersTable orders={formattedOrders} />
      )}
    </TabsContent>
  );
};

export default ReceivedTab;
