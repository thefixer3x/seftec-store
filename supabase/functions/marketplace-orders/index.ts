
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
    const action = url.searchParams.get("action") || "list_orders";

    // Route to appropriate handler based on action
    switch (action) {
      case "create_order":
        return await createOrder(req, supabase, user.id);

      case "get_order":
        return await getOrder(req, supabase, user.id);

      case "list_orders":
        return await listOrders(req, supabase, user.id);

      case "update_order_status":
        return await updateOrderStatus(req, supabase, user.id);

      case "cancel_order":
        return await cancelOrder(req, supabase, user.id);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error("Error in marketplace-orders function:", error);

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

// Create order from cart or direct items
async function createOrder(req: Request, supabase: any, userId: string) {
  const { shipping_address, items, use_cart = false } = await req.json();

  if (!shipping_address) {
    throw new Error("Missing required field: shipping_address");
  }

  let orderItems = items;

  // If use_cart is true, get items from cart
  if (use_cart) {
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select(`
        quantity,
        products:product_id (
          id,
          name,
          price,
          stock_quantity,
          vendor_id
        )
      `)
      .eq("user_id", userId);

    if (cartError) throw cartError;

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    orderItems = cartItems.map((item: any) => ({
      product_id: item.products.id,
      quantity: item.quantity,
      unit_price: item.products.price,
    }));
  }

  if (!orderItems || orderItems.length === 0) {
    throw new Error("No items to order");
  }

  // Validate all products and check stock
  for (const item of orderItems) {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, stock_quantity, price")
      .eq("id", item.product_id)
      .single();

    if (productError || !product) {
      throw new Error(`Product ${item.product_id} not found`);
    }

    if (product.stock_quantity < item.quantity) {
      throw new Error(
        `Insufficient stock for product ${item.product_id}. Only ${product.stock_quantity} items available`
      );
    }

    // Ensure price matches (prevent price manipulation)
    if (item.unit_price !== undefined && item.unit_price !== product.price) {
      console.warn(
        `Price mismatch for product ${item.product_id}. Using current price: ${product.price}`
      );
      item.unit_price = product.price;
    } else {
      item.unit_price = product.price;
    }
  }

  // Calculate total amount
  const total_amount = orderItems.reduce((sum: number, item: any) => {
    return sum + item.unit_price * item.quantity;
  }, 0);

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: userId,
      total_amount,
      shipping_address,
      status: "pending",
      order_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItemsWithOrderId = orderItems.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    subtotal: item.unit_price * item.quantity,
  }));

  const { data: createdOrderItems, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsWithOrderId)
    .select();

  if (itemsError) {
    // Rollback order if items creation fails
    await supabase.from("orders").delete().eq("id", order.id);
    throw itemsError;
  }

  // Update product stock
  for (const item of orderItems) {
    const { error: stockError } = await supabase.rpc("update_product_stock", {
      p_product_id: item.product_id,
      p_quantity_delta: -item.quantity,
    });

    // If RPC doesn't exist, use direct update
    if (stockError) {
      const { data: product } = await supabase
        .from("products")
        .select("stock_quantity")
        .eq("id", item.product_id)
        .single();

      if (product) {
        await supabase
          .from("products")
          .update({ stock_quantity: product.stock_quantity - item.quantity })
          .eq("id", item.product_id);
      }
    }
  }

  // Clear cart if use_cart was true
  if (use_cart) {
    await supabase.from("cart_items").delete().eq("user_id", userId);
  }

  return new Response(
    JSON.stringify({
      message: "Order created successfully",
      order: {
        ...order,
        order_items: createdOrderItems,
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

// Get single order details
async function getOrder(req: Request, supabase: any, userId: string) {
  const url = new URL(req.url);
  const orderId = url.searchParams.get("order_id");

  if (!orderId) {
    throw new Error("Missing required parameter: order_id");
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      id,
      total_amount,
      status,
      shipping_address,
      order_date,
      created_at,
      updated_at,
      order_items (
        id,
        quantity,
        unit_price,
        subtotal,
        products:product_id (
          id,
          name,
          description,
          image_url,
          category
        )
      )
    `)
    .eq("id", orderId)
    .eq("customer_id", userId)
    .single();

  if (error) throw error;

  if (!order) {
    throw new Error("Order not found");
  }

  return new Response(
    JSON.stringify({ order }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// List user's orders
async function listOrders(req: Request, supabase: any, userId: string) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = parseInt(url.searchParams.get("offset") || "0");

  let query = supabase
    .from("orders")
    .select(`
      id,
      total_amount,
      status,
      shipping_address,
      order_date,
      created_at,
      updated_at
    `, { count: "exact" })
    .eq("customer_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data: orders, error, count } = await query;

  if (error) throw error;

  return new Response(
    JSON.stringify({
      orders,
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

// Update order status
async function updateOrderStatus(req: Request, supabase: any, userId: string) {
  const { order_id, status } = await req.json();

  if (!order_id || !status) {
    throw new Error("Missing required fields: order_id and status");
  }

  const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled", "completed"];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
  }

  // Verify order belongs to user
  const { data: existingOrder, error: checkError } = await supabase
    .from("orders")
    .select("id, status")
    .eq("id", order_id)
    .eq("customer_id", userId)
    .single();

  if (checkError || !existingOrder) {
    throw new Error("Order not found");
  }

  // Prevent certain status transitions
  if (existingOrder.status === "cancelled" || existingOrder.status === "completed") {
    throw new Error(`Cannot update order with status: ${existingOrder.status}`);
  }

  const { data: order, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", order_id)
    .eq("customer_id", userId)
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({
      message: "Order status updated",
      order,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

// Cancel order
async function cancelOrder(req: Request, supabase: any, userId: string) {
  const { order_id } = await req.json();

  if (!order_id) {
    throw new Error("Missing required field: order_id");
  }

  // Get order with items to restore stock
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      order_items (
        product_id,
        quantity
      )
    `)
    .eq("id", order_id)
    .eq("customer_id", userId)
    .single();

  if (orderError || !order) {
    throw new Error("Order not found");
  }

  if (order.status === "cancelled" || order.status === "completed") {
    throw new Error(`Cannot cancel order with status: ${order.status}`);
  }

  // Update order status to cancelled
  const { data: updatedOrder, error: updateError } = await supabase
    .from("orders")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("id", order_id)
    .eq("customer_id", userId)
    .select()
    .single();

  if (updateError) throw updateError;

  // Restore product stock
  for (const item of order.order_items) {
    const { data: product } = await supabase
      .from("products")
      .select("stock_quantity")
      .eq("id", item.product_id)
      .single();

    if (product) {
      await supabase
        .from("products")
        .update({ stock_quantity: product.stock_quantity + item.quantity })
        .eq("id", item.product_id);
    }
  }

  return new Response(
    JSON.stringify({
      message: "Order cancelled successfully",
      order: updatedOrder,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}
