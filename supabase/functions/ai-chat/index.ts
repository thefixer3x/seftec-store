
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key configuration
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured in Supabase secrets');
      return new Response(JSON.stringify({ 
        error: 'AI service is not properly configured. Please contact support.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate request
    if (!req.body) {
      throw new Error('Request body is required');
    }

    const reqBody = await req.json();
    const { query, isPremium, generateReport = false } = reqBody;

    if (!query || typeof query !== 'string') {
      throw new Error('Query parameter must be a non-empty string');
    }
    
    // Input validation
    if (query.trim().length === 0) {
      throw new Error('Query cannot be empty');
    }

    // Determine system message based on premium status and whether to generate a report
    let systemMessage = isPremium 
      ? "You are a premium business AI assistant called BizGenie that provides detailed financial advice and business insights. Always format your responses with clear sections and actionable recommendations. Include specific numbers, percentages, and monetary values when applicable. Reference industry benchmarks and best practices."
      : "You are a business AI assistant called BizGenie that provides financial advice and business insights. Keep responses concise and practical.";
    
    // Modify system message for report generation
    if (generateReport) {
      systemMessage += " You are now being asked to generate a formal business report. Structure your response as a complete report with executive summary, detailed analysis, recommendations, and conclusion sections. Use markdown formatting for headings, bullet points, and emphasis. Include fictional yet realistic data points and visualizations where appropriate, described in markdown format.";
    }

    console.log(`Processing ${isPremium ? 'premium' : 'standard'} ${generateReport ? 'report' : 'query'}: ${query.substring(0, 50)}...`);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: isPremium ? 'gpt-4o' : 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: query }
        ],
        max_tokens: generateReport ? 1500 : (isPremium ? 500 : 200),
        temperature: generateReport ? 0.5 : 0.7,
      }),
    });

    // Handle non-200 responses from OpenAI
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error response:', errorData);
      
      // Check for common API key issues
      if (errorData.error?.message?.includes('API key')) {
        return new Response(JSON.stringify({ 
          error: 'AI service authentication failed. The system administrator needs to check the OpenAI API key configuration.' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(errorData.error?.message || `Error from OpenAI API: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      console.error('Unexpected OpenAI API response structure:', data);
      throw new Error('Invalid response from AI service');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('Response generated successfully');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      isReport: generateReport
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unknown error occurred',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
