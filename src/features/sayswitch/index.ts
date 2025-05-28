/**
 * SaySwitch Integration Feature Module
 * 
 * This module exports utilities and hooks related to SaySwitch payment gateway integration.
 * SaySwitch is a backend payment service that enables seamless payments in the application.
 */

// Payment types
export enum SaySwitchPaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export interface SaySwitchPaymentResult {
  status: SaySwitchPaymentStatus;
  reference: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
  transaction_date: string;
}

/**
 * Utility function to format a payment amount
 * @param amount Amount in base units
 * @param currency Currency code (e.g., NGN, USD)
 * @returns Formatted amount
 */
export function formatSaySwitchAmount(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

/**
 * Generates a unique transaction reference for SaySwitch payments
 * @returns A unique transaction reference string
 */
export function generateTransactionReference(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `TX_${timestamp}_${random}`;
}
