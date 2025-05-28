import { encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

// PayPal API configuration
interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  webhookId?: string;
}

// Initialize PayPal configuration from environment variables
export const PAYPAL_CONFIG: PayPalConfig = {
  clientId: Deno.env.get("PAYPAL_CLIENT_ID") || "",
  clientSecret: Deno.env.get("PAYPAL_CLIENT_SECRET") || "",
  baseUrl: Deno.env.get("PAYPAL_MODE") === "production" 
    ? "https://api-m.paypal.com" 
    : "https://api-m.sandbox.paypal.com",
  webhookId: Deno.env.get("PAYPAL_WEBHOOK_ID"),
};

// CORS headers
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// Error types
export interface PayPalError {
  code: string;
  message: string;
  details?: any[];
}

// Generate PayPal access token
export async function getAccessToken(): Promise<string> {
  try {
    const auth = encode(`${PAYPAL_CONFIG.clientId}:${PAYPAL_CONFIG.clientSecret}`);
    const response = await fetch(`${PAYPAL_CONFIG.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PayPal access token error:", errorData);
      throw new Error(`PayPal API error: ${errorData.error_description || "Failed to get access token"}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("PayPal access token exception:", error);
    throw new Error(`Failed to get PayPal access token: ${error.message}`);
  }
}

// Make a request to PayPal API
export async function paypalRequest(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    retries?: number;
  } = {}
) {
  const {
    method = "GET",
    body,
    headers = {},
    retries = 3,
  } = options;

  try {
    // Get access token for API calls
    const accessToken = await getAccessToken();
    
    // Prepare headers
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      ...headers,
    };

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // Add body if provided
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    // Make the request
    let response: Response | null = null;
    let retryCount = 0;
    
    while (retryCount < retries) {
      try {
        response = await fetch(`${PAYPAL_CONFIG.baseUrl}${endpoint}`, requestOptions);
        break;
      } catch (error) {
        retryCount++;
        if (retryCount >= retries) {
          throw error;
        }
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, 2 ** retryCount * 100));
      }
    }

    if (!response) {
      throw new Error("No response received from PayPal API");
    }

    // Parse response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      console.error("PayPal API error:", responseData);
      
      // Format error for consistent handling
      return {
        success: false,
        status: response.status,
        error: {
          code: responseData.name || "UNKNOWN_ERROR",
          message: responseData.message || "Unknown PayPal error",
          details: responseData.details || [],
        },
      };
    }

    // Return successful response
    return {
      success: true,
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("PayPal request exception:", error);
    
    return {
      success: false,
      status: 500,
      error: {
        code: "REQUEST_FAILED",
        message: `PayPal request failed: ${error.message}`,
      },
    };
  }
}

// Verify webhook signature
export async function verifyWebhookSignature(
  requestBody: string,
  headers: {
    "paypal-auth-algo"?: string;
    "paypal-cert-url"?: string;
    "paypal-transmission-id"?: string;
    "paypal-transmission-sig"?: string;
    "paypal-transmission-time"?: string;
  }
): Promise<boolean> {
  try {
    if (!PAYPAL_CONFIG.webhookId) {
      console.error("Missing webhookId in PayPal configuration");
      return false;
    }

    const verificationBody = {
      auth_algo: headers["paypal-auth-algo"],
      cert_url: headers["paypal-cert-url"],
      transmission_id: headers["paypal-transmission-id"],
      transmission_sig: headers["paypal-transmission-sig"],
      transmission_time: headers["paypal-transmission-time"],
      webhook_id: PAYPAL_CONFIG.webhookId,
      webhook_event: JSON.parse(requestBody),
    };

    const accessToken = await getAccessToken();
    
    const response = await fetch(`${PAYPAL_CONFIG.baseUrl}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(verificationBody),
    });

    const data = await response.json();
    
    return data.verification_status === "SUCCESS";
  } catch (error) {
    console.error("Webhook verification error:", error);
    return false;
  }
}

// Format PayPal error for consistent client response
export function formatPayPalError(error: PayPalError | Error): { code: string; message: string } {
  if (error instanceof Error) {
    return {
      code: "ERROR",
      message: error.message,
    };
  }
  
  return {
    code: error.code || "UNKNOWN_ERROR",
    message: error.message || "Unknown PayPal error",
  };
}
