
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, CreditCard, Loader2, Lock, Unlock, Plus, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const VirtualCardManager = () => {
  const [card, setCard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(false);
  const [showLastFour, setShowLastFour] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      fetchCard();
    }
  }, [user]);
  
  const fetchCard = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-issuing', {
        body: { action: 'get_card' }
      });
      
      if (error) throw new Error(error.message);
      
      if (data.exists) {
        setCard(data);
        fetchTransactions();
      } else {
        setCard(null);
      }
    } catch (error) {
      console.error('Error fetching card:', error);
      toast({
        title: 'Card Error',
        description: 'Unable to fetch your card details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('stripe-issuing', {
        body: { action: 'get_transactions' }
      });
      
      if (error) throw new Error(error.message);
      
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: 'Transactions Error',
        description: 'Unable to fetch card transactions.',
        variant: 'destructive',
      });
    }
  };
  
  const createCard = async () => {
    try {
      setProcessingAction(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-issuing', {
        body: { action: 'create_card' }
      });
      
      if (error) {
        if (error.message.includes('Subscription required')) {
          toast({
            title: 'Subscription Required',
            description: 'Virtual cards are only available for Basic and Premium plans.',
            variant: 'destructive',
          });
          return;
        }
        throw new Error(error.message);
      }
      
      setCard({
        exists: true,
        id: data.card_id,
        last4: data.last4,
        status: data.status,
        is_locked: false
      });
      
      toast({
        title: 'Card Created',
        description: 'Your virtual card has been created successfully.',
      });
    } catch (error) {
      console.error('Error creating card:', error);
      toast({
        title: 'Card Error',
        description: 'Unable to create virtual card. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessingAction(false);
    }
  };
  
  const toggleLock = async () => {
    try {
      setProcessingAction(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-issuing', {
        body: { action: 'toggle_lock' }
      });
      
      if (error) throw new Error(error.message);
      
      setCard(prevCard => ({
        ...prevCard,
        is_locked: data.is_locked,
        status: data.status
      }));
      
      toast({
        title: data.is_locked ? 'Card Locked' : 'Card Unlocked',
        description: data.is_locked 
          ? 'Your virtual card has been locked. No new transactions will be authorized.'
          : 'Your virtual card has been unlocked and is now active.'
      });
    } catch (error) {
      console.error('Error toggling card lock:', error);
      toast({
        title: 'Card Error',
        description: 'Unable to update card status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessingAction(false);
    }
  };
  
  const formatAmount = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount / 100);
  };
  
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-seftec-teal animate-spin" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Virtual Card
            </CardTitle>
            <CardDescription>
              Manage your Stripe-powered virtual card
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!card ? (
          <div className="text-center p-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Virtual Card</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a virtual card to make secure online payments. Available for Basic and Premium plan subscribers.
            </p>
            <Button 
              onClick={createCard} 
              disabled={processingAction}
              className="bg-seftec-teal hover:bg-seftec-teal/90 text-white"
            >
              {processingAction ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Create Virtual Card
            </Button>
          </div>
        ) : (
          <>
            {/* Card Display */}
            <div className="mb-6">
              <div className="bg-gradient-to-br from-seftec-navy to-seftec-teal/80 text-white rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-10 pattern-dots"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-sm opacity-80">Virtual Card</p>
                      <h3 className="text-lg font-medium">Seftec DeFi Card</h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="h-6 w-6" />
                      <span className="text-sm font-medium">
                        {card.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg tracking-widest font-mono">••••</span>
                        <span className="text-lg tracking-widest font-mono">••••</span>
                        <span className="text-lg tracking-widest font-mono">••••</span>
                        <span className="text-lg tracking-widest font-mono">
                          {showLastFour ? card.last4 : "••••"}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 p-1 h-auto"
                        onClick={() => setShowLastFour(!showLastFour)}
                      >
                        {showLastFour ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-80">CARDHOLDER NAME</p>
                      <p className="font-medium">SEFTEC USER</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xs opacity-80">TYPE</p>
                      <p className="font-medium">VIRTUAL</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button
                  onClick={toggleLock}
                  disabled={processingAction}
                  className={card.is_locked 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                  }
                >
                  {processingAction ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : card.is_locked ? (
                    <Unlock className="h-4 w-4 mr-2" />
                  ) : (
                    <Lock className="h-4 w-4 mr-2" />
                  )}
                  {card.is_locked ? 'Unlock Card' : 'Lock Card'}
                </Button>
                
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
            
            {/* Transactions Section */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Recent Transactions</h3>
              
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {transaction.merchant_data?.name || 'Unknown Merchant'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(transaction.created)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {formatAmount(transaction.amount)}
                          </p>
                          <div className="flex items-center justify-end">
                            {transaction.status === 'pending' ? (
                              <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            )}
                            <span className="text-xs capitalize">
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400">
                    No transactions yet. Use your virtual card for purchases.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VirtualCardManager;
