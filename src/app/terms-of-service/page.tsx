'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';

export default function TermsOfServicePage() {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <div className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {language === 'id' ? 'Ketentuan Layanan' : 'Terms of Service'}
              </h1>
              <p className="mt-4 text-lg text-foreground/70">
                {language === 'id' ? 'Terakhir diperbarui: 24 Juli 2024' : 'Last updated: July 24, 2024'}
              </p>

              <div className="prose mt-8">
                <Badge variant="destructive" className="mb-4">
                  {language === 'id' ? 'Penting: Ini adalah templat dan bukan nasihat hukum.' : 'Important: This is a template and not legal advice.'}
                </Badge>

                {language === 'id' ? (
                  <>
                    <p>
                      Selamat datang di situs web **IK Labs**. Dengan mengakses situs kami, Anda setuju untuk terikat oleh Ketentuan Layanan ini.
                    </p>

                    <h2>1. Penggunaan Situs</h2>
                    <p>
                      Anda setuju untuk menggunakan situs ini hanya untuk tujuan yang sah, terutama untuk mempelajari layanan pengembangan perangkat lunak kami.
                    </p>

                    <h2>2. Kekayaan Intelektual</h2>
                    <p>
                      Semua konten yang ada di situs ini adalah milik IK Labs.
                    </p>

                    <h2>3. Hubungi Kami</h2>
                    <p>
                      Jika Anda memiliki pertanyaan tentang Ketentuan Layanan ini, silakan hubungi kami di <a href="mailto:contact@ikindustries.com">contact@ikindustries.com</a>.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Welcome to the **IK Labs** website. By accessing our site, you agree to be bound by these Terms of Service.
                    </p>

                    <h2>1. Use of the Site</h2>
                    <p>
                      You agree to use this site only for lawful purposes, especially to learn about our software development services.
                    </p>

                    <h2>2. Intellectual Property</h2>
                    <p>
                      All content on this site is the property of IK Labs.
                    </p>

                    <h2>3. Contact Us</h2>
                    <p>
                      If you have any questions about these Terms of Service, please contact us at <a href="mailto:contact@ikindustries.com">contact@ikindustries.com</a>.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}