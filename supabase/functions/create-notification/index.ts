
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Update CORS headers to include both the original domain and the new api.seftec.store domain
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow requests from any origin
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    // Create supabase admin client for creating notifications (bypassing RLS)
    const supabaseAdmin = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    
    // Create supabase client with user's JWT
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }
    
    // Get the user's JWT
    const jwt = authHeader.replace('Bearer ', '');
    
    // Verify the JWT and get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
    
    if (userError || !user) {
      throw new Error('Invalid user token');
    }
    
    // Get the request body
    const { title, message, type = 'info', notification_group = null, expires_at = null } = await req.json();
    
    // Validate required fields
    if (!title || !message) {
      throw new Error("Missing required fields: title and message are required");
    }
    
    // Create the notification
    const { data: notification, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: user.id,
        title,
        message,
        type,
        notification_group,
        expires_at,
        is_read: false
      })
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    // Return the created notification
    return new Response(
      JSON.stringify({ notification }),
      {
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
      }
    );
  } catch (error) {
    console.error("Error in create-notification function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
      }
    );
  }
});
