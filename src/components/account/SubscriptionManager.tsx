
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, CalendarDays, CreditCard, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const SubscriptionManager = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);
  
  const fetchSubscription = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-subscription', {
        body: { action: 'get_subscription' }
      });
      
      if (error) throw new Error(error.message);
      
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast({
        title: 'Subscription Error',
        description: 'Unable to fetch your subscription details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubscribe = async (plan) => {
    try {
      setProcessingAction(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-subscription', {
        body: { action: 'create_checkout', plan }
      });
      
      if (error) throw new Error(error.message);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: 'Checkout Error',
        description: 'Unable to create checkout session. Please try again later.',
        variant: 'destructive',
      });
      setProcessingAction(false);
    }
  };
  
  const handleManageSubscription = async () => {
    try {
      setProcessingAction(true);
      
      const { data, error } = await supabase.functions.invoke('stripe-subscription', {
        body: { action: 'customer_portal' }
      });
      
      if (error) throw new Error(error.message);
      
      // Redirect to Stripe Customer Portal
      window.location.href = data.url;
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: 'Portal Error',
        description: 'Unable to open subscription management portal.',
        variant: 'destructive',
      });
      setProcessingAction(false);
    }
  };
  
  const getStatusBadge = () => {
    if (!subscription) return null;
    
    if (subscription.status === 'active') {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30">
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          Active
        </Badge>
      );
    } else if (subscription.plan_name === 'free') {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30">
          Trial
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30">
          <AlertCircle className="h-3.5 w-3.5 mr-1" />
          {subscription.status}
        </Badge>
      );
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
              Your Subscription
            </CardTitle>
            <CardDescription>
              Manage your subscription plan and billing
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <SubscriptionCard
            title="Free Trial"
            price="$0"
            features={[
              'Basic features access',
              '15-day trial period',
              'Limited transactions',
              'No virtual cards'
            ]}
            current={subscription?.plan_name === 'free'}
            onSelect={() => {}}
            callToAction={subscription?.plan_name === 'free' ? 'Current Plan' : 'Included with Paid Plans'}
            disabled={true}
            trialEndDate={subscription?.plan_name === 'free' ? subscription?.trial_end : null}
          />
          
          {/* Basic Plan */}
          <SubscriptionCard
            title="Basic Plan"
            price="$15"
            period="per month"
            features={[
              'Unlimited transactions',
              'Single virtual card',
              'Basic analytics',
              'Standard support'
            ]}
            current={subscription?.plan_name === 'basic'}
            onSelect={() => handleSubscribe('basic')}
            callToAction={subscription?.plan_name === 'basic' ? 'Current Plan' : 'Subscribe'}
            disabled={processingAction || subscription?.plan_name === 'basic'}
          />
          
          {/* Premium Plan */}
          <SubscriptionCard
            title="Premium Plan"
            price="$27"
            period="per month"
            features={[
              'Unlimited transactions',
              'Multiple virtual cards',
              'Advanced analytics',
              'Priority support'
            ]}
            current={subscription?.plan_name === 'premium'}
            onSelect={() => handleSubscribe('premium')}
            callToAction={subscription?.plan_name === 'premium' ? 'Current Plan' : 'Subscribe'}
            disabled={processingAction || subscription?.plan_name === 'premium'}
            recommended={true}
          />
        </div>
        
        {/* Subscription Details */}
        {subscription && subscription.plan_name !== 'free' && (
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Subscription Details</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">Plan: </span>
                <span className="ml-1 font-medium text-gray-800 dark:text-white capitalize">
                  {subscription.plan_name} Plan
                </span>
              </div>
              
              {subscription.current_period_end && (
                <div className="flex items-center text-sm">
                  <CalendarDays className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">Next billing date: </span>
                  <span className="ml-1 font-medium text-gray-800 dark:text-white">
                    {formatDate(subscription.current_period_end)}
                  </span>
                </div>
              )}
            </div>
            
            <Button
              onClick={handleManageSubscription}
              disabled={processingAction}
              variant="outline"
              className="mt-4"
            >
              {processingAction ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4 mr-2" />
              )}
              Manage Subscription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Subscription Card Component
const SubscriptionCard = ({ 
  title, 
  price, 
  period = '', 
  features = [], 
  current = false, 
  onSelect,
  callToAction,
  disabled = false,
  recommended = false,
  trialEndDate = null
}) => {
  return (
    <div className={`rounded-lg border ${
      current 
        ? 'border-seftec-teal dark:border-seftec-teal/70 border-2' 
        : 'border-gray-200 dark:border-gray-700'
    } overflow-hidden transition-all`}>
      {recommended && (
        <div className="bg-gradient-to-r from-seftec-teal to-seftec-purple text-white text-center py-1 text-xs font-medium">
          RECOMMENDED
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{price}</span>
          {period && <span className="text-gray-500 dark:text-gray-400 text-sm">{period}</span>}
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        {trialEndDate && (
          <div className="mb-4 text-sm text-amber-600 dark:text-amber-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            Expires {formatDate(trialEndDate)}
          </div>
        )}
        
        <Button 
          onClick={onSelect} 
          disabled={disabled}
          className={`w-full ${
            current 
              ? 'bg-seftec-teal hover:bg-seftec-teal/90 text-white'
              : ''
          }`}
          variant={current ? 'default' : 'outline'}
        >
          {callToAction}
        </Button>
        
        {current && (
          <div className="mt-2 text-center">
            <Badge variant="outline" className="bg-seftec-teal/10 border-seftec-teal/20 text-seftec-teal dark:bg-seftec-teal/20 dark:border-seftec-teal/30">
              Current Plan
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default SubscriptionManager;
