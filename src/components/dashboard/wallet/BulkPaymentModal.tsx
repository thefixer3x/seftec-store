
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthState } from "@/hooks/use-auth-state";
import { Package, FileUp, User, Calendar } from "lucide-react";

interface BulkPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const BulkPaymentModal: React.FC<BulkPaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [csvData, setCsvData] = useState<any[]>([]);
  const { user } = useAuthState();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Read and parse CSV file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const text = event.target.result.toString();
          const rows = text.split('\n');
          const headers = rows[0].split(',');
          
          const parsedData = rows.slice(1).map(row => {
            const values = row.split(',');
            const rowData: Record<string, string> = {};
            
            headers.forEach((header, index) => {
              rowData[header.trim()] = values[index]?.trim() || '';
            });
            
            return rowData;
          }).filter(row => row.name && row.account && row.amount);
          
          setCsvData(parsedData);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!title) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for this bulk payment",
        variant: "destructive",
      });
      return;
    }

    if (csvData.length === 0) {
      toast({
        title: "No Data",
        description: "Please upload a CSV file with payment data",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Calculate total amount
      const totalAmount = csvData.reduce((sum, row) => sum + parseFloat(row.amount || '0'), 0);
      
      // Create bulk payment record
      const { data: bulkPayment, error: bulkPaymentError } = await supabase
        .from('bulk_payments')
        .insert({
          user_id: user?.id,
          title,
          total_amount: totalAmount,
          scheduled_date: scheduledDate ? new Date(scheduledDate).toISOString() : null,
          currency_code: 'NGN',
          status: 'pending'
        })
        .select()
        .single();
        
      if (bulkPaymentError) throw bulkPaymentError;
      
      // Process each payment item
      for (const row of csvData) {
        // First check if beneficiary exists, if not create it
        const { data: existingBeneficiary } = await supabase
          .from('beneficiaries')
          .select('id')
          .eq('user_id', user?.id)
          .eq('account_number', row.account)
          .maybeSingle();
          
        let beneficiaryId = existingBeneficiary?.id;
        
        if (!beneficiaryId) {
          // Create new beneficiary
          const { data: newBeneficiary, error: beneficiaryError } = await supabase
            .from('beneficiaries')
            .insert({
              user_id: user?.id,
              name: row.name,
              account_number: row.account,
              bank_code: row.bank_code || '000', // Default bank code if not provided
              category: 'bulk_import'
            })
            .select()
            .single();
            
          if (beneficiaryError) throw beneficiaryError;
          beneficiaryId = newBeneficiary.id;
        }
        
        // Create payment item
        const { error: paymentItemError } = await supabase
          .from('payment_items')
          .insert({
            bulk_payment_id: bulkPayment.id,
            beneficiary_id: beneficiaryId,
            amount: parseFloat(row.amount),
            description: row.description || 'Bulk payment',
            currency_code: 'NGN',
            status: 'pending'
          });
          
        if (paymentItemError) throw paymentItemError;
      }
      
      toast({
        title: "Bulk Payment Created",
        description: `Successfully created bulk payment with ${csvData.length} transactions`,
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error creating bulk payment:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create bulk payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Bulk Payment</DialogTitle>
          <DialogDescription>
            Upload a CSV file to make payments to multiple recipients at once
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="upload" className="flex items-center">
              <FileUp className="h-4 w-4 mr-2" /> File Upload
            </TabsTrigger>
            <TabsTrigger value="recipients" className="flex items-center">
              <User className="h-4 w-4 mr-2" /> Recipients
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" /> Schedule
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-title">Payment Title</Label>
              <Input
                id="payment-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="May 2025 Salary Payments"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
              <p className="text-sm text-gray-500">
                CSV should contain columns: name, account, amount, bank_code (optional), description (optional)
              </p>
            </div>
            
            {file && (
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                <p className="text-green-700 dark:text-green-300 text-sm">
                  File loaded: {file.name} ({csvData.length} valid records found)
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recipients" className="space-y-4">
            {csvData.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Account</th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.account}</td>
                        <td className="p-2 text-right">{parseFloat(row.amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold bg-gray-50 dark:bg-gray-900">
                      <td className="p-2" colSpan={2}>Total:</td>
                      <td className="p-2 text-right">
                        {csvData.reduce((sum, row) => sum + parseFloat(row.amount || '0'), 0)
                          .toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">No recipients loaded. Please upload a CSV file first.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-date">Schedule Date (Optional)</Label>
              <Input
                id="schedule-date"
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Leave empty to process the payment immediately
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Processing..." : "Create Bulk Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkPaymentModal;
