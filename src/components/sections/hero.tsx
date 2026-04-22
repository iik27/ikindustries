'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import anime from 'animejs';
import Link from 'next/link';
import { useLanguage } from '../language-provider';
import { translations } from '@/lib/translations';

const LaboratorySchematic = () => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Drawing effect for schematic lines
    anime({
      targets: '.schematic-line',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      delay: anime.stagger(100),
      loop: false
    });

    // Rotation for circles
    anime({
      targets: '.schematic-rotate',
      rotate: '1turn',
      duration: 30000,
      easing: 'linear',
      loop: true
    });

    // Pulse effect for nodes
    anime({
      targets: '.schematic-node',
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.8, 0.3],
      duration: 3000,
      easing: 'easeInOutQuad',
      loop: true,
      delay: anime.stagger(200)
    });

    // Floating animation
    anime({
      targets: containerRef.current,
      translateY: [-10, 10],
      duration: 4000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    });
  }, []);

  return (
    <svg 
      ref={containerRef}
      viewBox="0 0 800 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full opacity-20 dark:opacity-30 stroke-primary"
    >
      {/* Outer Rings */}
      <circle className="schematic-line schematic-rotate" cx="400" cy="300" r="280" strokeWidth="1" strokeDasharray="10 5" />
      <circle className="schematic-line schematic-rotate" cx="400" cy="300" r="250" strokeWidth="0.5" />
      
      {/* Exploded View Core */}
      <g transform="translate(400, 300) rotate(-45)">
        <rect className="schematic-line" x="-100" y="-150" width="200" height="300" strokeWidth="1" />
        <line className="schematic-line" x1="-120" y1="-100" x2="120" y2="-100" strokeWidth="1" />
        <line className="schematic-line" x1="-120" y1="100" x2="120" y2="100" strokeWidth="1" />
        
        {/* Connection Nodes */}
        <circle className="schematic-node" cx="-120" cy="-100" r="4" fill="currentColor" />
        <circle className="schematic-node" cx="120" cy="-100" r="4" fill="currentColor" />
        <circle className="schematic-node" cx="-120" cy="100" r="4" fill="currentColor" />
        <circle className="schematic-node" cx="120" cy="100" r="4" fill="currentColor" />
        
        {/* Technical Callouts */}
        <path className="schematic-line" d="M 120,-100 L 220,-200 L 300,-200" strokeWidth="0.5" />
        <path className="schematic-line" d="M 120,100 L 220,200 L 300,200" strokeWidth="0.5" />
        <text x="310" y="-195" className="text-[10px] fill-foreground/50 font-code tracking-widest uppercase">Process_v2.0</text>
        <text x="310" y="205" className="text-[10px] fill-foreground/50 font-code tracking-widest uppercase">System_Link</text>
      </g>
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <circle 
          key={i}
          className="schematic-node"
          cx={100 + Math.random() * 600}
          cy={100 + Math.random() * 400}
          r={Math.random() * 3}
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  
  const { language } = useLanguage();
  const t = translations[language].hero;

  useEffect(() => {
    // Character staggered setup
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
      y: [
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

    return () => {
      tl.pause();
      anime.remove('.hero-char');
    };
  }, [language, t.title, t.subtitle]);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center text-center overflow-hidden bg-background pt-20">
      {/* Futuristic Background Animation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
         <div className="w-[120%] h-[120%] lg:w-[80%] lg:h-[80%]">
            <LaboratorySchematic />
         </div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_0%,hsl(var(--background))_90%)]"></div>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
          
          <h1 ref={titleRef} className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.15] mb-10 min-h-[10rem] flex flex-wrap justify-center gap-x-[0.3em] content-center">
            {/* Characters injected via useEffect */}
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