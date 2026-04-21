import Image from "next/image";
import Link from "next/link";
import { PortfolioItems } from "@/lib/portfolio-items";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import ShineBorderCard from "@/components/shine-border-card";

export default function PortfolioListPage() {
  const portfolioImages = PlaceHolderImages.filter(p => p.id.startsWith('portfolio-'));

  return (
    <>
      <Header />
      <main>
        <section className="bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Karya Kami</h1>
              <p className="mt-4 text-xl text-foreground/80">
                Pameran semangat, kreativitas, dan komitmen kami terhadap keunggulan.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {PortfolioItems.map((item) => {
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}