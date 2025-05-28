import { useEffect } from 'react';

/**
 * Hook to set the document title
 * 
 * This hook updates the document title when the component mounts
 * and restores the original title when the component unmounts.
 * 
 * @param title - The title to set for the document
 * @param restoreOnUnmount - Whether to restore the original title on unmount (default: true)
 */
export function useDocumentTitle(title: string, restoreOnUnmount: boolean = true) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    
    return () => {
      if (restoreOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [title, restoreOnUnmount]);
}
