import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { saySwitchRequest, corsHeaders } from "../_shared/sayswitch.ts";

// Helper to get auth token from request
const getAuthToken = (req: Request): string | null => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return null;
  return authHeader.replace('Bearer ', '');
};

// Handles all money transfer operations
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
      .eq('name', 'sayswitch_transfers')
      .single();
      
    if (!featureFlag?.enabled) {
      // Check if user is admin before allowing transfers
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

    // Handle different transfer actions
    switch (action) {
      case "get_banks": {
        // Get banks from SaySwitch
        const response = await saySwitchRequest("/banks");
        
        return new Response(
          JSON.stringify({
            success: true,
            banks: response.data || []
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "verify_account": {
        const { account_number, bank_code } = params;
        
        if (!account_number || !bank_code) {
          return new Response(
            JSON.stringify({ success: false, error: "Account number and bank code are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Verify account with SaySwitch
        const response = await saySwitchRequest("/transfers/verify-account", {
          method: "POST",
          body: {
            account_number,
            bank_code
          },
          requiresEncryption: true
        });
        
        return new Response(
          JSON.stringify({
            success: true,
            account_name: response.data?.account_name,
            account_number: response.data?.account_number,
            bank_code: response.data?.bank_code,
            bank_name: response.data?.bank_name
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "transfer": {
        const { account_number, bank_code, amount, narration = "", otp } = params;
        
        if (!account_number || !bank_code || !amount) {
          return new Response(
            JSON.stringify({ success: false, error: "Account number, bank code, and amount are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Check daily transfer limits for security
        const today = new Date().toISOString().split('T')[0];
        const { data: todaysTransfers, error: transfersError } = await supabase
          .from("say_orders")
          .select("amount")
          .eq("user_id", user.id)
          .eq("type", "transfer")
          .eq("status", "completed")
          .gte("created_at", `${today}T00:00:00`)
          .lt("created_at", `${today}T23:59:59`);
          
        if (transfersError) {
          console.error("Error fetching transfers:", transfersError);
        }
        
        const transfersToday = todaysTransfers || [];
        const totalTransferredToday = transfersToday.reduce((sum, t) => sum + (t.amount || 0), 0);
        const transferLimit = 1000000; // ₦1,000,000 limit
        
        if (totalTransferredToday + Number(amount) > transferLimit) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: `Daily transfer limit exceeded. You have ₦${transferLimit - totalTransferredToday} remaining today.` 
            }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Generate unique reference
        const reference = `TRF-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        // Verify account first
        const verifyResponse = await saySwitchRequest("/transfers/verify-account", {
          method: "POST",
          body: {
            account_number,
            bank_code
          },
          requiresEncryption: true
        });
        
        if (!verifyResponse.data?.account_name) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid account details" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Make transfer via SaySwitch
        const response = await saySwitchRequest("/transfers", {
          method: "POST",
          body: {
            account_number,
            bank_code,
            amount: Number(amount),
            narration: narration || `Payment from ${user.email}`,
            reference,
            otp: otp || undefined
          },
          requiresEncryption: true
        });
        
        // Store order
        await supabase.from("say_orders").insert({
          user_id: user.id,
          type: "transfer",
          currency: "NGN",
          amount: Number(amount),
          status: response.data?.status || "pending",
          reference,
          say_reference: response.data?.reference,
          recipient_details: { 
            account_number,
            bank_code,
            account_name: verifyResponse.data.account_name,
            bank_name: verifyResponse.data.bank_name
          },
          raw_request: params,
          raw_response: response,
          completed_at: response.data?.status === "success" ? new Date().toISOString() : null
        });
        
        // If transfer successful, save beneficiary if not already saved
        if (response.data?.status === "success" && params.save_beneficiary) {
          const { data: existingBeneficiary } = await supabase
            .from("say_beneficiaries")
            .select("*")
            .eq("user_id", user.id)
            .eq("account_number", account_number)
            .eq("bank_code", bank_code)
            .single();
            
          if (!existingBeneficiary) {
            await supabase.from("say_beneficiaries").insert({
              user_id: user.id,
              account_number,
              account_name: verifyResponse.data.account_name,
              bank_code,
              bank_name: verifyResponse.data.bank_name,
              nickname: params.nickname || verifyResponse.data.account_name,
              verified: true,
              last_used_at: new Date().toISOString()
            });
          } else {
            // Update last used timestamp
            await supabase
              .from("say_beneficiaries")
              .update({ last_used_at: new Date().toISOString() })
              .eq("id", existingBeneficiary.id);
          }
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            transfer: response.data,
            reference
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "get_beneficiaries": {
        const { data: beneficiaries } = await supabase
          .from("say_beneficiaries")
          .select("*")
          .eq("user_id", user.id)
          .order("last_used_at", { ascending: false });
          
        return new Response(
          JSON.stringify({
            success: true,
            beneficiaries: beneficiaries || []
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "delete_beneficiary": {
        const { id } = params;
        
        if (!id) {
          return new Response(
            JSON.stringify({ success: false, error: "Beneficiary ID is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Verify ownership
        const { data: beneficiary } = await supabase
          .from("say_beneficiaries")
          .select("user_id")
          .eq("id", id)
          .single();
          
        if (!beneficiary || beneficiary.user_id !== user.id) {
          return new Response(
            JSON.stringify({ success: false, error: "Beneficiary not found or unauthorized" }),
            { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Delete beneficiary
        await supabase
          .from("say_beneficiaries")
          .delete()
          .eq("id", id);
          
        return new Response(
          JSON.stringify({
            success: true,
            message: "Beneficiary deleted successfully"
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "get_transfer_limit": {
        // Calculate remaining transfer limit
        const today = new Date().toISOString().split('T')[0];
        const { data: todaysTransfers } = await supabase
          .from("say_orders")
          .select("amount")
          .eq("user_id", user.id)
          .eq("type", "transfer")
          .eq("status", "completed")
          .gte("created_at", `${today}T00:00:00`)
          .lt("created_at", `${today}T23:59:59`);
          
        const transfersToday = todaysTransfers || [];
        const totalTransferredToday = transfersToday.reduce((sum, t) => sum + (t.amount || 0), 0);
        const transferLimit = 1000000; // ₦1,000,000 limit
        
        return new Response(
          JSON.stringify({
            success: true,
            daily_limit: transferLimit,
            used_today: totalTransferredToday,
            remaining: transferLimit - totalTransferredToday
          }), 
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "bulk_transfer": {
        // Only admins can do bulk transfers
        const { data: isAdmin } = await supabase.rpc('is_admin');
        
        if (!isAdmin) {
          return new Response(
            JSON.stringify({ success: false, error: "Unauthorized: Admin access required" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const { transfers } = params;
        
        if (!transfers || !Array.isArray(transfers) || transfers.length === 0) {
          return new Response(
            JSON.stringify({ success: false, error: "Transfers array is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Bulk transfer via SaySwitch
        const reference = `BULK-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        const response = await saySwitchRequest("/transfers/bulk", {
          method: "POST",
          body: {
            transfers: transfers.map((t: any) => ({
              account_number: t.account_number,
              bank_code: t.bank_code,
              amount: Number(t.amount),
              narration: t.narration || `Payment from ${user.email}`,
              reference: `${reference}-${Math.random().toString(36).substring(7)}`
            }))
          },
          requiresEncryption: true
        });
        
        // Store bulk order
        await supabase.from("say_orders").insert({
          user_id: user.id,
          type: "transfer",
          currency: "NGN",
          amount: transfers.reduce((sum: number, t: any) => sum + Number(t.amount), 0),
          status: "processing",
          reference,
          say_reference: response.data?.reference,
          recipient_details: { bulk: true, count: transfers.length },
          raw_request: params,
          raw_response: response
        });
        
        return new Response(
          JSON.stringify({
            success: true,
            bulk_transfer: response.data,
            reference
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
    console.error("SaySwitch transfer error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
