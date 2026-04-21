'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';
import { translations } from '@/lib/translations';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <>
      <Header />
      <main>
        <div className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
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
                      Selamat datang di **IK Labs**. Kami menghargai privasi Anda dan berkomitmen untuk melindunginya. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda mengunjungi situs web kami.
                    </p>

                    <h2>1. Informasi yang Kami Kumpulkan</h2>
                    <p>
                      Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat Anda menggunakan formulir kontak kami, seperti Nama dan Alamat email.
                    </p>

                    <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                    <p>
                      Informasi tersebut digunakan untuk menanggapi pertanyaan Anda seputar layanan pengembangan website, mobile app, dan sistem perusahaan kami.
                    </p>

                    <h2>3. Penggunaan Cookie</h2>
                    <p>
                      Situs web ini menggunakan *cookies* untuk meningkatkan pengalaman pengguna.
                    </p>

                    <h2>4. Hubungi Kami</h2>
                    <p>
                      Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:contact@ikindustries.com">contact@ikindustries.com</a>.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Welcome to **IK Labs**. We value your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                      We may collect personal information that you voluntarily provide when using our contact form, such as your Name and Email address.
                    </p>

                    <h2>2. How We Use Your Information</h2>
                    <p>
                      The information is used to respond to your inquiries regarding our web development, mobile app, and enterprise system services.
                    </p>

                    <h2>3. Use of Cookies</h2>
                    <p>
                      This website uses cookies to enhance the user experience.
                    </p>

                    <h2>4. Contact Us</h2>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@ikindustries.com">contact@ikindustries.com</a>.
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