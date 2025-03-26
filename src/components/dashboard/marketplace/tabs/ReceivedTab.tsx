
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import OrdersTable from '../OrdersTable';
import TableSkeleton from '../TableSkeleton';
import { orderData } from '../types';

interface ReceivedTabProps {
  isLoading: boolean;
}

const ReceivedTab: React.FC<ReceivedTabProps> = ({ isLoading }) => {
  return (
    <TabsContent value="received" className="m-0 p-0">
      {isLoading ? (
        <div className="p-6">
          <TableSkeleton />
        </div>
      ) : (
        <OrdersTable orders={orderData} />
      )}
    </TabsContent>
  );
};

export default ReceivedTab;
