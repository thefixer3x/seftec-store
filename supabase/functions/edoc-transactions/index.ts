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

    switch (action) {
      case "sync_transactions": {
        const { consent_id, start_date, end_date } = data;
        
        if (!consent_id) {
          return new Response(JSON.stringify({ 
            error: "Missing consent ID" 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Get consent record
        const { data: consentRecord } = await supabaseAdmin
          .from('edoc_consents')
          .select('*')
          .eq('id', consent_id)
          .eq('user_id', user.id)
          .single();

        if (!consentRecord || consentRecord.consent_status !== 'active') {
          return new Response(JSON.stringify({ 
            error: "Invalid or inactive consent" 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Fetch transactions from E-Doc API
        const transactionsUrl = new URL(`${EDOC_BASE_URL}/api/v1/consent/${consentRecord.edoc_consent_id}/transactions`);
        if (start_date) transactionsUrl.searchParams.set('startDate', start_date);
        if (end_date) transactionsUrl.searchParams.set('endDate', end_date);

        const transactionsResponse = await fetch(transactionsUrl.toString(), {
          method: "GET",
          headers: {
            "client-id": EDOC_CLIENT_ID!,
            "Authorization": `Bearer ${EDOC_CLIENT_SECRET}`,
          },
        });

        if (!transactionsResponse.ok) {
          const errorData = await transactionsResponse.json();
          return new Response(JSON.stringify({ 
            error: "Failed to fetch transactions",
            message: errorData.message || "Unable to retrieve bank transactions" 
          }), {
            status: transactionsResponse.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const transactionsData = await transactionsResponse.json();
        const transactions = transactionsData.data || [];

        let newTransactions = 0;
        let updatedTransactions = 0;

        // Process and store transactions
        for (const txn of transactions) {
          const transactionData = {
            consent_id: consent_id,
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
            .eq('consent_id', consent_id)
            .maybeSingle();

          if (existingTxn) {
            // Update existing transaction
            await supabaseAdmin
              .from('edoc_transactions')
              .update(transactionData)
              .eq('id', existingTxn.id);
            updatedTransactions++;
          } else {
            // Insert new transaction
            await supabaseAdmin
              .from('edoc_transactions')
              .insert(transactionData);
            newTransactions++;
          }
        }

        // Update consent sync status
        await supabaseAdmin
          .from('edoc_consents')
          .update({
            import_complete: true,
            last_sync_at: new Date().toISOString()
          })
          .eq('id', consent_id);

        // Log usage for billing
        await supabaseAdmin
          .from('edoc_usage_logs')
          .insert({
            user_id: user.id,
            consent_id: consent_id,
            operation_type: 'transaction_sync',
            cost_usd: 0.25, // Example E-Doc fee per sync
            markup_applied: 0.05 // 20% markup
          });

        return new Response(JSON.stringify({
          success: true,
          total_transactions: transactions.length,
          new_transactions: newTransactions,
          updated_transactions: updatedTransactions,
          message: "Transactions synchronized successfully"
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      case "get_transactions": {
        const { consent_id, limit = 50, offset = 0, category, start_date, end_date } = data;
        
        if (!consent_id) {
          return new Response(JSON.stringify({ 
            error: "Missing consent ID" 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Build query
        let query = supabaseAdmin
          .from('edoc_transactions')
          .select(`
            id,
            transaction_date,
            amount,
            is_credit,
            running_balance,
            narration,
            reference_number,
            transaction_type,
            category,
            subcategory,
            merchant_name,
            confidence_score,
            tags
          `)
          .eq('consent_id', consent_id)
          .order('transaction_date', { ascending: false })
          .range(offset, offset + limit - 1);

        if (category) {
          query = query.eq('category', category);
        }
        if (start_date) {
          query = query.gte('transaction_date', start_date);
        }
        if (end_date) {
          query = query.lte('transaction_date', end_date);
        }

        const { data: transactions, error: txnError } = await query;

        if (txnError) {
          return new Response(JSON.stringify({ 
            error: "Failed to fetch transactions",
            message: txnError.message 
          }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Get summary statistics
        const { data: summary } = await supabaseAdmin
          .rpc('get_cash_flow_summary', {
            p_consent_id: consent_id,
            p_days_back: 30
          });

        return new Response(JSON.stringify({
          transactions: transactions || [],
          summary: summary?.[0] || null,
          pagination: {
            limit,
            offset,
            has_more: transactions?.length === limit
          }
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      case "get_analytics": {
        const { consent_id, period = '30d' } = data;
        
        if (!consent_id) {
          return new Response(JSON.stringify({ 
            error: "Missing consent ID" 
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Calculate date range based on period
        const daysBack = period === '7d' ? 7 : period === '90d' ? 90 : 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysBack);

        // Get transaction analytics
        const { data: analytics } = await supabaseAdmin
          .from('edoc_transactions')
          .select(`
            transaction_date,
            amount,
            is_credit,
            category,
            subcategory
          `)
          .eq('consent_id', consent_id)
          .gte('transaction_date', startDate.toISOString().split('T')[0]);

        if (!analytics) {
          return new Response(JSON.stringify({ 
            error: "Failed to fetch analytics data" 
          }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Process analytics
        const totalInflow = analytics.filter(t => t.is_credit).reduce((sum, t) => sum + t.amount, 0);
        const totalOutflow = analytics.filter(t => !t.is_credit).reduce((sum, t) => sum + t.amount, 0);
        const netFlow = totalInflow - totalOutflow;

        // Category breakdown
        const categoryBreakdown = analytics.reduce((acc, txn) => {
          const category = txn.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = { total: 0, count: 0, is_income: txn.is_credit };
          }
          acc[category].total += txn.amount;
          acc[category].count += 1;
          return acc;
        }, {});

        // Daily cash flow
        const dailyCashFlow = analytics.reduce((acc, txn) => {
          const date = txn.transaction_date;
          if (!acc[date]) {
            acc[date] = { inflow: 0, outflow: 0, net: 0 };
          }
          if (txn.is_credit) {
            acc[date].inflow += txn.amount;
          } else {
            acc[date].outflow += txn.amount;
          }
          acc[date].net = acc[date].inflow - acc[date].outflow;
          return acc;
        }, {});

        return new Response(JSON.stringify({
          period,
          summary: {
            total_inflow: totalInflow,
            total_outflow: totalOutflow,
            net_flow: netFlow,
            transaction_count: analytics.length
          },
          category_breakdown: categoryBreakdown,
          daily_cash_flow: dailyCashFlow
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
    console.error("E-Doc transactions error:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});