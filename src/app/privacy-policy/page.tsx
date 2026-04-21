import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Kebijakan Privasi
              </h1>
              <p className="mt-4 text-lg text-foreground/70">
                Terakhir diperbarui: 24 Juli 2024
              </p>
              
              <div className="prose mt-8">
                <Badge variant="destructive" className="mb-4">Penting: Ini adalah templat dan bukan nasihat hukum.</Badge>

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
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:contact@iklabs.com">contact@iklabs.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
