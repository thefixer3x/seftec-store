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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Search, Users, DollarSign, ShoppingCart, MessageSquare, Tag, Eye, Edit, Trash2, Phone, Mail, Building2 } from 'lucide-react';
import { format } from 'date-fns';

interface Customer {
  id: string;
  customer_name: string;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  customer_type: string | null;
  status: string;
  billing_address: string | null;
  shipping_address: string | null;
  credit_limit: number;
  current_balance: number;
  lifetime_value: number;
  total_orders: number;
  last_order_date: string | null;
  first_purchase_date: string | null;
  preferred_payment_method: string | null;
  notes: string | null;
  created_at: string;
}

interface CustomerInteraction {
  id: string;
  customer_id: string;
  interaction_type: string;
  subject: string | null;
  description: string;
  outcome: string | null;
  follow_up_date: string | null;
  is_completed: boolean;
  created_at: string;
}

interface CustomerTag {
  id: string;
  customer_id: string;
  tag_name: string;
  tag_color: string;
}

const CustomersPageContent = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isInteractionDialogOpen, setIsInteractionDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Form state for new customer
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    company_name: '',
    customer_type: 'individual',
    billing_address: '',
    shipping_address: '',
    credit_limit: 0,
    preferred_payment_method: '',
    notes: '',
  });

  // Interaction form state
  const [interactionData, setInteractionData] = useState({
    interaction_type: 'note',
    subject: '',
    description: '',
    outcome: '',
    follow_up_date: '',
  });

  // Fetch customers
  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ['customers', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Customer[];
    },
    enabled: !!user?.id,
  });

  // Fetch interactions for selected customer
  const { data: interactions } = useQuery({
    queryKey: ['customer-interactions', selectedCustomer?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_interactions')
        .select('*')
        .eq('customer_id', selectedCustomer!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as CustomerInteraction[];
    },
    enabled: !!selectedCustomer?.id,
  });

  // Fetch tags for selected customer
  const { data: customerTags } = useQuery({
    queryKey: ['customer-tags', selectedCustomer?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_tags')
        .select('*')
        .eq('customer_id', selectedCustomer!.id);

      if (error) throw error;
      return data as CustomerTag[];
    },
    enabled: !!selectedCustomer?.id,
  });

  // Add customer mutation
  const addCustomerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('customers')
        .insert({
          ...data,
          user_id: user!.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer added successfully');
      setIsAddDialogOpen(false);
      setFormData({
        customer_name: '',
        email: '',
        phone: '',
        company_name: '',
        customer_type: 'individual',
        billing_address: '',
        shipping_address: '',
        credit_limit: 0,
        preferred_payment_method: '',
        notes: '',
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to add customer: ${error.message}`);
    },
  });

  // Update customer mutation
  const updateCustomerMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Customer> }) => {
      const { error } = await supabase
        .from('customers')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to update customer: ${error.message}`);
    },
  });

  // Delete customer mutation
  const deleteCustomerMutation = useMutation({
    mutationFn: async (customerId: string) => {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer deleted successfully');
      setIsViewDialogOpen(false);
      setSelectedCustomer(null);
    },
    onError: (error: any) => {
      toast.error(`Failed to delete customer: ${error.message}`);
    },
  });

  // Add interaction mutation
  const addInteractionMutation = useMutation({
    mutationFn: async (data: typeof interactionData) => {
      const { error } = await supabase
        .from('customer_interactions')
        .insert({
          ...data,
          customer_id: selectedCustomer!.id,
          user_id: user!.id,
          created_by: user!.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-interactions'] });
      toast.success('Interaction logged successfully');
      setIsInteractionDialogOpen(false);
      setInteractionData({
        interaction_type: 'note',
        subject: '',
        description: '',
        outcome: '',
        follow_up_date: '',
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to log interaction: ${error.message}`);
    },
  });

  // Filter customers
  const filteredCustomers = customers?.filter((customer) => {
    const matchesSearch = customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm) ||
      customer.company_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getCustomerTypeBadge = (type: string | null) => {
    const colors: Record<string, string> = {
      individual: 'bg-blue-100 text-blue-800 border-blue-200',
      business: 'bg-purple-100 text-purple-800 border-purple-200',
      wholesale: 'bg-green-100 text-green-800 border-green-200',
      retail: 'bg-orange-100 text-orange-800 border-orange-200',
    };

    return (
      <Badge variant="outline" className={colors[type || 'individual']}>
        {type || 'individual'}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
    } else if (status === 'inactive') {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
    }
    return <Badge variant="destructive">Blocked</Badge>;
  };

  const getInteractionIcon = (type: string) => {
    const icons: Record<string, any> = {
      call: Phone,
      email: Mail,
      meeting: Users,
      chat: MessageSquare,
      note: MessageSquare,
      order: ShoppingCart,
      complaint: MessageSquare,
      feedback: MessageSquare,
    };
    const Icon = icons[type] || MessageSquare;
    return <Icon className="h-4 w-4" />;
  };

  // Calculate stats
  const totalCustomers = customers?.length || 0;
  const activeCustomers = customers?.filter((c) => c.status === 'active').length || 0;
  const totalLifetimeValue = customers?.reduce((sum, c) => sum + c.lifetime_value, 0) || 0;
  const totalOrders = customers?.reduce((sum, c) => sum + c.total_orders, 0) || 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage customer relationships and interactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="customer_name">Customer Name *</Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <Label htmlFor="customer_type">Customer Type</Label>
                <Select
                  value={formData.customer_type}
                  onValueChange={(value) => setFormData({ ...formData, customer_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="billing_address">Billing Address</Label>
                <Textarea
                  id="billing_address"
                  value={formData.billing_address}
                  onChange={(e) => setFormData({ ...formData, billing_address: e.target.value })}
                  placeholder="123 Main St, Lagos, Nigeria"
                  rows={2}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="shipping_address">Shipping Address</Label>
                <Textarea
                  id="shipping_address"
                  value={formData.shipping_address}
                  onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                  placeholder="Same as billing"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="credit_limit">Credit Limit (₦)</Label>
                <Input
                  id="credit_limit"
                  type="number"
                  value={formData.credit_limit}
                  onChange={(e) => setFormData({ ...formData, credit_limit: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="preferred_payment_method">Preferred Payment</Label>
                <Input
                  id="preferred_payment_method"
                  value={formData.preferred_payment_method}
                  onChange={(e) => setFormData({ ...formData, preferred_payment_method: e.target.value })}
                  placeholder="Bank Transfer, Cash, etc."
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes about this customer"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => addCustomerMutation.mutate(formData)}
                disabled={!formData.customer_name || addCustomerMutation.isPending}
              >
                {addCustomerMutation.isPending ? 'Adding...' : 'Add Customer'}
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-seftec-darkNavy/30 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Customers</p>
              <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-seftec-darkNavy/30 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lifetime Value</p>
              <p className="text-2xl font-bold">₦{totalLifetimeValue.toLocaleString('en-NG')}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-seftec-darkNavy/30 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-seftec-darkNavy/30 rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers by name, email, phone, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {customersLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-seftec-teal"></div>
          </div>
        ) : filteredCustomers && filteredCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Lifetime Value</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.customer_name}</p>
                        {customer.company_name && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {customer.company_name}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {customer.email && (
                          <p className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </p>
                        )}
                        {customer.phone && (
                          <p className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getCustomerTypeBadge(customer.customer_type)}</TableCell>
                    <TableCell className="font-medium">{customer.total_orders}</TableCell>
                    <TableCell>₦{customer.lifetime_value.toLocaleString('en-NG')}</TableCell>
                    <TableCell>
                      {customer.last_order_date
                        ? format(new Date(customer.last_order_date), 'MMM dd, yyyy')
                        : 'Never'}
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${customer.customer_name}?`)) {
                              deleteCustomerMutation.mutate(customer.id);
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
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No customers found. Add your first customer to get started.
          </div>
        )}
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedCustomer?.customer_name}</span>
              <div className="flex gap-2">
                <Select
                  value={selectedCustomer?.status}
                  onValueChange={(value) => {
                    if (selectedCustomer) {
                      updateCustomerMutation.mutate({
                        id: selectedCustomer.id,
                        data: { status: value },
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="interactions">
                  Interactions
                  {interactions && interactions.length > 0 && (
                    <Badge variant="outline" className="ml-2">{interactions.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Email</Label>
                    <p>{selectedCustomer.email || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Phone</Label>
                    <p>{selectedCustomer.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Company</Label>
                    <p>{selectedCustomer.company_name || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Customer Type</Label>
                    <p className="capitalize">{selectedCustomer.customer_type || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Total Orders</Label>
                    <p className="font-medium">{selectedCustomer.total_orders}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Lifetime Value</Label>
                    <p className="font-medium">₦{selectedCustomer.lifetime_value.toLocaleString('en-NG')}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Credit Limit</Label>
                    <p>₦{selectedCustomer.credit_limit.toLocaleString('en-NG')}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Current Balance</Label>
                    <p>₦{selectedCustomer.current_balance.toLocaleString('en-NG')}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-gray-500">Billing Address</Label>
                    <p>{selectedCustomer.billing_address || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-gray-500">Shipping Address</Label>
                    <p>{selectedCustomer.shipping_address || 'N/A'}</p>
                  </div>
                  {selectedCustomer.notes && (
                    <div className="col-span-2">
                      <Label className="text-sm text-gray-500">Notes</Label>
                      <p className="text-sm">{selectedCustomer.notes}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="interactions">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Communication History</h3>
                    <Button size="sm" onClick={() => setIsInteractionDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Log Interaction
                    </Button>
                  </div>

                  {interactions && interactions.length > 0 ? (
                    <div className="space-y-2">
                      {interactions.map((interaction) => (
                        <div key={interaction.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              <div className="mt-1">{getInteractionIcon(interaction.interaction_type)}</div>
                              <div>
                                <p className="font-medium capitalize">{interaction.interaction_type}</p>
                                {interaction.subject && (
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {interaction.subject}
                                  </p>
                                )}
                                <p className="text-sm text-gray-600 dark:text-gray-400">{interaction.description}</p>
                                {interaction.outcome && (
                                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                    Outcome: {interaction.outcome}
                                  </p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                  {format(new Date(interaction.created_at), 'MMM dd, yyyy HH:mm')}
                                </p>
                              </div>
                            </div>
                            {interaction.is_completed ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">No interactions logged yet.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Interaction Dialog */}
      <Dialog open={isInteractionDialogOpen} onOpenChange={setIsInteractionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Customer Interaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="interaction_type">Interaction Type</Label>
              <Select
                value={interactionData.interaction_type}
                onValueChange={(value) => setInteractionData({ ...interactionData, interaction_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Phone Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="order">Order Related</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={interactionData.subject}
                onChange={(e) => setInteractionData({ ...interactionData, subject: e.target.value })}
                placeholder="Brief subject line"
              />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={interactionData.description}
                onChange={(e) => setInteractionData({ ...interactionData, description: e.target.value })}
                placeholder="Detailed description of the interaction"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="outcome">Outcome</Label>
              <Input
                id="outcome"
                value={interactionData.outcome}
                onChange={(e) => setInteractionData({ ...interactionData, outcome: e.target.value })}
                placeholder="Result or outcome of the interaction"
              />
            </div>
            <div>
              <Label htmlFor="follow_up_date">Follow-up Date (Optional)</Label>
              <Input
                id="follow_up_date"
                type="date"
                value={interactionData.follow_up_date}
                onChange={(e) => setInteractionData({ ...interactionData, follow_up_date: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsInteractionDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => addInteractionMutation.mutate(interactionData)}
                disabled={!interactionData.description || addInteractionMutation.isPending}
              >
                {addInteractionMutation.isPending ? 'Logging...' : 'Log Interaction'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CustomersPage = withErrorBoundary(CustomersPageContent, {
  onError: (error, errorInfo) => {
    console.error("Customers page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Customers Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading your customers. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default CustomersPage;
