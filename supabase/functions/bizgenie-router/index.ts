
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { handleBusinessPlan } from "./modules/business-plan.ts";
import { handleAIChat } from "./modules/ai-chat.ts";
import { corsHeaders } from "./utils/cors.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const BizGenie_API_key = Deno.env.get('BizGenie_API_key') || '';
const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY') || '';

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    
    // Handle business plan generation mode
    if (requestData.mode === 'business-plan') {
      return await handleBusinessPlan(requestData, { 
        SUPABASE_URL, 
        SUPABASE_SERVICE_ROLE_KEY, 
        BizGenie_API_key,
        PERPLEXITY_API_KEY 
      });
    }
    
    // Handle regular chat mode
    return await handleAIChat(requestData, { 
      SUPABASE_URL, 
      SUPABASE_SERVICE_ROLE_KEY, 
      BizGenie_API_key,
      PERPLEXITY_API_KEY 
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: `Error processing request: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
