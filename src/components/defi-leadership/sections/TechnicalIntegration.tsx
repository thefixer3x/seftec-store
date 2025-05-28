
import React from 'react';
import { Shield, Zap, Globe, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TechnicalIntegration = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Multi-layer security architecture with institutional custody solutions",
      features: ["Hardware Security Modules (HSM)", "Multi-signature wallets", "Real-time fraud detection"]
    },
    {
      icon: Lock,
      title: "Regulatory Compliance",
      description: "Built-in compliance framework for global financial regulations",
      features: ["AML/KYC integration", "Transaction monitoring", "Regulatory reporting"]
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for enterprise-scale transaction processing",
      features: ["10,000+ TPS capacity", "99.99% uptime SLA", "Sub-second settlements"]
    }
  ];

  const integrationSteps = [
    {
      step: "1",
      title: "API Integration",
      description: "Connect your existing systems via RESTful APIs",
      timeframe: "1-2 weeks"
    },
    {
      step: "2",
      title: "ISO 20022 Mapping",
      description: "Configure message formats for seamless data exchange",
      timeframe: "2-3 weeks"
    },
    {
      step: "3",
      title: "Testing & Validation",
      description: "Comprehensive testing in our sandbox environment",
      timeframe: "1-2 weeks"
    },
    {
      step: "4",
      title: "Production Deployment",
      description: "Go-live with full monitoring and support",
      timeframe: "1 week"
    }
  ];

  return (
    <div className="space-y-8">
      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platform">Platform Overview</TabsTrigger>
          <TabsTrigger value="iso20022">ISO 20022 Integration</TabsTrigger>
          <TabsTrigger value="integration">Integration Process</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-seftec-gold dark:text-seftec-teal mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="iso20022" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-2" />
                ISO 20022 Compliance & Interoperability
              </CardTitle>
              <CardDescription>
                Seamless integration between traditional banking systems and blockchain infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-seftec-navy dark:text-white">
                    Message Standards Support
                  </h4>
                  <div className="space-y-2">
                    {['pacs.008 (FIToFICustomerCreditTransfer)', 'pacs.002 (FIToFIPaymentStatusReport)', 'camt.053 (BankToCustomerStatement)', 'pain.001 (CustomerCreditTransferInitiation)'].map((standard, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Badge variant="outline" className="mr-2 text-xs">{standard.split(' ')[0]}</Badge>
                        <span className="text-muted-foreground">{standard.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-seftec-navy dark:text-white">
                    Integration Benefits
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Real-time transaction status updates',
                      'Standardized error handling and reporting',
                      'Automated reconciliation processes',
                      'Cross-border payment optimization'
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="mt-6">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-2">
                Enterprise Integration Timeline
              </h3>
              <p className="text-muted-foreground">
                Typical deployment timeline: 5-8 weeks from initiation to production
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrationSteps.map((step, index) => (
                <Card key={index} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-seftec-gold dark:bg-seftec-teal text-white flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {step.timeframe}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-2 text-seftec-navy dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                  {index < integrationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
