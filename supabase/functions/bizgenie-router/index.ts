import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || '';

// Define model constants
const MODEL_O1_MINI = 'gpt-4o-mini';  // Lightweight model
const MODEL_O3_MINI_HIGH = 'gpt-4o';   // Balanced model
const MODEL_GPT4 = 'gpt-4o';         // Advanced model

// Function to classify query complexity
async function classifyQueryComplexity(prompt: string) {
  try {
    const classifierPrompt = `
      You are a query complexity classifier for BizGenie AI. 
      Analyze the following business query and classify it as either 'simple', 'moderate', or 'complex'.
      
      Simple queries: Basic information requests, definitions, yes/no questions
      Moderate queries: Multi-part business questions, basic analysis requests
      Complex queries: Financial modeling, forecasting, risk assessment, strategic planning, multi-factor analysis
      
      Query: "${prompt}"
      
      Return only one word: 'simple', 'moderate', or 'complex'.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL_O1_MINI, // Use lightweight model for classification
        messages: [
          { role: "system", content: "You are a query classifier that categorizes business queries by complexity." },
          { role: "user", content: classifierPrompt }
        ],
        temperature: 0.2, // Low temperature for more consistent results
        max_tokens: 10    // We only need a short response
      })
    });

    const data = await response.json();
    const classification = data.choices?.[0]?.message?.content?.trim().toLowerCase() || 'simple';
    
    // Validate classification is one of the expected values
    if (!['simple', 'moderate', 'complex'].includes(classification)) {
      console.log(`Unexpected classification: ${classification}, defaulting to 'simple'`);
      return 'simple';
    }
    
    return classification;
  } catch (error) {
    console.error('Error classifying query:', error);
    // Default to simple in case of error
    return 'simple';
  }
}

// Function to calculate MD5 hash for caching
function md5(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return Array.from(new Uint8Array(data))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// New function for business plan generation
async function generateBusinessPlan(userId: string, planData: any) {
  try {
    const {
      idea,
      customers,
      revenue,
      competition,
      advantages,
      funding,
      saveData
    } = planData;
    
    // Calculate hash for caching
    const planHash = md5(JSON.stringify(planData));
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Check cache first
    const { data: cacheData } = await supabase
      .from('ai_response_cache')
      .select('*')
      .eq('prompt_hash', `business-plan-${planHash}`)
      .single();
    
    // If we have a valid cache hit that hasn't expired
    if (cacheData && (!cacheData.expires_at || new Date(cacheData.expires_at) > new Date())) {
      console.log('Cache hit for business plan');
      
      // Update hit count
      await supabase
        .from('ai_response_cache')
        .update({ hit_count: (cacheData.hit_count || 0) + 1 })
        .eq('id', cacheData.id);
      
      // Log usage even for cached responses
      if (userId) {
        await supabase
          .from('ai_usage_logs')
          .insert({
            user_id: userId,
            prompt: "Business plan generation",
            model_used: cacheData.model_used,
            query_complexity: 'complex',
            tokens_used: cacheData.tokens_used,
            response_time_ms: 0, // Instant response
            estimated_cost: 0 // No cost for cached response
          });
      }
      
      return { 
        planHtml: cacheData.response,
        model: cacheData.model_used,
        fromCache: true
      };
    }
    
    // Construct system prompt for business plan generation
    const systemPrompt = `
      You are BizGenie, an expert AI business consultant specializing in creating comprehensive business plans.
      
      FORMAT GUIDELINES:
      - Format your response as HTML with proper h2, h3 headers, bold text, and unordered lists.
      - Do NOT use Markdown formatting - only valid HTML.
      - Return HTML-formatted text suitable for display in a web application.
      
      BUSINESS PLAN STRUCTURE:
      Create a complete business plan with these 12 sections only:
      1. Executive Summary
      2. Company Description
      3. Market Analysis
      4. Target Customers
      5. Competitor Analysis
      6. Value Proposition
      7. Marketing & Sales Strategy
      8. Business Model & Revenue Streams
      9. Operational Plan
      10. Team & Management Structure
      11. Financial Projections
      12. Funding Needs & Use of Funds
      
      IMPORTANT RULES:
      - Do NOT invent new sections beyond the 12 specified.
      - If user input is missing for a section, add "[Assumption]" prefix to generated content in that area.
      - Keep the plan concise yet comprehensive.
      - Be realistic and practical with your suggestions.
      - Include specific metrics and actionable items when possible.
    `;

    // Construct user message with all provided information
    const userMessage = `
      Please create a complete business plan for the following business idea:
      
      BUSINESS IDEA: ${idea || '[Not provided]'}
      
      TARGET CUSTOMERS: ${customers || '[Not provided]'}
      
      REVENUE MODEL: ${revenue || '[Not provided]'}
      
      COMPETITION: ${competition || '[Not provided]'}
      
      COMPETITIVE ADVANTAGES: ${advantages || '[Not provided]'}
      
      FUNDING NEEDS: ${funding || '[Not provided]'}
    `;

    // Always use the advanced model for business plan generation
    const selectedModel = MODEL_GPT4;
    
    const startTime = Date.now();
    console.log(`Generating business plan using model: ${selectedModel}`);
    
    // Call OpenAI API with selected model
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7, // Slightly creative for business plans
        max_tokens: 4096  // Allow for detailed responses
      })
    });

    const responseData = await response.json();
    const planHtml = responseData.choices?.[0]?.message?.content || "<p>Sorry, I couldn't generate a business plan.</p>";
    const tokensUsed = responseData.usage?.total_tokens || 0;
    const responseTime = Date.now() - startTime;
    
    // Estimate cost (simplified version, update with actual pricing)
    let estimatedCost = tokensUsed * 0.00006; // $0.06 per 1000 tokens for GPT-4
    
    // Cache the response if the user consents
    if (saveData) {
      await supabase
        .from('ai_response_cache')
        .insert({
          prompt_hash: `business-plan-${planHash}`,
          prompt: "Business plan generation: " + idea.substring(0, 100),
          response: planHtml,
          model_used: selectedModel,
          tokens_used: tokensUsed,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Cache for 30 days
        })
        .onConflict('prompt_hash')
        .merge();
    }
    
    // Log usage
    if (userId) {
      await supabase
        .from('ai_usage_logs')
        .insert({
          user_id: userId,
          prompt: "Business plan generation: " + idea.substring(0, 100),
          model_used: selectedModel,
          query_complexity: 'complex',
          tokens_used: tokensUsed,
          response_time_ms: responseTime,
          estimated_cost: estimatedCost
        });
      
      // Store business plan data if user consents
      if (saveData) {
        try {
          await supabase
            .from('business_plans')
            .insert({
              user_id: userId,
              business_idea: idea,
              target_customers: customers,
              revenue_model: revenue,
              competition: competition,
              competitive_advantages: advantages,
              funding_needs: funding,
              generated_plan: planHtml
            });
        } catch (err) {
          console.error('Error storing business plan data:', err);
          // Continue even if storage fails
        }
      }
    }
    
    return {
      planHtml,
      model: selectedModel,
      tokens: tokensUsed,
      fromCache: false
    };
  } catch (error) {
    console.error('Error generating business plan:', error);
    throw new Error(`Failed to generate business plan: ${error.message}`);
  }
}

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
      const { userId, planData } = requestData;
      
      if (!planData || !planData.idea) {
        return new Response(
          JSON.stringify({ error: "Business idea is required" }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const result = await generateBusinessPlan(userId, planData);
      
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Handle regular chat mode
    const { prompt, userId, systemPrompt } = requestData;
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Generate a hash of the prompt for caching
    const promptHash = md5(prompt + (systemPrompt || ''));
    
    // Check cache first
    const { data: cacheData } = await supabase
      .from('ai_response_cache')
      .select('*')
      .eq('prompt_hash', promptHash)
      .single();
    
    // If we have a valid cache hit that hasn't expired
    if (cacheData && (!cacheData.expires_at || new Date(cacheData.expires_at) > new Date())) {
      console.log('Cache hit for query:', prompt.substring(0, 50));
      
      // Update hit count
      await supabase
        .from('ai_response_cache')
        .update({ hit_count: (cacheData.hit_count || 0) + 1 })
        .eq('id', cacheData.id);
      
      // Log usage even for cached responses
      if (userId) {
        await supabase
          .from('ai_usage_logs')
          .insert({
            user_id: userId,
            prompt: prompt,
            model_used: cacheData.model_used,
            query_complexity: 'cached',
            tokens_used: cacheData.tokens_used,
            response_time_ms: 0, // Instant response
            estimated_cost: 0 // No cost for cached response
          });
      }
      
      return new Response(
        JSON.stringify({ 
          text: cacheData.response,
          model: cacheData.model_used,
          fromCache: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Not in cache, proceed with classification and model selection
    let userTier = 'free'; // Default tier
    let canUseAdvancedModels = false;
    
    // Get user tier if userId is provided
    if (userId) {
      const { data: userData, error: userError } = await supabase
        .from('user_tiers')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (!userError && userData) {
        userTier = userData.tier_name;
        canUseAdvancedModels = userData.can_use_advanced_models;
      }
    }
    
    // Classify query complexity
    const startTime = Date.now();
    const complexity = await classifyQueryComplexity(prompt);
    
    // Track classification in database for training
    if (userId) {
      await supabase
        .from('query_classifications')
        .insert({
          prompt: prompt,
          classified_complexity: complexity
        });
    }
    
    // Select model based on complexity and user tier
    let selectedModel = MODEL_O1_MINI; // Default to lightweight model
    
    if (complexity === 'complex' && (userTier !== 'free' || canUseAdvancedModels)) {
      selectedModel = MODEL_GPT4;
    } else if (complexity === 'moderate' && (userTier !== 'free' || canUseAdvancedModels)) {
      selectedModel = MODEL_O3_MINI_HIGH;
    }
    
    console.log(`Query classified as ${complexity}, using model: ${selectedModel}`);
    
    // Default system prompt if not provided
    const defaultSystemPrompt = `You are BizGenie, a professional AI assistant specializing in business advice. 
    Provide concise, practical insights based on business best practices. 
    Be conversational but direct, focusing on actionable advice.`;
    
    // Call OpenAI API with selected model
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: systemPrompt || defaultSystemPrompt },
          { role: "user", content: prompt }
        ]
      })
    });

    const responseData = await response.json();
    const aiResponse = responseData.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    const tokensUsed = responseData.usage?.total_tokens || 0;
    const responseTime = Date.now() - startTime;
    
    // Estimate cost (simplified version, you'd need to update with actual pricing)
    let estimatedCost = 0;
    if (selectedModel === MODEL_O1_MINI) {
      estimatedCost = tokensUsed * 0.00001; // $0.01 per 1000 tokens
    } else if (selectedModel === MODEL_O3_MINI_HIGH) {
      estimatedCost = tokensUsed * 0.00003; // $0.03 per 1000 tokens
    } else if (selectedModel === MODEL_GPT4) {
      estimatedCost = tokensUsed * 0.00006; // $0.06 per 1000 tokens
    }
    
    // Cache the response
    await supabase
      .from('ai_response_cache')
      .insert({
        prompt_hash: promptHash,
        prompt: prompt,
        response: aiResponse,
        model_used: selectedModel,
        tokens_used: tokensUsed,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Cache for 30 days
      })
      .onConflict('prompt_hash')
      .merge();
    
    // Log usage
    if (userId) {
      await supabase
        .from('ai_usage_logs')
        .insert({
          user_id: userId,
          prompt: prompt,
          model_used: selectedModel,
          query_complexity: complexity,
          tokens_used: tokensUsed,
          response_time_ms: responseTime,
          estimated_cost: estimatedCost
        });
    }
    
    return new Response(
      JSON.stringify({ 
        text: aiResponse, 
        model: selectedModel,
        tokens: tokensUsed,
        complexity: complexity,
        fromCache: false
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: `Error processing request: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
