import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  const portfolioImages = PlaceHolderImages.filter(p => p.id.startsWith('portfolio-'));

  const portfolioItems = [
    { title: "Modern Web App", imageId: "portfolio-1" },
    { title: "Sleek Mobile App", imageId: "portfolio-2" },
    { title: "AI Analytics Dashboard", imageId: "portfolio-3" },
    { title: "Data Visualization", imageId: "portfolio-4" },
    { title: "Tech Company Site", imageId: "portfolio-5" },
    { title: "E-commerce Platform", imageId: "portfolio-6" },
  ]

  return (
    <section id="portfolio" className="bg-secondary">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Portfolio</h2>
          <p className="mt-4 text-lg text-foreground/80">
            A glimpse into the quality and creativity of our work.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => {
            const image = portfolioImages.find(img => img.id === item.imageId);
            if (!image) return null;
            return (
              <Card key={item.imageId} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="aspect-[3/2] overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center bg-background/50">
                  <h3 className="font-headline font-semibold text-foreground">{item.title}</h3>
                  <ArrowRight className="h-5 w-5 text-foreground/60 transform transition-transform duration-300 group-hover:translate-x-1" />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
