import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Loader2,
  AlertCircle,
  Upload,
  FileText,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useTradeFinance } from '@/hooks/use-trade-finance';

interface DocumentUploadModalProps {
  applicationId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UploadItem {
  id: string;
  file: File;
  documentType: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  applicationId,
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { uploadDocument } = useTradeFinance();
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentTypes = [
    { value: 'invoice', label: 'Invoice' },
    { value: 'purchase_order', label: 'Purchase Order' },
    { value: 'contract', label: 'Contract' },
    { value: 'letter_of_credit', label: 'Letter of Credit' },
    { value: 'bill_of_lading', label: 'Bill of Lading' },
    { value: 'certificate_of_origin', label: 'Certificate of Origin' },
    { value: 'packing_list', label: 'Packing List' },
    { value: 'insurance_certificate', label: 'Insurance Certificate' },
    { value: 'financial_statement', label: 'Financial Statement' },
    { value: 'business_license', label: 'Business License' },
    { value: 'other', label: 'Other' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newUploads: UploadItem[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      documentType: 'invoice',
      status: 'pending',
    }));

    setUploads((prev) => [...prev, ...newUploads]);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDocumentTypeChange = (uploadId: string, documentType: string) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === uploadId ? { ...upload, documentType } : upload
      )
    );
  };

  const handleRemoveUpload = (uploadId: string) => {
    setUploads((prev) => prev.filter((upload) => upload.id !== uploadId));
  };

  const handleUploadFile = async (uploadId: string) => {
    if (!applicationId) return;

    const upload = uploads.find((u) => u.id === uploadId);
    if (!upload) return;

    setUploads((prev) =>
      prev.map((u) =>
        u.id === uploadId ? { ...u, status: 'uploading', progress: 0 } : u
      )
    );

    try {
      await uploadDocument({
        applicationId,
        file: upload.file,
        documentType: upload.documentType,
      });

      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId ? { ...u, status: 'completed', progress: 100 } : u
        )
      );

      // Auto-remove completed uploads after 2 seconds
      setTimeout(() => {
        handleRemoveUpload(uploadId);
      }, 2000);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to upload document:', error);
      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId
            ? {
                ...u,
                status: 'error',
                error:
                  error instanceof Error
                    ? error.message
                    : 'Upload failed. Please try again.',
              }
            : u
        )
      );
    }
  };

  const handleUploadAll = async () => {
    setApiError(null);
    const pendingUploads = uploads.filter((u) => u.status === 'pending');

    for (const upload of pendingUploads) {
      await handleUploadFile(upload.id);
    }
  };

  const handleClose = () => {
    // Only allow closing if no uploads are in progress
    const hasUploading = uploads.some((u) => u.status === 'uploading');
    if (hasUploading) {
      setApiError('Please wait for uploads to complete before closing.');
      return;
    }

    setUploads([]);
    setApiError(null);
    onOpenChange(false);
  };

  const canUpload = uploads.some((u) => u.status === 'pending');
  const isUploading = uploads.some((u) => u.status === 'uploading');

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Upload Documents</DialogTitle>
          <DialogDescription>
            Upload supporting documents for your trade finance application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {apiError && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
            </div>
          )}

          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Click to select files or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Upload Queue */}
          {uploads.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  Documents to Upload ({uploads.length})
                </Label>
                {canUpload && (
                  <Button
                    size="sm"
                    onClick={handleUploadAll}
                    disabled={isUploading}
                    className="bg-blue-700 hover:bg-blue-800"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload All
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                {uploads.map((upload) => (
                  <Card key={upload.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        {/* File Icon */}
                        <div className="flex-shrink-0">
                          {upload.status === 'completed' ? (
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                          ) : upload.status === 'error' ? (
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded">
                              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                          ) : upload.status === 'uploading' ? (
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                              <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                            </div>
                          ) : (
                            <div className="p-2 bg-gray-100 dark:bg-gray-800/50 rounded">
                              <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* File Details */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {upload.file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(upload.file.size / 1024).toFixed(2)} KB
                          </p>

                          {upload.status === 'pending' && (
                            <div className="mt-2">
                              <Label className="text-xs mb-1 block">Document Type</Label>
                              <Select
                                value={upload.documentType}
                                onValueChange={(value) =>
                                  handleDocumentTypeChange(upload.id, value)
                                }
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {documentTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {upload.status === 'completed' && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              Upload completed successfully
                            </p>
                          )}

                          {upload.status === 'error' && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                              {upload.error}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0">
                          {(upload.status === 'pending' || upload.status === 'error') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveUpload(upload.id)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose} disabled={isUploading}>
              {uploads.length > 0 && !isUploading ? 'Done' : 'Cancel'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
