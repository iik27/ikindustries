
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
    // Reset contents for character-level animation
    if (titleRef.current) {
      const fullText = `${t.title} ${t.subtitle}`;
      // Split by characters for the precise "Laboratory" effect
      titleRef.current.innerHTML = fullText.split('').map(char => 
        `<span class="inline-block opacity-0 hero-char">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
    }

    // Main entrance timeline
    const tl = anime.timeline({
      easing: 'easeOutQuart',
      duration: 1000
    });

    tl.add({
      targets: '.hero-char',
      translateY: [
        { value: -44, duration: 600, easing: 'easeOutExpo' },
        { value: 0, duration: 800, easing: 'easeOutBounce', delay: 100 }
      ],
      rotate: {
        value: ['-1turn', 0],
        duration: 1000,
        easing: 'easeInOutCirc'
      },
      opacity: [0, 1],
      delay: anime.stagger(30),
    })
    .add({
      targets: descriptionRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=800')
    .add({
      targets: actionsRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=800');

    // Subtle background animation
    if (bgRef.current) {
      bgRef.current.innerHTML = '<div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(var(--primary),0.1),transparent)]"></div>';
      
      const particlesCount = 20;
      for (let i = 0; i < particlesCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'absolute bg-primary/20 rounded-full pointer-events-none particle-dot';
        const size = Math.random() * 6 + 2;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        bgRef.current.appendChild(dot);
      }

      anime({
        targets: '.particle-dot',
        translateX: () => anime.random(-60, 60),
        translateY: () => anime.random(-60, 60),
        scale: () => [0.5, 1.5],
        opacity: () => [0.1, 0.4],
        easing: 'easeInOutQuad',
        duration: () => anime.random(4000, 10000),
        delay: () => anime.random(0, 3000),
        loop: true,
        direction: 'alternate'
      });
    }

    return () => {
      tl.pause();
      anime.remove('.hero-char');
      anime.remove('.particle-dot');
    };
  }, [language, t.title, t.subtitle]);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden bg-background pt-16">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-50"></div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
          
          <h1 ref={titleRef} className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8 min-h-[4rem]">
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
