import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Wifi, Tv, Zap, Bookmark, BookmarkPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useFeatureFlag, FEATURE_FLAGS } from '@/features/feature-flags';

type Provider = {
  id: string;
  name: string;
  code: string;
  logo?: string;
};

type DataPlan = {
  id: string;
  name: string;
  code: string;
  amount: number;
  validity: string;
};

type TVPackage = {
  id: string;
  name: string;
  code: string;
  amount: number;
  duration: string;
};

type Favorite = {
  id: string;
  type: string;
  provider: string;
  customer_id: string;
  nickname: string;
  metadata?: Record<string, any>;
};

// This component is like a digital utility payment kiosk
// Users can pay for various services from one place
export const BillPaymentHub = () => {
  const [activeTab, setActiveTab] = useState('airtime');
  const [formData, setFormData] = useState({
    phone: '',
    dataPhone: '',
    dataProvider: '',
    dataPlan: '',
    smartcard: '',
    tvProvider: '',
    tvPackage: '',
    meterNumber: '',
    meterType: 'prepaid',
    electricityProvider: '',
    amount: '',
    saveFavorite: false,
    nickname: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);

  const supabase = useSupabaseClient();
  const { toast } = useToast();

  // Check if SaySwitch bills feature is enabled
  const { isEnabled: isBillsEnabled, isLoading: isLoadingFlag } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_BILLS);

  // Service categories with their icons
  const services = [
    { id: 'airtime', label: 'Airtime', icon: Phone, color: 'text-blue-500' },
    { id: 'data', label: 'Data', icon: Wifi, color: 'text-green-500' },
    { id: 'tv', label: 'TV', icon: Tv, color: 'text-purple-500' },
    { id: 'electricity', label: 'Power', icon: Zap, color: 'text-yellow-500' },
  ];

  // Show loading state while checking feature flag
  if (isLoadingFlag) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bill Payments</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isBillsEnabled) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bill Payments</CardTitle>
          <CardDescription>Coming soon!</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Feature not available</AlertTitle>
            <AlertDescription>
              Bill payments are coming soon to your account. Stay tuned for updates!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Fetch providers for different services
  const { data: airtimeProviders, isLoading: loadingAirtime } = useQuery({
    queryKey: ['billProviders', 'airtime'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'get_providers', category: 'airtime' }
      });
      return data?.providers || [];
    },
    enabled: activeTab === 'airtime' && isBillsEnabled,
  });
  
  const { data: dataProviders, isLoading: loadingData } = useQuery({
    queryKey: ['billProviders', 'data'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'get_providers', category: 'data' }
      });
      return data?.providers || [];
    },
    enabled: activeTab === 'data' && isBillsEnabled,
  });
  
  const { data: dataPlans, isLoading: loadingPlans } = useQuery({
    queryKey: ['dataPlans', formData.dataProvider],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'get_data_plans', provider: formData.dataProvider }
      });
      return data?.plans || [];
    },
    enabled: !!formData.dataProvider && activeTab === 'data' && isBillsEnabled,
  });
  
  const { data: tvProviders, isLoading: loadingTV } = useQuery({
    queryKey: ['billProviders', 'tv'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'get_providers', category: 'tv' }
      });
      return data?.providers || [];
    },
    enabled: activeTab === 'tv' && isBillsEnabled,
  });

  const { data: tvPackages, isLoading: loadingTVPackages } = useQuery({
    queryKey: ['tvPackages', formData.tvProvider],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'get_tv_packages', provider: formData.tvProvider }
      });
      return data?.packages || [];
    },
    enabled: !!formData.tvProvider && activeTab === 'tv' && isBillsEnabled,
  });

  const { data: electricityProviders, isLoading: loadingElectricity } = useQuery({
    queryKey: ['billProviders', 'electricity'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'get_providers', category: 'electricity' }
      });
      return data?.providers || [];
    },
    enabled: activeTab === 'electricity' && isBillsEnabled,
  });
  
  // Fetch user's bill payment favorites
  const { data: favorites, refetch: refetchFavorites } = useQuery({
    queryKey: ['billFavorites'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'get_favorites' }
      });
      return data?.favorites || [];
    },
    enabled: isBillsEnabled,
  });
  
  // Filter favorites by active tab
  const filteredFavorites = favorites?.filter((fav: Favorite) => fav.type === activeTab) || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, saveFavorite: checked });
  };
  
  const handleFavoriteSelect = (favorite: Favorite) => {
    setSelectedFavorite(favorite);
    
    switch (favorite.type) {
      case 'airtime':
        setFormData({
          ...formData,
          phone: favorite.customer_id,
          nickname: favorite.nickname,
        });
        break;
      case 'data':
        setFormData({
          ...formData,
          dataPhone: favorite.customer_id,
          dataProvider: favorite.provider,
          dataPlan: favorite.metadata?.plan_code || '',
          nickname: favorite.nickname,
        });
        break;
      case 'tv':
        setFormData({
          ...formData,
          smartcard: favorite.customer_id,
          tvProvider: favorite.provider,
          tvPackage: favorite.metadata?.package_code || '',
          nickname: favorite.nickname,
        });
        break;
      case 'electricity':
        setFormData({
          ...formData,
          meterNumber: favorite.customer_id,
          electricityProvider: favorite.provider,
          meterType: favorite.metadata?.meter_type || 'prepaid',
          nickname: favorite.nickname,
        });
        break;
    }
  };
  
  const validateAmount = (amount: string) => {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) && parsedAmount > 0;
  };
  
  const handleDeleteFavorite = async (id: string) => {
    try {
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: { action: 'delete_favorite', id }
      });
      
      if (data?.success) {
        toast({
          title: "Favorite Deleted",
          description: "Your saved favorite has been removed.",
        });
        
        // Refresh favorites
        refetchFavorites();
        
        // Clear selection if the deleted favorite was selected
        if (selectedFavorite?.id === id) {
          setSelectedFavorite(null);
        }
      } else {
        throw new Error(data?.error || 'Failed to delete favorite');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handlePayment = async (service: string) => {
    setLoading(true);
    try {
      let payload = {};
      
      switch (service) {
        case 'airtime':
          if (!formData.phone || !validateAmount(formData.amount)) {
            throw new Error('Please enter a valid phone number and amount');
          }
          
          payload = {
            action: 'pay_airtime',
            phone: formData.phone,
            amount: parseFloat(formData.amount),
            save_as_favorite: formData.saveFavorite,
            nickname: formData.nickname || `Airtime ${formData.phone.substring(formData.phone.length - 4)}`,
          };
          break;
          
        case 'data':
          if (!formData.dataPhone || !formData.dataProvider || !formData.dataPlan) {
            throw new Error('Please complete all required fields');
          }
          
          payload = {
            action: 'pay_data',
            phone: formData.dataPhone,
            provider: formData.dataProvider,
            plan_code: formData.dataPlan,
            save_as_favorite: formData.saveFavorite,
            nickname: formData.nickname || `Data ${formData.dataPhone.substring(formData.dataPhone.length - 4)}`,
          };
          break;
          
        case 'tv':
          if (!formData.smartcard || !formData.tvProvider || !formData.tvPackage) {
            throw new Error('Please complete all required fields');
          }
          
          payload = {
            action: 'pay_tv',
            smartcard: formData.smartcard,
            provider: formData.tvProvider,
            package_code: formData.tvPackage,
            save_as_favorite: formData.saveFavorite,
            nickname: formData.nickname || `TV ${formData.smartcard.substring(formData.smartcard.length - 4)}`,
          };
          break;
          
        case 'electricity':
          if (!formData.meterNumber || !formData.electricityProvider || !validateAmount(formData.amount)) {
            throw new Error('Please complete all required fields');
          }
          
          payload = {
            action: 'pay_electricity',
            meter_number: formData.meterNumber,
            provider: formData.electricityProvider,
            meter_type: formData.meterType,
            amount: parseFloat(formData.amount),
            save_as_favorite: formData.saveFavorite,
            nickname: formData.nickname || `Meter ${formData.meterNumber.substring(formData.meterNumber.length - 4)}`,
          };
          break;
      }
      
      const { data } = await supabase.functions.invoke('sayswitch-bills', {
        body: payload
      });
      
      if (data?.success) {
        toast({
          title: "Payment Successful",
          description: `Your ${service} payment has been processed.`,
        });
        
        // Reset form
        setFormData({
          ...formData,
          amount: '',
          saveFavorite: false,
          nickname: '',
        });
        
        // Refresh favorites if a new one was added
        if (formData.saveFavorite) {
          refetchFavorites();
        }
        
        // Additional handling for electricity token
        if (service === 'electricity' && data.token) {
          toast({
            title: "Electricity Token",
            description: `Your token: ${data.token}`,
            duration: 10000, // Keep this visible longer
          });
        }
      } else {
        throw new Error(data?.error || 'Payment failed');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bill Payments</CardTitle>
        <CardDescription>Pay for services instantly</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="airtime" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-4">
            {services.map((service) => (
              <TabsTrigger key={service.id} value={service.id}>
                <service.icon className={`h-4 w-4 mr-2 ${service.color}`} />
                {service.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Favorites section */}
          {filteredFavorites.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Bookmark className="h-4 w-4 mr-1" />
                Saved Favorites
              </h3>
              <div className="flex flex-wrap gap-2">
                {filteredFavorites.map((favorite) => (
                  <Badge 
                    key={favorite.id}
                    variant={selectedFavorite?.id === favorite.id ? "default" : "outline"}
                    className="cursor-pointer flex items-center gap-1"
                    onClick={() => handleFavoriteSelect(favorite)}
                  >
                    {favorite.nickname}
                    <button 
                      className="ml-1 text-xs opacity-70 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFavorite(favorite.id);
                      }}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <TabsContent value="airtime" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel" 
                  placeholder="080XXXXXXXX"
                  className="font-mono"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount"
                  name="amount"
                  type="number" 
                  placeholder="₦500"
                  min="50"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="save-favorite" 
                  checked={formData.saveFavorite}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="save-favorite" className="cursor-pointer">Save as favorite</Label>
              </div>
              {formData.saveFavorite && (
                <div>
                  <Label htmlFor="nickname">Nickname (optional)</Label>
                  <Input 
                    id="nickname"
                    name="nickname"
                    placeholder="My Personal Line"
                    value={formData.nickname}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <Button 
                onClick={() => handlePayment('airtime')}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Buy Airtime'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="dataPhone">Phone Number</Label>
                <Input 
                  id="dataPhone"
                  name="dataPhone"
                  type="tel" 
                  placeholder="080XXXXXXXX"
                  className="font-mono"
                  value={formData.dataPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="dataProvider">Network Provider</Label>
                {loadingData ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select 
                    value={formData.dataProvider}
                    onValueChange={(value) => handleSelectChange('dataProvider', value)}
                  >
                    <SelectTrigger id="dataProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataProviders?.map((provider: Provider) => (
                        <SelectItem key={provider.code} value={provider.code}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              {formData.dataProvider && (
                <div>
                  <Label htmlFor="dataPlan">Data Plan</Label>
                  {loadingPlans ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Select 
                      value={formData.dataPlan}
                      onValueChange={(value) => handleSelectChange('dataPlan', value)}
                    >
                      <SelectTrigger id="dataPlan">
                        <SelectValue placeholder="Select data plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataPlans?.map((plan: DataPlan) => (
                          <SelectItem key={plan.code} value={plan.code}>
                            {plan.name} - ₦{plan.amount.toLocaleString()} ({plan.validity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Switch 
                  id="save-favorite-data" 
                  checked={formData.saveFavorite}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="save-favorite-data" className="cursor-pointer">Save as favorite</Label>
              </div>
              {formData.saveFavorite && (
                <div>
                  <Label htmlFor="nickname-data">Nickname (optional)</Label>
                  <Input 
                    id="nickname-data"
                    name="nickname"
                    placeholder="My Data Line"
                    value={formData.nickname}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <Button 
                onClick={() => handlePayment('data')}
                disabled={loading || !formData.dataPhone || !formData.dataProvider || !formData.dataPlan}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Buy Data'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tv" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="smartcard">Smartcard/IUC Number</Label>
                <Input 
                  id="smartcard"
                  name="smartcard"
                  placeholder="Enter your decoder number"
                  className="font-mono"
                  value={formData.smartcard}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="tvProvider">TV Provider</Label>
                {loadingTV ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={formData.tvProvider}
                    onValueChange={(value) => handleSelectChange('tvProvider', value)}
                  >
                    <SelectTrigger id="tvProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {tvProviders?.map((provider: Provider) => (
                        <SelectItem key={provider.code} value={provider.code}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              {formData.tvProvider && (
                <div>
                  <Label htmlFor="tvPackage">TV Package</Label>
                  {loadingTVPackages ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Select
                      value={formData.tvPackage}
                      onValueChange={(value) => handleSelectChange('tvPackage', value)}
                    >
                      <SelectTrigger id="tvPackage">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvPackages?.map((pkg: TVPackage) => (
                          <SelectItem key={pkg.code} value={pkg.code}>
                            {pkg.name} - ₦{pkg.amount.toLocaleString()} ({pkg.duration})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Switch 
                  id="save-favorite-tv" 
                  checked={formData.saveFavorite}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="save-favorite-tv" className="cursor-pointer">Save as favorite</Label>
              </div>
              {formData.saveFavorite && (
                <div>
                  <Label htmlFor="nickname-tv">Nickname (optional)</Label>
                  <Input 
                    id="nickname-tv"
                    name="nickname"
                    placeholder="My TV"
                    value={formData.nickname}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <Button 
                onClick={() => handlePayment('tv')}
                disabled={loading || !formData.smartcard || !formData.tvProvider || !formData.tvPackage}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Pay TV Subscription'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="electricity" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="meterNumber">Meter Number</Label>
                <Input 
                  id="meterNumber"
                  name="meterNumber"
                  placeholder="Enter your meter number"
                  className="font-mono"
                  value={formData.meterNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="meterType">Meter Type</Label>
                <Select 
                  value={formData.meterType}
                  onValueChange={(value) => handleSelectChange('meterType', value)}
                >
                  <SelectTrigger id="meterType">
                    <SelectValue placeholder="Select meter type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prepaid">Prepaid</SelectItem>
                    <SelectItem value="postpaid">Postpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="electricityProvider">Electricity Provider</Label>
                {loadingElectricity ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select 
                    value={formData.electricityProvider}
                    onValueChange={(value) => handleSelectChange('electricityProvider', value)}
                  >
                    <SelectTrigger id="electricityProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {electricityProviders?.map((provider: Provider) => (
                        <SelectItem key={provider.code} value={provider.code}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                <Label htmlFor="electricityAmount">Amount</Label>
                <Input 
                  id="electricityAmount"
                  name="amount"
                  type="number" 
                  placeholder="₦1000"
                  min="100"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="save-favorite-electricity" 
                  checked={formData.saveFavorite}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="save-favorite-electricity" className="cursor-pointer">Save as favorite</Label>
              </div>
              {formData.saveFavorite && (
                <div>
                  <Label htmlFor="nickname-electricity">Nickname (optional)</Label>
                  <Input 
                    id="nickname-electricity"
                    name="nickname"
                    placeholder="Home Meter"
                    value={formData.nickname}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <Button 
                onClick={() => handlePayment('electricity')}
                disabled={loading || !formData.meterNumber || !formData.electricityProvider || !validateAmount(formData.amount)}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Buy Electricity'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
