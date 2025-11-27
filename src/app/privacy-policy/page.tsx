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
            <div className="max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Kebijakan Privasi
              </h1>
              <p className="mt-4 text-lg text-foreground/70">
                Terakhir diperbarui: 24 Juli 2024
              </p>
              
              <div className="prose mt-8">
                <Badge variant="destructive" className="mb-4">Penting: Ini adalah templat dan bukan nasihat hukum. Konsultasikan dengan ahli hukum untuk memastikan kepatuhan.</Badge>

                <p>
                  Selamat datang di IK Industries. Kami menghargai privasi Anda dan berkomitmen untuk melindunginya. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda mengunjungi situs web kami.
                </p>

                <h2>1. Informasi yang Kami Kumpulkan</h2>
                <p>
                  Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat Anda menggunakan formulir kontak kami, seperti:
                </p>
                <ul>
                  <li>Nama</li>
                  <li>Alamat email</li>
                  <li>Isi pesan Anda</li>
                </ul>
                <p>
                  Kami juga dapat mengumpulkan informasi non-pribadi secara otomatis saat Anda menavigasi situs, seperti alamat IP, jenis browser, dan sistem operasi.
                </p>

                <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                <p>
                  Informasi yang kami kumpulkan digunakan untuk tujuan berikut:
                </p>
                <ul>
                  <li>Untuk menanggapi pertanyaan atau permintaan Anda.</li>
                  <li>Untuk meningkatkan dan mempersonalisasi pengalaman Anda di situs kami.</li>
                  <li>Untuk memelihara keamanan situs kami.</li>
                  <li>Untuk mematuhi kewajiban hukum.</li>
                </ul>

                <h2>3. Penggunaan Cookie</h2>
                <p>
                  Situs web ini menggunakan *cookies* untuk meningkatkan pengalaman pengguna. *Cookie* adalah file kecil yang disimpan di perangkat Anda. Kami menggunakan *cookies* untuk mengingat preferensi Anda (seperti persetujuan *cookie* Anda) dan untuk tujuan fungsionalitas situs. Anda dapat menonaktifkan *cookies* melalui pengaturan browser Anda, tetapi ini dapat memengaruhi fungsi situs.
                </p>

                <h2>4. Keamanan Data</h2>
                <p>
                  Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah. Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.
                </p>

                <h2>5. Hak Anda</h2>
                <p>
                  Anda memiliki hak untuk mengakses, memperbaiki, atau meminta penghapusan data pribadi Anda yang kami miliki. Untuk melakukannya, silakan hubungi kami melalui informasi kontak yang disediakan di bawah ini.
                </p>

                <h2>6. Perubahan pada Kebijakan Ini</h2>
                <p>
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Versi terbaru akan diposting di halaman ini dengan tanggal pembaruan yang direvisi.
                </p>

                <h2>7. Hubungi Kami</h2>
                <p>
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:contact@ikindustries.com">contact@ikindustries.com</a>.
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
