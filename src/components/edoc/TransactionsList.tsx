import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';
import { useEdocIntegration } from '@/hooks/useEdocIntegration';

interface Transaction {
  id: string;
  transaction_id: string;
  amount: number;
  transaction_type: 'credit' | 'debit';
  description: string;
  category: string;
  transaction_date: string;
  balance_after: number;
  reference: string;
}

interface BankAccount {
  id: string;
  bank_name: string;
  consent_status: string;
}

interface TransactionsListProps {
  bankAccounts: BankAccount[];
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ bankAccounts }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  const { getTransactions } = useEdocIntegration();

  const activeAccounts = bankAccounts.filter(account => account.consent_status === 'active');

  useEffect(() => {
    if (activeAccounts.length > 0) {
      loadTransactions();
    }
  }, [activeAccounts.length, selectedBank]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const accountsToSync = selectedBank === 'all' 
        ? activeAccounts.map(account => account.id)
        : [selectedBank];

      const allTransactions: Transaction[] = [];
      
      for (const accountId of accountsToSync) {
        const accountTransactions = await getTransactions(accountId);
        if (accountTransactions) {
          allTransactions.push(...accountTransactions);
        }
      }

      // Sort by date (newest first)
      allTransactions.sort((a, b) => 
        new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
      );

      setTransactions(allTransactions);
    } catch (err) {
      setError('Failed to load transactions');
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    const matchesType = typeFilter === 'all' || transaction.transaction_type === typeFilter;

    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = [...new Set(transactions.map(t => t.category))].filter(Boolean);

  const formatAmount = (amount: number, type: 'credit' | 'debit') => {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(Math.abs(amount));

    return type === 'credit' ? `+${formattedAmount}` : `-${formattedAmount}`;
  };

  if (activeAccounts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No Active Bank Connections</h3>
          <p className="text-gray-600">
            Connect and activate a bank account to view your transactions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Transaction History
          </CardTitle>
          <CardDescription>
            View and analyze your bank transactions across all connected accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Banks</SelectItem>
                {activeAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.bank_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>

            {categories.length > 0 && (
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button onClick={loadTransactions} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Filter className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-gray-600">
                {transactions.length === 0 
                  ? 'No transactions found. Try syncing your bank accounts.'
                  : 'No transactions match your current filters.'
                }
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {new Date(transaction.transaction_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.reference}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {transaction.category && (
                          <Badge variant="outline">{transaction.category}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {transaction.transaction_type === 'credit' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className="capitalize">{transaction.transaction_type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={
                          transaction.transaction_type === 'credit' 
                            ? 'text-green-600 font-semibold' 
                            : 'text-red-600 font-semibold'
                        }>
                          {formatAmount(transaction.amount, transaction.transaction_type)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN'
                        }).format(transaction.balance_after)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {filteredTransactions.length > 0 && (
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </span>
              <span>
                Total: {filteredTransactions.reduce((sum, t) => 
                  sum + (t.transaction_type === 'credit' ? t.amount : -t.amount), 0
                ).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};