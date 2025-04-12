
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart4, RefreshCw, Zap } from 'lucide-react';

interface UsageStats {
  totalQueries: number;
  queriesLeft: number;
  modelUsage: Record<string, number>;
  costToDate: number;
  tier: string;
  maxQueriesPerDay: number;
}

const BizGenieStats: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Get user tier information
      const { data: tierData } = await supabase
        .from('user_tiers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Get usage statistics
      const { data: usageData } = await supabase
        .from('ai_usage_logs')
        .select('model_used, estimated_cost')
        .eq('user_id', user.id)
        .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());

      // Calculate model distribution
      const modelUsage: Record<string, number> = {};
      let costToDate = 0;

      if (usageData) {
        usageData.forEach((log) => {
          // Track model usage
          if (log.model_used) {
            modelUsage[log.model_used] = (modelUsage[log.model_used] || 0) + 1;
          }
          
          // Sum up costs
          costToDate += Number(log.estimated_cost || 0);
        });
      }

      const totalQueries = usageData?.length || 0;
      const maxQueries = tierData?.max_queries_per_day || 10;
      const queriesLeft = Math.max(0, maxQueries - totalQueries);

      setStats({
        totalQueries,
        queriesLeft,
        modelUsage,
        costToDate,
        tier: tierData?.tier_name || 'free',
        maxQueriesPerDay: maxQueries
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Please sign in to view your BizGenie usage statistics.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Usage Statistics</CardTitle>
        <Button variant="ghost" size="sm" onClick={fetchStats} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : stats ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Account Tier</span>
              <Badge className={stats.tier === 'premium' ? 'bg-amber-500' : ''}>
                {stats.tier === 'premium' ? 'Premium' : 'Free'}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Queries Today</span>
                <span className="text-sm font-medium">{stats.totalQueries} / {stats.maxQueriesPerDay}</span>
              </div>
              <Progress value={(stats.totalQueries / stats.maxQueriesPerDay) * 100} />
            </div>
            
            {Object.keys(stats.modelUsage).length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Model Usage Today</span>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(stats.modelUsage).map(([model, count]) => (
                    <div key={model} className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-xs">
                        {model.split('-').pop()}
                      </Badge>
                      <span className="text-xs">{count} queries</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {stats.tier !== 'premium' && (
              <div className="pt-2">
                <Button className="w-full" variant="default">
                  <Zap className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Get access to advanced models for complex queries
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BizGenieStats;
