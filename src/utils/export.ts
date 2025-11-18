/**
 * Export utilities for generating CSV and PDF reports
 */

/**
 * Convert data array to CSV format
 */
export const arrayToCSV = (data: any[], headers?: string[]): string => {
  if (data.length === 0) {
    return '';
  }

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);

  // Create header row
  const headerRow = csvHeaders.join(',');

  // Create data rows
  const dataRows = data.map((row) => {
    return csvHeaders
      .map((header) => {
        const value = row[header];

        // Handle different data types
        if (value === null || value === undefined) {
          return '';
        }

        // Convert to string and escape quotes
        let cellValue = String(value);

        // If value contains comma, newline, or quote, wrap in quotes
        if (cellValue.includes(',') || cellValue.includes('\n') || cellValue.includes('"')) {
          cellValue = `"${cellValue.replace(/"/g, '""')}"`;
        }

        return cellValue;
      })
      .join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};

/**
 * Download CSV file
 */
export const downloadCSV = (data: any[], filename: string, headers?: string[]): void => {
  const csv = arrayToCSV(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Format data for export
 */
export const formatDataForExport = (data: any): any[] => {
  if (!Array.isArray(data)) {
    return [data];
  }
  return data;
};

/**
 * Format date for export
 */
export const formatDateForExport = (date: Date | string): string => {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format currency for export
 */
export const formatCurrencyForExport = (amount: number, currency: string = 'USD'): string => {
  return `${currency} ${amount.toFixed(2)}`;
};

/**
 * Export trade finance applications to CSV
 */
export const exportTradeFinanceApplications = (applications: any[]): void => {
  const exportData = applications.map((app) => ({
    'Reference Number': app.reference_number,
    'Facility Type': app.facility_type,
    Title: app.title,
    Amount: formatCurrencyForExport(app.amount, app.currency),
    Currency: app.currency,
    'Beneficiary Name': app.beneficiary_name,
    Status: app.application_status,
    'Application Date': formatDateForExport(app.application_date),
    'Submitted Date': formatDateForExport(app.submitted_date),
    'Approved Date': formatDateForExport(app.approved_date),
    'Expiry Date': formatDateForExport(app.expiry_date),
    'Created At': formatDateForExport(app.created_at),
  }));

  downloadCSV(exportData, `trade-finance-applications-${Date.now()}`);
};

/**
 * Export marketplace orders to CSV
 */
export const exportMarketplaceOrders = (orders: any[]): void => {
  const exportData = orders.map((order) => ({
    'Order ID': order.id,
    'Listing ID': order.listing_id,
    'Seller ID': order.seller_id,
    'Buyer ID': order.buyer_id,
    Amount: formatCurrencyForExport(order.amount, order.currency),
    Currency: order.currency,
    Status: order.status,
    'Payment Status': order.payment_status,
    'Delivery Method': order.delivery_method,
    'Created At': formatDateForExport(order.created_at),
    'Completed At': formatDateForExport(order.completed_at),
  }));

  downloadCSV(exportData, `marketplace-orders-${Date.now()}`);
};

/**
 * Export orders to CSV
 */
export const exportOrders = (orders: any[]): void => {
  const exportData = orders.map((order) => ({
    'Order ID': order.id,
    'Customer ID': order.customer_id,
    'Total Amount': formatCurrencyForExport(order.total_amount),
    Status: order.status,
    'Shipping Address': order.shipping_address,
    'Order Date': formatDateForExport(order.order_date),
    'Created At': formatDateForExport(order.created_at),
    'Updated At': formatDateForExport(order.updated_at),
  }));

  downloadCSV(exportData, `orders-${Date.now()}`);
};

/**
 * Export payment transactions to CSV
 */
export const exportTransactions = (transactions: any[]): void => {
  const exportData = transactions.map((txn) => ({
    'Transaction ID': txn.id,
    'User ID': txn.user_id,
    Amount: formatCurrencyForExport(txn.amount, txn.currency),
    Currency: txn.currency,
    Type: txn.transaction_type,
    Status: txn.status,
    Provider: txn.provider,
    'Reference Number': txn.reference_number,
    'Created At': formatDateForExport(txn.created_at),
  }));

  downloadCSV(exportData, `transactions-${Date.now()}`);
};

/**
 * Export analytics data to CSV
 */
export const exportAnalyticsData = (
  data: any[],
  filename: string,
  headers?: string[]
): void => {
  downloadCSV(data, `analytics-${filename}-${Date.now()}`, headers);
};

/**
 * Download JSON data as file
 */
export const downloadJSON = (data: any, filename: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Print current page
 */
export const printPage = (): void => {
  window.print();
};
