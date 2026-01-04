
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.6.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This is a Stripe webhook handler for processing events from Stripe
// It will handle events like successful payments, subscription updates, etc.

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Only allow POST requests
  if (req.method !== "POST") {
    console.error("Invalid request method:", req.method);
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }
  
  // Get the Stripe secret key from environment variables
  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  
  if (!stripeSecretKey || !webhookSecret) {
    console.error("Missing required environment variables");
    return new Response("Server configuration error", { status: 500, headers: corsHeaders });
  }
  
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
  
  // Create Supabase client using service role key
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );
  
  try {
    // Get the signature from the headers
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      console.error("Missing Stripe signature");
      return new Response("Invalid signature", { status: 400, headers: corsHeaders });
    }
    
    // Get request body as text for verification
    const body = await req.text();
    
    // Verify the event using the webhook secret and signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return new Response(`Webhook Error: ${errorMessage}`, { status: 400, headers: corsHeaders });
    }
    
    console.log(`Received Stripe event: ${event.type}`);
    
    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent success: ${paymentIntent.id}`);
        
        // Update marketplace transaction if this is a marketplace payment
        if (paymentIntent.metadata.order_id && paymentIntent.metadata.seller_id) {
          await supabase
            .from('marketplace_transactions')
            .update({ status: 'succeeded' })
            .eq('stripe_charge_id', paymentIntent.id);
        }
        break;
        
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log(`Checkout session completed: ${session.id}`);
        
        // Handle subscription checkout completion
        if (session.mode === 'subscription' && session.subscription) {
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          
          // Get plan name from the price
          let planName = 'basic';
          if (subscription.items.data[0]?.price.unit_amount === 2700) {
            planName = 'premium';
          }
          
          // Update subscription record
          await supabase
            .from('subscriptions')
            .update({
              stripe_subscription_id: session.subscription,
              plan_name: planName,
              status: 'active',
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('stripe_customer_id', session.customer);
        }
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscriptionEvent = event.data.object;
        console.log(`Subscription ${event.type}: ${subscriptionEvent.id}`);
        
        // Get plan name from the price
        let planName = 'basic';
        if (subscriptionEvent.items.data[0]?.price.unit_amount === 2700) {
          planName = 'premium';
        }
        
        // Update subscription status
        await supabase
          .from('subscriptions')
          .update({
            status: subscriptionEvent.status,
            plan_name: planName,
            current_period_start: new Date(subscriptionEvent.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscriptionEvent.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscriptionEvent.id);
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        console.log(`Subscription deleted: ${deletedSubscription.id}`);
        
        // Find the customer's user ID
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', deletedSubscription.id)
          .maybeSingle();
          
        if (subData?.user_id) {
          // Reset to free plan
          await supabase
            .from('subscriptions')
            .update({
              status: 'canceled',
              plan_name: 'free',
              stripe_subscription_id: null
            })
            .eq('user_id', subData.user_id);
        }
        break;
        
      default:
        // Unexpected event type
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return a successful response
    return new Response(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
    
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Stripe webhook error: ${errorMessage}`);
    return new Response(`Webhook Error: ${errorMessage}`, {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
