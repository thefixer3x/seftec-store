
import { corsHeaders } from "../utils/cors.ts";
import { md5 } from "../utils/cache.ts";
import { MODEL_GPT4, callOpenAI } from "../models/openai.ts";
import { getSupabaseClient, logUsage } from "../utils/supabase-client.ts";

// Function for business plan generation
export async function generateBusinessPlan(userId: string, planData: any, env: any) {
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
    const supabase = getSupabaseClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    
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
        await logUsage(supabase, {
          userId,
          prompt: "Business plan generation",
          model: cacheData.model_used,
          complexity: 'complex',
          tokens: cacheData.tokens_used,
          responseTime: 0, // Instant response
          cost: 0 // No cost for cached response
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
    const responseData = await callOpenAI({
      model: selectedModel,
      systemPrompt,
      userMessage,
      apiKey: env.OPENAI_API_KEY,
      temperature: 0.7,
      maxTokens: 4096
    });

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
      await logUsage(supabase, {
        userId,
        prompt: "Business plan generation: " + idea.substring(0, 100),
        model: selectedModel,
        complexity: 'complex',
        tokens: tokensUsed,
        responseTime,
        cost: estimatedCost
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

// Handler for business plan requests
export async function handleBusinessPlan(requestData: any, env: any) {
  const { userId, planData } = requestData;
  
  if (!planData || !planData.idea) {
    return new Response(
      JSON.stringify({ error: "Business idea is required" }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  const result = await generateBusinessPlan(userId, planData, env);
  
  return new Response(
    JSON.stringify(result),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
