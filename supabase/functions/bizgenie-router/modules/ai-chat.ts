
import { corsHeaders } from "../utils/cors.ts";
import { md5 } from "../utils/cache.ts";
import { MODEL_O1_MINI, MODEL_O3_MINI_HIGH, MODEL_GPT4, callOpenAI, calculateCost } from "../models/openai.ts";
import { getSupabaseClient, logUsage, cacheResponse } from "../utils/supabase-client.ts";
import { classifyQueryComplexity } from "./classifier.ts";

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
  
  // Default system prompt if not provided
  const defaultSystemPrompt = `You are BizGenie, a professional AI assistant specializing in business advice. 
  Provide concise, practical insights based on business best practices. 
  Be conversational but direct, focusing on actionable advice.`;

  // Call OpenAI API with selected model
  const responseData = await callOpenAI({
    model: selectedModel,
    systemPrompt: systemPrompt || defaultSystemPrompt,
    userMessage: prompt,
    apiKey: env.OPENAI_API_KEY
  });

  const aiResponse = responseData.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
  const tokensUsed = responseData.usage?.total_tokens || 0;
  const responseTime = Date.now() - startTime;
  
  // Estimate cost
  const estimatedCost = calculateCost(tokensUsed, selectedModel);
  
  // Cache the response
  await cacheResponse(supabase, {
    promptHash,
    prompt,
    response: aiResponse,
    model: selectedModel,
    tokens: tokensUsed
  });
  
  // Log usage
  await logUsage(supabase, {
    userId,
    prompt,
    model: selectedModel,
    complexity,
    tokens: tokensUsed,
    responseTime,
    cost: estimatedCost
  });
  
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
}
