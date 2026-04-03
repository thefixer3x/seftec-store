
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Plus, Package, Heart, Lock } from 'lucide-react';
import { useAuthState } from '@/hooks/use-auth-state';
import { supabase } from '@/integrations/supabase/client';

type WalletSnapshot = {
  balance: number | null;
  currency: string | null;
  is_active: boolean | null;
};

const WalletBalanceCard = () => {
  const { user } = useAuthState();
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<WalletSnapshot | null>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      if (!user) {
        setWallet(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('vortex_wallets')
          .select('balance, currency, is_active')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching wallet snapshot:', error);
          setWallet(null);
          return;
        }

        setWallet(data);
      } catch (error) {
        console.error('Error in fetchWallet:', error);
        setWallet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [user]);

  const formattedBalance = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: wallet?.currency || 'NGN',
  }).format(wallet?.balance ?? 0);

  return (
    <Card className="bg-white dark:bg-seftec-darkNavy/80 shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Available Balance</h3>
            <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full px-2 py-1">Coming Soon</span>
          </div>

          <div className="mb-6">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            ) : (
              <>
                <p className="text-3xl font-semibold text-seftec-navy dark:text-white">{formattedBalance}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {wallet?.is_active
                    ? 'Wallet access is available, but transfer actions are still staged.'
                    : 'Wallet is not yet active for this account.'}
                </p>
              </>
            )}
          </div>

          {/* All actions disabled — wallet not operational */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button variant="outline" className="flex flex-col h-auto py-2 px-1 opacity-50 cursor-not-allowed" disabled>
              <SendHorizonal className="h-4 w-4 mb-1" />
              <span className="text-xs">Send Money</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-2 px-1 opacity-50 cursor-not-allowed" disabled>
              <Plus className="h-4 w-4 mb-1" />
              <span className="text-xs">Fund Wallet</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex flex-col h-auto py-2 px-1 opacity-50 cursor-not-allowed" disabled>
              <Package className="h-4 w-4 mb-1" />
              <span className="text-xs">Bulk Payment</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-2 px-1 opacity-50 cursor-not-allowed" disabled>
              <Heart className="h-4 w-4 mb-1" />
              <span className="text-xs">Donate</span>
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" /> Wallet features are coming soon
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBalanceCard;
