'use client';

import { useToast } from '@/hooks/use-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ToasterHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const successMessage = searchParams.get('success_message');
    if (successMessage) {
      toast({
        title: 'Éxito',
        description: decodeURIComponent(successMessage),
      });
      // Remove the query parameter from the URL without reloading the page
      const newPath = window.location.pathname;
      router.replace(newPath, { scroll: false });
    }
  }, [searchParams, toast, router]);

  return null;
}
