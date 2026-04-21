'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Palette, TabletSmartphone, Zap } from "lucide-react";
import anime from 'animejs';

const strengths = [
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Modern UI/UX Design",
    description: "Inspired by the best, we create intuitive, beautiful, and user-friendly interfaces."
  },
  {
    icon: <TabletSmartphone className="h-8 w-8 text-primary" />,
    title: "Fully Responsive",
    description: "Our projects look and work perfectly on any device, from phones to desktops."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "High Performance",
    description: "We optimize for speed and efficiency, ensuring a fast and smooth user experience."
  },
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: "Innovative Technology",
    description: "Leveraging the latest frameworks and AI to build future-proof solutions."
  }
];

export default function Strengths() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anime({
            targets: '.strength-card',
            scale: [0.8, 1],
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(150),
            easing: 'easeOutElastic(1, .6)',
            duration: 1500
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
    <section id="strengths" className="bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Key Strengths</h2>
          <p className="mt-4 text-lg text-foreground/80">
            What makes IK Labs stand out from the crowd.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {strengths.map((strength) => (
            <Card key={strength.title} className="strength-card border-0 bg-transparent shadow-none opacity-0">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-secondary p-4 rounded-full mb-4">
                  {strength.icon}
                </div>
                <h3 className="text-lg font-headline font-semibold">{strength.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{strength.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
