import React, { useState } from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Loader2,
  RefreshCw,
  MapPin,
  Truck
} from 'lucide-react';
import { useInventory, type InventoryItem, type CreateInventoryItemInput, type CreateAdjustmentInput } from '@/hooks/use-inventory';
import { formatDistanceToNow } from 'date-fns';

const InventoryPageContent = () => {
  const {
    items,
    alerts,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
    adjustStock,
    resolveAlert,
    isCreating,
    isUpdating,
    isAdjusting,
  } = useInventory();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Form state for add/edit
  const [formData, setFormData] = useState<CreateInventoryItemInput>({
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

  // Form state for adjustments
  const [adjustmentData, setAdjustmentData] = useState<Omit<CreateAdjustmentInput, 'inventory_item_id'>>({
    adjustment_type: 'restock',
    quantity_change: 0,
    reason: '',
    notes: '',
  });

  const resetForm = () => {
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
  };

  const resetAdjustmentForm = () => {
    setAdjustmentData({
      adjustment_type: 'restock',
      quantity_change: 0,
      reason: '',
      notes: '',
    });
  };

  const handleAddItem = () => {
    createItem(formData, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        resetForm();
      }
    });
  };

  const handleEditItem = () => {
    if (!selectedItem) return;
    updateItem({
      id: selectedItem.id,
      ...formData,
    }, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        setSelectedItem(null);
        resetForm();
      }
    });
  };

  const handleAdjustStock = () => {
    if (!selectedItem) return;
    adjustStock({
      inventory_item_id: selectedItem.id,
      ...adjustmentData,
    }, {
      onSuccess: () => {
        setIsAdjustDialogOpen(false);
        setSelectedItem(null);
        resetAdjustmentForm();
      }
    });
  };

  const handleDeleteItem = (item: InventoryItem) => {
    if (confirm(`Are you sure you want to delete ${item.sku}?`)) {
      deleteItem(item.id);
    }
  };

  const openEditDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormData({
      sku: item.sku,
      barcode: item.barcode || '',
      stock_quantity: item.stock_quantity,
      reorder_point: item.reorder_point,
      reorder_quantity: item.reorder_quantity,
      unit_cost: item.unit_cost,
      location: item.location || '',
      supplier_name: item.supplier_name || '',
      supplier_contact: item.supplier_contact || '',
    });
    setIsEditDialogOpen(true);
  };

  const openAdjustDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    resetAdjustmentForm();
    setIsAdjustDialogOpen(true);
  };

  const searchLower = searchQuery.toLowerCase();
  const filteredItems = items.filter(item =>
    item.sku.toLowerCase().includes(searchLower) ||
    (item.products?.name ?? '').toLowerCase().includes(searchLower) ||
    (item.location ?? '').toLowerCase().includes(searchLower) ||
    (item.supplier_name ?? '').toLowerCase().includes(searchLower)
  );

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock_quantity === 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' };
    }
    if (item.stock_quantity <= item.reorder_point) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' };
    }
    return { label: 'In Stock', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
  };

  const totalValue = items.reduce((sum, item) => sum + (item.stock_quantity * item.unit_cost), 0);
  const lowStockCount = items.filter(item => item.stock_quantity <= item.reorder_point && item.stock_quantity > 0).length;
  const outOfStockCount = items.filter(item => item.stock_quantity === 0).length;

  const InventoryForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            placeholder="SKU-001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="barcode">Barcode</Label>
          <Input
            id="barcode"
            value={formData.barcode}
            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
            placeholder="123456789"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stock_quantity">Stock Quantity</Label>
          <Input
            id="stock_quantity"
            type="number"
            min="0"
            value={formData.stock_quantity}
            onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reorder_point">Reorder Point</Label>
          <Input
            id="reorder_point"
            type="number"
            min="0"
            value={formData.reorder_point}
            onChange={(e) => setFormData({ ...formData, reorder_point: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reorder_quantity">Reorder Qty</Label>
          <Input
            id="reorder_quantity"
            type="number"
            min="0"
            value={formData.reorder_quantity}
            onChange={(e) => setFormData({ ...formData, reorder_quantity: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="unit_cost">Unit Cost ($)</Label>
          <Input
            id="unit_cost"
            type="number"
            min="0"
            step="0.01"
            value={formData.unit_cost}
            onChange={(e) => setFormData({ ...formData, unit_cost: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Warehouse A, Shelf 3"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="supplier_name">Supplier Name</Label>
          <Input
            id="supplier_name"
            value={formData.supplier_name}
            onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })}
            placeholder="ABC Supplies"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier_contact">Supplier Contact</Label>
          <Input
            id="supplier_contact"
            value={formData.supplier_contact}
            onChange={(e) => setFormData({ ...formData, supplier_contact: e.target.value })}
            placeholder="supplier@example.com"
          />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your product inventory</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
              <DialogDescription>
                Add a new item to your inventory. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <InventoryForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem} disabled={isCreating || !formData.sku}>
                {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts Banner */}
      {alerts.length > 0 && (
        <Card className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Stock Alerts</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  You have {alerts.length} unresolved stock alert{alerts.length !== 1 ? 's' : ''}.
                </p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {alerts.slice(0, 3).map((alert) => (
                    <Badge key={alert.id} variant="outline" className="border-yellow-500">
                      {alert.alert_type.replace('_', ' ')} - Qty: {alert.current_quantity}
                    </Badge>
                  ))}
                  {alerts.length > 3 && (
                    <Badge variant="outline" className="border-yellow-500">
                      +{alerts.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{items.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ArrowUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lowStockCount}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Package className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{outOfStockCount}</p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by SKU, product name, location, or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No inventory items yet</h3>
              <p className="text-muted-foreground mb-4">Add your first inventory item to get started.</p>
              <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU / Product</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium font-mono">{item.sku}</p>
                          {item.products?.name && (
                            <p className="text-sm text-muted-foreground">{item.products.name}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.stock_quantity}</p>
                          <p className="text-xs text-muted-foreground">
                            Reorder at: {item.reorder_point}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>${item.unit_cost.toFixed(2)}</TableCell>
                      <TableCell>${(item.stock_quantity * item.unit_cost).toFixed(2)}</TableCell>
                      <TableCell>
                        {item.location ? (
                          <span className="flex items-center gap-1 text-sm">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.last_restocked_at ? (
                          <span className="text-sm">
                            {formatDistanceToNow(new Date(item.last_restocked_at), { addSuffix: true })}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openAdjustDialog(item)}>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(item)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteItem(item)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update item information below.
            </DialogDescription>
          </DialogHeader>
          <InventoryForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditItem} disabled={isUpdating || !formData.sku}>
              {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Stock Dialog */}
      <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>
              {selectedItem && (
                <>Adjust stock for <strong>{selectedItem.sku}</strong>. Current quantity: {selectedItem.stock_quantity}</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adjustment_type">Adjustment Type</Label>
              <Select
                value={adjustmentData.adjustment_type}
                onValueChange={(value) => setAdjustmentData({ ...adjustmentData, adjustment_type: value as CreateAdjustmentInput['adjustment_type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restock">Restock</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="return">Return</SelectItem>
                  <SelectItem value="damage">Damage</SelectItem>
                  <SelectItem value="theft">Theft</SelectItem>
                  <SelectItem value="adjustment">Manual Adjustment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity_change">Quantity Change</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setAdjustmentData({ ...adjustmentData, quantity_change: Math.abs(adjustmentData.quantity_change) })}
                  className={adjustmentData.quantity_change >= 0 ? 'bg-green-100' : ''}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setAdjustmentData({ ...adjustmentData, quantity_change: -Math.abs(adjustmentData.quantity_change) })}
                  className={adjustmentData.quantity_change < 0 ? 'bg-red-100' : ''}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Input
                  id="quantity_change"
                  type="number"
                  value={Math.abs(adjustmentData.quantity_change)}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    const sign = adjustmentData.quantity_change >= 0 ? 1 : -1;
                    setAdjustmentData({ ...adjustmentData, quantity_change: value * sign });
                  }}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                New quantity will be: {selectedItem ? selectedItem.stock_quantity + adjustmentData.quantity_change : 0}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                value={adjustmentData.reason}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                placeholder="Reason for adjustment"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={adjustmentData.notes}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, notes: e.target.value })}
                placeholder="Additional notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdjustStock} disabled={isAdjusting || adjustmentData.quantity_change === 0}>
              {isAdjusting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InventoryPage = withErrorBoundary(InventoryPageContent);
export default InventoryPage;
