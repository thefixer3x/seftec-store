
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
    const action = url.searchParams.get("action") || "get_cart";

    // Route to appropriate handler based on action
    switch (action) {
      case "add_to_cart":
        return await addToCart(req, supabase, user.id);

      case "update_cart_item":
        return await updateCartItem(req, supabase, user.id);

      case "remove_from_cart":
        return await removeFromCart(req, supabase, user.id);

      case "get_cart":
        return await getCart(req, supabase, user.id);

      case "clear_cart":
        return await clearCart(req, supabase, user.id);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error("Error in marketplace-cart function:", error);

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

// Add item to cart
async function addToCart(req: Request, supabase: any, userId: string) {
  const { product_id, quantity = 1 } = await req.json();

  if (!product_id) {
    throw new Error("Missing required field: product_id");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  // Check if product exists and has enough stock
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, name, price, stock_quantity")
    .eq("id", product_id)
    .single();

  if (productError || !product) {
    throw new Error("Product not found");
  }

  if (product.stock_quantity < quantity) {
    throw new Error(`Insufficient stock. Only ${product.stock_quantity} items available`);
  }

  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", product_id)
    .single();

  if (existingItem) {
    // Update existing cart item
    const newQuantity = existingItem.quantity + quantity;

    if (product.stock_quantity < newQuantity) {
      throw new Error(`Insufficient stock. Only ${product.stock_quantity} items available`);
    }

    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        message: "Cart item updated",
        cart_item: data
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    // Insert new cart item
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        user_id: userId,
        product_id,
        quantity,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        message: "Item added to cart",
        cart_item: data
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Update cart item quantity
async function updateCartItem(req: Request, supabase: any, userId: string) {
  const { cart_item_id, quantity } = await req.json();

  if (!cart_item_id || quantity === undefined) {
    throw new Error("Missing required fields: cart_item_id and quantity");
  }

  if (quantity < 0) {
    throw new Error("Quantity cannot be negative");
  }

  // Get cart item to verify ownership and get product_id
  const { data: cartItem, error: cartError } = await supabase
    .from("cart_items")
    .select("*, products(stock_quantity)")
    .eq("id", cart_item_id)
    .eq("user_id", userId)
    .single();

  if (cartError || !cartItem) {
    throw new Error("Cart item not found");
  }

  // Check stock availability
  if (cartItem.products.stock_quantity < quantity) {
    throw new Error(`Insufficient stock. Only ${cartItem.products.stock_quantity} items available`);
  }

  // If quantity is 0, remove the item
  if (quantity === 0) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cart_item_id)
      .eq("user_id", userId);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Cart item removed" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Update quantity
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cart_item_id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Cart item updated",
      cart_item: data
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Remove item from cart
async function removeFromCart(req: Request, supabase: any, userId: string) {
  const { cart_item_id } = await req.json();

  if (!cart_item_id) {
    throw new Error("Missing required field: cart_item_id");
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cart_item_id)
    .eq("user_id", userId);

  if (error) throw error;

  return new Response(
    JSON.stringify({ message: "Item removed from cart" }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Get user's cart with product details
async function getCart(req: Request, supabase: any, userId: string) {
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      created_at,
      updated_at,
      products:product_id (
        id,
        name,
        price,
        description,
        image_url,
        stock_quantity,
        category
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Calculate cart total
  const total = cartItems.reduce((sum: number, item: any) => {
    return sum + (item.products.price * item.quantity);
  }, 0);

  // Get item count
  const itemCount = cartItems.reduce((count: number, item: any) => {
    return count + item.quantity;
  }, 0);

  return new Response(
    JSON.stringify({
      cart_items: cartItems,
      total,
      item_count: itemCount
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Clear all items from cart
async function clearCart(req: Request, supabase: any, userId: string) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;

  return new Response(
    JSON.stringify({ message: "Cart cleared" }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}
