import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Search, AlertTriangle, Package, TrendingUp, TrendingDown, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface InventoryItem {
  id: string;
  product_id: string | null;
  sku: string;
  barcode: string | null;
  stock_quantity: number;
  reorder_point: number;
  reorder_quantity: number;
  unit_cost: number;
  location: string | null;
  supplier_name: string | null;
  supplier_contact: string | null;
  last_restocked_at: string | null;
  product?: {
    name: string;
    category: string;
  };
}

interface StockAlert {
  id: string;
  alert_type: string;
  current_quantity: number;
  threshold_quantity: number;
  is_resolved: boolean;
  created_at: string;
  inventory_item: {
    sku: string;
    product: {
      name: string;
    };
  };
}

const InventoryPageContent = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Form state for new inventory item
  const [formData, setFormData] = useState({
    sku: '',
    barcode: '',
    stock_quantity: 0,
    reorder_point: 10,
    reorder_quantity: 50,
    unit_cost: 0,
    location: '',
    supplier_name: '',
    supplier_contact: '',
  });

  // Adjustment form state
  const [adjustmentData, setAdjustmentData] = useState({
    adjustment_type: 'restock',
    quantity_change: 0,
    reason: '',
    notes: '',
  });

  // Fetch inventory items
  const { data: inventoryItems, isLoading: itemsLoading } = useQuery({
    queryKey: ['inventory-items', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory_items')
        .select(`
          *,
          product:products(name, category)
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as InventoryItem[];
    },
    enabled: !!user?.id,
  });

  // Fetch stock alerts
  const { data: stockAlerts } = useQuery({
    queryKey: ['stock-alerts', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stock_alerts')
        .select(`
          *,
          inventory_item:inventory_items(
            sku,
            product:products(name)
          )
        `)
        .eq('user_id', user!.id)
        .eq('is_resolved', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as StockAlert[];
    },
    enabled: !!user?.id,
  });

  // Add inventory item mutation
  const addItemMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('inventory_items')
        .insert({
          ...data,
          user_id: user!.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      toast.success('Inventory item added successfully');
      setIsAddDialogOpen(false);
      setFormData({
        sku: '',
        barcode: '',
        stock_quantity: 0,
        reorder_point: 10,
        reorder_quantity: 50,
        unit_cost: 0,
        location: '',
        supplier_name: '',
        supplier_contact: '',
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to add item: ${error.message}`);
    },
  });

  // Adjust stock mutation
  const adjustStockMutation = useMutation({
    mutationFn: async ({ itemId, adjustment }: { itemId: string; adjustment: typeof adjustmentData }) => {
      const item = inventoryItems?.find((i) => i.id === itemId);
      if (!item) throw new Error('Item not found');

      const quantityChange = adjustment.adjustment_type === 'restock' || adjustment.adjustment_type === 'return'
        ? Math.abs(adjustment.quantity_change)
        : -Math.abs(adjustment.quantity_change);

      const newQuantity = item.stock_quantity + quantityChange;

      // Create adjustment record
      const { error: adjustError } = await supabase
        .from('inventory_adjustments')
        .insert({
          inventory_item_id: itemId,
          user_id: user!.id,
          adjustment_type: adjustment.adjustment_type,
          quantity_change: quantityChange,
          previous_quantity: item.stock_quantity,
          new_quantity: newQuantity,
          unit_cost: item.unit_cost,
          total_value: item.unit_cost * Math.abs(quantityChange),
          reason: adjustment.reason,
          notes: adjustment.notes,
          created_by: user!.id,
        });

      if (adjustError) throw adjustError;

      // Update inventory quantity
      const { error: updateError } = await supabase
        .from('inventory_items')
        .update({
          stock_quantity: newQuantity,
          last_restocked_at: adjustment.adjustment_type === 'restock' ? new Date().toISOString() : item.last_restocked_at,
        })
        .eq('id', itemId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      queryClient.invalidateQueries({ queryKey: ['stock-alerts'] });
      toast.success('Stock adjusted successfully');
      setIsAdjustDialogOpen(false);
      setSelectedItem(null);
      setAdjustmentData({
        adjustment_type: 'restock',
        quantity_change: 0,
        reason: '',
        notes: '',
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to adjust stock: ${error.message}`);
    },
  });

  // Delete item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      toast.success('Inventory item deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete item: ${error.message}`);
    },
  });

  const filteredItems = inventoryItems?.filter((item) =>
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock_quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (item.stock_quantity <= item.reorder_point) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Low Stock</Badge>;
    }
    return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>;
  };

  const totalInventoryValue = inventoryItems?.reduce((sum, item) => sum + (item.stock_quantity * item.unit_cost), 0) || 0;
  const lowStockCount = inventoryItems?.filter((item) => item.stock_quantity <= item.reorder_point).length || 0;
  const outOfStockCount = inventoryItems?.filter((item) => item.stock_quantity === 0).length || 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="PROD-001"
                />
              </div>
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  placeholder="123456789"
                />
              </div>
              <div>
                <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="unit_cost">Unit Cost *</Label>
                <Input
                  id="unit_cost"
                  type="number"
                  step="0.01"
                  value={formData.unit_cost}
                  onChange={(e) => setFormData({ ...formData, unit_cost: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="reorder_point">Reorder Point</Label>
                <Input
                  id="reorder_point"
                  type="number"
                  value={formData.reorder_point}
                  onChange={(e) => setFormData({ ...formData, reorder_point: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="reorder_quantity">Reorder Quantity</Label>
                <Input
                  id="reorder_quantity"
                  type="number"
                  value={formData.reorder_quantity}
                  onChange={(e) => setFormData({ ...formData, reorder_quantity: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Warehouse A, Shelf 1"
                />
              </div>
              <div>
                <Label htmlFor="supplier_name">Supplier Name</Label>
                <Input
                  id="supplier_name"
                  value={formData.supplier_name}
                  onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="supplier_contact">Supplier Contact</Label>
                <Input
                  id="supplier_contact"
                  value={formData.supplier_contact}
                  onChange={(e) => setFormData({ ...formData, supplier_contact: e.target.value })}
                  placeholder="Email or phone"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => addItemMutation.mutate(formData)} disabled={!formData.sku || addItemMutation.isPending}>
                {addItemMutation.isPending ? 'Adding...' : 'Add Item'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-seftec-darkNavy/30 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-bold">{inventoryItems?.length || 0}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-seftec-darkNavy/30 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inventory Value</p>
              <p className="text-2xl font-bold">₦{totalInventoryValue.toLocaleString('en-NG')}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-seftec-darkNavy/30 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-seftec-darkNavy/30 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="alerts">
            Stock Alerts
            {stockAlerts && stockAlerts.length > 0 && (
              <Badge variant="destructive" className="ml-2">{stockAlerts.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-4">
          <div className="bg-white dark:bg-seftec-darkNavy/30 rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by SKU or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {itemsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-seftec-teal"></div>
              </div>
            ) : filteredItems && filteredItems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Reorder Point</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                      <TableCell>{item.product?.name || 'N/A'}</TableCell>
                      <TableCell className="font-medium">{item.stock_quantity}</TableCell>
                      <TableCell>{item.reorder_point}</TableCell>
                      <TableCell>₦{item.unit_cost.toLocaleString('en-NG')}</TableCell>
                      <TableCell>₦{(item.stock_quantity * item.unit_cost).toLocaleString('en-NG')}</TableCell>
                      <TableCell>{getStockStatus(item)}</TableCell>
                      <TableCell>{item.location || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(item);
                              setIsAdjustDialogOpen(true);
                            }}
                          >
                            Adjust
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this item?')) {
                                deleteItemMutation.mutate(item.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No inventory items found. Add your first item to get started.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <div className="bg-white dark:bg-seftec-darkNavy/30 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Active Stock Alerts</h3>
            {stockAlerts && stockAlerts.length > 0 ? (
              <div className="space-y-3">
                {stockAlerts.map((alert: any) => (
                  <div key={alert.id} className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {alert.inventory_item?.product?.name || 'Unknown Product'} ({alert.inventory_item?.sku})
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {alert.alert_type === 'out_of_stock' ? 'Out of stock' : `Low stock: ${alert.current_quantity} units remaining`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Alert created {format(new Date(alert.created_at), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <Badge variant={alert.alert_type === 'out_of_stock' ? 'destructive' : 'outline'}>
                        {alert.alert_type === 'out_of_stock' ? 'Out of Stock' : 'Low Stock'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No active stock alerts. All inventory levels are healthy.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Stock Adjustment Dialog */}
      <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock - {selectedItem?.sku}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Stock: <span className="font-bold">{selectedItem?.stock_quantity}</span></p>
            </div>
            <div>
              <Label htmlFor="adjustment_type">Adjustment Type</Label>
              <Select
                value={adjustmentData.adjustment_type}
                onValueChange={(value) => setAdjustmentData({ ...adjustmentData, adjustment_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restock">Restock</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="return">Return</SelectItem>
                  <SelectItem value="damage">Damage/Loss</SelectItem>
                  <SelectItem value="theft">Theft</SelectItem>
                  <SelectItem value="adjustment">Manual Adjustment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity_change">Quantity</Label>
              <Input
                id="quantity_change"
                type="number"
                value={adjustmentData.quantity_change}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, quantity_change: parseInt(e.target.value) || 0 })}
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                value={adjustmentData.reason}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                placeholder="Brief reason for adjustment"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                value={adjustmentData.notes}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, notes: e.target.value })}
                placeholder="Additional notes"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAdjustDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => selectedItem && adjustStockMutation.mutate({ itemId: selectedItem.id, adjustment: adjustmentData })}
                disabled={!adjustmentData.quantity_change || adjustStockMutation.isPending}
              >
                {adjustStockMutation.isPending ? 'Adjusting...' : 'Adjust Stock'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InventoryPage = withErrorBoundary(InventoryPageContent, {
  onError: (error, errorInfo) => {
    console.error("Inventory page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Inventory Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading your inventory. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default InventoryPage;
