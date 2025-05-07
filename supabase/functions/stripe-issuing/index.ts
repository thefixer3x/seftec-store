
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
    
    // Check if user has valid subscription
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
      
    // Virtual cards only for paid plans
    if (!subscription || subscription.plan_name === 'free') {
      return new Response(JSON.stringify({ 
        error: "Subscription required",
        message: "Virtual cards are only available for Basic and Premium plans" 
      }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    switch (action) {
      case "create_card": {
        // Check if user already has a cardholder
        const { data: existingCard } = await supabaseAdmin
          .from('virtual_cards')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (existingCard?.card_id) {
          return new Response(JSON.stringify({ 
            error: "Card already exists",
            card_id: existingCard.card_id 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Create cardholder if none exists
        let cardholderId = existingCard?.cardholder_id;
        
        if (!cardholderId) {
          // Get user profile for name
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .maybeSingle();
            
          const name = profile && (profile.first_name || profile.last_name)
            ? `${profile.first_name || ''} ${profile.last_name || ''}`
            : user.email;
            
          // Create cardholder
          const cardholder = await stripe.issuing.cardholders.create({
            name,
            email: user.email,
            status: 'active',
            type: 'individual',
            billing: {
              address: {
                line1: '123 Main St',
                city: 'San Francisco',
                state: 'CA',
                postal_code: '94111',
                country: 'US'
              }
            },
            metadata: {
              user_id: user.id
            }
          });
          
          cardholderId = cardholder.id;
          
          // Store cardholder
          if (existingCard) {
            await supabaseAdmin
              .from('virtual_cards')
              .update({ cardholder_id: cardholderId })
              .eq('id', existingCard.id);
          } else {
            await supabaseAdmin
              .from('virtual_cards')
              .insert({
                user_id: user.id,
                cardholder_id: cardholderId
              });
          }
        }
        
        // Create virtual card
        const card = await stripe.issuing.cards.create({
          cardholder: cardholderId,
          currency: 'usd',
          type: 'virtual',
          status: 'active',
          metadata: {
            user_id: user.id
          }
        });
        
        // Update database with card info
        await supabaseAdmin
          .from('virtual_cards')
          .update({
            card_id: card.id,
            last4: card.last4,
            status: card.status
          })
          .eq('user_id', user.id);
        
        return new Response(JSON.stringify({
          card_id: card.id,
          last4: card.last4,
          status: card.status
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      case "get_card": {
        // Get user's virtual card
        const { data: cardData } = await supabaseAdmin
          .from('virtual_cards')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (!cardData || !cardData.card_id) {
          return new Response(JSON.stringify({ exists: false }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Get card details from Stripe
        const card = await stripe.issuing.cards.retrieve(cardData.card_id);
        
        return new Response(JSON.stringify({
          exists: true,
          id: card.id,
          last4: card.last4,
          status: card.status,
          is_locked: cardData.is_locked
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      case "toggle_lock": {
        // Get user's virtual card
        const { data: cardData } = await supabaseAdmin
          .from('virtual_cards')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (!cardData?.card_id) {
          return new Response(JSON.stringify({ error: "Card not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Toggle lock status
        const newStatus = !cardData.is_locked;
        
        // Update card status in Stripe
        await stripe.issuing.cards.update(cardData.card_id, {
          status: newStatus ? 'inactive' : 'active'
        });
        
        // Update database
        await supabaseAdmin
          .from('virtual_cards')
          .update({
            is_locked: newStatus,
            status: newStatus ? 'inactive' : 'active'
          })
          .eq('user_id', user.id);
          
        return new Response(JSON.stringify({
          is_locked: newStatus,
          status: newStatus ? 'inactive' : 'active'
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      case "get_transactions": {
        // Get user's virtual card
        const { data: cardData } = await supabaseAdmin
          .from('virtual_cards')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (!cardData?.card_id) {
          return new Response(JSON.stringify({ error: "Card not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Get card transactions from Stripe
        const transactions = await stripe.issuing.transactions.list({
          card: cardData.card_id,
          limit: 10,
        });
        
        return new Response(JSON.stringify({
          transactions: transactions.data
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
    console.error("Stripe Issuing error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
