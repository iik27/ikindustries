import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PortfolioItems } from "@/lib/portfolio-items";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ShineBorderCard from "../shine-border-card";

export default function Portfolio() {
  const portfolioImages = PlaceHolderImages.filter(p => p.id.startsWith('portfolio-'));

  // Show only 6 items on the homepage
  const itemsToShow = PortfolioItems.slice(0, 6);

  return (
    <section id="portfolio" className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Portfolio</h2>
          <p className="mt-4 text-lg text-foreground/80">
            A glimpse into the quality and creativity of our work.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {itemsToShow.map((item) => {
            const image = portfolioImages.find(img => img.id === item.imageId);
            if (!image) return null;
            return (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="block group">
                <ShineBorderCard className="h-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[3/2] overflow-hidden relative rounded-t-lg">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        sizes="100vw"
                        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center bg-card">
                    <h3 className="font-headline font-semibold text-foreground">{item.title}</h3>
                    <ArrowRight className="h-5 w-5 text-foreground/60 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </CardFooter>
                </ShineBorderCard>
              </Link>
            );
          })}
        </div>
        <div className="mt-16 text-center">
            <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">View All Projects</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
