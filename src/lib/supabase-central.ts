import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://seftechub.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

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

// Export centralized function URLs
export const FUNCTION_URLS = {
  AI_CHAT: 'https://seftechub.supabase.co/functions/v1/ai-chat',
  PERSONALIZED_AI: 'https://seftechub.supabase.co/functions/v1/personalized-ai-chat',
  BIZGENIE_ROUTER: 'https://seftechub.supabase.co/functions/v1/bizgenie-router',
  STRIPE_WEBHOOK: 'https://seftechub.supabase.co/functions/v1/stripe-webhook',
  STRIPE_CHECKOUT: 'https://seftechub.supabase.co/functions/v1/create-stripe-checkout',
  PAYPAL_PAYMENT: 'https://seftechub.supabase.co/functions/v1/paypal-payment',
  PAYPAL_WEBHOOK: 'https://seftechub.supabase.co/functions/v1/paypal-webhook',
  SAYSWITCH_PAYMENT: 'https://seftechub.supabase.co/functions/v1/sayswitch-payment',
  SAYSWITCH_WEBHOOK: 'https://seftechub.supabase.co/functions/v1/sayswitch-webhook',
  SAYSWITCH_BILLS: 'https://seftechub.supabase.co/functions/v1/sayswitch-bills',
  SAYSWITCH_TRANSFER: 'https://seftechub.supabase.co/functions/v1/sayswitch-transfer',
  EDOC_CONSENT: 'https://seftechub.supabase.co/functions/v1/edoc-consent',
  EDOC_TRANSACTIONS: 'https://seftechub.supabase.co/functions/v1/edoc-transactions',
  EDOC_WEBHOOK: 'https://seftechub.supabase.co/functions/v1/edoc-webhook',
  NOTIFICATIONS: 'https://seftechub.supabase.co/functions/v1/create-notification',
  PAYMENTS_GATEWAY: 'https://seftechub.supabase.co/functions/v1/payments-gateway',
  HEALTH_CHECK: 'https://seftechub.supabase.co/functions/v1/health-check'
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
