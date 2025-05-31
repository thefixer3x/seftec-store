
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
      You are SEFTEC's BizGenie, an elite AI business consultant with access to real-time market data and enterprise-grade analytics. This is a premium competitive advantage feature of the SEFTEC platform.
      
      SEFTEC COMPETITIVE ADVANTAGE:
      - You have access to global trade finance data
      - Real-time market intelligence from 20+ countries
      - DeFi and traditional finance integration insights
      - Multi-jurisdictional compliance expertise
      - Enterprise-grade risk analytics
      
      FORMAT GUIDELINES:
      - Format your response as HTML with proper h2, h3 headers, bold text, and unordered lists.
      - Do NOT use Markdown formatting - only valid HTML.
      - Return HTML-formatted text suitable for display in a web application.
      - Use professional business plan formatting with clear sections and subsections.
      
      BUSINESS PLAN STRUCTURE:
      Create a comprehensive enterprise-grade business plan with these 12 sections:
      1. Executive Summary
      2. Company Description & Vision
      3. Market Analysis & Intelligence
      4. Target Customer Analysis
      5. Competitive Landscape Assessment
      6. Value Proposition & Differentiation
      7. Marketing & Sales Strategy
      8. Business Model & Revenue Streams
      9. Operational Plan & Infrastructure
      10. Team & Management Structure
      11. Financial Projections & Analytics
      12. Funding Strategy & Capital Requirements
      
      SEFTEC INTEGRATION FEATURES:
      - Include recommendations for DeFi integration opportunities
      - Suggest trade finance solutions relevant to the business
      - Consider multi-country expansion strategies
      - Include compliance recommendations for target markets
      - Suggest SEFTEC platform features that could benefit this business
      
      IMPORTANT RULES:
      - Leverage SEFTEC's competitive advantages in your recommendations
      - If user input is missing for a section, add "[SEFTEC AI Analysis]" prefix to generated insights
      - Include specific metrics, KPIs, and actionable items
      - Be realistic yet ambitious with projections
      - Consider global market opportunities and challenges
      - Integrate financial technology recommendations where relevant
    `;

    // Construct user message with all provided information
    const userMessage = `
      Please create a comprehensive enterprise-grade business plan leveraging SEFTEC's competitive advantages for the following business:
      
      BUSINESS IDEA: ${idea || '[Not provided - Please analyze market opportunities]'}
      
      TARGET CUSTOMERS: ${customers || '[Not provided - Please conduct customer analysis]'}
      
      REVENUE MODEL: ${revenue || '[Not provided - Please recommend optimal revenue strategies]'}
      
      COMPETITION: ${competition || '[Not provided - Please conduct competitive analysis]'}
      
      COMPETITIVE ADVANTAGES: ${advantages || '[Not provided - Please identify potential advantages]'}
      
      FUNDING NEEDS: ${funding || '[Not provided - Please estimate funding requirements]'}
      
      Additional Context: This business plan is being generated through SEFTEC's premium BizGenie service, which provides access to enterprise-grade market intelligence, DeFi integration opportunities, and global trade finance solutions.
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

    const planHtml = responseData.choices?.[0]?.message?.content || "<p>Sorry, I couldn't generate a business plan. Please try again.</p>";
    const tokensUsed = responseData.usage?.total_tokens || 0;
    const responseTime = Date.now() - startTime;
    
    // Estimate cost (updated pricing for GPT-4)
    let estimatedCost = tokensUsed * 0.00003; // $0.03 per 1000 tokens for GPT-4
    
    // Cache the response if the user consents
    if (saveData) {
      try {
        await supabase
          .from('ai_response_cache')
          .upsert({
            prompt_hash: `business-plan-${planHash}`,
            prompt: "Business plan generation: " + (idea || 'New Business').substring(0, 100),
            response: planHtml,
            model_used: selectedModel,
            tokens_used: tokensUsed,
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // Cache for 30 days
          });
      } catch (cacheError) {
        console.error('Error caching business plan:', cacheError);
        // Continue even if caching fails
      }
    }
    
    // Log usage
    if (userId) {
      try {
        await logUsage(supabase, {
          userId,
          prompt: "Business plan generation: " + (idea || 'New Business').substring(0, 100),
          model: selectedModel,
          tokens: tokensUsed,
          responseTime,
          cost: estimatedCost
        });
      } catch (logError) {
        console.error('Error logging usage:', logError);
        // Continue even if logging fails
      }
      
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
        } catch (storageError) {
          console.error('Error storing business plan data:', storageError);
          // Continue even if storage fails
        }
      }
    }
    
    return {
      planHtml,
      model: selectedModel,
      tokens: tokensUsed,
      fromCache: false,
      isBusinessPlan: true
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
      JSON.stringify({ error: "Business idea is required for premium business plan generation" }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  try {
    const result = await generateBusinessPlan(userId, planData, env);
    
    return new Response(
      JSON.stringify({
        ...result,
        message: "Premium business plan generated successfully using SEFTEC's competitive advantage features"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Business plan generation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate premium business plan. Please try again or contact support.",
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
