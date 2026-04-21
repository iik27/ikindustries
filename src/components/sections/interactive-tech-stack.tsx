
"use client";

import React, { useState, useEffect, useTransition, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { generateCode } from '@/ai/flows/generate-code-flow';
import anime from 'animejs';
import { 
    IconBrandJavascript, 
    IconBrandTypescript, 
    IconBrandPython,
    IconBrandReact,
    IconBrandNextjs,
    IconBrandNodejs,
    IconBrandFirebase,
    IconBrandVSCode,
    IconBrandGit,
    IconBrandPHP,
    IconDatabase,
    IconBrandTailwind,
    IconBrandFlutter,
    IconBrandJava,
    IconBrandKotlin,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { useLanguage } from '../language-provider';
import { translations } from '@/lib/translations';

const technologies = [
    { name: "Next.js", icon: <IconBrandNextjs className="h-10 w-10" /> },
    { name: "React", icon: <IconBrandReact className="h-10 w-10" /> },
    { name: "TypeScript", icon: <IconBrandTypescript className="h-10 w-10" /> },
    { name: "JavaScript", icon: <IconBrandJavascript className="h-10 w-10" /> },
    { name: "Node.js", icon: <IconBrandNodejs className="h-10 w-10" /> },
    { name: "Python", icon: <IconBrandPython className="h-10 w-10" /> },
    { name: "Tailwind CSS", icon: <IconBrandTailwind className="h-10 w-10" /> },
    { name: "Flutter", icon: <IconBrandFlutter className="h-10 w-10" /> },
    { name: "Firebase", icon: <IconBrandFirebase className="h-10 w-10" /> },
    { name: "PostgreSQL", icon: <IconDatabase className="h-10 w-10" /> },
    { name: "PHP", icon: <IconBrandPHP className="h-10 w-10" /> },
    { name: "Java", icon: <IconBrandJava className="h-10 w-10" /> },
    { name: "Kotlin", icon: <IconBrandKotlin className="h-10 w-10" /> },
    { name: "Git", icon: <IconBrandGit className="h-10 w-10" /> },
    { name: "VS Code", icon: <IconBrandVSCode className="h-10 w-10" /> },
];

const Typewriter = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 15);

        return () => clearInterval(intervalId);
    }, [text]);

    return <>{displayedText}</>;
};

export default function InteractiveTechStack() {
  const { language } = useLanguage();
  const t = translations[language].techStack;
  const terminalRef = useRef<HTMLDivElement>(null);

  const [activeTech, setActiveTech] = useState('Next.js');
  const [techDetails, setTechDetails] = useState<{ advantages: string[], features: string[] } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTechDetails(null);
  }, [language]);

  useEffect(() => {
    if (isPending) {
        anime({
            targets: terminalRef.current,
            boxShadow: [
                '0 0 0px rgba(var(--primary), 0)',
                '0 0 30px rgba(var(--primary), 0.4)',
                '0 0 0px rgba(var(--primary), 0)'
            ],
            duration: 1000,
            loop: true,
            easing: 'easeInOutQuad'
        });
    } else {
        anime.remove(terminalRef.current);
        if (terminalRef.current) terminalRef.current.style.boxShadow = '';
    }
  }, [isPending]);

  const handleTechClick = (techName: string) => {
      setActiveTech(techName);
      
      const targetClass = `.tech-btn-${techName.replace(/\s+/g, '-').toLowerCase()}`;
      anime({
        targets: targetClass,
        scale: [1, 1.15, 1],
        rotate: [0, 8, -8, 0],
        duration: 500,
        easing: 'easeOutElastic(1, .6)'
      });

      startTransition(async () => {
          try {
              const result = await generateCode({ technology: techName, language: language });
              if (result && result.advantages) {
                setTechDetails(result);
              }
          } catch (error) {
              console.error("AI Generation Error:", error);
          }
      });
  };

  return (
    <section id="tech-stack" className="bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-foreground/80">
            {t.description}
          </p>
        </div>
        
        <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 gap-4">
              {technologies.map((tech) => (
                <button 
                    key={tech.name} 
                    onClick={() => handleTechClick(tech.name)}
                    className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all duration-300 border border-transparent",
                        `tech-btn-${tech.name.replace(/\s+/g, '-').toLowerCase()}`,
                        activeTech === tech.name 
                          ? 'bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.1)]' 
                          : 'hover:bg-secondary hover:border-border'
                    )}
                    aria-label={`Analyze ${tech.name}`}
                >
                  <div className="bg-background/50 p-2 rounded-lg shadow-sm">
                    {tech.icon}
                  </div>
                  <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">{tech.name}</p>
                </button>
              ))}
          </div>

          <div className="lg:max-w-xl w-full" ref={terminalRef}>
             <Card className="bg-[#0a0c10] border-primary/20 shadow-2xl overflow-hidden rounded-2xl relative">
                {/* Laboratory Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,128,0.02))] bg-[size:100%_4px,3px_100%] z-20"></div>
                
                <CardContent className="p-0">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2.5 h-2.5 rounded-full", isPending ? "bg-yellow-500 animate-pulse" : "bg-red-500")}></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                            </div>
                            <p className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.3em] ml-2">LabOS v2.5.0</p>
                        </div>
                        <div className="px-3 py-1 rounded bg-primary/20 border border-primary/30">
                           <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">{activeTech}</p>
                        </div>
                    </div>
                    <div className="p-8 text-sm overflow-x-auto min-h-[450px] font-code">
                        {isPending ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-primary/80">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                                    <span className="text-xs font-bold uppercase tracking-widest">Initialising Laboratory Probe...</span>
                                </div>
                                <div className="space-y-3">
                                  <Skeleton className="h-4 w-[90%] bg-white/5" />
                                  <Skeleton className="h-4 w-[75%] bg-white/5" />
                                  <Skeleton className="h-4 w-[85%] bg-white/5" />
                                  <Skeleton className="h-4 w-[60%] bg-white/5" />
                                </div>
                            </div>
                        ) : techDetails ? (
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
                                        <div className="w-2 h-2 bg-primary shadow-[0_0_8px_rgba(var(--primary),1)]"></div>
                                        {t.advantages}
                                    </h4>
                                    <div className="space-y-3 ml-5">
                                        {techDetails.advantages.map((adv, i) => (
                                            <p key={i} className="text-blue-100/70 leading-relaxed"><Typewriter text={`[+] ${adv}`} /></p>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
                                        <div className="w-2 h-2 bg-primary shadow-[0_0_8px_rgba(var(--primary),1)]"></div>
                                        {t.features}
                                    </h4>
                                    <div className="space-y-3 ml-5">
                                        {techDetails.features.map((feat, i) => (
                                            <p key={i} className="text-blue-100/70 leading-relaxed"><Typewriter text={`[>] ${feat}`} /></p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[350px] text-white/20">
                                <div className="w-16 h-16 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                </div>
                                <p className="text-center font-mono italic text-xs tracking-widest">{t.defaultCodeMessage}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
