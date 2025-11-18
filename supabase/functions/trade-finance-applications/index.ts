
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

    // Create supabase client with user's JWT
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    // Get the user's JWT
    const jwt = authHeader.replace("Bearer ", "");

    // Verify the JWT and get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);

    if (userError || !user) {
      throw new Error("Invalid user token");
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "list";

    // Route to appropriate handler based on action
    switch (action) {
      case "create":
        return await createApplication(req, supabase, user.id);

      case "get":
        return await getApplication(req, supabase, user.id, url);

      case "list":
        return await listApplications(req, supabase, user.id, url);

      case "update":
        return await updateApplication(req, supabase, user.id);

      case "submit":
        return await submitApplication(req, supabase, user.id);

      case "withdraw":
        return await withdrawApplication(req, supabase, user.id);

      case "get_summary":
        return await getSummary(req, supabase, user.id);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error("Error in trade-finance-applications function:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

// Create new application (draft)
async function createApplication(req: Request, supabase: any, userId: string) {
  const {
    facility_type,
    amount,
    currency = "NGN",
    beneficiary_name,
    beneficiary_details,
    title,
    description,
    purpose,
    expiry_date,
  } = await req.json();

  // Validate required fields
  if (!facility_type || !amount || !beneficiary_name || !title) {
    throw new Error("Missing required fields: facility_type, amount, beneficiary_name, title");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  // Check if user has available credit
  const { data: creditLimit } = await supabase
    .from("trade_finance_credit_limits")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .single();

  if (creditLimit && creditLimit.available_limit < amount) {
    throw new Error(
      `Insufficient credit limit. Available: ${currency} ${creditLimit.available_limit}, Requested: ${currency} ${amount}`
    );
  }

  // Generate unique reference number
  const { data: refData } = await supabase.rpc("generate_tf_reference_number", {
    facility_type,
  });

  const reference_number = refData || `TF${Math.floor(Math.random() * 999999)}`;

  // Create application
  const { data: application, error } = await supabase
    .from("trade_finance_applications")
    .insert({
      user_id: userId,
      reference_number,
      facility_type,
      amount,
      currency,
      beneficiary_name,
      beneficiary_details,
      title,
      description,
      purpose,
      expiry_date,
      application_status: "draft",
      application_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Application created as draft",
      application,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Get single application with details
async function getApplication(req: Request, supabase: any, userId: string, url: URL) {
  const applicationId = url.searchParams.get("application_id");

  if (!applicationId) {
    throw new Error("Missing required parameter: application_id");
  }

  const { data: application, error } = await supabase
    .from("trade_finance_applications")
    .select(
      `
      *,
      documents:trade_finance_documents(
        id,
        document_type,
        file_name,
        file_url,
        file_size,
        verified,
        uploaded_at
      ),
      transactions:trade_finance_transactions(
        id,
        transaction_type,
        amount,
        currency,
        status,
        transaction_date,
        description
      )
    `
    )
    .eq("id", applicationId)
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  if (!application) {
    throw new Error("Application not found");
  }

  return new Response(
    JSON.stringify({ application }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// List user's applications
async function listApplications(req: Request, supabase: any, userId: string, url: URL) {
  const status = url.searchParams.get("status");
  const facilityType = url.searchParams.get("facility_type");
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = parseInt(url.searchParams.get("offset") || "0");

  let query = supabase
    .from("trade_finance_applications")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("application_status", status);
  }

  if (facilityType) {
    query = query.eq("facility_type", facilityType);
  }

  const { data: applications, error, count } = await query;

  if (error) throw error;

  return new Response(
    JSON.stringify({
      applications,
      total_count: count,
      limit,
      offset,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Update application (draft only)
async function updateApplication(req: Request, supabase: any, userId: string) {
  const {
    application_id,
    amount,
    beneficiary_name,
    beneficiary_details,
    title,
    description,
    purpose,
    expiry_date,
  } = await req.json();

  if (!application_id) {
    throw new Error("Missing required field: application_id");
  }

  // Verify application exists and is in draft status
  const { data: existingApp, error: checkError } = await supabase
    .from("trade_finance_applications")
    .select("id, application_status, amount")
    .eq("id", application_id)
    .eq("user_id", userId)
    .single();

  if (checkError || !existingApp) {
    throw new Error("Application not found");
  }

  if (existingApp.application_status !== "draft") {
    throw new Error("Only draft applications can be updated");
  }

  // Build update object
  const updateData: any = {};
  if (amount !== undefined) {
    if (amount <= 0) throw new Error("Amount must be greater than 0");
    updateData.amount = amount;
  }
  if (beneficiary_name !== undefined) updateData.beneficiary_name = beneficiary_name;
  if (beneficiary_details !== undefined) updateData.beneficiary_details = beneficiary_details;
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (purpose !== undefined) updateData.purpose = purpose;
  if (expiry_date !== undefined) updateData.expiry_date = expiry_date;

  const { data: application, error } = await supabase
    .from("trade_finance_applications")
    .update(updateData)
    .eq("id", application_id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Application updated",
      application,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Submit application for review
async function submitApplication(req: Request, supabase: any, userId: string) {
  const { application_id } = await req.json();

  if (!application_id) {
    throw new Error("Missing required field: application_id");
  }

  // Verify application exists and is in draft status
  const { data: existingApp, error: checkError } = await supabase
    .from("trade_finance_applications")
    .select("id, application_status, amount")
    .eq("id", application_id)
    .eq("user_id", userId)
    .single();

  if (checkError || !existingApp) {
    throw new Error("Application not found");
  }

  if (existingApp.application_status !== "draft") {
    throw new Error("Only draft applications can be submitted");
  }

  // Check if user has sufficient documents (at least 1 required)
  const { data: documents } = await supabase
    .from("trade_finance_documents")
    .select("id")
    .eq("application_id", application_id)
    .limit(1);

  if (!documents || documents.length === 0) {
    throw new Error("At least one document must be uploaded before submission");
  }

  // Update application status to submitted
  const { data: application, error } = await supabase
    .from("trade_finance_applications")
    .update({
      application_status: "submitted",
      submitted_date: new Date().toISOString(),
    })
    .eq("id", application_id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Application submitted successfully",
      application,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Withdraw application
async function withdrawApplication(req: Request, supabase: any, userId: string) {
  const { application_id } = await req.json();

  if (!application_id) {
    throw new Error("Missing required field: application_id");
  }

  // Verify application exists
  const { data: existingApp, error: checkError } = await supabase
    .from("trade_finance_applications")
    .select("id, application_status")
    .eq("id", application_id)
    .eq("user_id", userId)
    .single();

  if (checkError || !existingApp) {
    throw new Error("Application not found");
  }

  // Can only withdraw submitted or under_review applications
  if (!["submitted", "under_review"].includes(existingApp.application_status)) {
    throw new Error("Can only withdraw submitted or under review applications");
  }

  // Update application status to withdrawn
  const { data: application, error } = await supabase
    .from("trade_finance_applications")
    .update({
      application_status: "withdrawn",
    })
    .eq("id", application_id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Application withdrawn successfully",
      application,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Get summary statistics
async function getSummary(req: Request, supabase: any, userId: string) {
  // Get credit limit
  const { data: creditLimit } = await supabase
    .from("trade_finance_credit_limits")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Get active facilities total
  const { data: activeFacilities } = await supabase
    .from("trade_finance_applications")
    .select("amount")
    .eq("user_id", userId)
    .eq("application_status", "active");

  const activeFacilitiesTotal = activeFacilities?.reduce((sum: number, app: any) => sum + app.amount, 0) || 0;
  const activeFacilitiesCount = activeFacilities?.length || 0;

  // Get pending applications
  const { data: pendingApps } = await supabase
    .from("trade_finance_applications")
    .select("amount")
    .eq("user_id", userId)
    .in("application_status", ["submitted", "under_review"]);

  const pendingTotal = pendingApps?.reduce((sum: number, app: any) => sum + app.amount, 0) || 0;
  const pendingCount = pendingApps?.length || 0;

  return new Response(
    JSON.stringify({
      summary: {
        active_facilities_count: activeFacilitiesCount,
        active_facilities_total: activeFacilitiesTotal,
        pending_applications_count: pendingCount,
        pending_applications_total: pendingTotal,
        credit_limit: creditLimit?.total_limit || 0,
        used_limit: creditLimit?.used_limit || 0,
        available_limit: creditLimit?.available_limit || 0,
        currency: creditLimit?.currency || "NGN",
      },
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}
