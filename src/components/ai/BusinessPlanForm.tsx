
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FileText, Send } from 'lucide-react';

export interface PlanFormData {
  idea: string;
  customers: string;
  revenue: string;
  competition: string;
  advantages: string;
  funding: string;
  saveData: boolean;
}

interface BusinessPlanFormProps {
  onSubmit: (data: PlanFormData) => void;
  isLoading: boolean;
}

const BusinessPlanForm: React.FC<BusinessPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState<string>('');
  const [customers, setCustomers] = useState<string>('');
  const [revenue, setRevenue] = useState<string>('');
  const [competition, setCompetition] = useState<string>('');
  const [advantages, setAdvantages] = useState<string>('');
  const [funding, setFunding] = useState<string>('');
  const [saveData, setSaveData] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) return;
    
    onSubmit({
      idea,
      customers,
      revenue,
      competition,
      advantages,
      funding,
      saveData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="business-idea" className="text-sm font-medium">
          Business Idea <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="business-idea"
          placeholder="Describe your business idea in detail..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="resize-none min-h-[80px] focus:border-seftec-gold dark:focus:border-seftec-teal"
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="target-customers" className="text-sm font-medium">
          Target Customers
        </Label>
        <Textarea
          id="target-customers"
          placeholder="Who are your target customers?"
          value={customers}
          onChange={(e) => setCustomers(e.target.value)}
          className="resize-none min-h-[60px] focus:border-seftec-gold dark:focus:border-seftec-teal"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="revenue-model" className="text-sm font-medium">
          Revenue Model
        </Label>
        <Textarea
          id="revenue-model"
          placeholder="How will your business make money?"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          className="resize-none min-h-[60px] focus:border-seftec-gold dark:focus:border-seftec-teal"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="competition" className="text-sm font-medium">
          Competition
        </Label>
        <Textarea
          id="competition"
          placeholder="Who are your main competitors?"
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
          className="resize-none min-h-[60px] focus:border-seftec-gold dark:focus:border-seftec-teal"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="advantages" className="text-sm font-medium">
          Competitive Advantages
        </Label>
        <Textarea
          id="advantages"
          placeholder="What are your competitive advantages?"
          value={advantages}
          onChange={(e) => setAdvantages(e.target.value)}
          className="resize-none min-h-[60px] focus:border-seftec-gold dark:focus:border-seftec-teal"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="funding" className="text-sm font-medium">
          Funding Needs
        </Label>
        <Textarea
          id="funding"
          placeholder="What are your funding requirements?"
          value={funding}
          onChange={(e) => setFunding(e.target.value)}
          className="resize-none min-h-[60px] focus:border-seftec-gold dark:focus:border-seftec-teal"
          disabled={isLoading}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="save-data"
          checked={saveData}
          onCheckedChange={setSaveData}
          disabled={isLoading}
        />
        <Label htmlFor="save-data" className="text-sm cursor-pointer">
          Save my data for future reference and improvements
        </Label>
      </div>
      
      <Button 
        type="submit" 
        disabled={!idea.trim() || isLoading} 
        className="w-full bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white"
      >
        <FileText className="h-4 w-4 mr-2" />
        {isLoading ? "Generating Plan..." : "Generate Business Plan"}
      </Button>
    </form>
  );
};

export default BusinessPlanForm;
