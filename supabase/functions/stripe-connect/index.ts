
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
    
    // Create Supabase admin client
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
    
    // Get request body
    const { action, ...data } = await req.json();
    
    switch (action) {
      case "create_account": {
        // Check if user already has a Connect account
        const { data: existingAccount } = await supabaseAdmin
          .from('stripe_connect_accounts')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (existingAccount?.stripe_account_id) {
          // Get onboarding link for existing account
          const accountLink = await stripe.accountLinks.create({
            account: existingAccount.stripe_account_id,
            refresh_url: `${req.headers.get("origin")}/marketplace/onboarding?refresh=true`,
            return_url: `${req.headers.get("origin")}/marketplace/onboarding?success=true`,
            type: 'account_onboarding',
          });
          
          return new Response(JSON.stringify({ url: accountLink.url }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Create a new Express account
        const account = await stripe.accounts.create({
          type: 'express',
          email: user.email,
          metadata: {
            user_id: user.id
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true }
          }
        });
        
        // Store account in database
        await supabaseAdmin
          .from('stripe_connect_accounts')
          .insert({
            user_id: user.id,
            stripe_account_id: account.id,
            onboarding_complete: false
          });
          
        // Create account link for onboarding
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${req.headers.get("origin")}/marketplace/onboarding?refresh=true`,
          return_url: `${req.headers.get("origin")}/marketplace/onboarding?success=true`,
          type: 'account_onboarding',
        });
        
        return new Response(JSON.stringify({ url: accountLink.url }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      case "get_account": {
        // Get user's Connect account
        const { data: connectAccount } = await supabaseAdmin
          .from('stripe_connect_accounts')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (!connectAccount?.stripe_account_id) {
          return new Response(JSON.stringify({ exists: false }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Get account details from Stripe
        const account = await stripe.accounts.retrieve(connectAccount.stripe_account_id);
        
        // Update onboarding status if needed
        if (account.details_submitted && !connectAccount.onboarding_complete) {
          await supabaseAdmin
            .from('stripe_connect_accounts')
            .update({ onboarding_complete: true })
            .eq('user_id', user.id);
        }
        
        return new Response(JSON.stringify({
          exists: true,
          id: connectAccount.stripe_account_id,
          onboarding_complete: account.details_submitted,
          payouts_enabled: account.payouts_enabled
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      case "create_payment": {
        // Process payment with Connect destination charges
        if (!data.order_id || !data.seller_id || !data.amount) {
          throw new Error("Missing required payment data");
        }
        
        // Get seller's Connect account ID
        const { data: sellerAccount } = await supabaseAdmin
          .from('stripe_connect_accounts')
          .select('stripe_account_id')
          .eq('user_id', data.seller_id)
          .maybeSingle();
          
        if (!sellerAccount?.stripe_account_id) {
          throw new Error("Seller has no connected account");
        }
        
        // Get or create buyer's customer ID
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
        
        // Calculate platform fee (5%)
        const amount = parseInt(data.amount);
        const platformFee = Math.round(amount * 0.05);
        const sellerAmount = amount - platformFee;
        
        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          customer: customerId,
          payment_method_types: ['card'],
          transfer_data: {
            destination: sellerAccount.stripe_account_id,
            amount: sellerAmount,
          },
          metadata: {
            order_id: data.order_id,
            seller_id: data.seller_id,
            buyer_id: user.id
          },
          application_fee_amount: platformFee,
        });
        
        // Store transaction record
        await supabaseAdmin
          .from('marketplace_transactions')
          .insert({
            order_id: data.order_id,
            seller_id: data.seller_id,
            buyer_id: user.id,
            stripe_charge_id: paymentIntent.id,
            amount,
            platform_fee: platformFee,
            seller_amount: sellerAmount,
            status: 'pending'
          });
        
        return new Response(JSON.stringify({
          client_secret: paymentIntent.client_secret
        }), {
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
    console.error("Stripe Connect error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
