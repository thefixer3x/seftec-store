
import React from 'react';
import { FileText, Shield } from 'lucide-react';

interface VerificationStatusProps {
  status: 'pending' | 'verified' | 'unverified';
}

const VerificationStatus = ({ status }: VerificationStatusProps) => {
  if (status === 'pending') {
    return (
      <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
        <FileText size={14} className="mr-1" />
        Verification in progress
      </div>
    );
  }
  
  if (status === 'verified') {
    return (
      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
        <Shield size={14} className="mr-1" />
        Verified Account
      </div>
    );
  }
  
  return null;
};

export default VerificationStatus;
