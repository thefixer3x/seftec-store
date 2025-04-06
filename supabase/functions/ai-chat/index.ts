
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { stripIndent } from "https://esm.sh/common-tags@1.8.2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Get API key from environment variable
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

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
    console.log("AI Chat function invoked");
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    console.log(`Auth header present: ${!!authHeader}`);
    
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }
    
    // Validate the API key is available
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      throw new Error("OpenAI API key is not configured");
    }
    
    // Set up the client with the auth header
    try {
      await supabase.auth.setSession({
        access_token: authHeader.replace('Bearer ', ''),
        refresh_token: '',
      });
      console.log("Session set successfully");
    } catch (sessionError) {
      console.error("Error setting session:", sessionError);
      throw new Error(`Session error: ${sessionError.message}`);
    }
    
    // Get the request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Request body parsed successfully");
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      throw new Error("Invalid request body format");
    }
    
    const { prompt } = requestBody;
    
    if (!prompt) {
      throw new Error("Missing required field: prompt");
    }
    
    console.log(`Processing prompt: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}`);
    
    // Get OpenAI response
    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: stripIndent`
                You are BizGenie, an AI business advisor embedded within the SefTec platform.
                Your primary role is to provide advice, insights, and recommendations on business strategies, market trends, and financial decisions.
                
                When providing responses:
                - Be professional, concise, and direct in your advice
                - Focus on actionable insights rather than generalities
                - When appropriate, reference business metrics, trends, or data points
                - Tailor your advice to the context of international trade and business finance when relevant
                - Use bullet points for clarity when listing multiple recommendations
                
                If you don't know something, acknowledge it and suggest how the user might find that information.
              `,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      });
      
      console.log("OpenAI API request sent, status:", openaiResponse.status);
      
      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error("OpenAI API error:", errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || "Unknown error"}`);
      }
      
      const data = await openaiResponse.json();
      console.log("OpenAI API response received successfully");
      
      const aiResponse = data.choices[0].message.content;
      
      // Return the response
      return new Response(
        JSON.stringify({ text: aiResponse }),
        {
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          },
        }
      );
    } catch (openaiError) {
      console.error("Error calling OpenAI API:", openaiError);
      throw openaiError;
    }
  } catch (error) {
    console.error("Error in ai-chat function:", error);
    
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
