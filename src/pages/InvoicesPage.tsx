import React, { useState } from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  DollarSign,
  Loader2,
  Eye,
  X,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useInvoices, type Invoice, type CreateInvoiceInput, type CreateInvoiceItemInput } from '@/hooks/use-invoices';
import { useCustomers } from '@/hooks/use-customers';
import { format, formatDistanceToNow, isPast } from 'date-fns';

const InvoicesPageContent = () => {
  const {
    invoices,
    stats,
    isLoading,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    sendInvoice,
    markAsPaid,
    isCreating,
    isUpdating,
    isSending,
    isRecordingPayment,
  } = useInvoices();

  const { customers } = useCustomers();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<CreateInvoiceInput, 'items'>>({
    customer_id: '',
    due_date: '',
    currency_code: 'USD',
    tax_rate: 0,
    discount_amount: 0,
    shipping_cost: 0,
    payment_terms: 'Net 30',
    notes: '',
  });

  const [lineItems, setLineItems] = useState<CreateInvoiceItemInput[]>([
    { description: '', quantity: 1, unit_price: 0 }
  ]);

  const resetForm = () => {
    setFormData({
      customer_id: '',
      due_date: '',
      currency_code: 'USD',
      tax_rate: 0,
      discount_amount: 0,
      shipping_cost: 0,
      payment_terms: 'Net 30',
      notes: '',
    });
    setLineItems([{ description: '', quantity: 1, unit_price: 0 }]);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, unit_price: 0 }]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (index: number, field: keyof CreateInvoiceItemInput, value: string | number) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * ((formData.tax_rate || 0) / 100);
    return subtotal + tax + (formData.shipping_cost || 0) - (formData.discount_amount || 0);
  };

  const handleCreateInvoice = () => {
    if (!formData.due_date || lineItems.some(item => !item.description || item.unit_price <= 0)) {
      return;
    }

    createInvoice({
      ...formData,
      items: lineItems,
    }, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        resetForm();
      }
    });
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (confirm(`Are you sure you want to delete invoice ${invoice.invoice_number}?`)) {
      deleteInvoice(invoice.id);
    }
  };

  const handleSendInvoice = (invoice: Invoice) => {
    sendInvoice(invoice.id);
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    markAsPaid({ invoiceId: invoice.id });
  };

  const openViewDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  const searchLower = searchQuery.toLowerCase();
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch =
      invoice.invoice_number.toLowerCase().includes(searchLower) ||
      (invoice.customers?.customer_name ?? '').toLowerCase().includes(searchLower) ||
      (invoice.customers?.company_name ?? '').toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'refunded': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (invoice: Invoice) => {
    return invoice.status === 'sent' && isPast(new Date(invoice.due_date));
  };

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
          <h1 className="text-3xl font-bold">Invoice Management</h1>
          <p className="text-muted-foreground mt-1">Create and track invoices</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new invoice.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Customer & Dates */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Customer</Label>
                  <Select
                    value={formData.customer_id}
                    onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.customer_name}
                          {customer.company_name && ` - ${customer.company_name}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date *</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment Terms</Label>
                  <Select
                    value={formData.payment_terms}
                    onValueChange={(value) => setFormData({ ...formData, payment_terms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 45">Net 45</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Line Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                    <Plus className="w-4 h-4 mr-1" /> Add Item
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Description</TableHead>
                        <TableHead className="w-[15%]">Quantity</TableHead>
                        <TableHead className="w-[20%]">Unit Price</TableHead>
                        <TableHead className="w-[15%]">Total</TableHead>
                        <TableHead className="w-[10%]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              placeholder="Item description"
                              value={item.description}
                              onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unit_price}
                              onChange={(e) => updateLineItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            ${(item.quantity * item.unit_price).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLineItem(index)}
                              disabled={lineItems.length === 1}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Totals */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tax Rate (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.tax_rate}
                        onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Discount ($)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.discount_amount}
                        onChange={(e) => setFormData({ ...formData, discount_amount: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Shipping Cost ($)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.shipping_cost}
                      onChange={(e) => setFormData({ ...formData, shipping_cost: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Additional notes for the customer..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {(formData.tax_rate || 0) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax ({formData.tax_rate}%)</span>
                      <span>${(calculateSubtotal() * (formData.tax_rate || 0) / 100).toFixed(2)}</span>
                    </div>
                  )}
                  {(formData.shipping_cost || 0) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${formData.shipping_cost?.toFixed(2)}</span>
                    </div>
                  )}
                  {(formData.discount_amount || 0) > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${formData.discount_amount?.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateInvoice}
                disabled={isCreating || !formData.due_date || lineItems.some(item => !item.description)}
              >
                {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalOutstanding.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.overdue}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
              <p className="text-muted-foreground mb-4">Create your first invoice to get started.</p>
              <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono font-medium">
                      {invoice.invoice_number}
                    </TableCell>
                    <TableCell>
                      {invoice.customers ? (
                        <div>
                          <p className="font-medium">{invoice.customers.customer_name}</p>
                          {invoice.customers.company_name && (
                            <p className="text-sm text-muted-foreground">{invoice.customers.company_name}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.invoice_date), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <span className={isOverdue(invoice) ? 'text-red-600 font-medium' : ''}>
                        {format(new Date(invoice.due_date), 'MMM d, yyyy')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(isOverdue(invoice) ? 'overdue' : invoice.status)}>
                        {isOverdue(invoice) ? 'Overdue' : invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${invoice.total_amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {invoice.balance_due > 0 ? (
                        <span className="text-red-600">${invoice.balance_due.toFixed(2)}</span>
                      ) : (
                        <span className="text-green-600">$0.00</span>
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
                          <DropdownMenuItem onClick={() => openViewDialog(invoice)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          {invoice.status === 'draft' && (
                            <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>
                              <Send className="w-4 h-4 mr-2" />
                              Send Invoice
                            </DropdownMenuItem>
                          )}
                          {['sent', 'overdue'].includes(invoice.status) && invoice.balance_due > 0 && (
                            <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice)}>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Record Payment
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteInvoice(invoice)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Invoice Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice {selectedInvoice?.invoice_number}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Customer</Label>
                  <p className="font-medium">{selectedInvoice.customers?.customer_name || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Invoice Date</Label>
                  <p className="font-medium">{format(new Date(selectedInvoice.invoice_date), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Due Date</Label>
                  <p className="font-medium">{format(new Date(selectedInvoice.due_date), 'MMMM d, yyyy')}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${selectedInvoice.subtotal.toFixed(2)}</span>
                </div>
                {selectedInvoice.tax_amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax ({selectedInvoice.tax_rate}%)</span>
                    <span>${selectedInvoice.tax_amount.toFixed(2)}</span>
                  </div>
                )}
                {selectedInvoice.shipping_cost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${selectedInvoice.shipping_cost.toFixed(2)}</span>
                  </div>
                )}
                {selectedInvoice.discount_amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${selectedInvoice.discount_amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${selectedInvoice.total_amount.toFixed(2)}</span>
                  </div>
                </div>
                {selectedInvoice.amount_paid > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Amount Paid</span>
                    <span>-${selectedInvoice.amount_paid.toFixed(2)}</span>
                  </div>
                )}
                {selectedInvoice.balance_due > 0 && (
                  <div className="flex justify-between font-bold text-red-600">
                    <span>Balance Due</span>
                    <span>${selectedInvoice.balance_due.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {selectedInvoice.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="mt-1">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedInvoice?.status === 'draft' && (
              <Button onClick={() => {
                handleSendInvoice(selectedInvoice);
                setIsViewDialogOpen(false);
              }}>
                <Send className="w-4 h-4 mr-2" />
                Send Invoice
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InvoicesPage = withErrorBoundary(InvoicesPageContent);
export default InvoicesPage;
