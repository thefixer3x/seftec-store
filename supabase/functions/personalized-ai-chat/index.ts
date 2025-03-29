
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

interface RequestBody {
  message: string;
  userId?: string | null;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get request body
    const body: RequestBody = await req.json();
    const { message, userId } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let userContext = '';
    
    // If userId exists, fetch user preferences for personalization
    if (userId) {
      try {
        // Get user preferences
        const { data: preferencesData, error: preferencesError } = await supabaseClient
          .from('user_preferences')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (preferencesError) throw preferencesError;

        // Get user profile data
        const { data: profileData, error: profileError } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;

        // Get recent transactions if they exist
        const { data: transactionsData, error: transactionsError } = await supabaseClient
          .from('transactions')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5);

        // Build user context string
        userContext = `
User Preferences: ${JSON.stringify(preferencesData || {})}
User Profile: ${JSON.stringify(profileData || {})}
Recent Transactions: ${JSON.stringify(transactionsData || [])}
`;
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Continue without user data if there's an error
        userContext = 'No user data available.';
      }
    }

    // Call OpenAI API with personalized context
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const prompt = `${userContext ? `Based on the following user context:\n${userContext}\n\n` : ''}Please respond to the following user message: ${message}`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant for a B2B trade and payments platform. Provide personalized advice based on user context when available. Be concise, professional, and focused on business trade, finance, and payment topics.'
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const openaiData = await openaiResponse.json();
    
    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${JSON.stringify(openaiData)}`);
    }

    const aiResponse = openaiData.choices[0].message.content;

    // Return AI response
    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
    
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
