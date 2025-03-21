
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Briefcase, ArrowUp, Upload, Download } from 'lucide-react';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';

const TradeFinanceTab = () => {
  const [tradeTab, setTradeTab] = React.useState("active");

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trade Finance</h1>
        <Button className="bg-blue-700 hover:bg-blue-800">
          Apply for New Facility
          <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 border">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Briefcase className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Active Facilities</p>
                <h3 className="text-2xl font-bold">2</h3>
                <p className="text-sm text-gray-500 mt-1">Total Value: ₦120,000.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <Upload className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-amber-700">Pending Applications</p>
                <h3 className="text-2xl font-bold">1</h3>
                <p className="text-sm text-gray-500 mt-1">Total Value: ₦45,000.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <Download className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-700">Available Credit</p>
                <h3 className="text-2xl font-bold">₦180,000.00</h3>
                <p className="text-sm text-gray-500 mt-1">Credit Limit: ₦300,000.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trade Finance Facilities */}
      <div className="mt-8">
        <Tabs value={tradeTab} onValueChange={setTradeTab}>
          <TabsList className="bg-gray-100 p-1 rounded-md mb-6">
            <TabsTrigger 
              value="active" 
              className={`rounded-md ${tradeTab === 'active' ? 'bg-white shadow-sm' : ''}`}
            >
              Active Facilities
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className={`rounded-md ${tradeTab === 'pending' ? 'bg-white shadow-sm' : ''}`}
            >
              Pending Applications
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className={`rounded-md ${tradeTab === 'completed' ? 'bg-white shadow-sm' : ''}`}
            >
              Completed Facilities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0 p-0">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-blue-50 border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Letter of Credit #LC928375</h3>
                          <p className="text-sm text-gray-600">International Import - Agricultural Products</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Active</span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="font-medium">₦75,000.00</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Beneficiary</p>
                          <p className="font-medium">Global Suppliers Ltd</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expiry Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <p className="font-medium">2025-06-15</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <p className="font-medium text-blue-700">Documents Under Review</p>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-3">
                        <Button variant="outline" size="sm" className="text-blue-700 border-blue-700">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
                          Upload Documents
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Invoice Financing #IF745632</h3>
                          <p className="text-sm text-gray-600">Local Distribution - Consumer Electronics</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Active</span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="font-medium">₦45,000.00</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Client</p>
                          <p className="font-medium">Metro Electronics</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Due Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <p className="font-medium">2025-05-20</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <p className="font-medium text-green-700">Funded</p>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-3">
                        <Button variant="outline" size="sm" className="text-blue-700 border-blue-700">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
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
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-amber-50 border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <FileText className="h-6 w-6 text-amber-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Trade Guarantee #TG564738</h3>
                          <p className="text-sm text-gray-600">Local Supply - Manufacturing Equipment</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">Pending</span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="font-medium">₦45,000.00</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Beneficiary</p>
                          <p className="font-medium">Tech Industries Co.</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Application Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <p className="font-medium">2025-04-10</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <p className="font-medium text-amber-700">Under Review</p>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-3">
                        <Button variant="outline" size="sm" className="text-amber-700 border-amber-700">
                          View Application
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
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
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-gray-50 border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <FileText className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Letter of Credit #LC781234</h3>
                          <p className="text-sm text-gray-600">International Import - Textiles</p>
                        </div>
                        <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded">Completed</span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="font-medium">₦60,000.00</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Beneficiary</p>
                          <p className="font-medium">Asian Textiles Ltd</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Completion Date</p>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <p className="font-medium">2025-02-28</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <p className="font-medium text-gray-700">Settled</p>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-3">
                        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
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
