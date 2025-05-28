import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { saySwitchRequest, corsHeaders } from "../_shared/sayswitch.ts";

// Helper to get auth token from request
const getAuthToken = (req: Request): string | null => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return null;
  return authHeader.replace('Bearer ', '');
};

// Handles all payment-related operations
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

    // Parse request body
    const { action, ...params } = await req.json();

    // Handle different payment actions
    switch (action) {
      case "initialize_payment": {
        const { amount, email, currency = "NGN", callback_url, metadata = {} } = params;
        
        if (!amount || amount <= 0) {
          return new Response(
            JSON.stringify({ success: false, error: "Valid amount is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Generate unique reference
        const reference = `PAY-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        // Check feature flag
        const { data: featureFlag } = await supabase
          .from('feature_flags')
          .select('enabled, rollout_pct')
          .eq('name', 'sayswitch_payments')
          .single();
          
        if (!featureFlag?.enabled) {
          return new Response(
            JSON.stringify({ success: false, error: "This feature is not available yet" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Initialize payment via SaySwitch
        const response = await saySwitchRequest("/transaction/initialize", {
          method: "POST",
          body: {
            email: email || user.email,
            amount: amount * 100, // Convert to kobo/cents
            currency,
            reference,
            callback_url: callback_url || `${req.headers.get("origin")}/payment/callback`,
            metadata: {
              user_id: user.id,
              ...metadata
            }
          },
          requiresEncryption: true
        });

        // Store order in database
        await supabase.from("say_orders").insert({
          user_id: user.id,
          type: "checkout",
          currency,
          amount,
          status: "pending",
          reference,
          say_reference: response.data?.reference,
          raw_request: params,
          raw_response: response,
        });

        return new Response(
          JSON.stringify({
            success: true,
            payment_url: response.data?.authorization_url,
            reference,
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "verify_payment": {
        const { reference } = params;
        
        if (!reference) {
          return new Response(
            JSON.stringify({ success: false, error: "Reference is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Get order to verify
        const { data: order } = await supabase
          .from("say_orders")
          .select("*")
          .eq("reference", reference)
          .single();
          
        if (!order) {
          return new Response(
            JSON.stringify({ success: false, error: "Order not found" }),
            { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Only the order owner can verify
        if (order.user_id !== user.id) {
          return new Response(
            JSON.stringify({ success: false, error: "Unauthorized" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Verify payment with SaySwitch
        const verifyRef = order.say_reference || reference;
        const response = await saySwitchRequest(`/transaction/verify/${verifyRef}`);
        
        // Update order status
        const status = response.data?.status === "success" ? "completed" : 
                       response.data?.status === "failed" ? "failed" : "pending";
                       
        await supabase
          .from("say_orders")
          .update({
            status,
            raw_response: response,
            completed_at: status === "completed" ? new Date().toISOString() : null,
          })
          .eq("id", order.id);

        return new Response(
          JSON.stringify({
            success: true,
            status,
            data: response.data
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "create_virtual_account": {
        const { first_name, last_name, phone } = params;
        
        if (!first_name || !last_name || !phone) {
          return new Response(
            JSON.stringify({ success: false, error: "First name, last name and phone are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Check if user already has a virtual account
        const { data: existingAccount } = await supabase
          .from("say_virtual_accounts")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();
          
        if (existingAccount) {
          return new Response(
            JSON.stringify({
              success: true,
              account: existingAccount,
              message: "Virtual account already exists"
            }), 
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Create virtual account via SaySwitch
        const response = await saySwitchRequest("/dedicated_virtual_account", {
          method: "POST",
          body: {
            email: user.email,
            first_name,
            last_name,
            phone,
            metadata: {
              user_id: user.id
            }
          },
          requiresEncryption: true
        });

        if (!response.data?.account_number) {
          throw new Error("Failed to create virtual account");
        }

        // Store virtual account
        const { data: account } = await supabase
          .from("say_virtual_accounts")
          .insert({
            user_id: user.id,
            account_number: response.data.account_number,
            account_name: response.data.account_name,
            bank_name: response.data.bank_name,
            currency: response.data.currency || "NGN",
            say_account_id: response.data.id,
          })
          .select()
          .single();

        return new Response(
          JSON.stringify({
            success: true,
            account
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "webhook": {
        // This is for receiving SaySwitch webhooks
        // Webhooks should bypass authentication, but verify signature
        
        const eventData = params;
        // Handle webhook logic here...
        
        // Record the transaction
        if (eventData.event === "charge.success") {
          const { data: order } = await supabase
            .from("say_orders")
            .select("*")
            .eq("say_reference", eventData.data.reference)
            .single();
            
          if (order) {
            await supabase
              .from("say_orders")
              .update({
                status: "completed",
                raw_response: eventData,
                completed_at: new Date().toISOString(),
              })
              .eq("id", order.id);
          } else {
            // Handle virtual account payment
            const accountNumber = eventData.data.customer?.account_number;
            if (accountNumber) {
              const { data: virtualAccount } = await supabase
                .from("say_virtual_accounts")
                .select("*")
                .eq("account_number", accountNumber)
                .single();
                
              if (virtualAccount) {
                // Create a new order for this virtual account payment
                await supabase
                  .from("say_orders")
                  .insert({
                    user_id: virtualAccount.user_id,
                    type: "virtual_account",
                    currency: eventData.data.currency,
                    amount: eventData.data.amount / 100, // Convert from kobo/cents
                    status: "completed",
                    reference: `VA-${Date.now()}`,
                    say_reference: eventData.data.reference,
                    raw_response: eventData,
                    completed_at: new Date().toISOString(),
                  });
              }
            }
          }
        }
        
        return new Response(
          JSON.stringify({ success: true }),
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
    console.error("SaySwitch payment error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
