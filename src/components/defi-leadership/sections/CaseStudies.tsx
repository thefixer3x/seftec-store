
import React from 'react';
import { Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const CaseStudies = () => {
  const caseStudies = [
    {
      company: "Global Trade Corp",
      industry: "International Trade",
      challenge: "Manual trade finance processes causing 7-day settlement delays",
      solution: "Automated ISO 20022 compliant DeFi settlements",
      results: [
        "Reduced settlement time from 7 days to 2 hours",
        "40% cost reduction in trade finance operations",
        "99.9% transaction success rate"
      ],
      savings: "$2.1M annually"
    },
    {
      company: "Manufacturing Alliance",
      industry: "Supply Chain",
      challenge: "Cross-border payments with high fees and poor visibility",
      solution: "Real-time DeFi payment rails with smart contracts",
      results: [
        "85% reduction in transaction fees",
        "Real-time payment tracking and confirmations",
        "Improved supplier relationships"
      ],
      savings: "$850K annually"
    },
    {
      company: "Energy Consortium",
      industry: "Renewable Energy",
      challenge: "Complex multi-party settlements for green energy credits",
      solution: "Tokenized carbon credit trading on DeFi infrastructure",
      results: [
        "Instant settlement of carbon credit trades",
        "Transparent audit trail for ESG reporting",
        "30% increase in trading volume"
      ],
      savings: "$1.5M annually"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-seftec-navy dark:text-white mb-4">
          Enterprise Success Stories
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real results from Fortune 500 companies leveraging our DeFi infrastructure for critical business operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {caseStudies.map((study, index) => (
          <Card key={index} className="relative group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Building2 className="h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
                <Badge variant="outline">{study.industry}</Badge>
              </div>
              <CardTitle className="text-lg">{study.company}</CardTitle>
              <CardDescription className="text-sm">
                {study.challenge}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-seftec-navy dark:text-white">
                  Our Solution:
                </h4>
                <p className="text-sm text-muted-foreground">{study.solution}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2 text-seftec-navy dark:text-white">
                  Results:
                </h4>
                <ul className="space-y-1">
                  {study.results.map((result, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Savings</p>
                    <p className="font-bold text-green-600">{study.savings}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:bg-seftec-gold/10">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
