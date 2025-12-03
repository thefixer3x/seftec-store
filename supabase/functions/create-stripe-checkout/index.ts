
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.6.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Allow only POST requests
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }
  
  // Get the Stripe secret key from Supabase Edge Function secrets
  const stripeSecretKey = Deno.env.get("Stripe_test_SK");
  if (!stripeSecretKey) {
    return new Response("Stripe secret key not set", { status: 500, headers: corsHeaders });
  }
  
  // Initialize the Stripe client
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
  
  // Parse the request JSON body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders });
  }
  
  const { paymentType, amount, currency, successUrl, cancelUrl } = body;
  
  try {
    interface SessionConfig {
      mode: 'payment' | 'subscription';
      payment_method_types: string[];
      line_items: Array<{
        price?: string;
        quantity?: number;
        price_data?: {
          currency: string;
          product_data: {
            name: string;
          };
          unit_amount: number;
        };
      }>;
      success_url?: string;
      cancel_url?: string;
    }

    let sessionConfig: SessionConfig;

    if (paymentType === "subscription") {
      // For subscription payments
      if (!body.priceId) {
        return new Response("Missing priceId for subscription", { status: 400, headers: corsHeaders });
      }

      sessionConfig = {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: body.priceId,
            quantity: 1,
          },
        ],
      };
    } else {
      // For one-time payments
      if (!amount || !currency) {
        return new Response("Missing amount or currency for one-time payment", { status: 400, headers: corsHeaders });
      }

      sessionConfig = {
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: body.productName || "Seftec Marketplace Payment",
              },
              unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
      };
    }

    // Add success and cancel URLs with proper origin validation
    const origin = req.headers.get("origin") ?? Deno.env.get("PUBLIC_SITE_URL") ?? "https://seftechub.com";
    if (!origin || origin === "null") {
      return new Response("Missing origin for redirect URLs", { status: 400, headers: corsHeaders });
    }
    
    sessionConfig.success_url = successUrl ?? `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    sessionConfig.cancel_url = cancelUrl ?? `${origin}/payment-canceled`;

    // Create the Stripe checkout session
    // SessionConfig interface matches Stripe's expected structure
    const session = await stripe.checkout.sessions.create(sessionConfig as Stripe.Checkout.SessionCreateParams);
    
    // Return the session URL to the caller
    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    console.error("Stripe session creation error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
