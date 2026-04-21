
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
    if (titleRef.current) {
      const fullText = `${t.title} ${t.subtitle}`;
      const words = fullText.split(' ');
      
      titleRef.current.innerHTML = words.map(word => 
        `<span class="inline-block whitespace-nowrap">
          ${word.split('').map(char => 
            `<span class="inline-block opacity-0 hero-char">${char}</span>`
          ).join('')}
        </span>`
      ).join(' ');
    }

    const tl = anime.timeline({
      easing: 'easeOutQuart',
      duration: 1000
    });

    tl.add({
      targets: '.hero-char',
      translateY: [
        { value: -40, duration: 600, easing: 'easeOutExpo' },
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

    if (bgRef.current) {
      bgRef.current.innerHTML = `
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(var(--primary),0.05),transparent)]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      `;
      
      const particlesCount = 15;
      for (let i = 0; i < particlesCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'absolute bg-primary/10 rounded-full pointer-events-none particle-dot';
        const size = Math.random() * 6 + 2;
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
        scale: () => [0.7, 1.3],
        opacity: () => [0.1, 0.4],
        easing: 'easeInOutQuad',
        duration: () => anime.random(6000, 15000),
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
    <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden bg-background pt-20">
      <div ref={bgRef} className="absolute inset-0 z-0"></div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
          
          <h1 ref={titleRef} className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.1] mb-10 min-h-[8rem] flex flex-wrap justify-center gap-x-[0.3em]">
            {/* Split characters injected here */}
          </h1>
          
          <p ref={descriptionRef} className="text-lg sm:text-xl leading-relaxed text-foreground/70 max-w-2xl mx-auto opacity-0 font-medium">
            {t.description}
          </p>
          
          <div ref={actionsRef} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0">
            <Button size="lg" asChild className="rounded-full px-12 h-14 shadow-2xl hover:shadow-primary/40 transition-all font-brand font-bold text-base bg-primary hover:scale-105 active:scale-95 group">
              <Link href="/portfolio">
                {t.viewProjects}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="rounded-full h-14 px-10 hover:bg-primary/10 font-bold text-base transition-all border border-transparent hover:border-primary/20 backdrop-blur-sm">
              <a href="#services">
                {t.ourExpertise} <span aria-hidden="true" className="ml-2 transition-transform inline-block group-hover:translate-x-1">→</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
