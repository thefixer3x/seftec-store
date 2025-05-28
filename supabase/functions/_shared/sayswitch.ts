import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

// Configuration - these come from environment variables
export const SAYSWITCH_CONFIG = {
  baseUrl: Deno.env.get("SAYSWITCH_BASE_URL") || "https://backendapi.sayswitchgroup.com/api/v1",
  secretKey: Deno.env.get("SAYSWITCH_SECRET_KEY") || "",
  publicKey: Deno.env.get("SAYSWITCH_PUBLIC_KEY") || "",
};

// HMAC signing function - critical for security
export function signPayload(payload: Record<string, any>): string {
  // Sort keys alphabetically as required by SaySwitch
  const sortedPayload = Object.keys(payload)
    .sort()
    .reduce((obj, key) => {
      obj[key] = payload[key];
      return obj;
    }, {} as Record<string, any>);

  // Create HMAC-SHA512 signature
  const hmac = createHmac("sha512", SAYSWITCH_CONFIG.publicKey);
  hmac.update(JSON.stringify(sortedPayload));
  return hmac.digest("hex");
}

// Standard headers for all requests
export function getHeaders(requiresEncryption = false, payload?: Record<string, any>) {
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${SAYSWITCH_CONFIG.secretKey}`,
    "Content-Type": "application/json",
  };

  if (requiresEncryption && payload) {
    headers["Encryption"] = signPayload(payload);
  }

  return headers;
}

// Error handling with retry logic
export async function saySwitchRequest(
  endpoint: string,
  options: {
    method?: string;
    body?: Record<string, any>;
    requiresEncryption?: boolean;
    maxRetries?: number;
  } = {}
) {
  const {
    method = "GET",
    body,
    requiresEncryption = false,
    maxRetries = 3
  } = options;

  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `${SAYSWITCH_CONFIG.baseUrl}${endpoint}`,
        {
          method,
          headers: getHeaders(requiresEncryption, body),
          body: body ? JSON.stringify(body) : undefined,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 429) {
          // Rate limited - wait before retry
          const retryAfter = response.headers.get("Retry-After") || "5";
          await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter) * 1000));
          continue;
        }
        
        if (response.status === 401 && attempt < maxRetries) {
          // Auth error - might be temporary
          continue;
        }

        throw new Error(data.message || `API error: ${response.status}`);
      }

      return data;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx except 429 and 401)
      if (error.message?.includes("4") && !error.message?.includes("429") && !error.message?.includes("401")) {
        throw error;
      }
      
      // Exponential backoff
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new Error("Request failed after retries");
}

// Add CORS headers for Edge Function responses
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};
