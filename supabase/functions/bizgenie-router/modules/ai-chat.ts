
import { corsHeaders } from "../utils/cors.ts";
import { md5 } from "../utils/cache.ts";
import { MODEL_O1_MINI, MODEL_O3_MINI_HIGH, MODEL_GPT4, callOpenAI, calculateCost } from "../models/openai.ts";
import { getSupabaseClient, logUsage, cacheResponse } from "../utils/supabase-client.ts";
import { classifyQueryComplexity } from "./classifier.ts";

// Perplexity API call function
async function callPerplexity({
  prompt,
  systemPrompt,
  apiKey
}: {
  prompt: string;
  systemPrompt: string;
  apiKey: string;
}) {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 1000,
      return_images: false,
      return_related_questions: false,
      search_recency_filter: 'month',
      frequency_penalty: 1,
      presence_penalty: 0
    }),
  });

  return await response.json();
}

export async function handleAIChat(requestData: any, env: any) {
  const { prompt, userId, systemPrompt } = requestData;
  
  if (!prompt) {
    return new Response(
      JSON.stringify({ error: "Prompt is required" }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Initialize Supabase client
  const supabase = getSupabaseClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
  
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
      await logUsage(supabase, {
        userId: userId,
        prompt: prompt,
        model: cacheData.model_used,
        complexity: 'cached',
        tokens: cacheData.tokens_used,
        responseTime: 0, // Instant response
        cost: 0 // No cost for cached response
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
  const complexity = await classifyQueryComplexity(prompt, env.OPENAI_API_KEY);
  
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
  
  // Enhanced system prompt for better business advice
  const defaultSystemPrompt = `You are BizGenie, an expert AI business advisor specializing in enterprise solutions, DeFi integration, trade finance, and global business operations. 

  You help businesses with:
  - Strategic planning and business plan development
  - Financial analysis and cashflow management
  - International trade and regulatory compliance
  - DeFi and blockchain integration for enterprises
  - Risk assessment and mitigation strategies
  - Market analysis and growth opportunities

  Provide practical, actionable advice with specific steps where possible. Be professional yet conversational, and always consider the global business context. When discussing financial solutions, mention relevant features like trade finance, multi-country incorporation, or DeFi integration where appropriate.`;

  let aiResponse = "";
  let tokensUsed = 0;
  let modelUsed = selectedModel;
  let responseTime = Date.now() - startTime;

  try {
    // Try OpenAI first
    console.log('Attempting OpenAI API call...');
    const responseData = await callOpenAI({
      model: selectedModel,
      systemPrompt: systemPrompt || defaultSystemPrompt,
      userMessage: prompt,
      apiKey: env.OPENAI_API_KEY
    });

    if (responseData.error) {
      throw new Error(`OpenAI API error: ${responseData.error.message || responseData.error}`);
    }

    aiResponse = responseData.choices?.[0]?.message?.content || "";
    tokensUsed = responseData.usage?.total_tokens || 0;
    
    if (!aiResponse) {
      throw new Error('Empty response from OpenAI');
    }

    console.log('OpenAI response successful');
    
  } catch (openaiError) {
    console.error('OpenAI failed, trying Perplexity backup:', openaiError);
    
    // Try Perplexity as backup
    try {
      const perplexityApiKey = env.PERPLEXITY_API_KEY;
      if (!perplexityApiKey) {
        throw new Error('No Perplexity API key available for backup');
      }

      console.log('Attempting Perplexity API call...');
      const perplexityResponse = await callPerplexity({
        prompt,
        systemPrompt: systemPrompt || defaultSystemPrompt,
        apiKey: perplexityApiKey
      });

      if (perplexityResponse.error) {
        throw new Error(`Perplexity API error: ${perplexityResponse.error.message || perplexityResponse.error}`);
      }

      aiResponse = perplexityResponse.choices?.[0]?.message?.content || "";
      tokensUsed = perplexityResponse.usage?.total_tokens || 0;
      modelUsed = 'perplexity-llama-3.1-sonar-small';
      
      if (!aiResponse) {
        throw new Error('Empty response from Perplexity');
      }

      console.log('Perplexity backup response successful');
      
    } catch (perplexityError) {
      console.error('Both OpenAI and Perplexity failed:', perplexityError);
      
      // Final fallback response
      aiResponse = "I apologize, but I'm experiencing technical difficulties at the moment. Please try again in a few minutes, or contact support if the issue persists.";
      tokensUsed = 0;
      modelUsed = 'fallback';
    }
  }

  responseTime = Date.now() - startTime;
  
  // Estimate cost
  const estimatedCost = calculateCost(tokensUsed, modelUsed);
  
  // Cache the response (only if we got a real response, not fallback)
  if (modelUsed !== 'fallback') {
    try {
      await cacheResponse(supabase, {
        promptHash,
        prompt,
        response: aiResponse,
        model: modelUsed,
        tokens: tokensUsed
      });
    } catch (cacheError) {
      console.error('Error caching response:', cacheError);
      // Don't fail the request if caching fails
    }
  }
  
  // Log usage
  if (userId) {
    try {
      await logUsage(supabase, {
        userId,
        prompt,
        model: modelUsed,
        complexity,
        tokens: tokensUsed,
        responseTime,
        cost: estimatedCost
      });
    } catch (logError) {
      console.error('Error logging usage:', logError);
      // Don't fail the request if logging fails
    }
  }
  
  return new Response(
    JSON.stringify({ 
      text: aiResponse, 
      model: modelUsed,
      tokens: tokensUsed,
      complexity: complexity,
      fromCache: false
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
