import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import CookieBanner from '@/components/cookie-banner';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'IK Labs | Web, Mobile & Enterprise Systems',
  description: 'IK Labs spesialis dalam pembuatan website profesional, aplikasi mobile performa tinggi, dan sistem perusahaan terintegrasi. Dipimpin oleh Muhamad Taufik Hidayat.',
  icons: {
    icon: 'https://iili.io/ffDrAW7.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
