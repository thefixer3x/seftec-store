
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => (
  <div className="space-y-3">
    <div className="flex space-x-4 items-center">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-8 w-24" />
      ))}
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex space-x-4 items-center mt-4">
        {[1, 2, 3, 4, 5, 6].map((j) => (
          <Skeleton key={j} className="h-6 w-24" />
        ))}
      </div>
    ))}
  </div>
);

export default TableSkeleton;
