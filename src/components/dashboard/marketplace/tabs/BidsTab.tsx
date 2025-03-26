
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import EmptyState from '../EmptyState';
import TableSkeleton from '../TableSkeleton';

interface BidsTabProps {
  isLoading: boolean;
}

const BidsTab: React.FC<BidsTabProps> = ({ isLoading }) => {
  return (
    <TabsContent value="bids" className="m-0">
      {isLoading ? (
        <div className="p-6">
          <TableSkeleton />
        </div>
      ) : (
        <EmptyState type="bids" />
      )}
    </TabsContent>
  );
};

export default BidsTab;
