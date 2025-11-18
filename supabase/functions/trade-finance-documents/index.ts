
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
      case "upload":
        return await uploadDocument(req, supabase, user.id);

      case "get":
        return await getDocument(req, supabase, user.id, url);

      case "list":
        return await listDocuments(req, supabase, user.id, url);

      case "delete":
        return await deleteDocument(req, supabase, user.id);

      case "get_upload_url":
        return await getUploadUrl(req, supabase, user.id, url);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error("Error in trade-finance-documents function:", error);

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

// Get presigned URL for file upload to Supabase Storage
async function getUploadUrl(req: Request, supabase: any, userId: string, url: URL) {
  const fileName = url.searchParams.get("file_name");
  const applicationId = url.searchParams.get("application_id");

  if (!fileName || !applicationId) {
    throw new Error("Missing required parameters: file_name, application_id");
  }

  // Verify user owns the application
  const { data: application, error: appError } = await supabase
    .from("trade_finance_applications")
    .select("id")
    .eq("id", applicationId)
    .eq("user_id", userId)
    .single();

  if (appError || !application) {
    throw new Error("Application not found or access denied");
  }

  // Generate unique file path
  const timestamp = Date.now();
  const filePath = `trade-finance/${userId}/${applicationId}/${timestamp}_${fileName}`;

  // Create a signed upload URL (valid for 60 minutes)
  const { data, error } = await supabase.storage
    .from("trade_finance_documents")
    .createSignedUploadUrl(filePath);

  if (error) throw error;

  return new Response(
    JSON.stringify({
      upload_url: data.signedUrl,
      file_path: filePath,
      token: data.token,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Register uploaded document
async function uploadDocument(req: Request, supabase: any, userId: string) {
  const {
    application_id,
    document_type,
    file_name,
    file_path,  // Path returned from getUploadUrl
    file_size,
    mime_type,
    description,
  } = await req.json();

  // Validate required fields
  if (!application_id || !document_type || !file_name || !file_path) {
    throw new Error(
      "Missing required fields: application_id, document_type, file_name, file_path"
    );
  }

  // Verify user owns the application
  const { data: application, error: appError } = await supabase
    .from("trade_finance_applications")
    .select("id, application_status")
    .eq("id", application_id)
    .eq("user_id", userId)
    .single();

  if (appError || !application) {
    throw new Error("Application not found or access denied");
  }

  // Can't upload to completed/rejected/cancelled applications
  if (["completed", "rejected", "cancelled"].includes(application.application_status)) {
    throw new Error(
      `Cannot upload documents to ${application.application_status} applications`
    );
  }

  // Get public URL for the file
  const { data: urlData } = supabase.storage
    .from("trade_finance_documents")
    .getPublicUrl(file_path);

  // Register document in database
  const { data: document, error } = await supabase
    .from("trade_finance_documents")
    .insert({
      application_id,
      user_id: userId,
      document_type,
      file_name,
      file_url: urlData.publicUrl,
      file_size,
      mime_type,
      description,
    })
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Document uploaded successfully",
      document,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Get single document
async function getDocument(req: Request, supabase: any, userId: string, url: URL) {
  const documentId = url.searchParams.get("document_id");

  if (!documentId) {
    throw new Error("Missing required parameter: document_id");
  }

  const { data: document, error } = await supabase
    .from("trade_finance_documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  if (!document) {
    throw new Error("Document not found");
  }

  return new Response(
    JSON.stringify({ document }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// List documents for an application
async function listDocuments(req: Request, supabase: any, userId: string, url: URL) {
  const applicationId = url.searchParams.get("application_id");
  const documentType = url.searchParams.get("document_type");
  const verified = url.searchParams.get("verified");

  if (!applicationId) {
    throw new Error("Missing required parameter: application_id");
  }

  // Verify user owns the application
  const { data: application, error: appError } = await supabase
    .from("trade_finance_applications")
    .select("id")
    .eq("id", applicationId)
    .eq("user_id", userId)
    .single();

  if (appError || !application) {
    throw new Error("Application not found or access denied");
  }

  let query = supabase
    .from("trade_finance_documents")
    .select("*")
    .eq("application_id", applicationId)
    .order("uploaded_at", { ascending: false });

  if (documentType) {
    query = query.eq("document_type", documentType);
  }

  if (verified !== null && verified !== undefined) {
    query = query.eq("verified", verified === "true");
  }

  const { data: documents, error } = await query;

  if (error) throw error;

  return new Response(
    JSON.stringify({
      documents,
      count: documents?.length || 0,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Delete document
async function deleteDocument(req: Request, supabase: any, userId: string) {
  const { document_id } = await req.json();

  if (!document_id) {
    throw new Error("Missing required field: document_id");
  }

  // Get document to verify ownership and get file path
  const { data: document, error: getError } = await supabase
    .from("trade_finance_documents")
    .select("*, application:trade_finance_applications(application_status)")
    .eq("id", document_id)
    .eq("user_id", userId)
    .single();

  if (getError || !document) {
    throw new Error("Document not found or access denied");
  }

  // Can't delete documents from completed applications
  if (
    ["completed", "active"].includes(document.application.application_status)
  ) {
    throw new Error(
      `Cannot delete documents from ${document.application.application_status} applications`
    );
  }

  // Extract file path from URL
  const urlParts = document.file_url.split("/");
  const filePath = urlParts.slice(urlParts.indexOf("trade-finance")).join("/");

  // Delete file from storage
  const { error: storageError } = await supabase.storage
    .from("trade_finance_documents")
    .remove([filePath]);

  if (storageError) {
    console.error("Error deleting file from storage:", storageError);
    // Continue with database deletion even if storage deletion fails
  }

  // Delete document record from database
  const { error: deleteError } = await supabase
    .from("trade_finance_documents")
    .delete()
    .eq("id", document_id)
    .eq("user_id", userId);

  if (deleteError) throw deleteError;

  return new Response(
    JSON.stringify({ message: "Document deleted successfully" }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}
