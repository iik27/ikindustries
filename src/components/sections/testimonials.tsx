'use client';

import React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { User } from 'lucide-react';
import { useLanguage } from '../language-provider';
import { translations } from '@/lib/translations';

const testimonials = [
  {
    quote: "Proses kerja dengan IK Labs sangat luar biasa. Website untuk program Undian Keluarga Emas kami berhasil dibuat dengan cepat, aman, dan sesuai dengan semua kebutuhan kami. Profesionalisme dan keahlian teknis mereka benar-benar melampaui ekspektasi.",
    quote_en: "Working with IK Labs was extraordinary. The website for our Golden Family Raffle program was built quickly, securely, and met all our needs. Their professionalism and technical expertise truly exceeded expectations.",
    name: "Muhamad Rosad",
    title: "PT. Rasa Jiwa Indonesia",
    imageId: "testimonial-2",
  },
  {
    quote: "Inovasi yang luar biasa! Aplikasi berbasis WA to Web dari IK Labs sangat memudahkan kami dalam pelayanan pembuatan KIA dan KK. Prosesnya menjadi jauh lebih efisien, cepat, dan mudah diakses oleh masyarakat.",
    quote_en: "Amazing innovation! The WA to Web application from IK Labs greatly facilitated our KIA and KK issuance services. The process became much more efficient, fast, and easily accessible to the public.",
    name: "Disdukcapil Kab. Purwakarta",
    title: "Pemerintah Kab. Purwakarta",
    imageId: "testimonial-1",
  },
  {
    quote: "Aplikasi kasir internal yang dikembangkan oleh IK Labs benar-benar mengubah cara kami mengelola transaksi di seluruh cabang. Sistemnya terintegrasi dengan baik ke pusat, memberikan data real-time, dan sangat mudah digunakan.",
    quote_en: "The internal cashier application developed by IK Labs truly changed how we manage transactions across all branches. The system is well integrated with HQ, providing real-time data, and is very easy to use.",
    name: "PT. Multirasa Nusantara",
    title: "Manajemen",
    imageId: "testimonial-3",
  },
    {
    quote: "Komunikasi sangat baik selama proyek berlangsung. Mereka selalu memberi kami informasi di setiap tahap dan memberikan hasil yang melebihi ekspektasi kami. Layanan yang benar-benar bintang lima.",
    quote_en: "Communication was excellent throughout the project. They kept us informed at every stage and delivered results that exceeded our expectations. Truly a five-star service.",
    name: "Klien D",
    title: "Manager, NextGen Solutions",
    imageId: "testimonial-4",
  },
];

export default function Testimonials() {
  const { language } = useLanguage();
  const t = translations[language].testimonials;
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section id="testimonials" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-foreground/80">
            {t.subtitle}
          </p>
        </div>
        <div className="mt-16">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
            }}
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const image = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                const displayQuote = language === 'en' ? testimonial.quote_en : testimonial.quote;
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-6 flex-grow">
                          <blockquote className="text-lg text-foreground/90">
                            "{displayQuote}"
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