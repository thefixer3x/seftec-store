
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

export function getSupabaseClient(url: string, key: string) {
  return createClient(url, key);
}

export async function logUsage(supabase: any, data: {
  userId: string;
  prompt: string;
  model: string;
  complexity: string;
  tokens: number;
  responseTime: number;
  cost: number;
}) {
  try {
    const { error } = await supabase
      .from('ai_usage_logs')
      .insert({
        user_id: data.userId,
        prompt: data.prompt.substring(0, 1000), // Limit prompt length
        model_used: data.model,
        complexity: data.complexity,
        tokens_used: data.tokens,
        response_time_ms: data.responseTime,
        estimated_cost: data.cost,
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error logging usage:', error);
    }
  } catch (error) {
    console.error('Error in logUsage:', error);
  }
}

export async function cacheResponse(supabase: any, data: {
  promptHash: string;
  prompt: string;
  response: string;
  model: string;
  tokens: number;
}) {
  try {
    // Use upsert instead of insert with onConflict
    const { error } = await supabase
      .from('ai_response_cache')
      .upsert({
        prompt_hash: data.promptHash,
        prompt: data.prompt.substring(0, 1000), // Limit prompt length
        response: data.response,
        model_used: data.model,
        tokens_used: data.tokens,
        hit_count: 1,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        created_at: new Date().toISOString()
      }, {
        onConflict: 'prompt_hash'
      });
    
    if (error) {
      console.error('Error caching response:', error);
    }
  } catch (error) {
    console.error('Error in cacheResponse:', error);
  }
}
