import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export default function About() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2">
            {profileImage && (
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  data-ai-hint={profileImage.imageHint}
                />
              </div>
            )}
          </div>
          <div className="md:col-span-3">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet the Enthusiast
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Muhamad Taufik Hidayat, the part of IK Industries, is a passionate technologist with a drive for excellence and innovation. With years of experience in full-stack development, frond-end development & system analyst, he leads the company with a vision to create impactful digital solutions that solve real-world problems.
            </p>
            <p className="mt-4 text-foreground/80">
              His expertise spans across modern web technologies, scalable backend architectures, and intelligent system design, ensuring that every project is built on a foundation of quality and forward-thinking.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/iik27" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/iiiikkk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
