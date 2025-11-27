import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <FileQuestion className="h-24 w-24 text-primary mb-6" strokeWidth={1} />
      <h1 className="text-6xl font-bold font-headline text-foreground">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-foreground/90">Halaman Tidak Ditemukan</h2>
      <p className="mt-4 max-w-md text-lg text-foreground/70">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin halaman tersebut telah dipindahkan atau dihapus.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  );
}
