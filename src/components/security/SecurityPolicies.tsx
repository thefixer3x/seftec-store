
import React from 'react';
import { Shield, Lock, Key, Eye, Database, UserCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SecurityPolicies = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Row Level Security",
      description: "Database-level access controls for all tables",
      status: "Active",
      coverage: "25 tables protected"
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "AES-256 encryption for data at rest and in transit",
      status: "Active",
      coverage: "All user data encrypted"
    },
    {
      icon: Key,
      title: "Multi-Factor Authentication",
      description: "TOTP and SMS-based 2FA for enhanced security",
      status: "Active",
      coverage: "Optional for all users"
    },
    {
      icon: Eye,
      title: "Audit Logging",
      description: "Comprehensive logging of all system activities",
      status: "Active",
      coverage: "100% operation coverage"
    },
    {
      icon: Database,
      title: "Data Backup & Recovery",
      description: "Automated backups with point-in-time recovery",
      status: "Active",
      coverage: "Daily backups"
    },
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "KYC/AML compliance for enterprise clients",
      status: "Active",
      coverage: "Enterprise tier"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-seftec-navy dark:text-white mb-2">
          Enterprise Security Framework
        </h2>
        <p className="text-muted-foreground">
          Bank-grade security measures protecting your data and transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityFeatures.map((feature, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <feature.icon className="h-8 w-8 text-seftec-gold dark:text-seftec-teal" />
                <Badge variant="secondary" className="text-xs">
                  {feature.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
              <CardDescription className="mb-3">
                {feature.description}
              </CardDescription>
              <p className="text-xs text-muted-foreground">
                {feature.coverage}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
