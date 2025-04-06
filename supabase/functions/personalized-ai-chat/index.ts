
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { stripIndent } from "https://esm.sh/common-tags@1.8.2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Get API key from environment variable
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

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
    console.log("Personalized AI Chat function invoked");
    
    // Check if OpenAI API key is available
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      throw new Error("OpenAI API key is not configured");
    }
    
    // Create supabase admin client for fetching user data
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
    console.log(`Authorization header present: ${!!authHeader}`);
    
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }
    
    // Get the user's JWT
    const jwt = authHeader.replace('Bearer ', '');
    
    // Verify the JWT and get the user
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
      
      if (userError) {
        console.error("Error getting user from JWT:", userError);
        throw userError;
      }
      
      if (!user) {
        console.error("No user found with provided JWT");
        throw new Error('Invalid user token');
      }
      
      console.log(`User authenticated successfully: ${user.id}`);
      
      // Get the request body
      let requestBody;
      try {
        requestBody = await req.json();
        console.log("Request body parsed successfully");
      } catch (parseError) {
        console.error("Error parsing request body:", parseError);
        throw new Error("Invalid request body format");
      }
      
      const { prompt, generateReport = false } = requestBody;
      
      if (!prompt) {
        throw new Error("Missing required field: prompt");
      }
      
      console.log(`Processing prompt: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}`);
      console.log(`Generate report: ${generateReport}`);
      
      // Get user preferences
      try {
        const { data: userPreferences, error: preferencesError } = await supabaseAdmin
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("Error fetching user preferences:", preferencesError);
        } else {
          console.log("User preferences retrieved successfully");
        }
        
        // Get user profile
        const { data: userProfile, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else {
          console.log("User profile retrieved successfully");
        }
        
        // Construct user context for the AI
        const userContext = {
          name: user.user_metadata?.full_name || `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`.trim(),
          email: user.email,
          company: userProfile?.company_name,
          businessType: userProfile?.business_type,
          preferences: userPreferences || {},
        };
        
        console.log("User context constructed successfully");
        
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
                    Your primary role is to provide personalized advice, insights, and recommendations on business strategies, market trends, and financial decisions.
                    
                    User Context:
                    - Name: ${userContext.name || 'Unknown'}
                    - Company: ${userContext.company || 'Unknown'}
                    - Business Type: ${userContext.businessType || 'Unknown'}
                    - Industry Focus: ${userContext.preferences.industry_focus?.join(', ') || 'Unknown'}
                    - Regions of Interest: ${userContext.preferences.regions_of_interest?.join(', ') || 'Unknown'}
                    - Business Size: ${userContext.preferences.business_size || 'Unknown'}
                    - Risk Tolerance: ${userContext.preferences.risk_tolerance || 'Unknown'}
                    - Payment Methods: ${userContext.preferences.payment_methods?.join(', ') || 'Unknown'}
                    - Preferred Currencies: ${userContext.preferences.preferred_currencies?.join(', ') || 'Unknown'}
                    
                    When providing responses:
                    - Personalize your advice based on the user context provided
                    - Be professional, concise, and direct in your advice
                    - Focus on actionable insights rather than generalities
                    - When appropriate, reference business metrics, trends, or data points
                    - Tailor your advice to the context of international trade and business finance when relevant
                    - Use bullet points for clarity when listing multiple recommendations
                    ${generateReport ? 
                      `- Format your response as a detailed business report with sections, headings, and structured analysis
                      - Include an executive summary at the beginning
                      - Organize the information in a professional report format
                      - Provide more comprehensive analysis than a standard response` 
                      : ''}
                    
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
            JSON.stringify({ 
              text: aiResponse,
              personalized: true,
              generateReport
            }),
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
      } catch (userDataError) {
        console.error("Error processing user data:", userDataError);
        throw userDataError;
      }
    } catch (authError) {
      console.error("Authentication error:", authError);
      throw authError;
    }
  } catch (error) {
    console.error("Error in personalized-ai-chat function:", error);
    
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
