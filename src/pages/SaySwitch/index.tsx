import React from 'react';
import { SaySwitchDashboard } from '@/components/sayswitch/SaySwitchDashboard';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { useFeatureFlag, FEATURE_FLAGS } from '@/features';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

/**
 * SaySwitch integration page
 * 
 * This page provides access to all SaySwitch payment services:
 * - Payment processing
 * - Bill payments (airtime, data, TV, electricity)
 * - Bank transfers
 */
export default function SaySwitchPage() {
  // Set document title
  useDocumentTitle('SaySwitch Payments | SEFTEC');
  
  // Check if any SaySwitch feature is enabled
  const { isEnabled: isPaymentsEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS);
  const { isEnabled: isBillsEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_BILLS);
  const { isEnabled: isTransfersEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_TRANSFERS);
  
  const isAnyFeatureEnabled = isPaymentsEnabled || isBillsEnabled || isTransfersEnabled;
  
  if (!isAnyFeatureEnabled) {
    return (
      <div className="container py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>SaySwitch Integration</CardTitle>
            <CardDescription>Coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Feature not available</AlertTitle>
              <AlertDescription>
                SaySwitch integration is coming soon to your account. This will enable seamless payments, bill payments, and money transfers.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">SaySwitch Payments</h1>
      <SaySwitchDashboard />
    </div>
  );
}
