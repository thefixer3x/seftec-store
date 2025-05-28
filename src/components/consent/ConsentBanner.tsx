
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// AI Consent Banner - Ensures GDPR compliance and builds user trust
export const ConsentBanner = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkConsent();
    }
  }, [user]);

  const checkConsent = async () => {
    if (!user) return;
    
    try {
      // Check if user has already given consent for AI personalization
      const { data } = await supabase
        .from('user_consents')
        .select('*')
        .eq('user_id', user.id)
        .eq('consent_type', 'ai_personalization')
        .single();
      
      // Show banner if no consent found or consent was revoked
      setShow(!data || !data.granted || !!data.revoked_at);
    } catch (error) {
      // If table doesn't exist yet or other error, show banner for safety
      setShow(true);
    }
  };

  const handleConsent = async (granted: boolean) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const consentData = {
        user_id: user.id,
        consent_type: 'ai_personalization',
        granted,
        granted_at: granted ? new Date().toISOString() : null,
        revoked_at: !granted ? new Date().toISOString() : null,
        ip_address: '0.0.0.0', // In production, get actual IP
        user_agent: navigator.userAgent
      };

      // Upsert consent record
      await supabase
        .from('user_consents')
        .upsert(consentData, { 
          onConflict: 'user_id,consent_type'
        });
      
      setShow(false);
    } catch (error) {
      console.error('Error saving consent:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!show || !user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <Card className="max-w-2xl mx-auto p-6 shadow-2xl border-2">
        <div className="flex items-start gap-4">
          <Shield className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">
              AI-Powered Features Consent
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use AI to personalize your shopping experience, provide recommendations, 
              and assist with customer support. Your data is processed securely and never 
              sold to third parties. You can withdraw consent at any time in settings.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={() => handleConsent(true)}
                disabled={loading}
                size="sm"
              >
                {loading ? 'Saving...' : 'Accept AI Features'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleConsent(false)}
                disabled={loading}
                size="sm"
              >
                Decline
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShow(false)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
