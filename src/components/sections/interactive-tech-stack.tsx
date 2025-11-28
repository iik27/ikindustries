'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { z } from 'zod';
import { Card, CardContent } from "@/components/ui/card";
import { generateCode } from '@/ai/flows/generate-code-flow';
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

const GenerateCodeOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
  language: z.string().describe('The language of the generated code (e.g., "javascript", "python").'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

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

const defaultCode = `
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>Click a tech icon to see a code snippet.</p>
    </div>
  );
};

export default Home;
`.trim();

const Typewriter = ({ text, onDone }: { text: string, onDone: () => void }) => {
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
                onDone();
            }
        }, 20); // Adjust typing speed here

        return () => clearInterval(intervalId);
    }, [text, onDone]);

    return <>{displayedText}</>;
};

export default function InteractiveTechStack() {
  const [activeTech, setActiveTech] = useState('Next.js');
  const [generatedCode, setGeneratedCode] = useState<GenerateCodeOutput>({ code: defaultCode, language: 'jsx'});
  const [isPending, startTransition] = useTransition();

  const handleTechClick = (techName: string) => {
      setActiveTech(techName);
      startTransition(async () => {
          try {
              const result = await generateCode({ technology: techName });
              setGeneratedCode(result);
          } catch (error) {
              console.error("Failed to generate code:", error);
              setGeneratedCode({ code: `// Error generating code for ${techName}`, language: 'text' });
          }
      });
  };

  const CodeDisplay = () => {
    const [isTyping, setIsTyping] = useState(true);
    const handleTypingDone = useCallback(() => setIsTyping(false), []);

    useEffect(() => {
      setIsTyping(true);
    }, [generatedCode]);

    return (
       <Card className="bg-card/50 shadow-lg">
        <CardContent className="p-0">
            <div className="flex justify-between items-center px-4 py-2 border-b">
                <p className="text-sm font-medium">{activeTech}</p>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto min-h-[300px] bg-muted/30 whitespace-pre-wrap">
                <code className={cn("font-code", `language-${generatedCode.language}`)}>
                    {isPending ? (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[80%]" />
                            <Skeleton className="h-4 w-[90%]" />
                            <Skeleton className="h-4 w-[70%]" />
                            <Skeleton className="h-4 w-[85%]" />
                        </div>
                    ) : (
                        <Typewriter text={generatedCode.code} onDone={handleTypingDone} />
                    )}
                </code>
            </pre>
        </CardContent>
    </Card>
    )
  }

  return (
    <section id="tech-stack" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Tech Stack</h2>
          <p className="mt-4 text-lg text-foreground/80">
            I leverage a modern, robust tech stack to build high-quality applications. Click on an icon to see an AI-generated code snippet.
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
                        activeTech === tech.name ? 'bg-primary/10 scale-110' : 'hover:bg-secondary'
                    )}
                    aria-label={`Generate code for ${tech.name}`}
                >
                  {tech.icon}
                  <p className="text-sm font-medium text-foreground/90">{tech.name}</p>
                </button>
              ))}
          </div>

          <div className="lg:max-w-md">
             <CodeDisplay />
          </div>
        </div>
      </div>
    </section>
  );
}
