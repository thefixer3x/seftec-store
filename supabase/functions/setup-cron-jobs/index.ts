
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Setting up cron jobs");
    
    // Initialize Supabase client using environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get project reference from the URL
    const projectRef = supabaseUrl.split('//')[1].split('.')[0];
    const functionUrl = `https://${projectRef}.supabase.co/functions/v1/cache-cleanup`;
    
    // Set up a cron job to run the cache cleanup function daily at midnight
    const { data: cronData, error: cronError } = await supabase.rpc(
      'setup_cache_cleanup_cron',
      { 
        job_name: 'daily-cache-cleanup', 
        schedule: '0 0 * * *',  // Run at midnight every day
        function_url: functionUrl,
        anon_key: Deno.env.get("SUPABASE_ANON_KEY") || ""
      }
    );
    
    if (cronError) {
      console.error("Error setting up cron job:", cronError);
      throw cronError;
    }
    
    console.log("Successfully set up cron job for cache cleanup");
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully set up cron job for cache cleanup",
        cronJob: cronData
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      }
    );
  } catch (error) {
    console.error("Error in setup-cron-jobs function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
