
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, FileText } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

interface BusinessPlanFormProps {
  onSubmit: (planData: PlanFormData) => Promise<void>;
  isLoading: boolean;
}

export interface PlanFormData {
  idea: string;
  customers: string;
  revenue: string;
  competition: string;
  advantages: string;
  funding: string;
  saveData: boolean;
}

const BusinessPlanForm: React.FC<BusinessPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PlanFormData>({
    idea: '',
    customers: '',
    revenue: '',
    competition: '',
    advantages: '',
    funding: '',
    saveData: true
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof Omit<PlanFormData, 'saveData'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.idea.trim()) {
      setError('Please provide a business idea to generate a plan');
      return;
    }
    
    setError(null);
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate business plan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="input-idea" className="text-sm font-medium mb-1.5 block">
            Describe your business idea*
          </Label>
          <Textarea 
            id="input-idea" 
            value={formData.idea}
            onChange={(e) => handleChange('idea', e.target.value)}
            placeholder="A mobile app that helps people find local fitness classes..."
            className="resize-none min-h-[80px]"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="input-customers" className="text-sm font-medium mb-1.5 block">
            Who are your target customers?
          </Label>
          <Textarea 
            id="input-customers"
            value={formData.customers}
            onChange={(e) => handleChange('customers', e.target.value)}
            placeholder="People aged 25-45 who are interested in fitness but have busy schedules..."
            className="resize-none min-h-[60px]"
          />
        </div>
        
        <div>
          <Label htmlFor="input-revenue" className="text-sm font-medium mb-1.5 block">
            How will you generate revenue?
          </Label>
          <Textarea 
            id="input-revenue"
            value={formData.revenue}
            onChange={(e) => handleChange('revenue', e.target.value)}
            placeholder="Subscription model with tiered pricing, plus commission from class bookings..."
            className="resize-none min-h-[60px]"
          />
        </div>
        
        <div>
          <Label htmlFor="input-competition" className="text-sm font-medium mb-1.5 block">
            Who are your competitors?
          </Label>
          <Textarea 
            id="input-competition"
            value={formData.competition}
            onChange={(e) => handleChange('competition', e.target.value)}
            placeholder="ClassPass, MindBody, local gym apps..."
            className="resize-none min-h-[60px]"
          />
        </div>
        
        <div>
          <Label htmlFor="input-advantages" className="text-sm font-medium mb-1.5 block">
            What are your competitive advantages?
          </Label>
          <Textarea 
            id="input-advantages"
            value={formData.advantages}
            onChange={(e) => handleChange('advantages', e.target.value)}
            placeholder="Unique AI matching algorithm, seamless payment processing..."
            className="resize-none min-h-[60px]"
          />
        </div>
        
        <div>
          <Label htmlFor="input-funding" className="text-sm font-medium mb-1.5 block">
            What funding do you need?
          </Label>
          <Textarea 
            id="input-funding"
            value={formData.funding}
            onChange={(e) => handleChange('funding', e.target.value)}
            placeholder="$500,000 seed funding for initial development and marketing..."
            className="resize-none min-h-[60px]"
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="save-data-consent"
            checked={formData.saveData}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, saveData: !!checked }))}
          />
          <Label htmlFor="save-data-consent" className="text-sm cursor-pointer">
            Allow BizGenie to learn from my inputs (stored securely)
          </Label>
        </div>
      </div>

      {error && (
        <div className="flex items-start space-x-2 text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white w-full"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          <span className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            🧠 Generate Business Plan
          </span>
        )}
      </Button>
    </form>
  );
};

export default BusinessPlanForm;
