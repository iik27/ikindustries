import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-background to-secondary pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(176,226,255,0.3),rgba(255,255,255,0))]"></div>
      <div className="container mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Building the Future of Digital,
            <span className="block mt-2 sm:mt-4 bg-gradient-to-r from-primary via-blue-500 to-teal-400 bg-clip-text text-transparent">
              One Line of Code at a Time.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
            IK Industries delivers cutting-edge technology solutions. We specialize in bespoke web, mobile, and AI applications that drive growth and innovation for your business.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <a href="#portfolio">
                Explore Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href="#services">
                Our Services <span aria-hidden="true" className="ml-1">→</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}