"use client";

import React, { useState, useEffect, useTransition, useMemo } from 'react';
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

  // Reset code snippet when language changes to ensure the comment is translated
  useEffect(() => {
    if (generatedCode.code.includes('/**') || generatedCode.code.includes('/*')) {
        setGeneratedCode({ code: defaultCode, language: 'jsx' });
    }
  }, [language, defaultCode, generatedCode.code]);

  useEffect(() => {
    const targetClass = `.tech-btn-${activeTech.replace(/\s+/g, '-').toLowerCase()}`;
    anime({
      targets: targetClass,
      scale: [1, 1.15, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .5)'
    });
  }, [activeTech]);

  const handleTechClick = (techName: string) => {
      setActiveTech(techName);
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
                        "flex flex-col items-center justify-center gap-2 w-24 text-center rounded-lg p-2 transition-all duration-200",
                        `tech-btn-${tech.name.replace(/\s+/g, '-').toLowerCase()}`,
                        activeTech === tech.name ? 'bg-primary/10' : 'hover:bg-secondary'
                    )}
                    aria-label={`Generate code for ${tech.name}`}
                >
                  {tech.icon}
                  <p className="text-sm font-medium text-foreground/90">{tech.name}</p>
                </button>
              ))}
          </div>

          <div className="lg:max-w-md w-full">
             <Card className="bg-card/50 shadow-lg border-primary/20">
                <CardContent className="p-0">
                    <div className="flex justify-between items-center px-4 py-2 border-b bg-muted/50 rounded-t-lg">
                        <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest">{activeTech}</p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                        </div>
                    </div>
                    <div className="p-4 text-sm overflow-x-auto min-h-[350px] bg-muted/20 font-code">
                        {isPending ? (
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-[85%]" />
                                <Skeleton className="h-4 w-[60%]" />
                                <Skeleton className="h-4 w-[90%]" />
                                <Skeleton className="h-4 w-[75%]" />
                                <Skeleton className="h-4 w-[40%]" />
                                <Skeleton className="h-4 w-[80%]" />
                            </div>
                        ) : (
                            <pre className="whitespace-pre-wrap break-words leading-relaxed">
                                <code className={cn("text-foreground/90", `language-${generatedCode.language}`)}>
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
