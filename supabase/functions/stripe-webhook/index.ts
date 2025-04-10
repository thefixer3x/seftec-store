
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.6.0?target=deno";

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
  const stripeSecretKey = Deno.env.get("Stripe_test_SK");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  
  if (!stripeSecretKey || !webhookSecret) {
    console.error("Missing required environment variables");
    return new Response("Server configuration error", { status: 500, headers: corsHeaders });
  }
  
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
  
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
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400, headers: corsHeaders });
    }
    
    console.log(`Received Stripe event: ${event.type}`);
    
    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent success: ${paymentIntent.id}`);
        // TODO: Store transaction in database
        // await storeTransaction(paymentIntent);
        break;
        
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log(`Checkout session completed: ${session.id}`);
        // TODO: Fulfill order based on session data
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        console.log(`Subscription ${event.type}: ${subscription.id}`);
        // TODO: Update user subscription status
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
    console.error(`Stripe webhook error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
