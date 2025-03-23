
import React from 'react';
import { FileText, Shield } from 'lucide-react';

interface StatusBannerProps {
  verificationStatus: 'pending' | 'verified' | 'unverified';
}

const StatusBanner: React.FC<StatusBannerProps> = ({ verificationStatus }) => {
  return (
    <div className="border-l-4 border-amber-500 pl-4 mb-8 py-2 bg-amber-50 rounded-r">
      <h2 className="text-2xl font-bold text-gray-800">Business Profile</h2>
      <p className="text-gray-600 mt-1">Complete your business information for verification</p>
      
      {verificationStatus === 'pending' && (
        <div className="mt-3 flex items-start gap-2 text-amber-800">
          <FileText size={16} className="mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            Your business verification is in progress. We'll notify you once it's complete.
          </p>
        </div>
      )}
      {verificationStatus === 'verified' && (
        <div className="mt-3 flex items-start gap-2 text-green-800">
          <Shield size={16} className="mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            Your business is verified. You now have access to all business features.
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusBanner;
