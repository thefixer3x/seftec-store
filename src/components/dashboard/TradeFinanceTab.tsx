import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Briefcase, ArrowUp, Upload, Download, Loader2 } from 'lucide-react';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTradeFinance, TradeFinanceApplication } from '@/hooks/use-trade-finance';
import { ApplicationDetailModal } from './trade-finance/ApplicationDetailModal';
import { ApplicationFormModal } from './trade-finance/ApplicationFormModal';
import { DocumentUploadModal } from './trade-finance/DocumentUploadModal';

// Helper to get facility type display name
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

// Helper to format application status
const getStatusBadgeColor = (status: string): string => {
  const colors: Record<string, string> = {
    'draft': 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200',
    'submitted': 'bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200',
    'under_review': 'bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200',
    'approved': 'bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-200',
    'active': 'bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200',
    'rejected': 'bg-red-100 dark:bg-red-800/50 text-red-800 dark:text-red-200',
    'withdrawn': 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200',
    'completed': 'bg-gray-200 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200',
    'cancelled': 'bg-red-100 dark:bg-red-800/50 text-red-800 dark:text-red-200',
  };
  return colors[status] || 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200';
};

const formatStatus = (status: string): string => {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Application Card Component
const ApplicationCard: React.FC<{
  application: TradeFinanceApplication;
  variant: 'active' | 'pending' | 'completed';
  onViewDetails: (applicationId: string) => void;
  onEdit?: (application: TradeFinanceApplication) => void;
  onUploadDocuments?: (applicationId: string) => void;
}> = ({ application, variant, onViewDetails, onEdit, onUploadDocuments }) => {
  const cardColors = {
    active: 'bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800/30',
    pending: 'bg-amber-50 dark:bg-amber-900/20 border dark:border-amber-800/30',
    completed: 'bg-gray-50 dark:bg-gray-900/20 border dark:border-gray-800/30',
  };

  const iconColors = {
    active: 'bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300',
    pending: 'bg-amber-100 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300',
    completed: 'bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300',
  };

  const buttonColors = {
    active: 'text-blue-700 dark:text-blue-300 border-blue-700 dark:border-blue-600',
    pending: 'text-amber-700 dark:text-amber-300 border-amber-700 dark:border-amber-600',
    completed: 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600',
  };

  return (
    <Card className={`${cardColors[variant]} shadow-sm overflow-hidden`}>
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="mr-0 md:mr-4 mb-3 md:mb-0 flex-shrink-0">
            <div className={`${iconColors[variant]} p-2 rounded-full`}>
              <FileText className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
              <div className="mb-2 md:mb-0">
                <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white break-words">
                  {getFacilityTypeLabel(application.facility_type)} #{application.reference_number}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                  {application.description || application.title}
                </p>
              </div>
              <span className={`px-2 py-1 ${getStatusBadgeColor(application.application_status)} text-xs font-semibold rounded self-start`}>
                {formatStatus(application.application_status)}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  {application.currency} {application.amount.toLocaleString()}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">Beneficiary</p>
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {application.beneficiary_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {application.expiry_date ? 'Expiry Date' : 'Application Date'}
                </p>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {application.expiry_date
                      ? new Date(application.expiry_date).toLocaleDateString()
                      : application.application_date
                        ? new Date(application.application_date).toLocaleDateString()
                        : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {new Date(application.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                size="sm"
                className={`${buttonColors[variant]} text-xs`}
                onClick={() => onViewDetails(application.id)}
              >
                View Details
              </Button>
              {application.application_status === 'draft' && onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-700 dark:text-blue-300 border-blue-700 dark:border-blue-600 text-xs"
                  onClick={() => onEdit(application)}
                >
                  Edit
                </Button>
              )}
              {variant !== 'completed' && application.application_status !== 'draft' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs"
                  onClick={() => {
                    if (variant === 'pending' && onUploadDocuments) {
                      onUploadDocuments(application.id);
                    }
                  }}
                >
                  {variant === 'pending' ? 'Upload Documents' : 'Manage'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TradeFinanceTab = () => {
  const [tradeTab, setTradeTab] = React.useState("active");
  const [selectedApplicationId, setSelectedApplicationId] = React.useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [formModalOpen, setFormModalOpen] = React.useState(false);
  const [editingApplication, setEditingApplication] = React.useState<TradeFinanceApplication | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);
  const [uploadApplicationId, setUploadApplicationId] = React.useState<string | null>(null);

  const isMobile = useIsMobile();
  const { applications, summary, isLoading, isSummaryLoading, refetch } = useTradeFinance();

  // Filter applications by status
  const activeApplications = applications.filter(app => app.application_status === 'active');
  const pendingApplications = applications.filter(app => ['submitted', 'under_review', 'draft'].includes(app.application_status));
  const completedApplications = applications.filter(app => app.application_status === 'completed');

  const handleViewDetails = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setDetailModalOpen(true);
  };

  const handleNewApplication = () => {
    setEditingApplication(null);
    setFormModalOpen(true);
  };

  const handleEditApplication = (application: TradeFinanceApplication) => {
    setEditingApplication(application);
    setFormModalOpen(true);
  };

  const handleFormSuccess = () => {
    refetch();
  };

  const handleUploadDocuments = (applicationId: string) => {
    setUploadApplicationId(applicationId);
    setUploadModalOpen(true);
  };

  const handleUploadSuccess = () => {
    refetch();
  };

  return (
    <div className="w-full space-y-4 md:space-y-6 p-2 md:p-0">
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row justify-between items-center'} mb-4 md:mb-6`}>
        <h1 className="text-xl md:text-2xl font-bold text-seftec-navy dark:text-white">Trade Finance</h1>
        <Button
          className="bg-blue-700 hover:bg-blue-800 text-white w-full md:w-auto"
          onClick={handleNewApplication}
        >
          Apply for New Facility
          <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
        </Button>
      </div>

      {/* Summary Cards */}
      {isSummaryLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300 font-medium">Active Facilities</p>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-100">{summary?.active_facilities_count || 0}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Total Value: {summary?.currency || 'NGN'} {summary?.active_facilities_total?.toLocaleString() || '0.00'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-900/20 border dark:border-amber-800/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start">
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <Upload className="h-4 w-4 md:h-5 md:w-5 text-amber-700 dark:text-amber-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-amber-700 dark:text-amber-300 font-medium">Pending Applications</p>
                  <h3 className="text-xl md:text-2xl font-bold text-amber-900 dark:text-amber-100">{summary?.pending_applications_count || 0}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Total Value: {summary?.currency || 'NGN'} {summary?.pending_applications_total?.toLocaleString() || '0.00'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900/20 border dark:border-green-800/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <Download className="h-4 w-4 md:h-5 md:w-5 text-green-700 dark:text-green-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-green-700 dark:text-green-300 font-medium">Available Credit</p>
                  <h3 className="text-xl md:text-2xl font-bold text-green-900 dark:text-green-100">
                    {summary?.currency || 'NGN'} {summary?.available_limit?.toLocaleString() || '0.00'}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Credit Limit: {summary?.currency || 'NGN'} {summary?.credit_limit?.toLocaleString() || '0.00'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trade Finance Facilities */}
      <div className="mt-6 md:mt-8">
        <Tabs value={tradeTab} onValueChange={setTradeTab}>
          <TabsList className={`bg-gray-100 dark:bg-gray-800 p-1 rounded-md mb-4 md:mb-6 ${isMobile ? 'overflow-x-auto w-full' : ''}`}>
            <TabsTrigger 
              value="active" 
              className={`rounded-md text-xs md:text-sm px-2 md:px-4 py-2 ${tradeTab === 'active' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {isMobile ? 'Active' : 'Active Facilities'}
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className={`rounded-md text-xs md:text-sm px-2 md:px-4 py-2 ${tradeTab === 'pending' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {isMobile ? 'Pending' : 'Pending Applications'}
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className={`rounded-md text-xs md:text-sm px-2 md:px-4 py-2 ${tradeTab === 'completed' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {isMobile ? 'Completed' : 'Completed Facilities'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0 p-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : activeApplications.length > 0 ? (
                activeApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    variant="active"
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditApplication}
                    onUploadDocuments={handleUploadDocuments}
                  />
                ))
              ) : (
                <Card className="bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800/30">
                  <CardContent className="p-8 text-center">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-blue-300 dark:text-blue-700" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Active Facilities
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You don't have any active trade finance facilities yet.
                    </p>
                    <Button
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={handleNewApplication}
                    >
                      Apply for New Facility
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0 p-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                </div>
              ) : pendingApplications.length > 0 ? (
                pendingApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    variant="pending"
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditApplication}
                    onUploadDocuments={handleUploadDocuments}
                  />
                ))
              ) : (
                <Card className="bg-amber-50 dark:bg-amber-900/20 border dark:border-amber-800/30">
                  <CardContent className="p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-amber-300 dark:text-amber-700" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Pending Applications
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You don't have any pending applications at the moment.
                    </p>
                    <Button
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={handleNewApplication}
                    >
                      Submit New Application
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0 p-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
                </div>
              ) : completedApplications.length > 0 ? (
                completedApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    variant="completed"
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditApplication}
                    onUploadDocuments={handleUploadDocuments}
                  />
                ))
              ) : (
                <Card className="bg-gray-50 dark:bg-gray-900/20 border dark:border-gray-800/30">
                  <CardContent className="p-8 text-center">
                    <Download className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Completed Facilities
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your completed facilities will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        applicationId={selectedApplicationId}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        onUploadDocuments={handleUploadDocuments}
      />

      {/* Application Form Modal */}
      <ApplicationFormModal
        application={editingApplication}
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        onSuccess={handleFormSuccess}
      />

      {/* Document Upload Modal */}
      <DocumentUploadModal
        applicationId={uploadApplicationId}
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default TradeFinanceTab;
