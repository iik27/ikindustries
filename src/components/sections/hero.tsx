
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
      duration: 2500,
      delay: anime.stagger(150),
      loop: false
    });

    // Rotation for circles
    anime({
      targets: '.schematic-rotate',
      rotate: '1turn',
      duration: 40000,
      easing: 'linear',
      loop: true
    });

    // Pulse effect for nodes
    anime({
      targets: '.schematic-node',
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.9, 0.3],
      duration: 3500,
      easing: 'easeInOutQuad',
      loop: true,
      delay: anime.stagger(250)
    });

    // Floating animation for the whole SVG
    anime({
      targets: containerRef.current,
      translateY: [-15, 15],
      translateX: [-5, 5],
      duration: 5000,
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
      className="w-full h-full opacity-15 dark:opacity-25 stroke-primary"
    >
      {/* Outer Rings */}
      <circle className="schematic-line schematic-rotate" cx="400" cy="300" r="280" strokeWidth="1" strokeDasharray="15 8" />
      <circle className="schematic-line schematic-rotate" cx="400" cy="300" r="240" strokeWidth="0.5" strokeDasharray="5 5" />
      
      {/* Laboratory Core Schematic */}
      <g transform="translate(400, 300)">
        <path className="schematic-line" d="M -150,-100 L 150,-100 L 180,0 L 150,100 L -150,100 L -180,0 Z" strokeWidth="1.5" />
        <line className="schematic-line" x1="-180" y1="0" x2="180" y2="0" strokeWidth="0.5" strokeDasharray="10 5" />
        
        {/* Connection Nodes */}
        <circle className="schematic-node" cx="-180" cy="0" r="6" fill="currentColor" />
        <circle className="schematic-node" cx="180" cy="0" r="6" fill="currentColor" />
        <circle className="schematic-node" cx="0" cy="-100" r="4" fill="currentColor" />
        <circle className="schematic-node" cx="0" cy="100" r="4" fill="currentColor" />
        
        {/* Technical Callouts */}
        <path className="schematic-line" d="M 150,-100 L 250,-180 L 320,-180" strokeWidth="0.8" />
        <path className="schematic-line" d="M -150,100 L -250,180 L -320,180" strokeWidth="0.8" />
        <text x="330" y="-175" className="text-[12px] fill-foreground/40 font-code tracking-[0.2em] uppercase">Core_System_v3</text>
        <text x="-450" y="185" className="text-[12px] fill-foreground/40 font-code tracking-[0.2em] uppercase">Lab_Protocol_Active</text>
      </g>
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <circle 
          key={i}
          className="schematic-node"
          cx={Math.random() * 800}
          cy={Math.random() * 600}
          r={Math.random() * 2.5}
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
    // Character staggered setup for the combined title
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
      duration: 1200
    });

    tl.add({
      targets: '.hero-char',
      y: [
        { value: -50, duration: 700, easing: 'easeOutExpo' },
        { value: 0, duration: 900, easing: 'easeOutBounce', delay: 100 }
      ],
      rotate: {
        value: ['-0.5turn', 0],
        duration: 1200,
        easing: 'easeInOutCirc'
      },
      opacity: [0, 1],
      delay: anime.stagger(40),
    })
    .add({
      targets: descriptionRef.current,
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000
    }, '-=1000')
    .add({
      targets: actionsRef.current,
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000
    }, '-=1000');

    return () => {
      tl.pause();
      anime.remove('.hero-char');
    };
  }, [language, t.title, t.subtitle]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden bg-background pt-20">
      {/* Laboratory Background Schematic */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
         <div className="w-[110%] h-[110%] lg:w-[85%] lg:h-[85%]">
            <LaboratorySchematic />
         </div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_0%,hsl(var(--background))_95%)]"></div>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[180px] rounded-full -z-10 pointer-events-none"></div>
          
          <h1 ref={titleRef} className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.2] mb-10 min-h-[12rem] flex flex-wrap justify-center gap-x-[0.35em] content-center">
            {/* Characters injected via useEffect */}
          </h1>
          
          <p ref={descriptionRef} className="text-lg sm:text-xl leading-relaxed text-foreground/75 max-w-2xl mx-auto opacity-0 font-medium px-4">
            {t.description}
          </p>
          
          <div ref={actionsRef} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 px-4">
            <Button size="lg" asChild className="rounded-full px-12 h-14 shadow-2xl hover:shadow-primary/50 transition-all font-brand font-bold text-base bg-primary hover:scale-105 active:scale-95 group">
              <Link href="/portfolio">
                {t.viewProjects}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="rounded-full h-14 px-10 hover:bg-primary/10 font-bold text-base transition-all border border-transparent hover:border-primary/30 backdrop-blur-md">
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
