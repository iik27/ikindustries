import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { User } from "lucide-react";

const testimonials = [
  {
    quote: "Proses kerja dengan IK Industries sangat luar biasa. Website untuk program Undian Keluarga Emas kami berhasil dibuat dengan cepat, aman, dan sesuai dengan semua kebutuhan kami. Profesionalisme dan keahlian teknis mereka benar-benar melampaui ekspektasi.",
    name: "Muhamad Rosad",
    title: "PT. Rasa Jiwa Indonesia",
    imageId: "testimonial-2",
  },
  {
    quote: "Inovasi yang luar biasa! Aplikasi berbasis WA to Web dari IK Industries sangat memudahkan kami dalam pelayanan pembuatan Kartu Identitas Anak dan Kartu Keluarga. Prosesnya menjadi jauh lebih efisien, cepat, dan mudah diakses oleh masyarakat. Solusi yang sangat membantu instansi pemerintah seperti kami.",
    name: "Disdukcapil Kab. Purwakarta",
    title: "Pemerintah Kab. Purwakarta",
    imageId: "testimonial-1",
  },
  {
    quote: "Aplikasi kasir internal yang dikembangkan oleh IK Industries benar-benar mengubah cara kami mengelola transaksi di seluruh cabang. Sistemnya terintegrasi dengan baik ke pusat, memberikan kami data real-time, dan sangat mudah digunakan oleh staf kami. Solusi yang sangat efisien dan andal!",
    name: "PT. Multirasa Nusantara",
    title: "Manajemen",
    imageId: "testimonial-3",
  },
    {
    quote: "Komunikasi sangat baik selama proyek berlangsung. Mereka selalu memberi kami informasi di setiap tahap dan memberikan hasil yang melebihi ekspektasi kami. Layanan yang benar-benar bintang lima.",
    name: "Klien D",
    title: "Manajer, NextGen Solutions",
    imageId: "testimonial-4",
  },
];

export default function Testimonials() {

  return (
    <section id="testimonials" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Real stories from businesses we've helped to grow and succeed.
          </p>
        </div>
        <div className="mt-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const image = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-6 flex-grow">
                          <blockquote className="text-lg text-foreground/90">
                            "{testimonial.quote}"
                          </blockquote>
                        </CardContent>
                        <div className="bg-secondary/50 p-6 pt-4 mt-auto">
                          <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 rounded-full overflow-hidden flex items-center justify-center bg-muted">
                              {image ? (
                                <Image
                                  src={image.imageUrl}
                                  alt={testimonial.name}
                                  fill
                                  sizes="(max-width: 768px) 20vw, 10vw"
                                  className="object-cover"
                                  data-ai-hint={image.imageHint}
                                />
                              ) : (
                                <User className="h-8 w-8 text-foreground/50" />
                              )}
                            </div>
                            <div>
                              <p className="font-headline font-semibold text-foreground">{testimonial.name}</p>
                              <p className="text-sm text-foreground/70">{testimonial.title}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
