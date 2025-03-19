
import React from 'react';
import { Recommendation } from '@/hooks/use-recommendations';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onView: (id: string) => void;
  onClick: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendation,
  onView,
  onClick
}) => {
  const { toast } = useToast();

  const handleClick = () => {
    onClick(recommendation.id);
    toast({
      title: "Product Added to Watchlist",
      description: "BizGenie has added this product to your watchlist for future reference.",
      duration: 3000,
    });
  };

  React.useEffect(() => {
    // Mark as viewed when the component is mounted
    if (!recommendation.viewed) {
      onView(recommendation.id);
    }
  }, [recommendation.id, recommendation.viewed, onView]);

  // Format recommendation type for display
  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div 
      className="p-3 rounded-lg border border-seftec-slate/30 dark:border-white/10 hover:bg-seftec-slate/10 dark:hover:bg-white/5 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-seftec-navy dark:text-white">
            {recommendation.product_name || "BizGenie Recommendation"}
          </h4>
          <p className="text-sm text-seftec-navy/60 dark:text-white/60">
            {recommendation.product_category || "Category"} • ${recommendation.product_price?.toFixed(2) || "0.00"}
          </p>
          <p className="text-sm text-seftec-navy/70 dark:text-white/70 mt-1">
            {recommendation.reason || `Recommended by BizGenie based on your business profile and purchase history. Relevance: ${(recommendation.relevance_score * 100).toFixed(0)}%`}
          </p>
          {recommendation.recommendation_type && (
            <div className="mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-seftec-teal/10 text-seftec-teal dark:bg-seftec-teal/20">
                {formatType(recommendation.recommendation_type)}
              </span>
            </div>
          )}
        </div>
        <Button 
          size="sm" 
          className="bg-seftec-teal hover:bg-seftec-teal/90 text-white text-xs"
          onClick={handleClick}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
