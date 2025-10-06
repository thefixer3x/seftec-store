import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ExternalLink, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useI18nContext } from '@/components/ui/language-toggle';

interface Recommendation {
  id: string;
  score: number;
  reason: string;
  recommendation_type: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  };
}

// AI-Powered Product Recommendations Component
export const ProductRecommendations = () => {
  const { user } = useAuth();
  const { t, currentLanguage } = useI18nContext();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  console.log('ProductRecommendations: rendering, user:', !!user, 'loading:', loading, 'hasConsent:', hasConsent, 'recommendations:', recommendations.length, 'language:', currentLanguage, 'forceUpdate:', forceUpdate);

  useEffect(() => {
    // For now, always show sample recommendations for debugging
    setLoading(false);
    setHasConsent(false); // This will trigger sample recommendations
  }, []);

  // Listen for language changes and force re-render
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('language-changed', handleLanguageChange);
    window.addEventListener('language-updated', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'seftec-language') {
        setForceUpdate(prev => prev + 1);
      }
    });

    return () => {
      window.removeEventListener('language-changed', handleLanguageChange);
      window.removeEventListener('language-updated', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const checkConsentAndFetchRecommendations = async () => {
    try {
      // Check if user has consented to AI features
      const { data: consent } = await supabase
        .from('user_consents')
        .select('granted')
        .eq('user_id', user?.id)
        .eq('consent_type', 'ai_personalization')
        .single();

      if (consent?.granted) {
        setHasConsent(true);
        await fetchRecommendations();
      }
    } catch (error) {
      console.error('Error checking consent:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const { data } = await supabase
        .from('ai_recommendations')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', user?.id)
        .gt('expires_at', new Date().toISOString())
        .order('score', { ascending: false })
        .limit(4);

      setRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const trackInteraction = async (productId: string, interactionType: string) => {
    if (!user) return;
    
    try {
      await supabase.from('user_product_interactions').insert({
        user_id: user.id,
        product_id: productId,
        interaction_type: interactionType,
        interaction_data: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h2 className="text-2xl font-bold">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="skeleton h-64" />
          ))}
        </div>
      </div>
    );
  }

  // Show sample recommendations if no real data is available
  if (!hasConsent || recommendations.length === 0) {
    const sampleRecommendations = [
      {
        id: 'sample-1',
        score: 0.92,
        reason: t('recommendations.reason_industry', 'Popular in your industry - Manufacturing & Trade'),
        product: {
          id: 'prod-1',
          name: t('products.inventory_system', 'Smart Inventory Management System'),
          description: t('products.inventory_desc', 'AI-powered inventory tracking with real-time analytics and automated reordering capabilities.'),
          price: 2499,
          category: t('categories.business_software', 'Business Software')
        }
      },
      {
        id: 'sample-2', 
        score: 0.88,
        reason: t('recommendations.reason_marketplace', 'Recommended for B2B marketplaces like yours'),
        product: {
          id: 'prod-2',
          name: t('products.payment_gateway', 'Enterprise Payment Gateway'),
          description: t('products.payment_desc', 'Multi-currency payment processing with fraud detection and global compliance.'),
          price: 1299,
          category: t('categories.fintech', 'FinTech')
        }
      },
      {
        id: 'sample-3',
        score: 0.85,
        reason: t('recommendations.reason_trending', 'Trending in trade finance sector'),
        product: {
          id: 'prod-3',
          name: t('products.trade_finance', 'Trade Finance Automation'),
          description: t('products.trade_desc', 'Streamline letters of credit, guarantees, and trade documentation with blockchain verification.'),
          price: 3999,
          category: t('categories.trade_finance', 'Trade Finance')
        }
      },
      {
        id: 'sample-4',
        score: 0.82,
        reason: t('recommendations.reason_defi', 'Perfect for enterprise DeFi integration'),
        product: {
          id: 'prod-4',
          name: t('products.defi_optimizer', 'DeFi Yield Optimizer'),
          description: t('products.defi_desc', 'Institutional-grade DeFi portfolio management with risk assessment and automated strategies.'),
          price: 5999,
          category: t('categories.defi_solutions', 'DeFi Solutions')
        }
      }
    ];

    return (
      <section className="py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h2 className="text-2xl font-bold">{t('recommendations.title', 'Recommended for You')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleRecommendations.map((rec) => (
            <Card 
              key={rec.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-800"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">
                      {rec.product.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                        {rec.product.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(rec.score * 100)}% {t('recommendations.match', 'match')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {rec.product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(rec.product.price)}
                  </span>
                </div>
                
                <p className="text-xs text-purple-600 dark:text-purple-400 italic">
                  {rec.reason}
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => console.log('Sample product clicked:', rec.product.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {t('cta.learn_more', 'Learn More')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => console.log('Sample product viewed:', rec.product.name)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-purple-500" />
        <h2 className="text-2xl font-bold">Recommended for You</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((rec) => (
          <Card 
            key={rec.id} 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-800"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight mb-2">
                    {rec.product.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                      {rec.product.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(rec.score * 100)}% match
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {rec.product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(rec.product.price)}
                </span>
              </div>
              
              <p className="text-xs text-purple-600 dark:text-purple-400 italic">
                {rec.reason}
              </p>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => trackInteraction(rec.product.id, 'click')}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => trackInteraction(rec.product.id, 'view')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};