
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    // Use service role for background processing
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { payment_id } = await req.json();
    
    if (!payment_id) {
      return new Response(
        JSON.stringify({ error: 'Payment ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // 1. Get the bulk payment record
    const { data: bulkPayment, error: bulkPaymentError } = await supabase
      .from('bulk_payments')
      .select('*')
      .eq('id', payment_id)
      .single();
      
    if (bulkPaymentError || !bulkPayment) {
      return new Response(
        JSON.stringify({ error: 'Bulk payment not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }
    
    // 2. Update status to processing
    const { error: updateError } = await supabase
      .from('bulk_payments')
      .update({ 
        status: 'processing' 
      })
      .eq('id', payment_id);
    
    if (updateError) {
      throw updateError;
    }
    
    // 3. Create an audit record
    await supabase
      .from('payment_audit')
      .insert({
        payment_id: payment_id,
        old_status: 'pending',
        new_status: 'processing'
      });
    
    // 4. Get payment items to process
    const { data: paymentItems, error: itemsError } = await supabase
      .from('payment_items')
      .select('*, beneficiaries(*)')
      .eq('bulk_payment_id', payment_id);
      
    if (itemsError) {
      throw itemsError;
    }
    
    // 5. Process each payment
    let successCount = 0;
    let failedCount = 0;
    
    for (const item of paymentItems || []) {
      try {
        // Update status to processing
        await supabase
          .from('payment_items')
          .update({ status: 'processing' })
          .eq('id', item.id);
          
        // Simulate payment processing
        const willSucceed = Math.random() > 0.2; // 80% success rate for simulation
        
        if (willSucceed) {
          // Update to completed after processing
          await supabase
            .from('payment_items')
            .update({ 
              status: 'completed',
              processed_at: new Date().toISOString()
            })
            .eq('id', item.id);
            
          successCount++;
        } else {
          // Update to failed
          await supabase
            .from('payment_items')
            .update({ 
              status: 'failed',
              error_message: 'Insufficient funds or bank network error',
              retry_count: item.retry_count + 1
            })
            .eq('id', item.id);
            
          failedCount++;
        }
      } catch (error) {
        console.error(`Error processing payment item ${item.id}:`, error);
        
        // Update to failed
        await supabase
          .from('payment_items')
          .update({ 
            status: 'failed',
            error_message: error.message || 'Unknown error occurred',
            retry_count: item.retry_count + 1
          })
          .eq('id', item.id);
          
        failedCount++;
      }
    }
    
    // 6. Update bulk payment status based on results
    const finalStatus = failedCount === 0 ? 'completed' : 
                        successCount === 0 ? 'failed' : 'completed';
    
    const { error: finalUpdateError } = await supabase
      .from('bulk_payments')
      .update({ 
        status: finalStatus,
        processed_at: new Date().toISOString(),
        last_error: failedCount > 0 ? `${failedCount} payments failed` : null
      })
      .eq('id', payment_id);
      
    if (finalUpdateError) {
      throw finalUpdateError;
    }
    
    // 7. Create final audit record
    await supabase
      .from('payment_audit')
      .insert({
        payment_id: payment_id,
        old_status: 'processing',
        new_status: finalStatus
      });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${paymentItems?.length} payments. Success: ${successCount}, Failed: ${failedCount}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing bulk payment:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred while processing the payment' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
