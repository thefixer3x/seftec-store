import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, RefreshCw, Users, UserPlus, ArrowRight, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { isFeatureEnabled } from '@/features';

type Bank = {
  id: string;
  name: string;
  code: string;
  ussd_code?: string;
};

type Beneficiary = {
  id: string;
  user_id: string;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
  nickname: string;
  verified: boolean;
  last_used_at: string;
  created_at: string;
};

type TransferLimit = {
  daily_limit: number;
  used_today: number;
  remaining: number;
};

export const MoneyTransferForm = () => {
  const [formData, setFormData] = useState({
    account_number: '',
    bank_code: '',
    amount: '',
    narration: 'Payment from SEFTEC',
    save_beneficiary: false,
    nickname: '',
  });
  
  const [verified, setVerified] = useState<{
    account_name?: string;
    bank_name?: string;
    timestamp?: number;
  } | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  
  // Check if SaySwitch transfers feature is enabled
  const isTransfersEnabled = isFeatureEnabled('sayswitch_transfers');
  
  if (!isTransfersEnabled) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Money Transfer</CardTitle>
          <CardDescription>Coming soon!</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Feature not available</AlertTitle>
            <AlertDescription>
              Money transfers are coming soon to your account. Stay tuned for updates!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Fetch banks
  const { data: banks, isLoading: loadingBanks } = useQuery({
    queryKey: ['banks'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-transfer', {
        body: { action: 'get_banks' }
      });
      return data?.banks || [];
    },
    enabled: isTransfersEnabled,
  });
  
  // Fetch beneficiaries
  const { data: beneficiaries, isLoading: loadingBeneficiaries, refetch: refetchBeneficiaries } = useQuery({
    queryKey: ['beneficiaries'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-transfer', {
        body: { action: 'get_beneficiaries' }
      });
      return data?.beneficiaries || [];
    },
    enabled: isTransfersEnabled,
  });
  
  // Fetch transfer limits
  const { data: transferLimit, isLoading: loadingLimit, refetch: refetchLimit } = useQuery({
    queryKey: ['transferLimit'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-transfer', {
        body: { action: 'get_transfer_limit' }
      });
      return data || { daily_limit: 1000000, used_today: 0, remaining: 1000000 };
    },
    enabled: isTransfersEnabled,
  });
  
  // Sort banks alphabetically
  const sortedBanks = banks ? [...banks].sort((a, b) => a.name.localeCompare(b.name)) : [];
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If changing account_number or bank_code, reset verification
    if (name === 'account_number' || name === 'bank_code') {
      setVerified(null);
    }
    
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    if (name === 'bank_code') {
      setVerified(null);
    }
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, save_beneficiary: checked });
  };
  
  // Handle beneficiary selection
  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    
    setFormData({
      ...formData,
      account_number: beneficiary.account_number,
      bank_code: beneficiary.bank_code,
      nickname: beneficiary.nickname,
    });
    
    setVerified({
      account_name: beneficiary.account_name,
      bank_name: beneficiary.bank_name,
      timestamp: Date.now(),
    });
    
    setActiveTab('new');
  };
  
  // Verify account number
  const verifyAccount = async () => {
    if (!formData.account_number || !formData.bank_code) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter account number and select a bank",
      });
      return;
    }
    
    setVerifying(true);
    
    try {
      const { data } = await supabase.functions.invoke('sayswitch-transfer', {
        body: {
          action: 'verify_account',
          account_number: formData.account_number,
          bank_code: formData.bank_code,
        }
      });
      
      if (data?.success && data.account_name) {
        setVerified({
          account_name: data.account_name,
          bank_name: data.bank_name,
          timestamp: Date.now(),
        });
        
        toast({
          title: "Account Verified",
          description: `${data.account_name} - ${data.bank_name}`,
        });
        
        // Set default nickname if saving beneficiary
        if (formData.save_beneficiary && !formData.nickname) {
          setFormData({
            ...formData,
            nickname: data.account_name,
          });
        }
      } else {
        throw new Error(data?.error || "Couldn't verify account");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message,
      });
      setVerified(null);
    } finally {
      setVerifying(false);
    }
  };
  
  // Handle beneficiary deletion
  const handleDeleteBeneficiary = async (id: string) => {
    try {
      const { data } = await supabase.functions.invoke('sayswitch-transfer', {
        body: {
          action: 'delete_beneficiary',
          id,
        }
      });
      
      if (data?.success) {
        toast({
          title: "Beneficiary Deleted",
          description: "Beneficiary has been removed from your list",
        });
        
        // Refresh beneficiaries
        refetchBeneficiaries();
        
        // Reset selection if the deleted beneficiary was selected
        if (selectedBeneficiary?.id === id) {
          setSelectedBeneficiary(null);
        }
      } else {
        throw new Error(data?.error || "Couldn't delete beneficiary");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };
  
  // Process transfer
  const processTransfer = async () => {
    // Basic validation
    if (!formData.account_number || !formData.bank_code || !formData.amount) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please complete all required fields",
      });
      return;
    }
    
    // Amount validation
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid transfer amount",
      });
      return;
    }
    
    // Verify account is still valid (if verification is older than 30 minutes)
    const now = Date.now();
    const verificationAge = verified?.timestamp ? (now - verified.timestamp) / (1000 * 60) : 999;
    
    if (!verified || verificationAge > 30) {
      toast({
        variant: "destructive",
        title: "Account Verification Required",
        description: "Please verify the account details before proceeding",
      });
      return;
    }
    
    // Confirm transfer
    if (!window.confirm(`Transfer ₦${amount.toLocaleString()} to ${verified.account_name}?`)) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { data } = await supabase.functions.invoke('sayswitch-transfer', {
        body: {
          action: 'transfer',
          account_number: formData.account_number,
          bank_code: formData.bank_code,
          amount,
          narration: formData.narration,
          save_beneficiary: formData.save_beneficiary,
          nickname: formData.nickname || verified.account_name,
        }
      });
      
      if (data?.success) {
        toast({
          title: "Transfer Successful",
          description: `₦${amount.toLocaleString()} has been sent to ${verified.account_name}`,
        });
        
        // Reset form
        setFormData({
          account_number: '',
          bank_code: '',
          amount: '',
          narration: 'Payment from SEFTEC',
          save_beneficiary: false,
          nickname: '',
        });
        setVerified(null);
        
        // Refresh beneficiaries if a new one was added
        if (formData.save_beneficiary) {
          refetchBeneficiaries();
        }
        
        // Refresh limits
        refetchLimit();
      } else {
        throw new Error(data?.error || "Transfer failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transfer Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate limit progress percentage
  const limitProgressPercent = transferLimit ? 
    ((transferLimit.used_today / transferLimit.daily_limit) * 100) : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Money Transfer</span>
          {transferLimit && (
            <Badge variant="outline" className="ml-2">
              Daily Limit: ₦{transferLimit.remaining.toLocaleString()} remaining
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Send money to any Nigerian bank account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="new">
              <CreditCard className="h-4 w-4 mr-2" />
              New Transfer
            </TabsTrigger>
            <TabsTrigger value="beneficiaries">
              <Users className="h-4 w-4 mr-2" />
              Saved Beneficiaries
              {beneficiaries?.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {beneficiaries.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-4">
            {/* Transfer limits */}
            {transferLimit && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Limit: ₦{transferLimit.daily_limit.toLocaleString()}</span>
                  <span>Used: ₦{transferLimit.used_today.toLocaleString()}</span>
                </div>
                <Progress value={limitProgressPercent} className="h-2" />
              </div>
            )}
            
            {/* Selected beneficiary indicator */}
            {selectedBeneficiary && (
              <Alert className="bg-muted">
                <AlertTitle className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Using saved beneficiary
                </AlertTitle>
                <AlertDescription>
                  {selectedBeneficiary.nickname} ({selectedBeneficiary.account_name})
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="account_number">Account Number</Label>
                <Input 
                  id="account_number"
                  name="account_number"
                  placeholder="Enter 10-digit account number"
                  className="font-mono"
                  value={formData.account_number}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </div>
              
              <div>
                <Label htmlFor="bank_code">Bank</Label>
                {loadingBanks ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select 
                    value={formData.bank_code}
                    onValueChange={(value) => handleSelectChange('bank_code', value)}
                  >
                    <SelectTrigger id="bank_code">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortedBanks.map((bank: Bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="verify-btn">Account Verification</Label>
                  {verified && (
                    <Badge variant="outline" className="bg-green-50">Verified</Badge>
                  )}
                </div>
                
                {verified ? (
                  <div className="p-3 border rounded-md mt-2 bg-muted">
                    <p className="font-medium">{verified.account_name}</p>
                    <p className="text-sm text-muted-foreground">{verified.bank_name}</p>
                  </div>
                ) : (
                  <Button 
                    id="verify-btn"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={verifyAccount}
                    disabled={verifying || !formData.account_number || !formData.bank_code}
                  >
                    {verifying ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Account'
                    )}
                  </Button>
                )}
              </div>
              
              <div>
                <Label htmlFor="amount">Amount (NGN)</Label>
                <Input 
                  id="amount"
                  name="amount"
                  type="number" 
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="100"
                />
              </div>
              
              <div>
                <Label htmlFor="narration">Narration (Optional)</Label>
                <Textarea 
                  id="narration"
                  name="narration"
                  placeholder="What's this transfer for?"
                  value={formData.narration}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              
              {verified && (
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="save-beneficiary" 
                    checked={formData.save_beneficiary}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="save-beneficiary" className="cursor-pointer">Save as beneficiary</Label>
                </div>
              )}
              
              {formData.save_beneficiary && (
                <div>
                  <Label htmlFor="nickname">Nickname (optional)</Label>
                  <Input 
                    id="nickname"
                    name="nickname"
                    placeholder={verified?.account_name || "Beneficiary name"}
                    value={formData.nickname}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <Button 
                onClick={processTransfer}
                disabled={loading || !verified || !formData.amount}
                className="w-full"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Send Money
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="beneficiaries">
            {loadingBeneficiaries ? (
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : beneficiaries?.length > 0 ? (
              <div className="space-y-2">
                {beneficiaries.map((beneficiary: Beneficiary) => (
                  <div 
                    key={beneficiary.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleBeneficiarySelect(beneficiary)}
                  >
                    <div>
                      <p className="font-medium">{beneficiary.nickname || beneficiary.account_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {beneficiary.account_number} • {beneficiary.bank_name}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBeneficiarySelect(beneficiary);
                        }}
                      >
                        Select
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete ${beneficiary.nickname || beneficiary.account_name}?`)) {
                            handleDeleteBeneficiary(beneficiary.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No Saved Beneficiaries</h3>
                <p className="text-muted-foreground mb-4">
                  Save your frequent recipients to make transfers easier
                </p>
                <Button variant="outline" onClick={() => setActiveTab('new')}>
                  Make a Transfer
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex-col items-start gap-2 border-t pt-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription className="text-xs">
            Verify account details carefully before sending money. Transfers cannot be reversed once completed.
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
};
