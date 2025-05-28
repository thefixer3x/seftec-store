import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { corsHeaders, verifyWebhookSignature } from "../_shared/paypal.ts";

// Main webhook handler for PayPal events
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Get request body as text for signature verification
    const requestBody = await req.text();
    
    // Verify webhook signature
    const isValid = await verifyWebhookSignature(requestBody, {
      "paypal-auth-algo": req.headers.get("paypal-auth-algo") || undefined,
      "paypal-cert-url": req.headers.get("paypal-cert-url") || undefined,
      "paypal-transmission-id": req.headers.get("paypal-transmission-id") || undefined,
      "paypal-transmission-sig": req.headers.get("paypal-transmission-sig") || undefined,
      "paypal-transmission-time": req.headers.get("paypal-transmission-time") || undefined
    });

    if (!isValid) {
      console.error("Invalid webhook signature");
      return new Response(
        JSON.stringify({ success: false, error: "Invalid webhook signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse webhook event
    const event = JSON.parse(requestBody);
    const eventType = event.event_type;
    const resource = event.resource;
    
    console.log(`Processing PayPal webhook: ${eventType}`);

    // Log the webhook event
    await supabase.from("webhook_logs").insert({
      provider: "paypal",
      event_type: eventType,
      resource_id: resource?.id,
      resource_type: resource?.type || "unknown",
      raw_event: event,
      processed_at: new Date().toISOString()
    });

    // Handle different event types
    switch (eventType) {
      case "BILLING.SUBSCRIPTION.CREATED": {
        // New subscription created
        const subscriptionId = resource.id;
        const status = resource.status;
        const customId = resource.custom_id;
        
        // Find the subscription in our database
        const { data: subscription, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("subscription_id", subscriptionId)
          .single();
          
        if (error) {
          // This might be a subscription created outside of our system
          // Create a new record for it
          // We can't directly link it to a user yet - will need admin review
          await supabase.from("subscriptions").insert({
            subscription_id: subscriptionId,
            provider: "paypal",
            status: status,
            plan_id: resource.plan_id,
            custom_id: customId,
            payment_source: "paypal",
            raw_response: resource,
            needs_review: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        } else {
          // Update existing subscription
          await supabase
            .from("subscriptions")
            .update({
              status: status,
              updated_at: new Date().toISOString()
            })
            .eq("id", subscription.id);
        }
        
        break;
      }
      
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        // Subscription activated
        const subscriptionId = resource.id;
        
        // Update subscription in our database
        await supabase
          .from("subscriptions")
          .update({
            status: "ACTIVE",
            updated_at: new Date().toISOString(),
            activated_at: new Date().toISOString()
          })
          .eq("subscription_id", subscriptionId);
          
        // Get the subscription to find the user
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("subscription_id", subscriptionId)
          .single();
          
        if (subscription?.user_id) {
          // Update user's subscription status
          await supabase
            .from("user_subscriptions")
            .upsert({
              user_id: subscription.user_id,
              is_subscribed: true,
              subscription_id: subscription.id,
              subscription_provider: "paypal",
              plan_id: subscription.plan_id,
              updated_at: new Date().toISOString()
            }, { onConflict: "user_id" });
            
          // Add subscription access to user features
          await supabase.rpc("update_user_subscription_access", {
            p_user_id: subscription.user_id,
            p_has_access: true
          });
        }
        
        break;
      }
      
      case "BILLING.SUBSCRIPTION.UPDATED": {
        // Subscription updated
        const subscriptionId = resource.id;
        const status = resource.status;
        
        // Update subscription in our database
        await supabase
          .from("subscriptions")
          .update({
            status: status,
            plan_id: resource.plan_id,
            updated_at: new Date().toISOString(),
            raw_response: resource
          })
          .eq("subscription_id", subscriptionId);
          
        break;
      }
      
      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.EXPIRED": {
        // Subscription cancelled or expired
        const subscriptionId = resource.id;
        
        // Update subscription in our database
        await supabase
          .from("subscriptions")
          .update({
            status: "CANCELLED",
            updated_at: new Date().toISOString(),
            cancelled_at: new Date().toISOString()
          })
          .eq("subscription_id", subscriptionId);
          
        // Get the subscription to find the user
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("subscription_id", subscriptionId)
          .single();
          
        if (subscription?.user_id) {
          // Update user's subscription status
          await supabase
            .from("user_subscriptions")
            .upsert({
              user_id: subscription.user_id,
              is_subscribed: false,
              subscription_id: subscription.id,
              subscription_provider: "paypal",
              plan_id: subscription.plan_id,
              updated_at: new Date().toISOString()
            }, { onConflict: "user_id" });
            
          // Remove subscription access from user features
          await supabase.rpc("update_user_subscription_access", {
            p_user_id: subscription.user_id,
            p_has_access: false
          });
        }
        
        break;
      }
      
      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        // Subscription suspended
        const subscriptionId = resource.id;
        
        // Update subscription in our database
        await supabase
          .from("subscriptions")
          .update({
            status: "SUSPENDED",
            updated_at: new Date().toISOString()
          })
          .eq("subscription_id", subscriptionId);
          
        // Get the subscription to find the user
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("subscription_id", subscriptionId)
          .single();
          
        if (subscription?.user_id) {
          // Update user's subscription status
          await supabase
            .from("user_subscriptions")
            .upsert({
              user_id: subscription.user_id,
              is_subscribed: false,  // No access while suspended
              subscription_id: subscription.id,
              subscription_provider: "paypal",
              plan_id: subscription.plan_id,
              updated_at: new Date().toISOString()
            }, { onConflict: "user_id" });
            
          // Remove subscription access from user features
          await supabase.rpc("update_user_subscription_access", {
            p_user_id: subscription.user_id,
            p_has_access: false
          });
        }
        
        break;
      }
      
      case "PAYMENT.SALE.COMPLETED": {
        // Payment for a subscription completed
        const subscriptionId = resource?.billing_agreement_id;
        
        if (!subscriptionId) {
          console.log("No subscription ID found in payment sale event");
          break;
        }
        
        // Record the payment
        await supabase.from("subscription_payments").insert({
          provider: "paypal",
          subscription_id: subscriptionId,
          transaction_id: resource.id,
          amount: resource.amount.total,
          currency: resource.amount.currency,
          status: resource.state,
          payment_method: "paypal",
          payment_date: resource.create_time,
          raw_response: resource
        });
        
        // Get the subscription to find the user
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("subscription_id", subscriptionId)
          .single();
          
        if (subscription?.user_id) {
          // Extend subscription access
          await supabase.rpc("update_user_subscription_access", {
            p_user_id: subscription.user_id,
            p_has_access: true
          });
          
          // Record the payment in the user's payment history
          await supabase.from("user_payments").insert({
            user_id: subscription.user_id,
            provider: "paypal",
            amount: resource.amount.total,
            currency: resource.amount.currency,
            transaction_id: resource.id,
            payment_method: "paypal",
            subscription_id: subscription.id,
            payment_date: resource.create_time,
            payment_type: "subscription"
          });
        }
        
        break;
      }
      
      case "PAYMENT.SALE.REFUNDED": {
        // Payment refunded
        const subscriptionId = resource?.billing_agreement_id;
        
        if (subscriptionId) {
          // Record the refund
          await supabase.from("subscription_refunds").insert({
            provider: "paypal",
            subscription_id: subscriptionId,
            transaction_id: resource.id,
            amount: resource.amount.total,
            currency: resource.amount.currency,
            status: resource.state,
            refund_date: resource.create_time,
            raw_response: resource
          });
        }
        
        break;
      }
    }

    // Return success
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PayPal webhook error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
