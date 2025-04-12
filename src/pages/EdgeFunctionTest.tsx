
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import { Loader2 } from 'lucide-react';

const EdgeFunctionTest = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState('Tell me about decentralized finance');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('bizgenie');

  const testBizGenie = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    setMetadata(null);
    
    try {
      console.log('Testing bizgenie-router edge function...');
      
      const { data, error } = await supabase.functions.invoke('bizgenie-router', {
        body: { 
          prompt: query,
          userId: user?.id,
          systemPrompt: "You are a helpful AI assistant focused on DeFi and financial topics.",
          isPremium: false
        }
      });
      
      if (error) throw new Error(error.message || 'Error calling bizgenie-router');
      
      console.log('BizGenie Response:', data);
      setResponse(data.text || 'No response text received');
      setMetadata({
        model: data.model,
        complexity: data.complexity,
        fromCache: data.fromCache,
        tokens: data.tokens
      });
      
      toast({
        title: 'BizGenie Test Successful',
        description: `Model used: ${data.model}, Query complexity: ${data.complexity || 'unknown'}`,
      });
    } catch (error) {
      console.error('Error testing bizgenie-router:', error);
      setResponse(`Error: ${error.message}`);
      
      toast({
        title: 'BizGenie Test Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testPersonalizedChat = async () => {
    if (!query.trim()) return;
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to test the personalized chat function',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    setResponse('');
    setMetadata(null);
    
    try {
      console.log('Testing personalized-ai-chat edge function...');
      
      // Get the JWT token for authorization
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session found');
      }
      
      const { data, error } = await supabase.functions.invoke('personalized-ai-chat', {
        body: { 
          prompt: query,
          generateReport: false
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) throw new Error(error.message || 'Error calling personalized-ai-chat');
      
      console.log('Personalized Chat Response:', data);
      setResponse(data.text || 'No response text received');
      setMetadata({
        personalized: data.personalized,
        generateReport: data.generateReport
      });
      
      toast({
        title: 'Personalized Chat Test Successful',
        description: `Personalized: ${data.personalized ? 'Yes' : 'No'}`,
      });
    } catch (error) {
      console.error('Error testing personalized-ai-chat:', error);
      setResponse(`Error: ${error.message}`);
      
      toast({
        title: 'Personalized Chat Test Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setResponse('');
    setMetadata(null);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-8 text-center">Edge Function Testing Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="bizgenie">BizGenie Router</TabsTrigger>
            <TabsTrigger value="personalized">Personalized Chat</TabsTrigger>
          </TabsList>
          
          <div className="mb-8">
            <div className="flex gap-4">
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your test query here"
                className="flex-1"
              />
              <Button 
                onClick={activeTab === 'bizgenie' ? testBizGenie : testPersonalizedChat}
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Test {activeTab === 'bizgenie' ? 'BizGenie' : 'Personalized Chat'}
              </Button>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className="ml-4">Processing your request...</p>
                </div>
              ) : response ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center p-8">
                  No response yet. Submit a query to test the edge function.
                </p>
              )}
            </CardContent>
          </Card>
          
          {metadata && (
            <Card>
              <CardHeader>
                <CardTitle>Response Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md overflow-auto">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EdgeFunctionTest;
