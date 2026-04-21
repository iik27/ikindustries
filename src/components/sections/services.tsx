
'use client';

import { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Smartphone, LayoutDashboard } from "lucide-react";
import anime from 'animejs';
import { useLanguage } from '../language-provider';
import { translations } from '@/lib/translations';
import ShineBorderCard from '../shine-border-card';

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language].services;
  const sectionRef = useRef<HTMLDivElement>(null);

  const servicesData = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: t.web.title,
      description: t.web.description,
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: t.mobile.title,
      description: t.mobile.description,
    },
    {
      icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
      title: t.enterprise.title,
      description: t.enterprise.description,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anime({
            targets: '.service-card',
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.95, 1],
            delay: anime.stagger(200),
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
    <section id="services" className="bg-secondary/30 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-foreground/80">
            {t.subtitle}
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {servicesData.map((service) => (
            <div key={service.title} className="service-card opacity-0">
               <ShineBorderCard className="h-full bg-background/50 backdrop-blur-sm hover:translate-y-[-8px] transition-transform duration-500">
                  <CardHeader className="items-center p-10 text-center">
                    <div className="bg-primary/10 p-5 rounded-2xl mb-2 shadow-inner border border-primary/5">
                      {service.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline text-xl">{service.title}</CardTitle>
                    <CardDescription className="mt-4 text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
               </ShineBorderCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
