import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Briefcase, ArrowUp, Upload, Download, Loader2 } from 'lucide-react';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTradeFinance } from '@/hooks/use-trade-finance';

const TradeFinanceTab = () => {
  const [tradeTab, setTradeTab] = React.useState("active");
  const isMobile = useIsMobile();
  const { applications, summary, isLoading, isSummaryLoading } = useTradeFinance();

  // Filter applications by status
  const activeApplications = applications.filter(app => app.application_status === 'active');
  const pendingApplications = applications.filter(app => ['submitted', 'under_review'].includes(app.application_status));
  const completedApplications = applications.filter(app => app.application_status === 'completed');

  return (
    <div className="w-full space-y-4 md:space-y-6 p-2 md:p-0">
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row justify-between items-center'} mb-4 md:mb-6`}>
        <h1 className="text-xl md:text-2xl font-bold text-seftec-navy dark:text-white">Trade Finance</h1>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full md:w-auto">
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
              <Card className="bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800/30 shadow-sm overflow-hidden">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mr-0 md:mr-4 mb-3 md:mb-0 flex-shrink-0">
                      <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-700 dark:text-blue-300" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div className="mb-2 md:mb-0">
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white break-words">Letter of Credit #LC928375</h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">International Import - Agricultural Products</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded self-start">Active</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">₦75,000.00</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Beneficiary</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">Global Suppliers Ltd</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Expiry Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <p className="font-medium text-sm text-gray-900 dark:text-white">2025-06-15</p>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                          <p className="font-medium text-sm text-blue-700 dark:text-blue-300 truncate">Documents Under Review</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <Button variant="outline" size="sm" className="text-blue-700 dark:text-blue-300 border-blue-700 dark:border-blue-600 text-xs">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs">
                          Upload Documents
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800/30 shadow-sm overflow-hidden">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mr-0 md:mr-4 mb-3 md:mb-0 flex-shrink-0">
                      <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-700 dark:text-blue-300" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div className="mb-2 md:mb-0">
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white break-words">Invoice Financing #IF745632</h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Local Distribution - Consumer Electronics</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded self-start">Active</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">₦45,000.00</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">Metro Electronics</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <p className="font-medium text-sm text-gray-900 dark:text-white">2025-05-20</p>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                          <p className="font-medium text-sm text-green-700 dark:text-green-300 truncate">Funded</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <Button variant="outline" size="sm" className="text-blue-700 dark:text-blue-300 border-blue-700 dark:border-blue-600 text-xs">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs">
                          Payment History
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0 p-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <Card className="bg-amber-50 dark:bg-amber-900/20 border dark:border-amber-800/30 shadow-sm overflow-hidden">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mr-0 md:mr-4 mb-3 md:mb-0 flex-shrink-0">
                      <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-amber-700 dark:text-amber-300" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div className="mb-2 md:mb-0">
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white break-words">Trade Guarantee #TG564738</h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Local Supply - Manufacturing Equipment</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 text-xs font-semibold rounded self-start">Pending</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">₦45,000.00</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Beneficiary</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">Tech Industries Co.</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Application Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <p className="font-medium text-sm text-gray-900 dark:text-white">2025-04-10</p>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                          <p className="font-medium text-sm text-amber-700 dark:text-amber-300 truncate">Under Review</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <Button variant="outline" size="sm" className="text-amber-700 dark:text-amber-300 border-amber-700 dark:border-amber-600 text-xs">
                          View Application
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs">
                          Upload Documents
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0 p-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <Card className="bg-gray-50 dark:bg-gray-900/20 border dark:border-gray-800/30 shadow-sm overflow-hidden">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mr-0 md:mr-4 mb-3 md:mb-0 flex-shrink-0">
                      <div className="bg-gray-200 dark:bg-gray-800/50 p-2 rounded-full">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div className="mb-2 md:mb-0">
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white break-words">Letter of Credit #LC781234</h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">International Import - Textiles</p>
                        </div>
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded self-start">Completed</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">₦60,000.00</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Beneficiary</p>
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">Asian Textiles Ltd</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Completion Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <p className="font-medium text-sm text-gray-900 dark:text-white">2025-02-28</p>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                          <p className="font-medium text-sm text-gray-700 dark:text-gray-300 truncate">Settled</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs">
                          Download Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TradeFinanceTab;
