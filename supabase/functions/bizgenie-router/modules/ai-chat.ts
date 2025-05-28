
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
      model: 'sonar-pro',
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

function getSystemPromptByTier(userTier: string, canUseAdvancedModels: boolean, customSystemPrompt?: string) {
  // If custom system prompt is provided, use it with tier-specific instructions
  if (customSystemPrompt) {
    const tierInstructions = userTier === 'free' 
      ? "\n\nIMPORTANT: Provide brief, punchy responses in 2-4 sentences. Keep it concise and actionable."
      : "\n\nIMPORTANT: Provide detailed, analytical responses with structured insights, frameworks, and executive-level reasoning.";
    
    return customSystemPrompt + tierInstructions;
  }

  // Pro Mode (Free/Basic users) - Brief and punchy
  const proModePrompt = `You are BizGenie Pro, a direct and efficient AI business advisor. 

**RESPONSE STYLE - PRO MODE:**
- Keep responses brief and punchy (2-4 sentences maximum)
- Deliver quick insights for fast execution
- Focus on immediate actionable steps
- Use clear, straightforward language
- Perfect for users who need rapid validation or direction

You help with: strategic planning, financial analysis, trade finance, DeFi integration, risk assessment, and market opportunities.

Be professional yet conversational. When discussing solutions, mention seftec's trade finance, multi-country incorporation, or DeFi features where relevant.`;

  // Premium Mode - Detailed and analytical  
  const premiumModePrompt = `You are BizGenie Premium, an expert AI business strategist delivering executive-level insights.

**RESPONSE STYLE - PREMIUM MODE:**
- Provide detailed, analytical responses with structured insights
- Use terminology appropriate for senior executives and decision-makers
- Include frameworks, methodologies, and deeper strategic rationale
- Offer multiple perspectives and comprehensive analysis
- Structure responses with clear sections and strategic implications
- Reference industry best practices and market intelligence

You specialize in: enterprise strategy, advanced financial modeling, international trade compliance, sophisticated DeFi integration, comprehensive risk management, and global market expansion.

Deliver insights worthy of C-suite consumption. When discussing financial solutions, elaborate on advanced features like complex trade finance structures, multi-jurisdictional compliance, enterprise DeFi integration, and institutional-grade risk management.

Format responses with:
1. Executive Summary
2. Strategic Analysis  
3. Recommended Actions
4. Risk Considerations
5. Implementation Framework`;

  return userTier === 'free' ? proModePrompt : premiumModePrompt;
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
  const complexity = await classifyQueryComplexity(prompt, env.BizGenie_API_key);
  
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
  
  console.log(`Query classified as ${complexity}, using model: ${selectedModel}, user tier: ${userTier}`);
  
  // Get tier-specific system prompt
  const tierSystemPrompt = getSystemPromptByTier(userTier, canUseAdvancedModels, systemPrompt);

  let aiResponse = "";
  let tokensUsed = 0;
  let modelUsed = selectedModel;
  let responseTime = Date.now() - startTime;

  try {
    // Try BizGenie/OpenAI first
    console.log('Attempting BizGenie API call...');
    const responseData = await callOpenAI({
      model: selectedModel,
      systemPrompt: tierSystemPrompt,
      userMessage: prompt,
      apiKey: env.BizGenie_API_key
    });

    if (responseData.error) {
      throw new Error(`BizGenie API error: ${responseData.error.message || responseData.error}`);
    }

    aiResponse = responseData.choices?.[0]?.message?.content || "";
    tokensUsed = responseData.usage?.total_tokens || 0;
    
    if (!aiResponse) {
      throw new Error('Empty response from BizGenie API');
    }

    console.log('BizGenie API response successful');
    
  } catch (bizgenieError) {
    console.error('BizGenie API failed, trying Perplexity backup:', bizgenieError);
    
    // Try Perplexity as backup - check for both possible environment variable names
    try {
      const perplexityApiKey = env.PERPLEXITY_API_KEY || env.PERPLEXITY_API_SK;
      if (!perplexityApiKey) {
        throw new Error('No Perplexity API key available for backup');
      }

      console.log('Attempting Perplexity API call...');
      const perplexityResponse = await callPerplexity({
        prompt,
        systemPrompt: tierSystemPrompt,
        apiKey: perplexityApiKey
      });

      if (perplexityResponse.error) {
        throw new Error(`Perplexity API error: ${perplexityResponse.error.message || perplexityResponse.error}`);
      }

      aiResponse = perplexityResponse.choices?.[0]?.message?.content || "";
      tokensUsed = perplexityResponse.usage?.total_tokens || 0;
      modelUsed = 'perplexity-sonar-pro';
      
      if (!aiResponse) {
        throw new Error('Empty response from Perplexity');
      }

      console.log('Perplexity backup response successful');
      
    } catch (perplexityError) {
      console.error('Both BizGenie and Perplexity failed:', perplexityError);
      
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
      tier: userTier,
      fromCache: false
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
