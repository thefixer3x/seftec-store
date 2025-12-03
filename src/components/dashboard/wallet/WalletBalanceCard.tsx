
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Plus, Package, Heart } from 'lucide-react';
import BulkPaymentModal from './BulkPaymentModal';
import { useAuthState } from '@/hooks/use-auth-state';
import { supabase } from '@/integrations/supabase/client';

const WalletBalanceCard = () => {
  const [isBulkPaymentModalOpen, setIsBulkPaymentModalOpen] = useState(false);
  const { user } = useAuthState();
  const [balance, setBalance] = useState<string>('0.00');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Note: wallets table doesn't exist yet - using mock data for now
        // TODO: Create wallets table in database
        const walletData = null as { balance: number; updated_at: string } | null;

        if (walletData) {
          setBalance(walletData.balance?.toFixed(2) || '0.00');
          setLastUpdated(new Date(walletData.updated_at || Date.now()).toLocaleDateString());
        } else {
          // Set default balance if no wallet found (for new users)
          setBalance('0.00');
          setLastUpdated(new Date().toLocaleDateString());
        }
      } catch (error) {
        console.error('Error in fetchWalletData:', error);
        // Set default values on error
        setBalance('0.00');
        setLastUpdated(new Date().toLocaleDateString());
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();

    // Subscribe to wallet updates (commented out to prevent CSP errors until tables exist)
    // const walletChannel = supabase
    //   .channel('wallet-updates')
    //   .on(
    //     'postgres_changes',
    //     {
    //       event: '*',
    //       schema: 'public',
    //       table: 'wallets',
    //       filter: `user_id=eq.${user?.id}`,
    //     },
    //     () => {
    //       fetchWalletData();
    //     }
    //   )
    //   .subscribe();

    // return () => {
    //   supabase.removeChannel(walletChannel);
    // };
  }, [user]);

  return (
    <Card className="bg-white dark:bg-seftec-darkNavy/80 shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Available Balance</h3>
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full px-2 py-1">Virtual</span>
          </div>
          
          <div className="mb-6">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            ) : (
              <>
                <p className="text-3xl font-semibold text-seftec-navy dark:text-white">₦{balance}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last updated: {lastUpdated}</p>
              </>
            )}
          </div>
          
          {/* First row of buttons */}
          <div className="grid grid-cols-2 gap-2 mb-2">
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
          </div>
          
          {/* Second row of buttons */}
          <div className="grid grid-cols-2 gap-2">
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
