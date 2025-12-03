import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { paypalRequest, corsHeaders, formatPayPalError } from "../_shared/paypal.ts";

// Helper to get auth token from request
const getAuthToken = (req: Request): string | null => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return null;
  return authHeader.replace('Bearer ', '');
};

// Main handler for PayPal payment operations
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

    // Authenticate the user
    const token = getAuthToken(req);
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check feature flag
    const { data: featureFlag } = await supabase
      .from('feature_flags')
      .select('enabled, rollout_pct')
      .eq('name', 'paypal_payments')
      .single();
      
    if (!featureFlag?.enabled) {
      // Check if user is admin before allowing access
      const { data: isAdmin } = await supabase.rpc('is_admin');
      
      if (!isAdmin) {
        return new Response(
          JSON.stringify({ success: false, error: "This feature is not available yet" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Parse request body
    const { action, ...params } = await req.json();

    // Handle different payment actions
    switch (action) {
      case "create_subscription": {
        const { 
          plan_id,
          quantity = 1,
          start_time,
          shipping_amount,
          subscriber = {},
          application_context = {},
          custom_id,
          return_url,
          cancel_url
        } = params;
        
        if (!plan_id) {
          return new Response(
            JSON.stringify({ success: false, error: "Plan ID is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Get user info for subscription
        const userInfo = {
          email: user.email,
          name: subscriber.name || user.user_metadata?.full_name || "",
        };

        // Prepare subscription request
        const subscriptionRequest: Record<string, unknown> = {
          plan_id,
          quantity: String(quantity),
          subscriber: {
            name: {
              given_name: subscriber.given_name || userInfo.name.split(' ')[0] || "",
              surname: subscriber.surname || userInfo.name.split(' ').slice(1).join(' ') || ""
            },
            email_address: subscriber.email_address || userInfo.email
          },
          application_context: {
            brand_name: application_context.brand_name || "SEFTEC",
            locale: application_context.locale || "en-US",
            shipping_preference: application_context.shipping_preference || "NO_SHIPPING",
            user_action: application_context.user_action || "SUBSCRIBE_NOW",
            payment_method: {
              payer_selected: "PAYPAL",
              payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
            },
            return_url: return_url || Deno.env.get("PAYPAL_RETURN_URL") || "https://seftechub.com/payment/success",
            cancel_url: cancel_url || Deno.env.get("PAYPAL_CANCEL_URL") || "https://seftechub.com/payment/cancel"
          }
        };

        // Add custom ID if provided (for your own reference)
        if (custom_id) {
          subscriptionRequest.custom_id = custom_id;
        }

        // Add start time if provided
        if (start_time) {
          subscriptionRequest.start_time = start_time;
        }

        // Add shipping amount if provided
        if (shipping_amount) {
          subscriptionRequest.shipping_amount = {
            currency_code: "USD",
            value: String(shipping_amount)
          };
        }

        // Create subscription with PayPal
        const response = await paypalRequest("/v1/billing/subscriptions", {
          method: "POST",
          body: subscriptionRequest,
        });

        if (!response.success) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: formatPayPalError(response.error)
            }),
            { status: response.status || 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Store subscription in database
        const { error: dbError } = await supabase.from("subscriptions").insert({
          user_id: user.id,
          provider: "paypal",
          subscription_id: response.data.id,
          plan_id: plan_id,
          status: response.data.status,
          quantity: quantity,
          custom_id: custom_id || null,
          payment_source: "paypal",
          raw_response: response.data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

        if (dbError) {
          console.error("Database error saving subscription:", dbError);
        }

        // Return subscription data and approval URL
        return new Response(
          JSON.stringify({
            success: true,
            subscription: {
              id: response.data.id,
              status: response.data.status,
              approval_url: response.data.links.find(link => link.rel === "approve")?.href || null,
            }
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "get_subscription": {
        const { subscription_id } = params;
        
        if (!subscription_id) {
          return new Response(
            JSON.stringify({ success: false, error: "Subscription ID is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Get subscription details from PayPal
        const response = await paypalRequest(`/v1/billing/subscriptions/${subscription_id}`, {
          method: "GET"
        });

        if (!response.success) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: formatPayPalError(response.error)
            }),
            { status: response.status || 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Update subscription in database if it exists
        const { data: existingSubscription } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("subscription_id", subscription_id)
          .eq("user_id", user.id)
          .single();

        if (existingSubscription) {
          await supabase
            .from("subscriptions")
            .update({
              status: response.data.status,
              updated_at: new Date().toISOString(),
              raw_response: response.data
            })
            .eq("id", existingSubscription.id);
        }

        // Return subscription data
        return new Response(
          JSON.stringify({
            success: true,
            subscription: {
              id: response.data.id,
              status: response.data.status,
              plan_id: response.data.plan_id,
              start_time: response.data.start_time,
              quantity: response.data.quantity,
              next_billing_time: response.data.billing_info?.next_billing_time || null,
              last_payment: response.data.billing_info?.last_payment || null,
            }
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "cancel_subscription": {
        const { subscription_id, reason } = params;
        
        if (!subscription_id) {
          return new Response(
            JSON.stringify({ success: false, error: "Subscription ID is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Verify user owns this subscription
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("subscription_id", subscription_id)
          .eq("user_id", user.id)
          .single();

        if (!subscription) {
          return new Response(
            JSON.stringify({ success: false, error: "Subscription not found or not owned by user" }),
            { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Cancel subscription with PayPal
        const response = await paypalRequest(`/v1/billing/subscriptions/${subscription_id}/cancel`, {
          method: "POST",
          body: reason ? { reason } : {},
        });

        if (!response.success) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: formatPayPalError(response.error)
            }),
            { status: response.status || 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Update subscription in database
        await supabase
          .from("subscriptions")
          .update({
            status: "CANCELLED",
            cancel_reason: reason || null,
            updated_at: new Date().toISOString(),
            cancelled_at: new Date().toISOString()
          })
          .eq("id", subscription.id);

        // Return success
        return new Response(
          JSON.stringify({
            success: true,
            message: "Subscription cancelled successfully"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "update_subscription": {
        const { subscription_id, plan_id, quantity } = params;
        
        if (!subscription_id) {
          return new Response(
            JSON.stringify({ success: false, error: "Subscription ID is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Verify user owns this subscription
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("subscription_id", subscription_id)
          .eq("user_id", user.id)
          .single();

        if (!subscription) {
          return new Response(
            JSON.stringify({ success: false, error: "Subscription not found or not owned by user" }),
            { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Prepare update request
        const updateRequest: Record<string, any> = {};
        
        // Add plan if changing
        if (plan_id) {
          updateRequest.plan_id = plan_id;
        }
        
        // Add quantity if changing
        if (quantity) {
          updateRequest.quantity = String(quantity);
        }

        // Update subscription with PayPal
        const response = await paypalRequest(`/v1/billing/subscriptions/${subscription_id}`, {
          method: "PATCH",
          body: [
            {
              op: "replace",
              path: "/",
              value: updateRequest
            }
          ]
        });

        if (!response.success) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: formatPayPalError(response.error)
            }),
            { status: response.status || 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Get updated subscription details
        const updatedSubResponse = await paypalRequest(`/v1/billing/subscriptions/${subscription_id}`, {
          method: "GET"
        });

        // Update subscription in database
        if (updatedSubResponse.success) {
          await supabase
            .from("subscriptions")
            .update({
              plan_id: plan_id || updatedSubResponse.data.plan_id,
              quantity: quantity || updatedSubResponse.data.quantity,
              status: updatedSubResponse.data.status,
              updated_at: new Date().toISOString(),
              raw_response: updatedSubResponse.data
            })
            .eq("id", subscription.id);
        }

        // Return success
        return new Response(
          JSON.stringify({
            success: true,
            message: "Subscription updated successfully"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "list_plans": {
        // Get available subscription plans from PayPal
        const response = await paypalRequest("/v1/billing/plans", {
          method: "GET"
        });

        if (!response.success) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: formatPayPalError(response.error)
            }),
            { status: response.status || 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Return plans
        return new Response(
          JSON.stringify({
            success: true,
            plans: response.data.plans.map(plan => ({
              id: plan.id,
              name: plan.name,
              description: plan.description,
              status: plan.status,
              create_time: plan.create_time,
              payment_preferences: plan.payment_preferences,
              billing_cycles: plan.billing_cycles
            }))
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "get_user_subscriptions": {
        // Get user's subscriptions from database
        const { data: subscriptions, error: dbError } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("provider", "paypal")
          .order("created_at", { ascending: false });

        if (dbError) {
          return new Response(
            JSON.stringify({ success: false, error: dbError.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Return subscriptions
        return new Response(
          JSON.stringify({
            success: true,
            subscriptions: subscriptions || []
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "create_product": {
        // Only admins can create products
        const { data: isAdmin } = await supabase.rpc('is_admin');
        
        if (!isAdmin) {
          return new Response(
            JSON.stringify({ success: false, error: "Admin access required" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const { name, description, type = "SERVICE", category = "SOFTWARE" } = params;
        
        if (!name) {
          return new Response(
            JSON.stringify({ success: false, error: "Product name is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Create product with PayPal
        const response = await paypalRequest("/v1/catalogs/products", {
          method: "POST",
          body: {
            name,
            description,
            type,
            category
          }
        });

        if (!response.success) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: formatPayPalError(response.error)
            }),
            { status: response.status || 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Return product data
        return new Response(
          JSON.stringify({
            success: true,
            product: response.data
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "create_plan": {
        // Only admins can create plans
        const { data: isAdmin } = await supabase.rpc('is_admin');
        
        if (!isAdmin) {
          return new Response(
            JSON.stringify({ success: false, error: "Admin access required" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const { 
          product_id, 
          name, 
          description,
          billing_cycles,
          payment_preferences
        } = params;
        
        if (!product_id || !name || !billing_cycles) {
          return new Response(
            JSON.stringify({ success: false, error: "Product ID, name, and billing cycles are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Create plan with PayPal
        const response = await paypalRequest("/v1/billing/plans", {
          method: "POST",
          body: {
            product_id,
            name,
            description,
            billing_cycles,
            payment_preferences: payment_preferences || {
              auto_bill_outstanding: true,
              setup_fee_failure_action: "CONTINUE",
              payment_failure_threshold: 3
            }
          }
        });

        if (!response.success) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: formatPayPalError(response.error)
            }),
            { status: response.status || 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Return plan data
        return new Response(
          JSON.stringify({
            success: true,
            plan: response.data
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("PayPal payment error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
