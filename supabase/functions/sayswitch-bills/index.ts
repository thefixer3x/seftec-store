import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { saySwitchRequest, corsHeaders } from "../_shared/sayswitch.ts";

// Helper to get auth token from request
const getAuthToken = (req: Request): string | null => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return null;
  return authHeader.replace('Bearer ', '');
};

// Handles all bill payment operations
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
      .eq('name', 'sayswitch_bills')
      .single();
      
    if (!featureFlag?.enabled) {
      return new Response(
        JSON.stringify({ success: false, error: "This feature is not available yet" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const { action, ...params } = await req.json();

    // Handle different bill payment actions
    switch (action) {
      case "get_providers": {
        const { category } = params;
        
        if (!category) {
          return new Response(
            JSON.stringify({ success: false, error: "Category is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Get providers from SaySwitch
        const response = await saySwitchRequest(`/bills/providers?category=${category}`);
        
        return new Response(
          JSON.stringify({
            success: true,
            providers: response.data || []
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "validate_customer": {
        const { provider, customer_id } = params;
        
        if (!provider || !customer_id) {
          return new Response(
            JSON.stringify({ success: false, error: "Provider and customer ID are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Validate customer with SaySwitch
        const response = await saySwitchRequest("/bills/validate", {
          method: "POST",
          body: {
            provider,
            customer_id
          },
          requiresEncryption: true
        });
        
        return new Response(
          JSON.stringify({
            success: true,
            customer: response.data
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "pay_airtime": {
        const { phone, amount, provider = "MTN" } = params;
        
        if (!phone || !amount) {
          return new Response(
            JSON.stringify({ success: false, error: "Phone and amount are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Generate unique reference
        const reference = `AIRTIME-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        // Pay airtime via SaySwitch
        const response = await saySwitchRequest("/bills/airtime", {
          method: "POST",
          body: {
            phone,
            amount: Number(amount),
            provider,
            reference
          },
          requiresEncryption: true
        });
        
        // Store order
        await supabase.from("say_orders").insert({
          user_id: user.id,
          type: "bill",
          provider,
          currency: "NGN",
          amount: Number(amount),
          status: response.data?.status || "pending",
          reference,
          say_reference: response.data?.reference,
          recipient_details: { phone },
          raw_request: params,
          raw_response: response,
          completed_at: response.data?.status === "success" ? new Date().toISOString() : null
        });
        
        // Save to favorites if requested
        if (params.save_as_favorite) {
          await supabase.from("say_bill_favorites").insert({
            user_id: user.id,
            type: "airtime",
            provider,
            customer_id: phone,
            nickname: params.nickname || `${provider} ${phone.substring(phone.length - 4)}`
          });
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            transaction: response.data,
            reference
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "pay_data": {
        const { phone, provider, plan_code } = params;
        
        if (!phone || !provider || !plan_code) {
          return new Response(
            JSON.stringify({ success: false, error: "Phone, provider, and plan code are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Get plan details to know the amount
        const plansResponse = await saySwitchRequest(`/bills/data-plans?provider=${provider}`);
        const plan = plansResponse.data?.find((p: any) => p.code === plan_code);
        
        if (!plan) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid plan code" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Generate unique reference
        const reference = `DATA-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        // Pay data via SaySwitch
        const response = await saySwitchRequest("/bills/data", {
          method: "POST",
          body: {
            phone,
            provider,
            plan_code,
            reference
          },
          requiresEncryption: true
        });
        
        // Store order
        await supabase.from("say_orders").insert({
          user_id: user.id,
          type: "bill",
          provider,
          currency: "NGN",
          amount: plan.amount,
          status: response.data?.status || "pending",
          reference,
          say_reference: response.data?.reference,
          recipient_details: { phone, plan: plan.name },
          raw_request: params,
          raw_response: response,
          completed_at: response.data?.status === "success" ? new Date().toISOString() : null
        });
        
        // Save to favorites if requested
        if (params.save_as_favorite) {
          await supabase.from("say_bill_favorites").insert({
            user_id: user.id,
            type: "data",
            provider,
            customer_id: phone,
            nickname: params.nickname || `${provider} ${phone.substring(phone.length - 4)}`,
            metadata: { plan_code, plan_name: plan.name }
          });
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            transaction: response.data,
            reference
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "pay_tv": {
        const { smartcard, provider, package_code } = params;
        
        if (!smartcard || !provider || !package_code) {
          return new Response(
            JSON.stringify({ success: false, error: "Smartcard, provider, and package are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Get package details to know the amount
        const packagesResponse = await saySwitchRequest(`/bills/tv-packages?provider=${provider}`);
        const pkg = packagesResponse.data?.find((p: any) => p.code === package_code);
        
        if (!pkg) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid package code" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Generate unique reference
        const reference = `TV-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        // Pay TV via SaySwitch
        const response = await saySwitchRequest("/bills/tv", {
          method: "POST",
          body: {
            smartcard,
            provider,
            package_code,
            reference
          },
          requiresEncryption: true
        });
        
        // Store order
        await supabase.from("say_orders").insert({
          user_id: user.id,
          type: "bill",
          provider,
          currency: "NGN",
          amount: pkg.amount,
          status: response.data?.status || "pending",
          reference,
          say_reference: response.data?.reference,
          recipient_details: { smartcard, package: pkg.name },
          raw_request: params,
          raw_response: response,
          completed_at: response.data?.status === "success" ? new Date().toISOString() : null
        });
        
        return new Response(
          JSON.stringify({
            success: true,
            transaction: response.data,
            reference
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "pay_electricity": {
        const { meter_number, provider, amount, meter_type = "prepaid" } = params;
        
        if (!meter_number || !provider || !amount) {
          return new Response(
            JSON.stringify({ success: false, error: "Meter number, provider, and amount are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Generate unique reference
        const reference = `POWER-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        // Pay electricity via SaySwitch
        const response = await saySwitchRequest("/bills/electricity", {
          method: "POST",
          body: {
            meter_number,
            provider,
            amount: Number(amount),
            meter_type,
            reference
          },
          requiresEncryption: true
        });
        
        // Store order
        await supabase.from("say_orders").insert({
          user_id: user.id,
          type: "bill",
          provider,
          currency: "NGN",
          amount: Number(amount),
          status: response.data?.status || "pending",
          reference,
          say_reference: response.data?.reference,
          recipient_details: { meter_number, meter_type, token: response.data?.token },
          raw_request: params,
          raw_response: response,
          completed_at: response.data?.status === "success" ? new Date().toISOString() : null
        });
        
        return new Response(
          JSON.stringify({
            success: true,
            transaction: response.data,
            reference,
            token: response.data?.token
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "get_favorites": {
        const { type } = params;
        
        const query = supabase
          .from("say_bill_favorites")
          .select("*")
          .eq("user_id", user.id);
          
        if (type) {
          query.eq("type", type);
        }
        
        const { data: favorites } = await query;
        
        return new Response(
          JSON.stringify({
            success: true,
            favorites: favorites || []
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "delete_favorite": {
        const { id } = params;
        
        if (!id) {
          return new Response(
            JSON.stringify({ success: false, error: "Favorite ID is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Verify ownership
        const { data: favorite } = await supabase
          .from("say_bill_favorites")
          .select("user_id")
          .eq("id", id)
          .single();
          
        if (!favorite || favorite.user_id !== user.id) {
          return new Response(
            JSON.stringify({ success: false, error: "Favorite not found or unauthorized" }),
            { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Delete favorite
        await supabase
          .from("say_bill_favorites")
          .delete()
          .eq("id", id);
          
        return new Response(
          JSON.stringify({
            success: true,
            message: "Favorite deleted successfully"
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
    console.error("SaySwitch bills error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
