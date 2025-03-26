
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import EmptyState from '../EmptyState';
import TableSkeleton from '../TableSkeleton';

interface OffersTabProps {
  isLoading: boolean;
}

const OffersTab: React.FC<OffersTabProps> = ({ isLoading }) => {
  return (
    <TabsContent value="offers" className="m-0">
      {isLoading ? (
        <div className="p-6">
          <TableSkeleton />
        </div>
      ) : (
        <EmptyState type="offers" />
      )}
    </TabsContent>
  );
};

export default OffersTab;
