"use client";

import React, { useState, useEffect, useTransition, useMemo, useRef } from 'react';
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
    { name: "Next.js", icon: <IconBrandNextjs className="h-10 w-10" />, language: "jsx" },
    { name: "React", icon: <IconBrandReact className="h-10 w-10" />, language: "jsx" },
    { name: "TypeScript", icon: <IconBrandTypescript className="h-10 w-10" />, language: "typescript" },
    { name: "JavaScript", icon: <IconBrandJavascript className="h-10 w-10" />, language: "javascript" },
    { name: "Node.js", icon: <IconBrandNodejs className="h-10 w-10" />, language: "javascript" },
    { name: "Python", icon: <IconBrandPython className="h-10 w-10" />, language: "python" },
    { name: "Tailwind CSS", icon: <IconBrandTailwind className="h-10 w-10" />, language: "html" },
    { name: "Flutter", icon: <IconBrandFlutter className="h-10 w-10" />, language: "dart" },
    { name: "Firebase", icon: <IconBrandFirebase className="h-10 w-10" />, language: "javascript" },
    { name: "PostgreSQL", icon: <IconDatabase className="h-10 w-10" />, language: "sql" },
    { name: "PHP", icon: <IconBrandPHP className="h-10 w-10" />, language: "php" },
    { name: "Java", icon: <IconBrandJava className="h-10 w-10" />, language: "java" },
    { name: "Kotlin", icon: <IconBrandKotlin className="h-10 w-10" />, language: "kotlin" },
    { name: "Git", icon: <IconBrandGit className="h-10 w-10" />, language: "bash" },
    { name: "VS Code", icon: <IconBrandVSCode className="h-10 w-10" />, language: "json" },
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

  const defaultCode = useMemo(() => `
import type { NextPage } from 'next';

/**
 * IK Labs Code Explorer
 * ${t.defaultCodeMessage}
 */
const Home: NextPage = () => {
  return (
    <div>
      <h1>IK Labs</h1>
      <p>Innovative Solutions Lab</p>
    </div>
  );
};

export default Home;
  `.trim(), [t.defaultCodeMessage]);

  const [activeTech, setActiveTech] = useState('Next.js');
  const [generatedCode, setGeneratedCode] = useState({ code: defaultCode, language: 'jsx'});
  const [isPending, startTransition] = useTransition();

  // Reset code snippet when language changes
  useEffect(() => {
    if (generatedCode.code.includes('/**') || generatedCode.code.includes('/*')) {
        setGeneratedCode({ code: defaultCode, language: 'jsx' });
    }
  }, [language, defaultCode, generatedCode.code]);

  // Terminal Pulse Animation while loading
  useEffect(() => {
    if (isPending) {
        anime({
            targets: terminalRef.current,
            boxShadow: [
                '0 0 0px rgba(var(--primary), 0)',
                '0 0 20px rgba(var(--primary), 0.3)',
                '0 0 0px rgba(var(--primary), 0)'
            ],
            duration: 1500,
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
      
      // Button interaction animation
      const targetClass = `.tech-btn-${techName.replace(/\s+/g, '-').toLowerCase()}`;
      anime({
        targets: targetClass,
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
        duration: 400,
        easing: 'easeInOutBack'
      });

      startTransition(async () => {
          try {
              const result = await generateCode({ technology: techName });
              if (result && result.code) {
                setGeneratedCode(result);
              } else {
                 throw new Error("Empty result");
              }
          } catch (error) {
              console.error("AI Generation Error:", error);
              setGeneratedCode({ 
                code: `// ${t.errorCode} ${techName}\n// ${t.errorHint}`, 
                language: 'text' 
              });
          }
      });
  };

  return (
    <section id="tech-stack" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-foreground/80">
            {t.description}
          </p>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
              {technologies.map((tech) => (
                <button 
                    key={tech.name} 
                    onClick={() => handleTechClick(tech.name)}
                    className={cn(
                        "flex flex-col items-center justify-center gap-2 w-24 text-center rounded-xl p-3 transition-all duration-300",
                        `tech-btn-${tech.name.replace(/\s+/g, '-').toLowerCase()}`,
                        activeTech === tech.name ? 'bg-primary/10 shadow-inner' : 'hover:bg-secondary'
                    )}
                    aria-label={`Generate code for ${tech.name}`}
                >
                  <div className="bg-background/50 p-2 rounded-lg shadow-sm">
                    {tech.icon}
                  </div>
                  <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">{tech.name}</p>
                </button>
              ))}
          </div>

          <div className="lg:max-w-md w-full" ref={terminalRef}>
             <Card className="bg-card/50 shadow-2xl border-primary/20 overflow-hidden rounded-xl">
                <CardContent className="p-0">
                    <div className="flex justify-between items-center px-4 py-2.5 border-b bg-muted/80">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <p className="text-[10px] font-mono font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Laboratory Terminal</p>
                        </div>
                        <p className="text-[10px] font-mono font-medium text-primary uppercase tracking-widest">{activeTech}</p>
                    </div>
                    <div className="p-6 text-sm overflow-x-auto min-h-[400px] bg-[#0d1117]/95 text-blue-100/90 font-code">
                        {isPending ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary/60">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-xs uppercase tracking-tighter">Analyzing Tech Stack...</span>
                                </div>
                                <Skeleton className="h-4 w-[85%] bg-white/5" />
                                <Skeleton className="h-4 w-[60%] bg-white/5" />
                                <Skeleton className="h-4 w-[90%] bg-white/5" />
                                <Skeleton className="h-4 w-[75%] bg-white/5" />
                                <Skeleton className="h-4 w-[40%] bg-white/5" />
                                <Skeleton className="h-4 w-[80%] bg-white/5" />
                            </div>
                        ) : (
                            <pre className="whitespace-pre-wrap break-words leading-relaxed">
                                <code className={cn("text-blue-100/90", `language-${generatedCode.language}`)}>
                                    <Typewriter text={generatedCode.code} />
                                </code>
                            </pre>
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
