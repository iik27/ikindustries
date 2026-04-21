
'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import anime from 'animejs';
import Link from 'next/link';
import { useLanguage } from '../language-provider';
import { translations } from '@/lib/translations';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  
  const { language } = useLanguage();
  const t = translations[language].hero;

  useEffect(() => {
    // Reset contents for animation
    if (titleRef.current) {
      const fullText = `${t.title} ${t.subtitle}`;
      titleRef.current.innerHTML = fullText.split(' ').map(word => 
        `<span class="inline-block opacity-0 translate-y-6 hero-word">${word}</span>`
      ).join(' ');
    }

    // Timeline for coordinated entrance
    const tl = anime.timeline({
      easing: 'easeOutQuart',
      duration: 1000
    });

    tl.add({
      targets: '.hero-word',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(80),
    })
    .add({
      targets: descriptionRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=600')
    .add({
      targets: actionsRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=600');

    // Floating background particles
    if (bgRef.current) {
      bgRef.current.innerHTML = '<div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(var(--primary),0.15),transparent)]"></div>';
      
      const particlesCount = 20;
      for (let i = 0; i < particlesCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'absolute bg-primary/20 rounded-full pointer-events-none particle-dot';
        const size = Math.random() * 4 + 2;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        bgRef.current.appendChild(dot);
      }

      anime({
        targets: '.particle-dot',
        translateX: () => anime.random(-80, 80),
        translateY: () => anime.random(-80, 80),
        scale: () => [Math.random(), 1.5],
        opacity: () => [0.1, 0.4],
        easing: 'easeInOutQuad',
        duration: () => anime.random(3000, 6000),
        delay: () => anime.random(0, 2000),
        loop: true,
        direction: 'alternate'
      });
    }

    return () => {
      tl.pause();
      anime.remove('.hero-word');
      anime.remove('.particle-dot');
    };
  }, [language, t.title, t.subtitle]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-background pt-16">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-50"></div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Subtle glow effect behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
          
          <h1 ref={titleRef} className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.1] mb-8">
            {t.title} {t.subtitle}
          </h1>
          
          <p ref={descriptionRef} className="text-lg leading-relaxed text-foreground/70 max-w-2xl mx-auto opacity-0">
            {t.description}
          </p>
          
          <div ref={actionsRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
            <Button size="lg" asChild className="rounded-full px-8 h-12 shadow-lg hover:shadow-primary/20 transition-all font-brand font-semibold">
              <Link href="/portfolio">
                {t.viewProjects}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="rounded-full h-12 hover:bg-primary/5 font-medium">
              <a href="#services">
                {t.ourExpertise} <span aria-hidden="true" className="ml-1">→</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
