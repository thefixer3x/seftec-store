
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { UserPreferences, useUserPreferences } from '@/hooks/use-user-preferences';

const BusinessSizeOptions = ['small', 'medium', 'large', 'enterprise'];
const RiskToleranceOptions = ['low', 'medium', 'high'];
const TradeVolumeOptions = ['low', 'medium', 'high'];
const TradeFrequencyOptions = ['occasional', 'regular', 'frequent'];

const UserPreferencesSettings = () => {
  const { preferences, loading, savePreferences } = useUserPreferences();
  
  const [industryInput, setIndustryInput] = useState('');
  const [regionInput, setRegionInput] = useState('');
  const [currencyInput, setCurrencyInput] = useState('');
  const [paymentMethodInput, setPaymentMethodInput] = useState('');
  
  const [formValues, setFormValues] = useState<Partial<UserPreferences>>({
    industry_focus: preferences?.industry_focus || [],
    regions_of_interest: preferences?.regions_of_interest || [],
    business_size: preferences?.business_size || 'medium',
    risk_tolerance: preferences?.risk_tolerance || 'medium',
    payment_methods: preferences?.payment_methods || [],
    preferred_currencies: preferences?.preferred_currencies || [],
    trade_volume: preferences?.trade_volume || 'medium',
    trade_frequency: preferences?.trade_frequency || 'regular',
  });
  
  // Update form values when preferences load
  React.useEffect(() => {
    if (preferences) {
      setFormValues({
        industry_focus: preferences.industry_focus || [],
        regions_of_interest: preferences.regions_of_interest || [],
        business_size: preferences.business_size || 'medium',
        risk_tolerance: preferences.risk_tolerance || 'medium',
        payment_methods: preferences.payment_methods || [],
        preferred_currencies: preferences.preferred_currencies || [],
        trade_volume: preferences.trade_volume || 'medium',
        trade_frequency: preferences.trade_frequency || 'regular',
      });
    }
  }, [preferences]);
  
  const handleSave = () => {
    savePreferences(formValues);
  };
  
  const addIndustry = () => {
    if (industryInput.trim() && !formValues.industry_focus?.includes(industryInput.trim())) {
      setFormValues({
        ...formValues,
        industry_focus: [...(formValues.industry_focus || []), industryInput.trim()]
      });
      setIndustryInput('');
    }
  };
  
  const removeIndustry = (industry: string) => {
    setFormValues({
      ...formValues,
      industry_focus: formValues.industry_focus?.filter(i => i !== industry)
    });
  };
  
  const addRegion = () => {
    if (regionInput.trim() && !formValues.regions_of_interest?.includes(regionInput.trim())) {
      setFormValues({
        ...formValues,
        regions_of_interest: [...(formValues.regions_of_interest || []), regionInput.trim()]
      });
      setRegionInput('');
    }
  };
  
  const removeRegion = (region: string) => {
    setFormValues({
      ...formValues,
      regions_of_interest: formValues.regions_of_interest?.filter(r => r !== region)
    });
  };
  
  const addCurrency = () => {
    if (currencyInput.trim() && !formValues.preferred_currencies?.includes(currencyInput.trim())) {
      setFormValues({
        ...formValues,
        preferred_currencies: [...(formValues.preferred_currencies || []), currencyInput.trim()]
      });
      setCurrencyInput('');
    }
  };
  
  const removeCurrency = (currency: string) => {
    setFormValues({
      ...formValues,
      preferred_currencies: formValues.preferred_currencies?.filter(c => c !== currency)
    });
  };
  
  const addPaymentMethod = () => {
    if (paymentMethodInput.trim() && !formValues.payment_methods?.includes(paymentMethodInput.trim())) {
      setFormValues({
        ...formValues,
        payment_methods: [...(formValues.payment_methods || []), paymentMethodInput.trim()]
      });
      setPaymentMethodInput('');
    }
  };
  
  const removePaymentMethod = (method: string) => {
    setFormValues({
      ...formValues,
      payment_methods: formValues.payment_methods?.filter(m => m !== method)
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalization Settings</CardTitle>
        <CardDescription>
          Customize your experience by providing your preferences. This will help us tailor our services to your needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Industries */}
        <div className="space-y-2">
          <Label htmlFor="industry">Industries of Interest</Label>
          <div className="flex gap-2">
            <Input
              id="industry"
              placeholder="Add an industry"
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIndustry())}
            />
            <Button onClick={addIndustry} type="button">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formValues.industry_focus?.map((industry) => (
              <Badge key={industry} variant="secondary" className="flex items-center gap-1">
                {industry}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeIndustry(industry)} />
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Regions */}
        <div className="space-y-2">
          <Label htmlFor="region">Regions of Interest</Label>
          <div className="flex gap-2">
            <Input
              id="region"
              placeholder="Add a region"
              value={regionInput}
              onChange={(e) => setRegionInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRegion())}
            />
            <Button onClick={addRegion} type="button">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formValues.regions_of_interest?.map((region) => (
              <Badge key={region} variant="secondary" className="flex items-center gap-1">
                {region}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeRegion(region)} />
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Business Size */}
        <div className="space-y-2">
          <Label htmlFor="business-size">Business Size</Label>
          <Select
            value={formValues.business_size}
            onValueChange={(value) => setFormValues({ ...formValues, business_size: value as UserPreferences['business_size'] })}
          >
            <SelectTrigger id="business-size">
              <SelectValue placeholder="Select business size" />
            </SelectTrigger>
            <SelectContent>
              {BusinessSizeOptions.map((size) => (
                <SelectItem key={size} value={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Risk Tolerance */}
        <div className="space-y-2">
          <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
          <Select
            value={formValues.risk_tolerance}
            onValueChange={(value) => setFormValues({ ...formValues, risk_tolerance: value as UserPreferences['risk_tolerance'] })}
          >
            <SelectTrigger id="risk-tolerance">
              <SelectValue placeholder="Select risk tolerance" />
            </SelectTrigger>
            <SelectContent>
              {RiskToleranceOptions.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        {/* Payment Methods */}
        <div className="space-y-2">
          <Label htmlFor="payment-method">Preferred Payment Methods</Label>
          <div className="flex gap-2">
            <Input
              id="payment-method"
              placeholder="Add a payment method"
              value={paymentMethodInput}
              onChange={(e) => setPaymentMethodInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPaymentMethod())}
            />
            <Button onClick={addPaymentMethod} type="button">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formValues.payment_methods?.map((method) => (
              <Badge key={method} variant="secondary" className="flex items-center gap-1">
                {method}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removePaymentMethod(method)} />
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Currencies */}
        <div className="space-y-2">
          <Label htmlFor="currency">Preferred Currencies</Label>
          <div className="flex gap-2">
            <Input
              id="currency"
              placeholder="Add a currency (e.g., USD, EUR)"
              value={currencyInput}
              onChange={(e) => setCurrencyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCurrency())}
            />
            <Button onClick={addCurrency} type="button">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formValues.preferred_currencies?.map((currency) => (
              <Badge key={currency} variant="secondary" className="flex items-center gap-1">
                {currency}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeCurrency(currency)} />
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Trade Volume */}
        <div className="space-y-2">
          <Label htmlFor="trade-volume">Expected Trade Volume</Label>
          <Select
            value={formValues.trade_volume}
            onValueChange={(value) => setFormValues({ ...formValues, trade_volume: value as UserPreferences['trade_volume'] })}
          >
            <SelectTrigger id="trade-volume">
              <SelectValue placeholder="Select trade volume" />
            </SelectTrigger>
            <SelectContent>
              {TradeVolumeOptions.map((volume) => (
                <SelectItem key={volume} value={volume}>
                  {volume.charAt(0).toUpperCase() + volume.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Trade Frequency */}
        <div className="space-y-2">
          <Label htmlFor="trade-frequency">Expected Trade Frequency</Label>
          <Select
            value={formValues.trade_frequency}
            onValueChange={(value) => setFormValues({ ...formValues, trade_frequency: value as UserPreferences['trade_frequency'] })}
          >
            <SelectTrigger id="trade-frequency">
              <SelectValue placeholder="Select trade frequency" />
            </SelectTrigger>
            <SelectContent>
              {TradeFrequencyOptions.map((frequency) => (
                <SelectItem key={frequency} value={frequency}>
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserPreferencesSettings;
