import { createClient } from '@supabase/supabase-js'

// Vite uses import.meta.env for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mxtsdgkwzjzlttpotole.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      'X-Project-Source': 'seftec-store',
      'X-Client-Version': '1.0.0',
      'X-Environment': process.env.NODE_ENV || 'development'
    }
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Export centralized function URLs - dynamically constructed from supabaseUrl
export const FUNCTION_URLS = {
  AI_CHAT: `${supabaseUrl}/functions/v1/ai-chat`,
  PERSONALIZED_AI: `${supabaseUrl}/functions/v1/personalized-ai-chat`,
  BIZGENIE_ROUTER: `${supabaseUrl}/functions/v1/bizgenie-router`,
  STRIPE_WEBHOOK: `${supabaseUrl}/functions/v1/stripe-webhook`,
  STRIPE_CHECKOUT: `${supabaseUrl}/functions/v1/create-stripe-checkout`,
  PAYPAL_PAYMENT: `${supabaseUrl}/functions/v1/paypal-payment`,
  PAYPAL_WEBHOOK: `${supabaseUrl}/functions/v1/paypal-webhook`,
  SAYSWITCH_PAYMENT: `${supabaseUrl}/functions/v1/sayswitch-payment`,
  SAYSWITCH_WEBHOOK: `${supabaseUrl}/functions/v1/sayswitch-webhook`,
  SAYSWITCH_BILLS: `${supabaseUrl}/functions/v1/sayswitch-bills`,
  SAYSWITCH_TRANSFER: `${supabaseUrl}/functions/v1/sayswitch-transfer`,
  EDOC_CONSENT: `${supabaseUrl}/functions/v1/edoc-consent`,
  EDOC_TRANSACTIONS: `${supabaseUrl}/functions/v1/edoc-transactions`,
  EDOC_WEBHOOK: `${supabaseUrl}/functions/v1/edoc-webhook`,
  NOTIFICATIONS: `${supabaseUrl}/functions/v1/create-notification`,
  PAYMENTS_GATEWAY: `${supabaseUrl}/functions/v1/payments-gateway`,
  HEALTH_CHECK: `${supabaseUrl}/functions/v1/health-check`
}

// Helper function for authenticated requests
export const callFunction = async (functionName: string, data?: any) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  const response = await fetch(FUNCTION_URLS[functionName as keyof typeof FUNCTION_URLS], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`,
      'X-Project-Source': 'seftec-store'
    },
    body: JSON.stringify(data)
  })
  
  return response.json()
}
