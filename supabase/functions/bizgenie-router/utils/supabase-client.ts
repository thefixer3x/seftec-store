
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

export function getSupabaseClient(supabaseUrl: string, supabaseKey: string) {
  return createClient(supabaseUrl, supabaseKey);
}

export async function logUsage(supabase: any, usageData: {
  userId: string;
  prompt: string;
  model: string;
  complexity?: string;
  tokens: number;
  responseTime: number;
  cost: number;
}) {
  try {
    // Insert usage log without complexity column for now
    const { error } = await supabase
      .from('ai_usage_logs')
      .insert({
        user_id: usageData.userId,
        prompt: usageData.prompt.substring(0, 500), // Limit prompt length
        model_used: usageData.model,
        query_complexity: usageData.complexity || 'unknown',
        tokens_used: usageData.tokens,
        response_time_ms: usageData.responseTime,
        estimated_cost: usageData.cost,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error logging usage:', error);
    } else {
      console.log('Usage logged successfully');
    }
  } catch (err) {
    console.error('Error in logUsage function:', err);
  }
}

export async function cacheResponse(supabase: any, cacheData: {
  promptHash: string;
  prompt: string;
  response: string;
  model: string;
  tokens: number;
}) {
  try {
    const { error } = await supabase
      .from('ai_response_cache')
      .upsert({
        prompt_hash: cacheData.promptHash,
        prompt: cacheData.prompt.substring(0, 500), // Limit prompt length
        response: cacheData.response,
        model_used: cacheData.model,
        tokens_used: cacheData.tokens,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Cache for 24 hours
      });

    if (error) {
      console.error('Error caching response:', error);
    } else {
      console.log('Response cached successfully');
    }
  } catch (err) {
    console.error('Error in cacheResponse function:', err);
  }
}
