import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, AlertCircle } from 'lucide-react';
import { useTradeFinance, TradeFinanceApplication } from '@/hooks/use-trade-finance';

interface ApplicationFormModalProps {
  application?: TradeFinanceApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface FormData {
  facility_type: string;
  amount: string;
  currency: string;
  beneficiary_name: string;
  title: string;
  description: string;
  purpose: string;
  expiry_date: string;
}

const initialFormData: FormData = {
  facility_type: 'letter_of_credit',
  amount: '',
  currency: 'USD',
  beneficiary_name: '',
  title: '',
  description: '',
  purpose: '',
  expiry_date: '',
};

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  application,
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { createApplication, updateApplication } = useTradeFinance();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const isEditing = !!application;

  // Load application data when editing
  useEffect(() => {
    if (application && open) {
      setFormData({
        facility_type: application.facility_type,
        amount: application.amount.toString(),
        currency: application.currency,
        beneficiary_name: application.beneficiary_name,
        title: application.title,
        description: application.description || '',
        purpose: application.purpose || '',
        expiry_date: application.expiry_date || '',
      });
    } else if (!open) {
      // Reset form when modal closes
      setFormData(initialFormData);
      setErrors({});
      setApiError(null);
    }
  }, [application, open]);

  const handleInputChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.beneficiary_name.trim()) {
      newErrors.beneficiary_name = 'Beneficiary name is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    if (formData.expiry_date) {
      const expiryDate = new Date(formData.expiry_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (expiryDate < today) {
        newErrors.expiry_date = 'Expiry date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        facility_type: formData.facility_type,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        beneficiary_name: formData.beneficiary_name,
        title: formData.title,
        description: formData.description || undefined,
        purpose: formData.purpose,
        expiry_date: formData.expiry_date || undefined,
      };

      if (isEditing && application) {
        await updateApplication({ id: application.id, ...payload });
      } else {
        await createApplication(payload);
      }

      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      setApiError(
        error instanceof Error
          ? error.message
          : 'Failed to submit application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const facilityTypes = [
    { value: 'letter_of_credit', label: 'Letter of Credit' },
    { value: 'invoice_financing', label: 'Invoice Financing' },
    { value: 'trade_guarantee', label: 'Trade Guarantee' },
    { value: 'export_financing', label: 'Export Financing' },
    { value: 'import_financing', label: 'Import Financing' },
    { value: 'supply_chain_financing', label: 'Supply Chain Financing' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CNY', label: 'CNY - Chinese Yuan' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEditing ? 'Edit Application' : 'New Trade Finance Application'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update your trade finance application details'
              : 'Fill in the details to apply for a new trade finance facility'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {apiError && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
            </div>
          )}

          {/* Facility Type */}
          <div className="space-y-2">
            <Label htmlFor="facility_type">Facility Type *</Label>
            <Select
              value={formData.facility_type}
              onValueChange={(value) => handleInputChange('facility_type', value)}
              disabled={isEditing}
            >
              <SelectTrigger id="facility_type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {facilityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isEditing && (
              <p className="text-xs text-gray-500">Facility type cannot be changed</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Export LC for Electronics"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Amount and Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency *</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleInputChange('currency', value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Beneficiary Name */}
          <div className="space-y-2">
            <Label htmlFor="beneficiary_name">Beneficiary Name *</Label>
            <Input
              id="beneficiary_name"
              placeholder="Name of the beneficiary"
              value={formData.beneficiary_name}
              onChange={(e) => handleInputChange('beneficiary_name', e.target.value)}
              className={errors.beneficiary_name ? 'border-red-500' : ''}
            />
            {errors.beneficiary_name && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.beneficiary_name}
              </p>
            )}
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose *</Label>
            <Textarea
              id="purpose"
              placeholder="Describe the purpose of this trade finance facility"
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              className={errors.purpose ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.purpose && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.purpose}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Description</Label>
            <Textarea
              id="description"
              placeholder="Any additional details or notes"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label htmlFor="expiry_date">Expiry Date</Label>
            <Input
              id="expiry_date"
              type="date"
              value={formData.expiry_date}
              onChange={(e) => handleInputChange('expiry_date', e.target.value)}
              className={errors.expiry_date ? 'border-red-500' : ''}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.expiry_date && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.expiry_date}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Optional: Set when this facility should expire
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-700 hover:bg-blue-800"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{isEditing ? 'Update Application' : 'Create Application'}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
