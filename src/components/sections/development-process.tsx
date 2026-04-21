'use client';

import { useEffect, useRef } from 'react';
import { Code, FlaskConical, Lightbulb, BookText, Palette, Rocket } from "lucide-react";
import anime from 'animejs';

const processSteps = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Ideation",
    description: "We start by understanding your vision, goals, and challenges to form a solid foundation for the project.",
  },
  {
    icon: <BookText className="h-10 w-10 text-primary" />,
    title: "Planning",
    description: "A comprehensive roadmap and strategy are developed, outlining milestones, timelines, and technical requirements.",
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Design",
    description: "We craft an intuitive, engaging, and visually appealing UI/UX design that focuses on user experience.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Development",
    description: "Our expert developers bring the design to life, writing clean, efficient, and scalable code.",
  },
  {
    icon: <FlaskConical className="h-10 w-10 text-primary" />,
    title: "Testing",
    description: "Rigorous testing is conducted to ensure the product is bug-free, secure, and performs flawlessly.",
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Deployment",
    description: "The final product is launched, and we provide ongoing support to ensure a smooth and successful release.",
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
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Development Process</h2>
          <p className="mt-4 text-lg text-foreground/80">
            From concept to launch, we follow a structured and transparent process to ensure your project's success.
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
