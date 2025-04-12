
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
    console.log("Cache cleanup function invoked");
    
    // Initialize Supabase client using environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Call the SQL function to clean up expired cache entries
    const { data, error } = await supabase.rpc("cleanup_expired_cache_entries");
    
    if (error) {
      console.error("Error cleaning up cache entries:", error);
      throw error;
    }
    
    console.log(`Successfully cleaned up ${data} expired cache entries`);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully cleaned up ${data} expired cache entries`,
        timestamp: new Date().toISOString(),
        entriesRemoved: data
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      }
    );
  } catch (error) {
    console.error("Error in cache cleanup function:", error);
    
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
