
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useRecommendations } from '@/hooks/use-recommendations';
import RecommendationCard from './RecommendationCard';

const RecommendationsSection: React.FC = () => {
  const { 
    recommendations, 
    isLoading, 
    error, 
    markAsViewed, 
    markAsClicked,
    isAuthenticated 
  } = useRecommendations();

  return (
    <Card className="bg-white dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h3 className="font-medium">AI Product Recommendations</h3>
            </div>
            {isAuthenticated && recommendations && recommendations.length > 0 && (
              <Badge variant="outline" className="bg-white/10 border-white/30 text-xs">
                {recommendations.length} items
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {!isAuthenticated ? (
            <div className="text-center py-6">
              <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-3" />
              <h4 className="text-lg font-medium text-seftec-navy dark:text-white mb-2">
                Sign In to View Recommendations
              </h4>
              <p className="text-seftec-navy/70 dark:text-white/70 mb-4">
                Create an account or sign in to receive personalized AI product recommendations.
              </p>
              <Button className="bg-gradient-to-r from-seftec-teal to-seftec-purple text-white hover:opacity-90">
                Sign In / Register
              </Button>
            </div>
          ) : isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-seftec-teal/50 border-t-seftec-teal rounded-full mx-auto mb-2"></div>
              <p className="text-seftec-navy/70 dark:text-white/70">Loading recommendations...</p>
            </div>
          ) : error ? (
            <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-red-700 dark:text-red-300">Error</AlertTitle>
              <AlertDescription className="text-red-600 dark:text-red-400">
                There was an error fetching your recommendations. Please try again later.
              </AlertDescription>
            </Alert>
          ) : recommendations && recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  recommendation={rec}
                  onView={markAsViewed}
                  onClick={markAsClicked}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-seftec-navy/70 dark:text-white/70">
                No recommendations available yet. Continue using the platform to receive personalized suggestions.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsSection;
