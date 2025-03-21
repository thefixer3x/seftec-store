
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  user_id?: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  notification_group?: string;
  expires_at?: string;
  metadata?: {
    path?: string;
    [key: string]: any;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the JWT from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    // Verify the JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid token or user not found');
    }

    // Get the notification data from the request
    const requestData = await req.json() as NotificationRequest;
    const { 
      title, 
      message, 
      type = 'info', 
      notification_group, 
      expires_at,
      metadata = {}
    } = requestData;

    // Check if user has the notification type enabled
    const { data: settings, error: settingsError } = await supabaseClient
      .from('notification_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!settingsError && settings) {
      const typeEnabledField = `${type}_enabled` as keyof typeof settings;
      if (settings[typeEnabledField] === false) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: `Notifications of type '${type}' are disabled for this user` 
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
    }

    // Create the notification
    const { data, error } = await supabaseClient
      .from('notifications')
      .insert({
        user_id: user.id,
        title,
        message,
        type,
        notification_group,
        expires_at,
        metadata
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
