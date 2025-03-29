
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalizedAIChatInterface from './PersonalizedAIChatInterface';

const PersonalizedAIChat = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Personalized Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <PersonalizedAIChatInterface 
          endpoint="personalized-ai-chat"
          placeholder="Ask me anything based on your business preferences..."
          buttonText="Ask Assistant"
        />
      </CardContent>
    </Card>
  );
};

export default PersonalizedAIChat;
