
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { handleBusinessPlan } from "./modules/business-plan.ts";
import { handleAIChat } from "./modules/ai-chat.ts";
import { corsHeaders } from "./utils/cors.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const BizGenie_API_key = Deno.env.get('BizGenie_API_key') || '';
const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY') || Deno.env.get('PERPLEXITY_API_SK') || '';
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || '';

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log('BizGenie router received request:', { mode: requestData.mode, hasApiKey: !!OPENAI_API_KEY });
    
    // Handle business plan generation mode (Premium Feature)
    if (requestData.mode === 'business-plan') {
      console.log('Processing premium business plan generation request');
      
      if (!OPENAI_API_KEY) {
        return new Response(
          JSON.stringify({ error: "OpenAI API key not configured for premium business plan generation" }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return await handleBusinessPlan(requestData, { 
        SUPABASE_URL, 
        SUPABASE_SERVICE_ROLE_KEY, 
        BizGenie_API_key,
        PERPLEXITY_API_KEY,
        PERPLEXITY_API_SK: PERPLEXITY_API_KEY,
        OPENAI_API_KEY
      });
    }
    
    // Handle regular chat mode
    console.log('Processing regular chat request');
    return await handleAIChat(requestData, { 
      SUPABASE_URL, 
      SUPABASE_SERVICE_ROLE_KEY, 
      BizGenie_API_key,
      PERPLEXITY_API_KEY,
      PERPLEXITY_API_SK: PERPLEXITY_API_KEY,
      OPENAI_API_KEY
    });
    
  } catch (error) {
    console.error('Error processing BizGenie request:', error);
    
    return new Response(
      JSON.stringify({ 
        error: `Error processing request: ${error.message}`,
        details: "Please try again or contact support if the issue persists"
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
