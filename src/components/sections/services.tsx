'use client';

import { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Smartphone, LayoutDashboard } from "lucide-react";
import anime from 'animejs';

const services = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Pengembangan Website",
    description: "Menciptakan website profesional dengan performa tinggi. Dari landing page yang memukau hingga platform e-commerce kompleks yang memberikan hasil nyata.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Aplikasi Mobile",
    description: "Membangun aplikasi mobile native dan cross-platform. Kami menghadirkan pengalaman pengguna yang mulus di iOS dan Android agar bisnis Anda selalu dapat diakses.",
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: "Sistem Perusahaan",
    description: "Mengembangkan sistem internal yang tangguh seperti ERP, CRM, dan dashboard kustom. Kami mengotomatiskan alur kerja dan memusatkan data bisnis Anda.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anime({
            targets: '.service-card',
            translateY: [40, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            easing: 'easeOutQuad',
            duration: 800
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-secondary" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Spesialisasi Kami</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Kami menyediakan solusi digital khusus untuk membantu bisnis Anda beroperasi lebih efisien dan menjangkau lebih banyak pelanggan.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.title} className="service-card opacity-0 text-center hover:shadow-xl transition-shadow duration-300 bg-background">
              <CardHeader className="items-center p-8">
                <div className="bg-primary/10 p-4 rounded-full">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}