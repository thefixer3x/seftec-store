
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const DocumentUpload: React.FC = () => {
  return (
    <div>
      <Label htmlFor="memo" className="flex items-center gap-2 text-gray-700 mb-2">
        <Upload className="h-4 w-4 text-gray-500" />
        Business Registration Document
      </Label>
      <div className="mt-1">
        <Button variant="outline" className="w-full justify-start text-gray-500 border-gray-300 hover:bg-gray-50">
          Choose File
          <span className="ml-2 text-gray-400">no file selected</span>
        </Button>
        <p className="text-xs text-gray-500 mt-1">Upload your business registration certificate (PDF format)</p>
      </div>
    </div>
  );
};

export default DocumentUpload;
