# Payment Provider System

A unified payment provider interface for SEFTEC Store that supports multiple payment providers (PayPal, SaySwitch, etc.) with a consistent API.

## Architecture

The payment provider system uses an interface-based architecture to support multiple payment providers:

```
┌─────────────────────────────────────────┐
│      Payment Provider Interface         │
│  (Base Class + Specialized Interfaces)  │
└─────────────────────────────────────────┘
                    ▲
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────────────┐       ┌───────────────┐
│  PayPal       │       │  SaySwitch    │
│  Provider     │       │  Provider     │
│ (Subscriptions)│      │ (Bill Payments)│
└───────────────┘       └───────────────┘
```

## Components

### 1. Base Classes & Interfaces

- **`PaymentProvider`**: Abstract base class with common functionality
- **`ISubscriptionProvider`**: Interface for subscription-based providers (PayPal, Stripe)
- **`IBillPaymentProvider`**: Interface for bill payment providers (SaySwitch, Flutterwave)

### 2. Provider Implementations

- **`PayPalProvider`**: Recurring subscription payments with global currency support
- **`SaySwitchProvider`**: Bill payments (airtime, data, TV, electricity)

### 3. Registry & Factory

- **`PaymentProviderRegistry`**: Singleton registry for managing provider instances
- **`PaymentProviderFactory`**: Factory functions for creating providers
- **`usePaymentProviders`**: React hook for provider access

## Usage

### Basic Usage

```typescript
import { PaymentProviderFactory } from '@/lib/payments';
import { useSupabaseClient } from '@/hooks/use-supabase';

const supabase = useSupabaseClient();
const registry = PaymentProviderFactory.getRegistry(supabase);

// Initialize all providers
await registry.initialize();

// Get a specific provider
const paypal = registry.getProvider('paypal');
const sayswitch = registry.getProvider('sayswitch');
```

### Using in React Components

```typescript
import { useSupabaseClient } from '@/hooks/use-supabase';
import { usePaymentProviders } from '@/lib/payments';

function MyComponent() {
  const supabase = useSupabaseClient();
  const { paypal, sayswitch, getEnabledProviders } = usePaymentProviders(supabase);

  // Use PayPal for subscriptions
  const plans = await paypal?.listPlans();

  // Use SaySwitch for bill payments
  const providers = await sayswitch?.getProviders('airtime');
}
```

### Creating a Subscription (PayPal)

```typescript
import { PaymentProviderFactory } from '@/lib/payments';
import { useSupabaseClient } from '@/hooks/use-supabase';

const supabase = useSupabaseClient();
const paypal = PaymentProviderFactory.createPayPalProvider(supabase);

// List available plans
const { items: plans } = await paypal.listPlans();

// Create a subscription
const response = await paypal.createSubscription({
  planId: 'P-123456',
  quantity: 1,
  returnUrl: 'https://example.com/success',
  cancelUrl: 'https://example.com/cancel',
});

if (response.success) {
  // Redirect user to PayPal approval page
  window.location.href = response.approvalUrl!;
}
```

### Processing Bill Payments (SaySwitch)

```typescript
import { PaymentProviderFactory } from '@/lib/payments';
import { useSupabaseClient } from '@/hooks/use-supabase';

const supabase = useSupabaseClient();
const sayswitch = PaymentProviderFactory.createSaySwitchProvider(supabase);

// Get data plans
const { items: plans } = await sayswitch.getDataPlans('MTN');

// Pay for data
const response = await sayswitch.payData(
  '08012345678',
  'MTN',
  'MTN-1GB-30DAYS'
);

if (response.success) {
  console.log('Payment successful:', response.reference);
}
```

### Feature Flag Integration

All providers automatically check feature flags before allowing operations:

```typescript
const paypal = PaymentProviderFactory.createPayPalProvider(supabase);

// Check if provider is enabled for a user
const isEnabled = await paypal.checkFeatureFlag(userId);

if (!isEnabled) {
  // Show "coming soon" message
}
```

## Provider Capabilities

Each provider declares its capabilities:

- **PayPal**: `subscriptions`, `one_time_payments`, `refunds`, `webhooks`
- **SaySwitch**: `bill_payments`, `airtime`, `data`, `tv`, `electricity`, `one_time_payments`

Check capabilities before using:

```typescript
const provider = registry.getProvider('paypal');

if (provider?.supports('subscriptions')) {
  // Can use subscription features
}
```

## Type Safety

All providers use TypeScript for complete type safety:

```typescript
import type {
  CreateSubscriptionRequest,
  SubscriptionResponse,
  BillPaymentRequest,
  BillPaymentResponse,
} from '@/lib/payments';

// Type-safe subscription creation
const request: CreateSubscriptionRequest = {
  planId: 'P-123',
  quantity: 1,
};

const response: SubscriptionResponse = await paypal.createSubscription(request);
```

## Error Handling

All providers return standardized error objects:

```typescript
const response = await provider.payBill(request);

if (!response.success) {
  console.error('Payment failed:', {
    code: response.error?.code,
    message: response.error?.message,
    details: response.error?.details,
  });
}
```

## Adding New Providers

To add a new payment provider:

1. Create a new provider class in `src/lib/payments/providers/`:

```typescript
export class StripeProvider extends PaymentProvider implements ISubscriptionProvider {
  // Implement required methods
}
```

2. Register it in the registry:

```typescript
// In registry.ts
this.registerProvider('stripe', new StripeProvider(this.supabase));
```

3. Add the provider type:

```typescript
// In types.ts
export type PaymentProviderType = 'paypal' | 'sayswitch' | 'stripe';
```

## Testing

The provider system includes a test suite (see Task 3.6):

```bash
npm test src/lib/payments
```

## Best Practices

1. **Always initialize the registry** before using providers
2. **Check feature flags** before showing payment UI
3. **Handle errors gracefully** with user-friendly messages
4. **Use TypeScript types** for compile-time safety
5. **Cache provider instances** using the registry
6. **Test provider health** before critical operations

## Related Documentation

- [PayPal Integration](../../components/paypal/README.md)
- [SaySwitch Integration](../../components/bills/README.md)
- [Feature Flags System](../../features/feature-flags/README.md)
