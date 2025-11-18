/**
 * Feature Flag Administration Interface
 *
 * Admin UI for managing feature flags with real-time updates,
 * rollout percentage controls, and audit logging.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { getFeatureFlagManager } from '@/services/FeatureFlagManager';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import { Flag, RefreshCw, Save, Trash2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FeatureFlagData {
  name: string;
  enabled: boolean;
  rollout_pct: number;
  description: string | null;
  updated_at: string | null;
}

export const FeatureFlagAdmin: React.FC = () => {
  const [flags, setFlags] = useState<FeatureFlagData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Load all flags
  const loadFlags = async () => {
    setIsLoading(true);
    try {
      const manager = getFeatureFlagManager();
      const flagsMap = await manager.fetchAllFlags();

      const flagsArray = Array.from(flagsMap.values()).map(flag => ({
        name: flag.name,
        enabled: flag.enabled,
        rollout_pct: flag.rollout_pct,
        description: flag.description,
        updated_at: flag.updated_at,
      }));

      setFlags(flagsArray);
    } catch (error) {
      console.error('[FeatureFlagAdmin] Error loading flags:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load feature flags',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFlags();

    // Subscribe to real-time updates
    const manager = getFeatureFlagManager();
    const unsubscribe = manager.subscribe(() => {
      loadFlags();
    });

    return () => unsubscribe();
  }, []);

  // Toggle flag enabled status
  const handleToggleEnabled = async (flagName: string, currentValue: boolean) => {
    setIsSaving(flagName);
    try {
      const manager = getFeatureFlagManager();
      const result = await manager.updateFlag(flagName, !currentValue);

      if (result.success) {
        toast({
          title: 'Success',
          description: `${flagName} ${!currentValue ? 'enabled' : 'disabled'}`,
        });
        // Update local state
        setFlags(prev =>
          prev.map(f => (f.name === flagName ? { ...f, enabled: !currentValue } : f))
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update flag',
      });
    } finally {
      setIsSaving(null);
    }
  };

  // Update rollout percentage
  const handleUpdateRollout = async (flagName: string, rolloutPct: number) => {
    setIsSaving(flagName);
    try {
      const manager = getFeatureFlagManager();
      const flag = flags.find(f => f.name === flagName);

      if (!flag) return;

      const result = await manager.updateFlag(flagName, flag.enabled, rolloutPct);

      if (result.success) {
        toast({
          title: 'Success',
          description: `Rollout percentage updated to ${rolloutPct}%`,
        });
        // Update local state
        setFlags(prev =>
          prev.map(f => (f.name === flagName ? { ...f, rollout_pct: rolloutPct } : f))
        );
        setEditMode(prev => ({ ...prev, [flagName]: false }));
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update rollout percentage',
      });
    } finally {
      setIsSaving(null);
    }
  };

  // Enable all flags (quick action)
  const handleEnableAllFlags = async () => {
    setIsLoading(true);
    try {
      const manager = getFeatureFlagManager();

      await Promise.all(
        flags.map(flag => manager.updateFlag(flag.name, true, 100))
      );

      toast({
        title: 'Success',
        description: 'All feature flags enabled at 100%',
      });

      await loadFlags();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to enable all flags',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  // Get badge color based on status
  const getBadgeVariant = (enabled: boolean, rolloutPct: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (!enabled) return 'destructive';
    if (rolloutPct === 100) return 'default';
    if (rolloutPct > 0) return 'secondary';
    return 'outline';
  };

  const getStatusText = (enabled: boolean, rolloutPct: number): string => {
    if (!enabled) return 'Disabled';
    if (rolloutPct === 100) return 'Fully Enabled';
    if (rolloutPct > 0) return `Rollout ${rolloutPct}%`;
    return 'Enabled (0% rollout)';
  };

  if (isLoading && flags.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Feature Flags
          </CardTitle>
          <CardDescription>Loading feature flags...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Feature Flag Management
              </CardTitle>
              <CardDescription>
                Control feature rollouts with real-time updates and percentage-based targeting
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadFlags}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleEnableAllFlags}
                disabled={isLoading}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Enable All
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Warning Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Changes to feature flags take effect immediately and are synchronized in real-time
          across all clients. Use rollout percentages for gradual releases.
        </AlertDescription>
      </Alert>

      {/* Feature Flags Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Flag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rollout %</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flags.map((flag) => (
                <TableRow key={flag.name}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{flag.name}</div>
                      {flag.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {flag.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(flag.enabled, flag.rollout_pct)}>
                      {getStatusText(flag.enabled, flag.rollout_pct)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {editMode[flag.name] ? (
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[flag.rollout_pct]}
                          onValueChange={([value]) => {
                            setFlags(prev =>
                              prev.map(f =>
                                f.name === flag.name ? { ...f, rollout_pct: value } : f
                              )
                            );
                          }}
                          min={0}
                          max={100}
                          step={5}
                          className="w-32"
                        />
                        <span className="text-sm font-medium w-12">{flag.rollout_pct}%</span>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateRollout(flag.name, flag.rollout_pct)}
                          disabled={isSaving === flag.name}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditMode(prev => ({ ...prev, [flag.name]: true }))}
                        disabled={!flag.enabled}
                      >
                        {flag.rollout_pct}%
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(flag.updated_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={flag.enabled}
                      onCheckedChange={() => handleToggleEnabled(flag.name, flag.enabled)}
                      disabled={isSaving === flag.name}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {flags.length === 0 && (
            <div className="text-center py-12">
              <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No feature flags found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Feature flags will appear here once they're created in the database
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">How Rollout Percentages Work</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-muted-foreground">
          <p>
            • <strong>100%:</strong> Feature enabled for all users
          </p>
          <p>
            • <strong>50%:</strong> Feature enabled for ~50% of users (consistent per user ID)
          </p>
          <p>
            • <strong>0%:</strong> Feature enabled but shown to no users (useful for testing)
          </p>
          <p>
            • <strong>Disabled:</strong> Feature completely disabled (0% rollout ignored)
          </p>
          <p className="pt-2">
            Users are assigned to buckets based on their user ID hash, ensuring consistent
            experience across sessions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureFlagAdmin;
