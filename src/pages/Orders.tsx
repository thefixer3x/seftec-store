import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { CalendarIcon, Package, ClipboardList, ArrowRight } from 'lucide-react';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

interface OrderWithItems {
  id: string;
  order_date: string | null;
  status: string;
  total_amount: number;
  items: OrderItem[];
}

type OrderRow = Tables<'orders'>;
type OrderItemRow = Tables<'order_items'>;
type ProductRow = Tables<'products'>;

const Orders = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, order_date, status, total_amount')
        .eq('customer_id', user?.id as string)
        .order('order_date', { ascending: false });
        
      if (ordersError) throw ordersError;
      
      if (!ordersData) {
        setOrders([]);
        setLoading(false);
        return;
      }
      
      const orderIds = ordersData
        .map((order: OrderRow) => order.id)
        .filter((id): id is string => !!id);

      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('id, order_id, product_id, quantity, unit_price')
        .in('order_id', orderIds);

      if (itemsError) throw itemsError;

      const productIds = Array.from(
        new Set((orderItems ?? []).map((item) => item.product_id).filter((id): id is string => !!id))
      );

      const { data: products, error: productsError } =
        productIds.length > 0
          ? await supabase.from('products').select('id, name').in('id', productIds)
          : { data: [] as ProductRow[], error: null };

      if (productsError) throw productsError;

      const productNameMap = new Map<string, string>(
        (products ?? [])
          .filter((product): product is ProductRow & { id: string } => !!product.id)
          .map((product) => [product.id, product.name ?? 'Unknown Product'])
      );

      const itemsByOrderId = (orderItems ?? []).reduce<Record<string, OrderItem[]>>(
        (acc, item: OrderItemRow) => {
          const orderId = item.order_id;
          if (!orderId) return acc;

          if (!acc[orderId]) {
            acc[orderId] = [];
          }

          acc[orderId].push({
            id: item.id ?? `${orderId}-${item.product_id ?? 'product'}`,
            product_name: item.product_id ? productNameMap.get(item.product_id) ?? 'Unknown Product' : 'Unknown Product',
            quantity: item.quantity ?? 0,
            unit_price: item.unit_price ?? 0,
          });
          return acc;
        },
        {}
      );

      const ordersWithItems: OrderWithItems[] = ordersData.map((order: OrderRow) => ({
        id: order.id ?? '',
        order_date: order.order_date,
        status: order.status ?? 'pending',
        total_amount: order.total_amount ?? 0,
        items: order.id ? itemsByOrderId[order.id] ?? [] : [],
      }));
      
      setOrders(ordersWithItems);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error fetching orders:', error);
      toast({
        variant: "destructive",
        title: "Failed to load orders",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date unavailable';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch ((status || 'pending').toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to view your orders</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <CalendarIcon className="h-3 w-3 mr-1" /> 
                      {formatDate(order.order_date)}
                    </CardDescription>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md">
                    {order.items.map((item, index) => (
                      <div 
                        key={item.id} 
                        className={`p-3 flex justify-between items-center ${
                          index !== order.items.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-8 w-8 text-gray-400" />
                          <div>
                            <p className="font-medium">{item.product_name}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x {formatCurrency(item.unit_price)}
                            </p>
                          </div>
                        </div>
                        <div className="font-medium">
                          {formatCurrency(item.quantity * item.unit_price)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="font-medium">Total</div>
                    <div className="text-lg font-bold">{formatCurrency(order.total_amount)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
