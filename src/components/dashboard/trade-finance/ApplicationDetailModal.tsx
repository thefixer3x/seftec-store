import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Calendar,
  DollarSign,
  User,
  Building,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  Upload,
  Eye,
} from 'lucide-react';
import { useTradeFinance, TradeFinanceApplication } from '@/hooks/use-trade-finance';

interface ApplicationDetailModalProps {
  applicationId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadDocuments?: (applicationId: string) => void;
}

const formatCurrency = (amount: number, currency: string): string => {
  return `${currency} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDate = (date: string | null): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getFacilityTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'letter_of_credit': 'Letter of Credit',
    'invoice_financing': 'Invoice Financing',
    'trade_guarantee': 'Trade Guarantee',
    'export_financing': 'Export Financing',
    'import_financing': 'Import Financing',
    'supply_chain_financing': 'Supply Chain Financing',
  };
  return labels[type] || type;
};

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'draft': 'bg-gray-500',
    'submitted': 'bg-amber-500',
    'under_review': 'bg-amber-600',
    'approved': 'bg-green-500',
    'active': 'bg-blue-500',
    'rejected': 'bg-red-500',
    'withdrawn': 'bg-gray-600',
    'completed': 'bg-gray-700',
    'cancelled': 'bg-red-600',
  };
  return colors[status] || 'bg-gray-500';
};

const formatStatus = (status: string): string => {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  applicationId,
  open,
  onOpenChange,
  onUploadDocuments,
}) => {
  const { fetchApplicationDetails } = useTradeFinance();
  const [application, setApplication] = useState<TradeFinanceApplication | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadApplication = async () => {
      if (applicationId && open) {
        setLoading(true);
        try {
          const data = await fetchApplicationDetails(applicationId);
          setApplication(data);
        } catch (error) {
          console.error('Failed to load application details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadApplication();
  }, [applicationId, open, fetchApplicationDetails]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : application ? (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    {getFacilityTypeLabel(application.facility_type)}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-1">
                    Reference: #{application.reference_number}
                  </DialogDescription>
                </div>
                <Badge className={`${getStatusColor(application.application_status)} text-white`}>
                  {formatStatus(application.application_status)}
                </Badge>
              </div>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">
                  Documents {application.documents && `(${application.documents.length})`}
                </TabsTrigger>
                <TabsTrigger value="transactions">
                  Transactions {application.transactions && `(${application.transactions.length})`}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <FileText className="h-4 w-4 mr-2" />
                        <span className="text-sm">Title</span>
                      </div>
                      <p className="font-medium">{application.title}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="text-sm">Amount</span>
                      </div>
                      <p className="font-medium text-lg">
                        {formatCurrency(application.amount, application.currency)}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <User className="h-4 w-4 mr-2" />
                        <span className="text-sm">Beneficiary</span>
                      </div>
                      <p className="font-medium">{application.beneficiary_name}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <Building className="h-4 w-4 mr-2" />
                        <span className="text-sm">Facility Type</span>
                      </div>
                      <p className="font-medium">{getFacilityTypeLabel(application.facility_type)}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Description & Purpose */}
                {(application.description || application.purpose) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Description & Purpose</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {application.description && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</p>
                          <p className="text-sm">{application.description}</p>
                        </div>
                      )}
                      {application.purpose && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Purpose</p>
                          <p className="text-sm">{application.purpose}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">Application Date</span>
                        </div>
                        <p className="text-sm font-medium">{formatDate(application.application_date)}</p>
                      </div>
                      {application.submitted_date && (
                        <div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">Submitted Date</span>
                          </div>
                          <p className="text-sm font-medium">{formatDate(application.submitted_date)}</p>
                        </div>
                      )}
                      {application.approved_date && (
                        <div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            <span className="text-sm">Approved Date</span>
                          </div>
                          <p className="text-sm font-medium">{formatDate(application.approved_date)}</p>
                        </div>
                      )}
                      {application.activation_date && (
                        <div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-sm">Activation Date</span>
                          </div>
                          <p className="text-sm font-medium">{formatDate(application.activation_date)}</p>
                        </div>
                      )}
                      {application.expiry_date && (
                        <div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="text-sm">Expiry Date</span>
                          </div>
                          <p className="text-sm font-medium">{formatDate(application.expiry_date)}</p>
                        </div>
                      )}
                      {application.completion_date && (
                        <div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="text-sm">Completion Date</span>
                          </div>
                          <p className="text-sm font-medium">{formatDate(application.completion_date)}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Reviewer Notes / Rejection Reason */}
                {(application.reviewer_notes || application.rejection_reason) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Review Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {application.reviewer_notes && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Reviewer Notes</p>
                          <p className="text-sm">{application.reviewer_notes}</p>
                        </div>
                      )}
                      {application.rejection_reason && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                          <div className="flex items-center text-red-700 dark:text-red-400 mb-1">
                            <XCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Rejection Reason</span>
                          </div>
                          <p className="text-sm text-red-600 dark:text-red-300">{application.rejection_reason}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                {application.documents && application.documents.length > 0 ? (
                  <div className="space-y-3">
                    {application.documents.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium">{doc.file_name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {doc.document_type} • {doc.file_size ? `${(doc.file_size / 1024).toFixed(2)} KB` : 'Unknown size'}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  Uploaded: {formatDate(doc.uploaded_at)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {doc.verified && (
                                <Badge className="bg-green-500 text-white">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              <Button variant="outline" size="sm" asChild>
                                <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No Documents Uploaded
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Upload required documents to complete your application.
                      </p>
                      <Button
                        className="bg-blue-700 hover:bg-blue-800 text-white"
                        onClick={() => {
                          if (onUploadDocuments && application) {
                            onUploadDocuments(application.id);
                          }
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="transactions" className="mt-4">
                {application.transactions && application.transactions.length > 0 ? (
                  <div className="space-y-3">
                    {application.transactions.map((txn) => (
                      <Card key={txn.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="font-medium">{txn.transaction_type}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatCurrency(txn.amount, txn.currency)}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  {formatDate(txn.transaction_date)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={`${txn.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'} text-white`}>
                                {formatStatus(txn.status)}
                              </Badge>
                              {txn.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {txn.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No Transactions Yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Transaction history will appear here once the facility is active.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">Application not found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
