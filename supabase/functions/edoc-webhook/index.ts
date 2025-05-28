import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
};

const EDOC_WEBHOOK_SECRET = Deno.env.get("EDOC_WEBHOOK_SECRET");

// Verify webhook signature
async function verifySignature(body: string, signature: string): Promise<boolean> {
  if (!EDOC_WEBHOOK_SECRET || !signature) {
    return false;
  }

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(EDOC_WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const expectedSignature = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(body)
    );

    const expectedHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const receivedSignature = signature.replace('sha256=', '');
    
    return expectedHex === receivedSignature;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get request body and signature
    const body = await req.text();
    const signature = req.headers.get('x-signature') || '';

    // Verify webhook signature
    const isValidSignature = await verifySignature(body, signature);
    if (!isValidSignature) {
      console.error("Invalid webhook signature");
      
      // Log security incident
      await supabaseAdmin
        .from('system_error_logs')
        .insert({
          error_message: 'Invalid E-Doc webhook signature',
          error_context: { 
            signature: signature,
            ip: req.headers.get('x-forwarded-for') || 'unknown'
          },
          source: 'edoc-webhook'
        });

      return new Response("Unauthorized", { 
        status: 401, 
        headers: corsHeaders 
      });
    }

    // Parse webhook payload
    let webhookData;
    try {
      webhookData = JSON.parse(body);
    } catch (error) {
      console.error("Invalid JSON payload:", error);
      return new Response("Invalid JSON", { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log("E-Doc webhook received:", webhookData.event || 'unknown event');

    // Handle different webhook events
    switch (webhookData.event) {
      case 'consent.activated': {
        const { consentId, accountDetails } = webhookData.data;
        
        // Update consent status in database
        const { error: updateError } = await supabaseAdmin
          .from('edoc_consents')
          .update({
            consent_status: 'active',
            account_name: accountDetails?.accountName,
            account_number_masked: accountDetails?.accountNumber?.slice(-4),
            updated_at: new Date().toISOString()
          })
          .eq('edoc_consent_id', consentId);

        if (updateError) {
          console.error("Failed to update consent status:", updateError);
        }

        // Trigger automatic transaction sync for new consents
        const { data: consent } = await supabaseAdmin
          .from('edoc_consents')
          .select('id, user_id')
          .eq('edoc_consent_id', consentId)
          .single();

        if (consent) {
          // TODO: Trigger background job to sync transactions
          console.log(`Consent ${consentId} activated for user ${consent.user_id}`);
        }

        break;
      }

      case 'consent.revoked': {
        const { consentId } = webhookData.data;
        
        // Update consent status
        await supabaseAdmin
          .from('edoc_consents')
          .update({
            consent_status: 'revoked',
            updated_at: new Date().toISOString()
          })
          .eq('edoc_consent_id', consentId);

        console.log(`Consent ${consentId} revoked`);
        break;
      }

      case 'consent.expired': {
        const { consentId } = webhookData.data;
        
        // Update consent status
        await supabaseAdmin
          .from('edoc_consents')
          .update({
            consent_status: 'expired',
            updated_at: new Date().toISOString()
          })
          .eq('edoc_consent_id', consentId);

        console.log(`Consent ${consentId} expired`);
        break;
      }

      case 'transactions.updated': {
        const { consentId, transactions } = webhookData.data;
        
        // Get consent record
        const { data: consent } = await supabaseAdmin
          .from('edoc_consents')
          .select('id, user_id')
          .eq('edoc_consent_id', consentId)
          .single();

        if (!consent) {
          console.error(`Consent not found for ID: ${consentId}`);
          break;
        }

        // Process new transactions
        let newTransactionsCount = 0;
        
        for (const txn of transactions || []) {
          const transactionData = {
            consent_id: consent.id,
            edoc_transaction_id: txn.id || txn.transactionId,
            transaction_date: new Date(txn.date || txn.transactionDate).toISOString().split('T')[0],
            amount: Math.abs(parseFloat(txn.amount || 0)),
            is_credit: (txn.type || txn.transactionType)?.toLowerCase() === 'credit' || parseFloat(txn.amount || 0) > 0,
            running_balance: parseFloat(txn.balance || 0),
            narration: txn.description || txn.narration || '',
            reference_number: txn.reference || txn.referenceNumber,
            transaction_type: txn.type || txn.transactionType,
            raw_data: txn
          };

          // Check if transaction already exists
          const { data: existingTxn } = await supabaseAdmin
            .from('edoc_transactions')
            .select('id')
            .eq('edoc_transaction_id', transactionData.edoc_transaction_id)
            .eq('consent_id', consent.id)
            .maybeSingle();

          if (!existingTxn) {
            // Insert new transaction
            const { error: insertError } = await supabaseAdmin
              .from('edoc_transactions')
              .insert(transactionData);

            if (!insertError) {
              newTransactionsCount++;
            }
          }
        }

        // Update last sync time
        await supabaseAdmin
          .from('edoc_consents')
          .update({
            last_sync_at: new Date().toISOString(),
            import_complete: true
          })
          .eq('id', consent.id);

        console.log(`Processed ${newTransactionsCount} new transactions for consent ${consentId}`);

        // Log usage for billing
        if (newTransactionsCount > 0) {
          await supabaseAdmin
            .from('edoc_usage_logs')
            .insert({
              user_id: consent.user_id,
              consent_id: consent.id,
              operation_type: 'transaction_sync',
              cost_usd: 0.10, // Webhook processing fee
              markup_applied: 0.02 // 20% markup
            });
        }

        break;
      }

      case 'account.disconnected': {
        const { consentId, reason } = webhookData.data;
        
        // Update consent status with error
        await supabaseAdmin
          .from('edoc_consents')
          .update({
            consent_status: 'error',
            error_message: reason || 'Account disconnected',
            updated_at: new Date().toISOString()
          })
          .eq('edoc_consent_id', consentId);

        console.log(`Account disconnected for consent ${consentId}: ${reason}`);
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${webhookData.event}`);
        break;
    }

    // Return success response
    return new Response(JSON.stringify({ 
      received: true,
      event: webhookData.event,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("E-Doc webhook error:", error);
    
    // Log error to database
    try {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      await supabaseAdmin
        .from('system_error_logs')
        .insert({
          error_message: `E-Doc webhook error: ${error.message}`,
          error_context: { 
            stack: error.stack,
            headers: Object.fromEntries(req.headers.entries())
          },
          source: 'edoc-webhook'
        });
    } catch (dbError) {
      console.error("Failed to log error to database:", dbError);
    }

    return new Response(JSON.stringify({ 
      error: "Webhook processing failed",
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});