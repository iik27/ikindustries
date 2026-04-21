'use client';

import { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Smartphone, LayoutDashboard } from "lucide-react";
import anime from 'animejs';

const services = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Website Development",
    description: "Creating professional, high-performance websites. From stunning landing pages to complex e-commerce platforms, we build web solutions that deliver results.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Mobile App Development",
    description: "Building native and cross-platform mobile applications. We deliver seamless user experiences on iOS and Android to keep your business accessible on the go.",
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: "Company Systems",
    description: "Developing robust internal systems including ERP, CRM, and custom dashboards. We automate your workflows and centralize your business data.",
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
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Specializations</h2>
          <p className="mt-4 text-lg text-foreground/80">
            We provide specialized digital solutions to help your business operate more efficiently and reach more customers.
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
