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
  const { language } = useLanguage();
  const t = translations[language].hero;

  useEffect(() => {
    // Letter/Word staggering animation for the title
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = text.split(' ').map(word => 
        `<span class="inline-block opacity-0 translate-y-4 word-span">${word}</span>`
      ).join(' ');

      anime({
        targets: '.word-span',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 500}),
        duration: 800,
        easing: 'easeOutQuart'
      });
    }

    // Floating background particles
    if (bgRef.current) {
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
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        scale: () => [Math.random(), 1.5],
        opacity: () => [0.1, 0.4],
        easing: 'easeInOutQuad',
        duration: () => anime.random(4000, 8000),
        delay: () => anime.random(0, 2000),
        loop: true,
        direction: 'alternate'
      });
    }
  }, [language]); // Re-run when language changes as the title text changes

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-background to-secondary pt-24">
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(176,226,255,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 ref={titleRef} className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t.title} {t.subtitle}
          </h1>
          <p className="mt-8 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto opacity-0 translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-forwards">
            {t.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 opacity-0 translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-forwards">
            <Button size="lg" asChild className="rounded-full px-8 h-12">
              <Link href="/portfolio">
                {t.viewProjects}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="rounded-full h-12">
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
