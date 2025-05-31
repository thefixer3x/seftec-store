
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

export function getSupabaseClient(supabaseUrl: string, supabaseKey: string) {
  return createClient(supabaseUrl, supabaseKey);
}

export async function logUsage(supabase: any, usageData: {
  userId: string;
  prompt: string;
  model: string;
  tokens: number;
  responseTime: number;
  cost: number;
}) {
  try {
    // Try to insert usage log without complexity column for now
    const { error } = await supabase
      .from('ai_usage_logs')
      .insert({
        user_id: usageData.userId,
        prompt: usageData.prompt.substring(0, 500), // Limit prompt length
        model_used: usageData.model,
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
