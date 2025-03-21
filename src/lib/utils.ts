
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function calculateBusinessCount(
  startingCount: number = 3746,
  biWeeklyGrowthRate: number = 0.06,
  startDate: Date = new Date('2024-09-01')
): number {
  const now = new Date();
  const timeDiffMs = now.getTime() - startDate.getTime();
  const daysDiff = timeDiffMs / (1000 * 60 * 60 * 24);
  const biWeeklyPeriods = Math.floor(daysDiff / 14);
  
  // Calculate the current count with compound growth
  const currentCount = startingCount * Math.pow(1 + biWeeklyGrowthRate, biWeeklyPeriods);
  
  return Math.floor(currentCount);
}
