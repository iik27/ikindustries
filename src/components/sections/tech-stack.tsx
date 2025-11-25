
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
    IconBrandJavascript, 
    IconBrandTypescript, 
    IconBrandPython,
    IconBrandReact,
    IconBrandNextjs,
    IconBrandNodejs,
    IconBrandFirebase,
    IconBrandVercel,
    IconBrandGit,
    IconBrandDocker,
    IconDatabase,
    IconBrandTailwind,
    IconBrandExpress,
    IconBrandRemix,
    IconBrandAstro,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { Check, Clipboard } from 'lucide-react';
import { Button } from '../ui/button';

const technologies = [
    { name: "JavaScript", icon: <IconBrandJavascript className="h-7 w-7" /> },
    { name: "TypeScript", icon: <IconBrandTypescript className="h-7 w-7" /> },
    { name: "Python", icon: <IconBrandPython className="h-7 w-7" /> },
    { name: "React", icon: <IconBrandReact className="h-7 w-7" /> },
    { name: "Next.js", icon: <IconBrandNextjs className="h-7 w-7" /> },
    { name: "Node.js", icon: <IconBrandNodejs className="h-7 w-7" /> },
    { name: "Tailwind CSS", icon: <IconBrandTailwind className="h-7 w-7" /> },
    { name: "Firebase", icon: <IconBrandFirebase className="h-7 w-7" /> },
    { name: "PostgreSQL", icon: <IconDatabase className="h-7 w-7" /> },
    { name: "Git", icon: <IconBrandGit className="h-7 w-7" /> },
    { name: "Docker", icon: <IconBrandDocker className="h-7 w-7" /> },
    { name: "Vercel", icon: <IconBrandVercel className="h-7 w-7" /> },
];

const codeSnippets = {
  'node': {
    label: 'Node.js',
    icon: <IconBrandNodejs className="h-5 w-5 mr-2" />,
    code: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Node.js!');
});

app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`);
});`,
    lang: 'javascript',
  },
  'next': {
    label: 'Next.js',
    icon: <IconBrandNextjs className="h-5 w-5 mr-2" />,
    code: `import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'My Awesome App',
};
 
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}`,
    lang: 'typescript',
  },
  'python': {
    label: 'Python',
    icon: <IconBrandPython className="h-5 w-5 mr-2" />,
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}`,
    lang: 'python',
  },
};

type SnippetKey = keyof typeof codeSnippets;

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<SnippetKey>('node');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tech-stack" className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">Integrate with Your Stack</h2>
          <p className="mt-4 text-lg text-gray-400">
            I leverage a modern, robust tech stack to build high-quality applications. Here are some of the technologies I love to work with.
          </p>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-4 gap-y-8 text-center">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-3">
                 <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-800 border border-gray-700/50 shadow-inner-md">
                   {tech.icon}
                </div>
                <p className="text-sm font-medium text-gray-300">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-[#161B22] border border-gray-700/50 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center justify-between p-2 border-b border-gray-700/50">
                <div className="flex items-center gap-1">
                    {Object.keys(codeSnippets).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as SnippetKey)}
                            className={cn(
                                "flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                                activeTab === key
                                ? 'bg-gray-700/50 text-white'
                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                            )}
                        >
                            {codeSnippets[key as SnippetKey].icon}
                            {codeSnippets[key as SnippetKey].label}
                        </button>
                    ))}
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="text-gray-400 hover:bg-gray-800/50 hover:text-white">
                    {copied ? <Check className="h-5 w-5 text-green-400" /> : <Clipboard className="h-5 w-5" />}
                </Button>
            </div>
            <CardContent className="p-0">
              <pre className="p-6 text-sm overflow-x-auto bg-transparent">
                <code className={`language-${codeSnippets[activeTab].lang} font-code`}>
                  {codeSnippets[activeTab].code}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
