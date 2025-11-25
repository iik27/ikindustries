'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const technologies = [
    { name: "JavaScript", icon: <IconBrandJavascript className="h-10 w-10" /> },
    { name: "TypeScript", icon: <IconBrandTypescript className="h-10 w-10" /> },
    { name: "Python", icon: <IconBrandPython className="h-10 w-10" /> },
    { name: "React", icon: <IconBrandReact className="h-10 w-10" /> },
    { name: "Next.js", icon: <IconBrandNextjs className="h-10 w-10" /> },
    { name: "Node.js", icon: <IconBrandNodejs className="h-10 w-10" /> },
    { name: "Tailwind CSS", icon: <IconBrandTailwind className="h-10 w-10" /> },
    { name: "Flutter", icon: <IconBrandFlutter className="h-10 w-10" /> },
    { name: "Firebase", icon: <IconBrandFirebase className="h-10 w-10" /> },
    { name: "PostgreSQL", icon: <IconDatabase className="h-10 w-10" /> },
    { name: "Git", icon: <IconBrandGit className="h-10 w-10" /> },
    { name: "PHP", icon: <IconBrandPHP className="h-10 w-10" /> },
    { name: "VS Code", icon: <IconBrandVSCode className="h-10 w-10" /> },
    { name: "Java", icon: <IconBrandJava className="h-10 w-10" /> },
    { name: "Kotlin", icon: <IconBrandKotlin className="h-10 w-10" /> },
];

const codeSnippets = {
  nodejs: `
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\\n');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});
`.trim(),
  nextjs: `
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a sample page.</p>
    </div>
  );
};

export default Home;
`.trim(),
  python: `
def greet(name):
    """
    This function greets the person passed in as a parameter.
    """
    print(f"Hello, {name}!")

greet('IK Industries')
# Output: Hello, IK Industries!
`.trim(),
  java: `
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}
`.trim(),
  php: `
<?php
  echo "Hello, World!";
?>
`.trim(),
};

const CodeViewer = () => (
  <Card className="bg-card/50 shadow-lg">
    <CardContent className="p-0">
      <Tabs defaultValue="nextjs" className="w-full">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <TabsList className="grid grid-cols-5 w-fit">
            <TabsTrigger value="nextjs">Next.js</TabsTrigger>
            <TabsTrigger value="nodejs">Node.js</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
            <TabsTrigger value="php">PHP</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <TabsContent value="nodejs">
          <pre className="p-4 text-sm overflow-x-auto"><code className="font-code">{codeSnippets.nodejs}</code></pre>
        </TabsContent>
        <TabsContent value="nextjs">
          <pre className="p-4 text-sm overflow-x-auto"><code className="font-code">{codeSnippets.nextjs}</code></pre>
        </TabsContent>
        <TabsContent value="python">
          <pre className="p-4 text-sm overflow-x-auto"><code className="font-code">{codeSnippets.python}</code></pre>
        </TabsContent>
        <TabsContent value="java">
          <pre className="p-4 text-sm overflow-x-auto"><code className="font-code">{codeSnippets.java}</code></pre>
        </TabsContent>
        <TabsContent value="php">
          <pre className="p-4 text-sm overflow-x-auto"><code className="font-code">{codeSnippets.php}</code></pre>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

export default function TechStack() {
  return (
    <section id="tech-stack" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Tech Stack</h2>
          <p className="mt-4 text-lg text-foreground/80">
            I leverage a modern, robust tech stack to build high-quality applications. Here are some of the technologies I love to work with.
          </p>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
              {technologies.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center justify-center gap-2 w-24 text-center">
                  {tech.icon}
                  <p className="text-sm font-medium text-foreground/90">{tech.name}</p>
                </div>
              ))}
          </div>

          <div className="lg:max-w-md">
             <CodeViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
