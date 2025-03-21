import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/ui/navbar"
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Index = () => {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <header className="sticky top-0 z-50">
        <MainNav />
      </header>
      
      <section className="py-12 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to BizGenie
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Your AI-Powered Business Solution
          </p>
          <Button asChild size="lg">
            <Link to="/solutions">Explore Solutions</Link>
          </Button>
        </div>
      </section>
      
      {/* Add a button to the top of the page for easy access to SignupTest */}
      <div className="container mx-auto my-4 flex justify-center">
        <Link to="/signup-test" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          View Auth Test Dashboard
        </Link>
      </div>
      
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">
            Key Features
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>AI-Driven Insights</CardTitle>
                <CardDescription>
                  Get personalized insights to optimize your business strategy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Leverage the power of AI to make informed decisions and stay ahead of the competition.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Automated Solutions</CardTitle>
                <CardDescription>
                  Automate repetitive tasks and streamline your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Save time and resources with our automated solutions tailored to your business needs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scalable Platform</CardTitle>
                <CardDescription>
                  Grow your business with our scalable platform that adapts to your evolving needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our platform is designed to scale with your business, ensuring you always have the resources you need.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Get Started Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sign up now and unlock the full potential of BizGenie.
          </p>
          <Button asChild size="lg">
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
