
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertTriangle, FilterIcon } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useRecommendations, RecommendationType } from '@/hooks/use-recommendations';
import RecommendationCard from './RecommendationCard';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

const RecommendationsSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<RecommendationType | 'all'>('all');
  const [filteredRecommendations, setFilteredRecommendations] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const { user } = useAuth();
  
  const { 
    recommendations, 
    isLoading, 
    error, 
    markAsViewed, 
    markAsClicked,
    getRecommendationsByType,
    isAuthenticated 
  } = useRecommendations();

  // Update filtered recommendations when selection changes or recommendations update
  useEffect(() => {
    // Skip if recommendations isn't available yet
    if (!recommendations && selectedType === 'all') return;
    
    const fetchFilteredRecommendations = async () => {
      if (selectedType === 'all') {
        setFilteredRecommendations(recommendations || []);
        return;
      }
      
      setIsFiltering(true);
      try {
        const filtered = await getRecommendationsByType(selectedType, 10);
        setFilteredRecommendations(filtered);
      } catch (err) {
        console.error('Error filtering recommendations:', err);
      } finally {
        setIsFiltering(false);
      }
    };

    fetchFilteredRecommendations();
  }, [selectedType, recommendations, getRecommendationsByType]);

  // Format recommendation type for display
  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Helper to determine which recommendations to display
  const displayRecommendations = isFiltering ? [] : filteredRecommendations;
  
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
        
        {isAuthenticated && recommendations && recommendations.length > 0 && (
          <div className="p-3 border-b border-seftec-slate/20 dark:border-white/10 bg-gray-50 dark:bg-seftec-darkNavy/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between">
              <p className="text-sm text-seftec-navy/70 dark:text-white/70">Filter by type:</p>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as RecommendationType | 'all')}
              >
                <SelectTrigger className="w-full sm:w-[200px] h-8 text-xs">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="similar_products">Similar Products</SelectItem>
                  <SelectItem value="frequently_bought_together">Frequently Bought Together</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="based_on_history">Based on History</SelectItem>
                  <SelectItem value="price_drop">Price Drop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
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
              <AuthModal>
                <Button className="bg-gradient-to-r from-seftec-teal to-seftec-purple text-white hover:opacity-90">
                  Sign In / Register
                </Button>
              </AuthModal>
            </div>
          ) : isLoading || isFiltering ? (
            <div className="p-4 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-seftec-teal/50 border-t-seftec-teal rounded-full mx-auto mb-2"></div>
              <p className="text-seftec-navy/70 dark:text-white/70">
                {isFiltering ? "Filtering recommendations..." : "Loading recommendations..."}
              </p>
            </div>
          ) : error ? (
            <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-red-700 dark:text-red-300">Error</AlertTitle>
              <AlertDescription className="text-red-600 dark:text-red-400">
                There was an error fetching your recommendations. Please try again later.
              </AlertDescription>
            </Alert>
          ) : displayRecommendations && displayRecommendations.length > 0 ? (
            <div className="space-y-3">
              {displayRecommendations.map((rec) => (
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
                {selectedType === 'all' 
                  ? "No recommendations available yet. Continue using the platform to receive personalized suggestions."
                  : `No ${formatType(selectedType)} recommendations available.`
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsSection;
