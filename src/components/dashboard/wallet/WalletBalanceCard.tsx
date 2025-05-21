
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Plus, Package, Heart } from 'lucide-react';
import BulkPaymentModal from './BulkPaymentModal';

const WalletBalanceCard = () => {
  const [isBulkPaymentModalOpen, setIsBulkPaymentModalOpen] = useState(false);

  return (
    <Card className="bg-white dark:bg-seftec-darkNavy/80 shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Available Balance</h3>
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full px-2 py-1">Virtual</span>
          </div>
          
          <div className="mb-6">
            <p className="text-3xl font-semibold text-seftec-navy dark:text-white">₦2,500,000.00</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last updated: May 20, 2025</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-2 px-1"
            >
              <SendHorizonal className="h-4 w-4 mb-1" />
              <span className="text-xs">Send Money</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-2 px-1"
            >
              <Plus className="h-4 w-4 mb-1" />
              <span className="text-xs">Fund Wallet</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-2 px-1"
              onClick={() => setIsBulkPaymentModalOpen(true)}
            >
              <Package className="h-4 w-4 mb-1" />
              <span className="text-xs">Bulk Payment</span>
            </Button>

            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-2 px-1"
            >
              <Heart className="h-4 w-4 mb-1" />
              <span className="text-xs">Donate</span>
            </Button>
          </div>
        </div>
      </CardContent>

      <BulkPaymentModal
        isOpen={isBulkPaymentModalOpen}
        onClose={() => setIsBulkPaymentModalOpen(false)}
      />
    </Card>
  );
};

export default WalletBalanceCard;
