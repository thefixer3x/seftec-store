import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check } from 'lucide-react';
import { PayPalSubscriptionButton } from './PayPalSubscriptionButton';

interface BillingCycle {
  frequency: {
    interval_unit: string;
    interval_count: number;
  };
  tenure_type: string;
  sequence: number;
  total_cycles: number;
  pricing_scheme: {
    fixed_price: {
      value: string;
      currency_code: string;
    };
  };
}

interface PayPalPlan {
  id: string;
  name: string;
  description: string;
  status: string;
  billing_cycles: BillingCycle[];
  payment_preferences: {
    auto_bill_outstanding: boolean;
    setup_fee_failure_action: string;
    payment_failure_threshold: number;
  };
  create_time: string;
}

interface PayPalPlansDisplayProps {
  onSubscribeSuccess?: (subscriptionId: string) => void;
  onSubscribeError?: (error: string) => void;
}

/**
 * PayPal Plans Display Component
 *
 * Fetches and displays available PayPal subscription plans with pricing.
 * Provides subscribe buttons for each plan with proper error handling.
 */
export const PayPalPlansDisplay: React.FC<PayPalPlansDisplayProps> = ({
  onSubscribeSuccess,
  onSubscribeError,
}) => {
  const supabase = useSupabaseClient();

  const {
    data: plans,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['paypal-plans'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('paypal-payment', {
        body: { action: 'list_plans' },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to fetch plans');

      return data.plans as PayPalPlan[];
    },
  });

  const formatPrice = (billingCycle: BillingCycle) => {
    const { pricing_scheme, frequency, tenure_type } = billingCycle;
    const price = pricing_scheme.fixed_price.value;
    const currency = pricing_scheme.fixed_price.currency_code;
    const interval = frequency.interval_unit.toLowerCase();
    const count = frequency.interval_count;

    const intervalText = count === 1 ? interval : `${count} ${interval}s`;

    return {
      amount: `${currency} ${parseFloat(price).toFixed(2)}`,
      period: `per ${intervalText}`,
      type: tenure_type,
    };
  };

  const getActiveBillingCycle = (plan: PayPalPlan): BillingCycle | null => {
    // Get the regular billing cycle (not trial)
    const regularCycle = plan.billing_cycles.find(
      (cycle) => cycle.tenure_type === 'REGULAR'
    );
    return regularCycle || plan.billing_cycles[0] || null;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Plans</AlertTitle>
        <AlertDescription>
          {(error as Error).message || 'Failed to load subscription plans. Please try again later.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Plans Available</AlertTitle>
        <AlertDescription>
          There are currently no subscription plans available. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  // Filter only active plans
  const activePlans = plans.filter((plan) => plan.status === 'ACTIVE');

  if (activePlans.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Active Plans</AlertTitle>
        <AlertDescription>
          All subscription plans are currently unavailable. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activePlans.map((plan) => {
        const billingCycle = getActiveBillingCycle(plan);
        const pricing = billingCycle ? formatPrice(billingCycle) : null;

        return (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {plan.status === 'ACTIVE' && (
                  <Badge variant="default">
                    <Check className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              {pricing && (
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-1">{pricing.amount}</div>
                  <div className="text-sm text-muted-foreground">{pricing.period}</div>
                </div>
              )}

              {billingCycle && (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    <span>
                      {billingCycle.total_cycles === 0
                        ? 'Unlimited billing cycles'
                        : `${billingCycle.total_cycles} billing cycles`}
                    </span>
                  </div>
                  {plan.payment_preferences.auto_bill_outstanding && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      <span>Auto-billing enabled</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter>
              <PayPalSubscriptionButton
                planId={plan.id}
                planName={plan.name}
                planPrice={pricing?.amount || 'N/A'}
                planDescription={`Subscribe to ${plan.name}`}
                onSuccess={onSubscribeSuccess}
                onError={onSubscribeError}
                className="w-full"
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
