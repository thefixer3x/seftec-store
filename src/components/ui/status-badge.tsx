
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertCircle, CalendarClock } from 'lucide-react';

export type StatusType = 'completed' | 'pending' | 'processing' | 'failed' | 'unknown';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

/**
 * A reusable status badge component for displaying status across the application
 */
export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="outline" className={`bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 ${className}`}>
          <CheckCircle className="h-3 w-3 mr-1" /> Completed
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className={`bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800 ${className}`}>
          <Clock className="h-3 w-3 mr-1" /> Pending
        </Badge>
      );
    case 'processing':
      return (
        <Badge variant="outline" className={`bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 ${className}`}>
          <CalendarClock className="h-3 w-3 mr-1" /> Processing
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="outline" className={`bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 ${className}`}>
          <XCircle className="h-3 w-3 mr-1" /> Failed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className={`bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/30 dark:text-gray-300 dark:border-gray-700 ${className}`}>
          <AlertCircle className="h-3 w-3 mr-1" /> Unknown
        </Badge>
      );
  }
};
