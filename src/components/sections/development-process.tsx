'use client';

import { useEffect, useRef } from 'react';
import { Code, FlaskConical, Lightbulb, BookText, Palette, Rocket } from "lucide-react";
import anime from 'animejs';
import { useLanguage } from '../language-provider';
import { translations } from '@/lib/translations';

export default function DevelopmentProcess() {
  const { language } = useLanguage();
  const t = translations[language].process;
  const sectionRef = useRef<HTMLDivElement>(null);

  const icons = [
    <Lightbulb className="h-10 w-10 text-primary" />,
    <BookText className="h-10 w-10 text-primary" />,
    <Palette className="h-10 w-10 text-primary" />,
    <Code className="h-10 w-10 text-primary" />,
    <FlaskConical className="h-10 w-10 text-primary" />,
    <Rocket className="h-10 w-10 text-primary" />
  ];

  const processSteps = t.steps.map((step, index) => ({
    ...step,
    icon: icons[index]
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Complex sequential reveal using anime.timeline
          const tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 1000
          });

          tl.add({
            targets: '.process-step',
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: anime.stagger(200)
          })
          .add({
            targets: '.connecting-line',
            width: ['0%', '100%'],
            easing: 'easeInOutQuad',
            duration: 1500,
            delay: -1000 // overlap
          }, '-=800');

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [language]);

  return (
    <section id="development-process" className="bg-background overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-foreground/80">
            {t.subtitle}
          </p>
        </div>

        <div className="relative mt-24">
          {/* Animated Background Line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-12 h-1 w-full bg-secondary/50 hidden md:block"
          >
            <div className="connecting-line h-full w-0 bg-primary/40 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative">
            {processSteps.map((step, index) => (
              <div key={step.title} className="process-step relative flex flex-col items-center text-center opacity-0">
                <div className="relative z-10">
                   <div className="flex items-center justify-center bg-background rounded-full h-24 w-24 border-4 border-secondary shadow-lg hover:border-primary transition-colors duration-500 group">
                     <div className="group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                     </div>
                   </div>
                   <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                     {index + 1}
                   </div>
                </div>
                <h3 className="mt-6 text-lg font-headline font-bold text-foreground/90">{step.title}</h3>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed px-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
