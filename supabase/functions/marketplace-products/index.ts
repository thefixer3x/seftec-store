
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
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    // Create supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "search";

    // Some actions require authentication
    let userId = null;
    const authHeader = req.headers.get("Authorization");

    if (authHeader) {
      const jwt = authHeader.replace("Bearer ", "");
      const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
      if (!userError && user) {
        userId = user.id;
      }
    }

    // Route to appropriate handler based on action
    switch (action) {
      case "search":
        return await searchProducts(req, supabase, url);

      case "get_product":
        return await getProduct(req, supabase, url);

      case "create_product":
        if (!userId) throw new Error("Authentication required");
        return await createProduct(req, supabase, userId);

      case "update_product":
        if (!userId) throw new Error("Authentication required");
        return await updateProduct(req, supabase, userId);

      case "delete_product":
        if (!userId) throw new Error("Authentication required");
        return await deleteProduct(req, supabase, userId);

      case "get_vendor_products":
        if (!userId) throw new Error("Authentication required");
        return await getVendorProducts(req, supabase, userId, url);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error("Error in marketplace-products function:", error);

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

// Search and filter products
async function searchProducts(req: Request, supabase: any, url: URL) {
  const query = url.searchParams.get("q") || "";
  const category = url.searchParams.get("category");
  const minPrice = url.searchParams.get("min_price");
  const maxPrice = url.searchParams.get("max_price");
  const sort = url.searchParams.get("sort") || "created_at";
  const order = url.searchParams.get("order") || "desc";
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const offset = parseInt(url.searchParams.get("offset") || "0");
  const inStock = url.searchParams.get("in_stock");

  let dbQuery = supabase
    .from("products")
    .select("*", { count: "exact" });

  // Search by name or description
  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
  }

  // Filter by category
  if (category) {
    dbQuery = dbQuery.eq("category", category);
  }

  // Filter by price range
  if (minPrice) {
    dbQuery = dbQuery.gte("price", parseFloat(minPrice));
  }
  if (maxPrice) {
    dbQuery = dbQuery.lte("price", parseFloat(maxPrice));
  }

  // Filter by stock availability
  if (inStock === "true") {
    dbQuery = dbQuery.gt("stock_quantity", 0);
  }

  // Sorting
  const ascending = order === "asc";
  dbQuery = dbQuery.order(sort, { ascending });

  // Pagination
  dbQuery = dbQuery.range(offset, offset + limit - 1);

  const { data: products, error, count } = await dbQuery;

  if (error) throw error;

  return new Response(
    JSON.stringify({
      products,
      total_count: count,
      limit,
      offset,
      has_more: count ? offset + limit < count : false,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Get single product details
async function getProduct(req: Request, supabase: any, url: URL) {
  const productId = url.searchParams.get("product_id");

  if (!productId) {
    throw new Error("Missing required parameter: product_id");
  }

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      vendor:vendor_id (
        id,
        full_name,
        company_name
      )
    `)
    .eq("id", productId)
    .single();

  if (error) throw error;

  if (!product) {
    throw new Error("Product not found");
  }

  // Get product reviews if they exist
  const { data: reviews } = await supabase
    .from("product_reviews")
    .select(`
      id,
      rating,
      title,
      comment,
      verified_purchase,
      created_at,
      user:user_id (
        full_name
      )
    `)
    .eq("product_id", productId)
    .order("created_at", { ascending: false })
    .limit(10);

  // Calculate average rating
  const avgRating = reviews && reviews.length > 0
    ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
    : 0;

  return new Response(
    JSON.stringify({
      product: {
        ...product,
        reviews: reviews || [],
        review_count: reviews?.length || 0,
        average_rating: avgRating,
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

// Create new product (vendor only)
async function createProduct(req: Request, supabase: any, userId: string) {
  const { name, description, price, category, stock_quantity, image_url } = await req.json();

  if (!name || price === undefined || stock_quantity === undefined) {
    throw new Error("Missing required fields: name, price, stock_quantity");
  }

  if (price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (stock_quantity < 0) {
    throw new Error("Stock quantity cannot be negative");
  }

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name,
      description,
      price,
      category,
      stock_quantity,
      image_url,
      vendor_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Product created successfully",
      product,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Update product (vendor only, own products)
async function updateProduct(req: Request, supabase: any, userId: string) {
  const { product_id, name, description, price, category, stock_quantity, image_url } =
    await req.json();

  if (!product_id) {
    throw new Error("Missing required field: product_id");
  }

  // Verify product belongs to vendor
  const { data: existingProduct, error: checkError } = await supabase
    .from("products")
    .select("id")
    .eq("id", product_id)
    .eq("vendor_id", userId)
    .single();

  if (checkError || !existingProduct) {
    throw new Error("Product not found or you don't have permission to update it");
  }

  // Build update object with only provided fields
  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) {
    if (price < 0) throw new Error("Price cannot be negative");
    updateData.price = price;
  }
  if (category !== undefined) updateData.category = category;
  if (stock_quantity !== undefined) {
    if (stock_quantity < 0) throw new Error("Stock quantity cannot be negative");
    updateData.stock_quantity = stock_quantity;
  }
  if (image_url !== undefined) updateData.image_url = image_url;

  updateData.updated_at = new Date().toISOString();

  const { data: product, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", product_id)
    .eq("vendor_id", userId)
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Product updated successfully",
      product,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Delete product (vendor only, own products)
async function deleteProduct(req: Request, supabase: any, userId: string) {
  const { product_id } = await req.json();

  if (!product_id) {
    throw new Error("Missing required field: product_id");
  }

  // Check if product has any orders
  const { data: orderItems, error: orderCheckError } = await supabase
    .from("order_items")
    .select("id")
    .eq("product_id", product_id)
    .limit(1);

  if (orderCheckError) throw orderCheckError;

  if (orderItems && orderItems.length > 0) {
    throw new Error(
      "Cannot delete product with existing orders. Consider marking it as out of stock instead."
    );
  }

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", product_id)
    .eq("vendor_id", userId);

  if (error) throw error;

  return new Response(
    JSON.stringify({ message: "Product deleted successfully" }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Get vendor's own products
async function getVendorProducts(req: Request, supabase: any, userId: string, url: URL) {
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = parseInt(url.searchParams.get("offset") || "0");

  const { data: products, error, count } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("vendor_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return new Response(
    JSON.stringify({
      products,
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
