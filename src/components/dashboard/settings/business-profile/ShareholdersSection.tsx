
import React from 'react';
import { User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShareholdersSectionProps {
  shareholders: { name: string, ownership: string }[];
  setShareholders: React.Dispatch<React.SetStateAction<{ name: string, ownership: string }[]>>;
}

const ShareholdersSection: React.FC<ShareholdersSectionProps> = ({ shareholders, setShareholders }) => {
  const addShareholder = () => {
    setShareholders([...shareholders, {name: '', ownership: ''}]);
  };

  const updateShareholder = (index: number, field: 'name' | 'ownership', value: string) => {
    const updatedShareholders = [...shareholders];
    updatedShareholders[index][field] = value;
    setShareholders(updatedShareholders);
  };

  const removeShareholder = (index: number) => {
    const updatedShareholders = [...shareholders];
    updatedShareholders.splice(index, 1);
    setShareholders(updatedShareholders);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mt-8">
      <Label className="flex items-center gap-2 mb-4 text-gray-800 font-medium">
        <User className="h-4 w-4" />
        Directors/Shareholders Information
      </Label>
      
      {shareholders.length > 0 && (
        <div className="space-y-4 mb-4">
          {shareholders.map((shareholder, index) => (
            <div key={index} className="flex gap-3 items-center bg-white p-3 rounded-md border border-gray-200">
              <Input 
                placeholder="Shareholder name" 
                value={shareholder.name}
                onChange={(e) => updateShareholder(index, 'name', e.target.value)}
                className="flex-1 border-gray-300"
              />
              <Input 
                placeholder="Ownership %" 
                value={shareholder.ownership}
                onChange={(e) => updateShareholder(index, 'ownership', e.target.value)}
                className="w-32 border-gray-300"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => removeShareholder(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full justify-start border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50"
        onClick={addShareholder}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add new shareholder
      </Button>
    </div>
  );
};

export default ShareholdersSection;
