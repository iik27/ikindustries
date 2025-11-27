import Header from '@/components/header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Ketentuan Layanan
              </h1>
              <p className="mt-4 text-lg text-foreground/70">
                Terakhir diperbarui: 24 Juli 2024
              </p>

              <div className="prose mt-8">
                <Badge variant="destructive" className="mb-4">Penting: Ini adalah templat dan bukan nasihat hukum. Konsultasikan dengan ahli hukum untuk memastikan kepatuhan.</Badge>

                <p>
                  Selamat datang di situs web IK Industries. Dengan mengakses atau menggunakan situs kami, Anda setuju untuk terikat oleh Ketentuan Layanan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak diizinkan untuk menggunakan situs ini.
                </p>

                <h2>1. Penggunaan Situs</h2>
                <p>
                  Anda setuju untuk menggunakan situs ini hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar hak, atau membatasi atau menghambat penggunaan dan kenikmatan situs ini oleh pihak ketiga mana pun.
                </p>
                <ul>
                    <li>Anda tidak boleh menggunakan situs ini untuk tujuan ilegal atau tidak sah.</li>
                    <li>Anda tidak boleh menyalahgunakan situs ini dengan secara sengaja memasukkan virus atau materi berbahaya lainnya.</li>
                </ul>

                <h2>2. Kekayaan Intelektual</h2>
                <p>
                  Semua konten yang ada di situs ini, termasuk namun tidak terbatas pada teks, grafik, logo, gambar, dan perangkat lunak, adalah milik IK Industries atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta. Anda tidak boleh mereproduksi, mendistribusikan, atau membuat karya turunan dari konten apa pun tanpa izin tertulis dari kami.
                </p>

                <h2>3. Batasan Tanggung Jawab</h2>
                <p>
                  Situs ini dan kontennya disediakan "sebagaimana adanya". Meskipun kami berusaha untuk memberikan informasi yang akurat, kami tidak membuat pernyataan atau jaminan apa pun, baik tersurat maupun tersirat, tentang kelengkapan, keakuratan, keandalan, atau ketersediaan sehubungan dengan situs web atau informasi, produk, atau layanan yang terkandung di situs web untuk tujuan apa pun.
                </p>
                <p>
                  Dalam keadaan apa pun, IK Industries tidak akan bertanggung jawab atas kehilangan atau kerusakan apa pun termasuk tanpa batasan, kerugian atau kerusakan tidak langsung atau konsekuensial, yang timbul dari penggunaan situs web ini.
                </p>

                <h2>4. Tautan ke Situs Pihak Ketiga</h2>
                <p>
                  Situs kami mungkin berisi tautan ke situs web pihak ketiga yang tidak dimiliki atau dikendalikan oleh kami. Kami tidak memiliki kendali atas, dan tidak bertanggung jawab atas, konten, kebijakan privasi, atau praktik situs atau layanan pihak ketiga mana pun.
                </p>

                <h2>5. Perubahan pada Ketentuan</h2>
                <p>
                  Kami berhak untuk mengubah atau mengganti Ketentuan Layanan ini kapan saja atas kebijakan kami sendiri. Adalah tanggung jawab Anda untuk memeriksa halaman ini secara berkala untuk mengetahui perubahan.
                </p>

                <h2>6. Hubungi Kami</h2>
                <p>
                  Jika Anda memiliki pertanyaan tentang Ketentuan Layanan ini, silakan hubungi kami di <a href="mailto:contact@ikindustries.com">contact@ikindustries.com</a>.
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
