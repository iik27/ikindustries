'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      // Use a timeout to avoid being too intrusive immediately on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[100] transform transition-transform duration-500 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 bg-secondary/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <Cookie className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0 mt-1 sm:mt-0" />
              <p className="text-sm text-foreground/80">
                Situs ini menggunakan cookie untuk memastikan Anda mendapatkan pengalaman terbaik. Dengan melanjutkan, Anda menyetujui penggunaan cookie kami.
              </p>
            </div>
            <Button onClick={acceptCookies} className="w-full sm:w-auto flex-shrink-0">
              Mengerti
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
