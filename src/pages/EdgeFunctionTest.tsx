import React, { useState, useEffect } from 'react';
import DevTestLayout from '@/components/layout/DevTestLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const EdgeFunctionTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [functionName, setFunctionName] = useState('hello-world');
  const [payload, setPayload] = useState('{}');
  const [activeTab, setActiveTab] = useState('invoke');

  const invokeFunction = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Parse the payload to ensure it's valid JSON
      const parsedPayload = payload ? JSON.parse(payload) : {};
      
      // Simulate API call to edge function
      console.log(`Invoking edge function: ${functionName} with payload:`, parsedPayload);
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on function name
      let mockResponse;
      if (functionName === 'hello-world') {
        mockResponse = { message: "Hello from Edge Function!", timestamp: new Date().toISOString() };
      } else if (functionName === 'get-user') {
        mockResponse = { 
          user: { 
            id: "user_123", 
            name: "Test User", 
            email: "test@example.com",
            role: "admin"
          }
        };
      } else if (functionName === 'process-payment') {
        mockResponse = { 
          success: true, 
          transactionId: "tx_" + Math.random().toString(36).substring(2, 15),
          amount: 100.50,
          currency: "USD",
          status: "completed"
        };
      } else {
        mockResponse = { error: "Unknown function" };
      }
      
      setResult(mockResponse);
    } catch (err) {
      console.error("Error invoking edge function:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    invokeFunction();
  };

  const predefinedFunctions = [
    { name: 'hello-world', description: 'Basic test function that returns a greeting' },
    { name: 'get-user', description: 'Simulates retrieving user data' },
    { name: 'process-payment', description: 'Simulates a payment processing function' }
  ];

  return (
    <DevTestLayout title="Edge Function Test" description="Test Supabase Edge Functions">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edge Function Tester</CardTitle>
            <CardDescription>
              Test edge functions by invoking them directly or viewing their logs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="invoke">Invoke Function</TabsTrigger>
                <TabsTrigger value="logs">View Logs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="invoke">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="function-name">Function Name</Label>
                    <div className="flex gap-2">
                      <Input
                        id="function-name"
                        value={functionName}
                        onChange={(e) => setFunctionName(e.target.value)}
                        placeholder="Enter function name"
                        className="flex-1"
                      />
                      <div className="relative inline-block">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            const select = document.getElementById('function-select') as HTMLSelectElement;
                            select.click();
                          }}
                        >
                          Select
                        </Button>
                        <select 
                          id="function-select"
                          className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                          onChange={(e) => setFunctionName(e.target.value)}
                          value={functionName}
                        >
                          {predefinedFunctions.map(fn => (
                            <option key={fn.name} value={fn.name}>{fn.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="payload">Payload (JSON)</Label>
                    <Textarea
                      id="payload"
                      value={payload}
                      onChange={(e) => setPayload(e.target.value)}
                      placeholder='{"key": "value"}'
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Invoking...' : 'Invoke Function'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="logs">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md h-64 overflow-y-auto font-mono text-xs">
                  <p className="text-gray-500 dark:text-gray-400">
                    [2023-05-20 12:34:56] INFO: Function hello-world invoked
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    [2023-05-20 12:34:56] DEBUG: Processing request with payload: {"{\"test\": true}"}
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    [2023-05-20 12:34:57] SUCCESS: Function completed successfully
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    [2023-05-20 12:35:23] INFO: Function get-user invoked
                  </p>
                  <p className="text-red-600 dark:text-red-400">
                    [2023-05-20 12:35:24] ERROR: User not found with ID: user_456
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Function Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Available Functions</CardTitle>
            <CardDescription>
              List of predefined edge functions you can test
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {predefinedFunctions.map((fn) => (
                <li key={fn.name} className="p-3 bg-gray-50 dark:bg-gray-800/30 rounded-md">
                  <div className="font-medium">{fn.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{fn.description}</div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.open('https://supabase.com/docs/guides/functions', '_blank')}>
              Documentation
            </Button>
            <Button variant="outline" onClick={() => window.open('https://github.com/supabase/supabase/tree/master/examples/edge-functions', '_blank')}>
              Examples
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DevTestLayout>
  );
};

export default EdgeFunctionTest;
