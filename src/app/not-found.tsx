'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { translations } from '@/lib/translations';

export default function NotFound() {
  const { language } = useLanguage();
  const t = translations[language].notFound;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <FileQuestion className="h-24 w-24 text-primary mb-6" strokeWidth={1} />
      <h1 className="text-6xl font-bold font-headline text-foreground">{t.title}</h1>
      <h2 className="mt-2 text-2xl font-semibold text-foreground/90">{t.subtitle}</h2>
      <p className="mt-4 max-w-md text-lg text-foreground/70">
        {t.description}
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">{t.button}</Link>
        </Button>
      </div>
    </div>
  );
}