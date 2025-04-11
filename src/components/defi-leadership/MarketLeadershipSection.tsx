
import React from "react";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const MarketLeadershipSection = () => {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Market Leadership Position</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="bg-slate-50 dark:bg-slate-900">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Active Enterprise Users</span>
                <span className="font-semibold">5,000+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transaction Volume</span>
                <span className="font-semibold">$2.3B Annually</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Compliance Rate</span>
                <span className="font-semibold">99.7%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Platform Reliability</span>
                <span className="font-semibold">99.99% Uptime</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-slate-50 dark:bg-slate-900">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Industry Recognition
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 shrink-0">2025</Badge>
                <span>Most Innovative DeFi Solution - Global Finance Awards</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 shrink-0">2024</Badge>
                <span>Top 10 Blockchain Companies to Watch - Forbes Business</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 shrink-0">2024</Badge>
                <span>Excellence in Financial Innovation - Enterprise Tech Summit</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-slate-50 dark:bg-slate-900">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-600" />
              Competitive Advantages
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">01.</span>
                <span>Only platform with full ISO 20022 compliance for DeFi transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">02.</span>
                <span>Patented secure bridge technology between traditional banking and blockchain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">03.</span>
                <span>Advanced risk assessment AI for real-time transaction monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">04.</span>
                <span>Enterprise-grade SLAs with 24/7 dedicated support</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Enterprise Success Stories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Global Supply Chain Finance Transformation</CardTitle>
            <CardDescription>International Manufacturing Conglomerate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Implemented Seftec's DeFi platform to manage $350M+ in supply chain financing across 27 countries, reducing settlement times from 14 days to under 24 hours.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>47% reduction in financing costs</li>
              <li>89% improvement in supplier satisfaction scores</li>
              <li>Full regulatory compliance across all regions</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Full Case Study</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cross-Border Payment Revolution</CardTitle>
            <CardDescription>Leading African Financial Services Provider</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Leveraged Seftec's ISO 20022-compliant DeFi infrastructure to process over 1.2 million monthly cross-border transactions with 99.99% success rate.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>92% reduction in transaction fees</li>
              <li>Instant settlements vs. previous 3-5 day delays</li>
              <li>Enhanced fraud prevention with 99.7% detection rate</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Full Case Study</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default MarketLeadershipSection;
