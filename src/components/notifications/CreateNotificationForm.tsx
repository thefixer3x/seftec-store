
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useNotifications } from '@/context/NotificationsContext';
import { NotificationSettings } from '@/context/NotificationsContext';

export function CreateNotificationForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success' | 'error'>('info');
  const [group, setGroup] = useState('');
  const [path, setPath] = useState('');
  const [expiresAfter, setExpiresAfter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const { toast } = useToast();
  const { settings, updateSettings } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Calculate expiration date if provided
      let expiresAt = null;
      if (expiresAfter && !isNaN(parseInt(expiresAfter))) {
        const hours = parseInt(expiresAfter);
        expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
      }

      // Build metadata object
      const metadata: Record<string, any> = {};
      if (path) {
        metadata.path = path;
      }

      const { data, error } = await supabase.functions.invoke('create-notification', {
        body: { 
          title, 
          message, 
          type, 
          notification_group: group || undefined,
          expires_at: expiresAt,
          metadata: Object.keys(metadata).length > 0 ? metadata : undefined
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Notification created",
        description: "Your notification has been successfully created",
      });
      
      // Reset form
      setTitle('');
      setMessage('');
      setType('info');
      setGroup('');
      setPath('');
      setExpiresAfter('');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create notification",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSetting = (setting: keyof Omit<NotificationSettings, 'id' | 'user_id'>, value: boolean) => {
    if (!settings) return;
    
    updateSettings({
      [setting]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Management</CardTitle>
        <CardDescription>
          Create test notifications and manage your notification preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="create">Create Notification</TabsTrigger>
            <TabsTrigger value="preferences">Notification Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={type} 
                      onValueChange={(value) => setType(value as 'info' | 'warning' | 'success' | 'error')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select notification type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="group">Group (Optional)</Label>
                    <Input
                      id="group"
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                      placeholder="e.g., Orders, Account, etc."
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="path">Target Path (Optional)</Label>
                    <Input
                      id="path"
                      value={path}
                      onChange={(e) => setPath(e.target.value)}
                      placeholder="/orders, /profile, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expires">Expires After (Hours, Optional)</Label>
                    <Input
                      id="expires"
                      type="number"
                      value={expiresAfter}
                      onChange={(e) => setExpiresAfter(e.target.value)}
                      placeholder="24, 48, 72, etc."
                      min="1"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Notification"}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="preferences">
            {settings ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Info Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications about general information</p>
                  </div>
                  <Switch
                    checked={settings.info_enabled}
                    onCheckedChange={(checked) => handleToggleSetting('info_enabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Success Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications about successful operations</p>
                  </div>
                  <Switch
                    checked={settings.success_enabled}
                    onCheckedChange={(checked) => handleToggleSetting('success_enabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Warning Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications about warnings</p>
                  </div>
                  <Switch
                    checked={settings.warning_enabled}
                    onCheckedChange={(checked) => handleToggleSetting('warning_enabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Error Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications about errors</p>
                  </div>
                  <Switch
                    checked={settings.error_enabled}
                    onCheckedChange={(checked) => handleToggleSetting('error_enabled', checked)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Loading preferences...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
