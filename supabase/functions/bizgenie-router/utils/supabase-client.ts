
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0';
import { corsHeaders } from './cors.ts';

export function getSupabaseClient(url: string, key: string) {
  return createClient(url, key);
}

export async function logUsage(supabase: any, {
  userId,
  prompt,
  model,
  complexity,
  tokens,
  responseTime,
  cost
}) {
  try {
    if (userId) {
      await supabase
        .from('ai_usage_logs')
        .insert({
          user_id: userId,
          prompt: prompt,
          model_used: model,
          query_complexity: complexity,
          tokens_used: tokens,
          response_time_ms: responseTime,
          estimated_cost: cost
        });
    }
  } catch (error) {
    console.error("Error logging usage:", error);
  }
}

export async function cacheResponse(supabase: any, {
  promptHash,
  prompt,
  response,
  model,
  tokens
}) {
  try {
    await supabase
      .from('ai_response_cache')
      .insert({
        prompt_hash: promptHash,
        prompt: prompt,
        response: response,
        model_used: model,
        tokens_used: tokens,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Cache for 30 days
      })
      .onConflict('prompt_hash')
      .merge();
  } catch (error) {
    console.error("Error caching response:", error);
  }
}
