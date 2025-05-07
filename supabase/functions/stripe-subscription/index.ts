
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.6.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("Missing Stripe secret key");
    }
    
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    
    // Get request body
    const { action, ...data } = await req.json();
    
    // Create Supabase client using service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Auth check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const user = userData.user;
    
    // Handle different subscription actions
    switch (action) {
      case "create_checkout": {
        // Get or create Stripe customer
        let customerId;
        const { data: customers } = await stripe.customers.search({
          query: `email:'${user.email}'`,
        });
        
        if (customers && customers.length > 0) {
          customerId = customers[0].id;
        } else {
          // Create new customer
          const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
              user_id: user.id
            }
          });
          customerId = customer.id;
        }
        
        // Set up subscription prices
        const prices = {
          basic: {
            unit_amount: 1500, // $15.00
            currency: "usd",
            recurring: { interval: "month" },
            product_data: { name: "Seftec Basic Plan" }
          },
          premium: {
            unit_amount: 2700, // $27.00
            currency: "usd",
            recurring: { interval: "month" },
            product_data: { name: "Seftec Premium Plan" }
          }
        };
        
        const planType = data.plan || "basic";
        
        // Create checkout session
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: prices[planType],
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.get("origin")}/payment-canceled`,
        });
        
        // Store subscription information
        await supabaseAdmin
          .from('subscriptions')
          .upsert({
            user_id: user.id,
            stripe_customer_id: customerId,
            plan_name: planType,
            status: "incomplete"
          }, { onConflict: 'user_id' });
        
        return new Response(JSON.stringify({ url: session.url }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      case "customer_portal": {
        // Get customer ID
        const { data: subscriptions } = await supabaseAdmin
          .from('subscriptions')
          .select('stripe_customer_id')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (!subscriptions?.stripe_customer_id) {
          return new Response(JSON.stringify({ error: "No subscription found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Create portal session
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: subscriptions.stripe_customer_id,
          return_url: `${req.headers.get("origin")}/profile/subscription`,
        });
        
        return new Response(JSON.stringify({ url: portalSession.url }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      case "get_subscription": {
        // Get subscription details
        const { data: subscription } = await supabaseAdmin
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (!subscription) {
          // Create free trial subscription if none exists
          const trialEnd = new Date();
          trialEnd.setDate(trialEnd.getDate() + 15); // 15-day trial
          
          const newSubscription = {
            user_id: user.id,
            plan_name: 'free',
            status: 'active',
            trial_end: trialEnd.toISOString()
          };
          
          await supabaseAdmin
            .from('subscriptions')
            .insert(newSubscription);
          
          return new Response(JSON.stringify(newSubscription), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        return new Response(JSON.stringify(subscription), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }
  } catch (error) {
    console.error("Stripe subscription error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
