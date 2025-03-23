
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { businessFormSchema, BusinessFormValues } from './business-profile/types';
import StatusBanner from './business-profile/StatusBanner';
import BusinessInfo from './business-profile/BusinessInfo';
import RegistrationInfo from './business-profile/RegistrationInfo';
import ShareholdersSection from './business-profile/ShareholdersSection';
import DocumentUpload from './business-profile/DocumentUpload';

interface BusinessProfileTabProps {
  verificationStatus: 'pending' | 'verified' | 'unverified';
  setVerificationStatus: (status: 'pending' | 'verified' | 'unverified') => void;
}

const BusinessProfileTab = ({ verificationStatus, setVerificationStatus }: BusinessProfileTabProps) => {
  const [shareholders, setShareholders] = useState<{name: string, ownership: string}[]>([]);

  const businessForm = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      business_name: "Example Business Ltd",
      business_email: "contact@examplebusiness.com",
      business_phone: "1234567890",
      business_address: "123 Business Street, City, Country",
      date_of_incorporation: "01/01/2023",
      rc_number: "RC123456",
      business_type: "limited_company",
      tax_id: "TIN123456789"
    }
  });

  const onSubmitBusiness = (data: BusinessFormValues) => {
    console.log("Business data submitted:", data);
    console.log("Shareholders:", shareholders);
    setVerificationStatus('pending');
    // In a real app, you would submit this data to your backend
  };

  return (
    <Card className="border shadow-sm bg-white">
      <CardContent className="p-8">
        <StatusBanner verificationStatus={verificationStatus} />

        <Form {...businessForm}>
          <form onSubmit={businessForm.handleSubmit(onSubmitBusiness)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BusinessInfo businessForm={businessForm} />
              <RegistrationInfo businessForm={businessForm} />
            </div>
            
            <ShareholdersSection 
              shareholders={shareholders} 
              setShareholders={setShareholders} 
            />
            
            <DocumentUpload />

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Submit for Verification
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BusinessProfileTab;
