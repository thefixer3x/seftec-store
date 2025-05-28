import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { corsHeaders, signPayload } from "../_shared/sayswitch.ts";

// Webhook handler for SaySwitch transaction notifications
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

    // Get request payload
    const requestBody = await req.text();
    const event = JSON.parse(requestBody);
    
    console.log("Received SaySwitch webhook event:", JSON.stringify(event));
    
    // Verify webhook signature
    const signature = req.headers.get("X-SaySwitch-Signature");
    if (!signature) {
      console.error("Missing SaySwitch signature header");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid request" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Calculate expected signature
    const calculatedSignature = signPayload(event);
    if (signature !== calculatedSignature) {
      console.error("Invalid SaySwitch signature");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log webhook event
    await supabase.from("webhook_logs").insert({
      provider: "sayswitch",
      event_type: event.event || "unknown",
      resource_id: event.reference || event.id,
      resource_type: event.type || "transaction",
      raw_event: event,
      processed_at: new Date().toISOString()
    });

    // Process different event types
    const eventType = event.event;
    
    switch (eventType) {
      case "charge.success": {
        // Payment was successful
        const reference = event.reference;
        const amount = event.amount / 100; // Convert from kobo/cents
        const status = "completed";
        
        // Update order status
        const { data: order, error } = await supabase
          .from("say_orders")
          .update({
            status,
            raw_response: event,
            completed_at: new Date().toISOString(),
          })
          .eq("reference", reference)
          .select("id, user_id")
          .single();
          
        if (error) {
          console.error("Error updating order:", error);
        }
        
        if (order) {
          // Record successful payment
          await supabase.from("user_payments").insert({
            user_id: order.user_id,
            provider: "sayswitch",
            amount,
            currency: event.currency || "NGN",
            transaction_id: event.id,
            payment_method: event.payment_method || "card",
            payment_date: new Date().toISOString(),
            payment_type: "transaction"
          });
          
          // Create notification for the user
          await supabase.from("notifications").insert({
            user_id: order.user_id,
            type: "payment_success",
            title: "Payment Successful",
            message: `Your payment of ${event.currency || "NGN"} ${amount.toFixed(2)} was successful.`,
            data: {
              reference,
              amount,
              currency: event.currency || "NGN",
            },
            read: false,
            created_at: new Date().toISOString()
          });
        }
        
        break;
      }
      
      case "charge.failed": {
        // Payment failed
        const reference = event.reference;
        
        // Update order status
        await supabase
          .from("say_orders")
          .update({
            status: "failed",
            raw_response: event,
            error_message: event.message || "Payment failed",
          })
          .eq("reference", reference);
          
        // Get user ID from order
        const { data: order } = await supabase
          .from("say_orders")
          .select("user_id")
          .eq("reference", reference)
          .single();
          
        if (order) {
          // Create notification for the user
          await supabase.from("notifications").insert({
            user_id: order.user_id,
            type: "payment_failed",
            title: "Payment Failed",
            message: event.message || "Your payment was not successful. Please try again.",
            data: {
              reference,
              reason: event.message,
            },
            read: false,
            created_at: new Date().toISOString()
          });
        }
        
        break;
      }
      
      case "transfer.success": {
        // Transfer was successful
        const reference = event.reference;
        
        // Update transfer status
        await supabase
          .from("say_transfers")
          .update({
            status: "completed",
            raw_response: event,
            completed_at: new Date().toISOString(),
          })
          .eq("reference", reference);
          
        // Get user ID from transfer
        const { data: transfer } = await supabase
          .from("say_transfers")
          .select("user_id, amount, recipient_name")
          .eq("reference", reference)
          .single();
          
        if (transfer) {
          // Create notification for the user
          await supabase.from("notifications").insert({
            user_id: transfer.user_id,
            type: "transfer_success",
            title: "Transfer Successful",
            message: `Your transfer of ${event.currency || "NGN"} ${(transfer.amount || 0).toFixed(2)} to ${transfer.recipient_name} was successful.`,
            data: {
              reference,
              amount: transfer.amount,
              currency: event.currency || "NGN",
              recipient: transfer.recipient_name,
            },
            read: false,
            created_at: new Date().toISOString()
          });
        }
        
        break;
      }
      
      case "transfer.failed": {
        // Transfer failed
        const reference = event.reference;
        
        // Update transfer status
        await supabase
          .from("say_transfers")
          .update({
            status: "failed",
            raw_response: event,
            error_message: event.message || "Transfer failed",
          })
          .eq("reference", reference);
          
        // Get user ID from transfer
        const { data: transfer } = await supabase
          .from("say_transfers")
          .select("user_id, recipient_name")
          .eq("reference", reference)
          .single();
          
        if (transfer) {
          // Create notification for the user
          await supabase.from("notifications").insert({
            user_id: transfer.user_id,
            type: "transfer_failed",
            title: "Transfer Failed",
            message: `Your transfer to ${transfer.recipient_name} failed: ${event.message || "An error occurred"}`,
            data: {
              reference,
              recipient: transfer.recipient_name,
              reason: event.message,
            },
            read: false,
            created_at: new Date().toISOString()
          });
        }
        
        break;
      }
      
      case "bill.success": {
        // Bill payment was successful
        const reference = event.reference;
        
        // Update bill payment status
        await supabase
          .from("say_bills")
          .update({
            status: "completed",
            raw_response: event,
            completed_at: new Date().toISOString(),
          })
          .eq("reference", reference);
          
        // Get user ID from bill payment
        const { data: bill } = await supabase
          .from("say_bills")
          .select("user_id, amount, bill_type, customer_id")
          .eq("reference", reference)
          .single();
          
        if (bill) {
          // Create notification for the user
          await supabase.from("notifications").insert({
            user_id: bill.user_id,
            type: "bill_success",
            title: "Bill Payment Successful",
            message: `Your ${bill.bill_type} payment of ${event.currency || "NGN"} ${(bill.amount || 0).toFixed(2)} for ${bill.customer_id} was successful.`,
            data: {
              reference,
              amount: bill.amount,
              currency: event.currency || "NGN",
              bill_type: bill.bill_type,
              customer_id: bill.customer_id,
            },
            read: false,
            created_at: new Date().toISOString()
          });
        }
        
        break;
      }
      
      case "bill.failed": {
        // Bill payment failed
        const reference = event.reference;
        
        // Update bill payment status
        await supabase
          .from("say_bills")
          .update({
            status: "failed",
            raw_response: event,
            error_message: event.message || "Bill payment failed",
          })
          .eq("reference", reference);
          
        // Get user ID from bill payment
        const { data: bill } = await supabase
          .from("say_bills")
          .select("user_id, bill_type, customer_id")
          .eq("reference", reference)
          .single();
          
        if (bill) {
          // Create notification for the user
          await supabase.from("notifications").insert({
            user_id: bill.user_id,
            type: "bill_failed",
            title: "Bill Payment Failed",
            message: `Your ${bill.bill_type} payment for ${bill.customer_id} failed: ${event.message || "An error occurred"}`,
            data: {
              reference,
              bill_type: bill.bill_type,
              customer_id: bill.customer_id,
              reason: event.message,
            },
            read: false,
            created_at: new Date().toISOString()
          });
        }
        
        break;
      }
    }

    // Return success response to SaySwitch
    return new Response(
      JSON.stringify({ success: true, message: "Webhook processed successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("SaySwitch webhook error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "An error occurred processing the webhook",
        error: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
