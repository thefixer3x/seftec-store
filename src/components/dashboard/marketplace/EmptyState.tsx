
import React from 'react';
import { ShoppingBag, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'bids' | 'offers';
}

const EmptyState = ({ type }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {type === 'bids' ? (
        <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
      ) : (
        <TrendingUp className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No {type} found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {type === 'bids' 
          ? "You haven't placed any bids yet. Browse the marketplace to find products to bid on."
          : "You haven't created any offers yet. Create offers to sell your products."}
      </p>
      <Button className="bg-blue-600 hover:bg-blue-700">
        {type === 'bids' ? 'Browse Marketplace' : 'Create Offer'}
      </Button>
    </div>
  );
};

export default EmptyState;
