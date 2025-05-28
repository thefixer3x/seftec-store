import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// E-Doc API configuration
const EDOC_BASE_URL = Deno.env.get("EDOC_BASE_URL") || "https://api.e-doconline.ng";
const EDOC_CLIENT_ID = Deno.env.get("EDOC_CLIENT_ID");
const EDOC_CLIENT_SECRET = Deno.env.get("EDOC_CLIENT_SECRET");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Authenticate user
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
    const { action, ...data } = await req.json();

    // Check if user has required subscription (Basic or Premium)
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('plan_name, status')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!subscription || subscription.plan_name === 'free' || subscription.status !== 'active') {
      return new Response(JSON.stringify({ 
        error: "Premium subscription required",
        message: "Bank statement integration is available for Basic and Premium subscribers only." 
      }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Check user consent for bank data processing
    const { data: consent } = await supabaseAdmin
      .from('user_consents')
      .select('granted')
      .eq('user_id', user.id)
      .eq('consent_type', 'bank_data_processing')
      .maybeSingle();

    if (!consent?.granted) {
      return new Response(JSON.stringify({ 
        error: "Consent required",
        message: "Please grant consent for bank data processing in your privacy settings." 
      }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    switch (action) {
      case "initialize_consent": {
        const { email, bank_code } = data;
        
        if (!email || !bank_code) {
          return new Response(JSON.stringify({ 
            error: "Missing required fields",
            message: "Email and bank code are required." 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Create redirect URL for consent callback
        const redirectUrl = `${req.headers.get("origin")}/profile/finance/bank-connect/callback`;

        // Initialize consent with E-Doc API
        const edocResponse = await fetch(`${EDOC_BASE_URL}/api/v1/external/consent/initialize`, {
          method: "POST",
          headers: {
            "client-id": EDOC_CLIENT_ID!,
            "Authorization": `Bearer ${EDOC_CLIENT_SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            bank_code,
            redirection_url: redirectUrl
          }),
        });

        if (!edocResponse.ok) {
          const errorData = await edocResponse.json();
          console.error("E-Doc API error:", errorData);
          
          return new Response(JSON.stringify({ 
            error: "Bank connection failed",
            message: errorData.message || "Unable to initialize bank connection. Please try again." 
          }), {
            status: edocResponse.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const edocData = await edocResponse.json();
        
        // Store consent in database
        const { data: consentRecord, error: dbError } = await supabaseAdmin
          .from('edoc_consents')
          .insert({
            user_id: user.id,
            edoc_consent_id: edocData.data.consentId,
            bank_name: data.bank_name || 'Unknown Bank',
            bank_code: bank_code,
            consent_status: 'created',
            consent_url: `https://connect.e-doconline.ng/authorize?consentId=${edocData.data.consentId}&public_key=${EDOC_CLIENT_ID}`,
            redirect_url: redirectUrl,
            raw_response: edocData
          })
          .select()
          .single();

        if (dbError) {
          console.error("Database error:", dbError);
          return new Response(JSON.stringify({ 
            error: "Database error",
            message: "Failed to save consent information." 
          }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Log usage for billing
        await supabaseAdmin
          .from('edoc_usage_logs')
          .insert({
            user_id: user.id,
            consent_id: consentRecord.id,
            operation_type: 'consent_create',
            cost_usd: 0.50, // Example E-Doc fee
            markup_applied: 0.10 // 20% markup
          });

        return new Response(JSON.stringify({
          success: true,
          consent_id: consentRecord.id,
          edoc_consent_id: edocData.data.consentId,
          authorization_url: consentRecord.consent_url,
          message: "Bank consent initialized successfully"
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      case "check_consent_status": {
        const { consent_id } = data;
        
        if (!consent_id) {
          return new Response(JSON.stringify({ 
            error: "Missing consent ID" 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Get consent from database
        const { data: consentRecord } = await supabaseAdmin
          .from('edoc_consents')
          .select('*')
          .eq('id', consent_id)
          .eq('user_id', user.id)
          .single();

        if (!consentRecord) {
          return new Response(JSON.stringify({ 
            error: "Consent not found" 
          }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Check status with E-Doc API
        const statusResponse = await fetch(`${EDOC_BASE_URL}/api/v1/consent/${consentRecord.edoc_consent_id}`, {
          method: "GET",
          headers: {
            "client-id": EDOC_CLIENT_ID!,
            "Authorization": `Bearer ${EDOC_CLIENT_SECRET}`,
          },
        });

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          
          // Update consent status in database
          await supabaseAdmin
            .from('edoc_consents')
            .update({
              consent_status: statusData.status?.toLowerCase() || 'error',
              account_name: statusData.accountName,
              account_number_masked: statusData.accountNumber?.slice(-4),
              updated_at: new Date().toISOString()
            })
            .eq('id', consent_id);

          return new Response(JSON.stringify({
            consent_id: consent_id,
            status: statusData.status?.toLowerCase() || 'error',
            account_name: statusData.accountName,
            bank_name: consentRecord.bank_name,
            ready_for_sync: statusData.status?.toLowerCase() === 'active'
          }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        return new Response(JSON.stringify({
          consent_id: consent_id,
          status: consentRecord.consent_status,
          error: "Unable to check consent status"
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      case "revoke_consent": {
        const { consent_id } = data;
        
        if (!consent_id) {
          return new Response(JSON.stringify({ 
            error: "Missing consent ID" 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Get consent from database
        const { data: consentRecord } = await supabaseAdmin
          .from('edoc_consents')
          .select('edoc_consent_id')
          .eq('id', consent_id)
          .eq('user_id', user.id)
          .single();

        if (!consentRecord) {
          return new Response(JSON.stringify({ 
            error: "Consent not found" 
          }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Revoke consent with E-Doc API
        const revokeResponse = await fetch(`${EDOC_BASE_URL}/api/v1/consent/${consentRecord.edoc_consent_id}`, {
          method: "DELETE",
          headers: {
            "client-id": EDOC_CLIENT_ID!,
            "Authorization": `Bearer ${EDOC_CLIENT_SECRET}`,
          },
        });

        // Update database regardless of API response
        await supabaseAdmin
          .from('edoc_consents')
          .update({
            consent_status: 'revoked',
            updated_at: new Date().toISOString()
          })
          .eq('id', consent_id);

        return new Response(JSON.stringify({
          success: true,
          message: "Bank consent revoked successfully"
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      case "list_consents": {
        const { data: consents } = await supabaseAdmin
          .from('edoc_consents')
          .select(`
            id,
            bank_name,
            bank_code,
            account_name,
            account_number_masked,
            consent_status,
            import_complete,
            last_sync_at,
            created_at
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        return new Response(JSON.stringify({
          consents: consents || []
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      default:
        return new Response(JSON.stringify({ 
          error: "Invalid action" 
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }

  } catch (error) {
    console.error("E-Doc consent error:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});