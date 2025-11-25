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
    IconBrandTailwind
} from '@/components/icons';

const techCategories = [
    {
        title: "Languages",
        technologies: [
            { name: "JavaScript", icon: <IconBrandJavascript className="h-10 w-10" /> },
            { name: "TypeScript", icon: <IconBrandTypescript className="h-10 w-10" /> },
            { name: "Python", icon: <IconBrandPython className="h-10 w-10" /> },
        ]
    },
    {
        title: "Frameworks & Libraries",
        technologies: [
            { name: "React", icon: <IconBrandReact className="h-10 w-10" /> },
            { name: "Next.js", icon: <IconBrandNextjs className="h-10 w-10" /> },
            { name: "Node.js", icon: <IconBrandNodejs className="h-10 w-10" /> },
            { name: "Tailwind CSS", icon: <IconBrandTailwind className="h-10 w-10" /> },
        ]
    },
    {
        title: "Databases",
        technologies: [
            { name: "Firebase", icon: <IconBrandFirebase className="h-10 w-10" /> },
            { name: "PostgreSQL", icon: <IconDatabase className="h-10 w-10" /> },
        ]
    },
    {
        title: "Tools & Platforms",
        technologies: [
            { name: "Git", icon: <IconBrandGit className="h-10 w-10" /> },
            { name: "Docker", icon: <IconBrandDocker className="h-10 w-10" /> },
            { name: "Vercel", icon: <IconBrandVercel className="h-10 w-10" /> },
        ]
    }
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Tech Stack</h2>
          <p className="mt-4 text-lg text-foreground/80">
            A collection of technologies I use to build modern, scalable, and robust applications.
          </p>
        </div>
        <div className="mt-16 space-y-12">
          {techCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-center font-headline text-2xl font-semibold text-foreground mb-8">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
                {category.technologies.map((tech) => (
                  <Card key={tech.name} className="bg-secondary/50 hover:bg-secondary transition-colors duration-300">
                    <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                      {tech.icon}
                      <p className="mt-4 text-sm font-medium text-center text-foreground/90">{tech.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
