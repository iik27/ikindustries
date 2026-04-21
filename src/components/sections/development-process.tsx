'use client';

import { useEffect, useRef } from 'react';
import { Code, FlaskConical, Lightbulb, BookText, Palette, Rocket } from "lucide-react";
import anime from 'animejs';

const processSteps = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Ideasi",
    description: "Kami mulai dengan memahami visi, tujuan, dan tantangan Anda untuk membentuk fondasi proyek yang kuat.",
  },
  {
    icon: <BookText className="h-10 w-10 text-primary" />,
    title: "Perencanaan",
    description: "Peta jalan dan strategi komprehensif dikembangkan, merinci pencapaian, timeline, dan persyaratan teknis.",
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Desain",
    description: "Kami merancang desain UI/UX yang intuitif, menarik, dan visual yang berfokus pada pengalaman pengguna.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Pengembangan",
    description: "Pengembang ahli kami menghidupkan desain, menulis kode yang bersih, efisien, dan terukur.",
  },
  {
    icon: <FlaskConical className="h-10 w-10 text-primary" />,
    title: "Pengujian",
    description: "Pengujian ketat dilakukan untuk memastikan produk bebas bug, aman, dan berkinerja sempurna.",
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Peluncuran",
    description: "Produk akhir diluncurkan, dan kami memberikan dukungan berkelanjutan untuk memastikan kesuksesan.",
  },
];

export default function DevelopmentProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anime({
            targets: '.process-step',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(150),
            easing: 'easeOutExpo',
            duration: 1200
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
    <section id="development-process" className="bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Proses Pengembangan Kami</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Dari konsep hingga peluncuran, kami mengikuti proses yang terstruktur dan transparan untuk memastikan keberhasilan proyek Anda.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-12 h-1.5 w-full bg-secondary hidden md:block"
          ></div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="process-step relative flex flex-col items-center text-center opacity-0">
                <div className="bg-background relative">
                   <div className="flex items-center justify-center bg-secondary rounded-full h-24 w-24 border-4 border-background shadow-sm hover:scale-110 transition-transform">
                     {step.icon}
                   </div>
                </div>
                <h3 className="mt-4 text-lg font-headline font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}