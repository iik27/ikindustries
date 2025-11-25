import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Working with them was a seamless experience. Their professionalism and technical expertise are evident in the final product. We are extremely satisfied with the results.",
    name: "Client A",
    title: "CEO, Innovate Ltd.",
    imageId: "testimonial-1",
  },
  {
    quote: "The application they developed has significantly improved our workflow. It's intuitive, fast, and beautifully designed. Highly recommended for any development needs.",
    name: "Client B",
    title: "Director, TechForward",
    imageId: "testimonial-2",
  },
  {
    quote: "Their ability to translate complex requirements into a simple, elegant solution was impressive. They are a reliable and highly skilled technology partner.",
    name: "Client C",
    title: "Founder, Visionary Ventures",
    imageId: "testimonial-3",
  },
    {
    quote: "Communication was excellent throughout the project. They kept us informed at every stage and delivered beyond our expectations. A truly five-star service.",
    name: "Client D",
    title: "Manager, NextGen Solutions",
    imageId: "testimonial-4",
  },
];

export default function Testimonials() {
  const testimonialImages = PlaceHolderImages.filter(p => p.id.startsWith('testimonial-'));

  return (
    <section id="testimonials" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Real stories from businesses we've helped to grow and succeed.
          </p>
        </div>
        <div className="mt-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                 const image = testimonialImages.find(img => img.id === testimonial.imageId);
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-6 flex-grow">
                          <blockquote className="text-lg text-foreground/90">
                            "{testimonial.quote}"
                          </blockquote>
                        </CardContent>
                        <div className="bg-secondary/50 p-6 pt-4 mt-auto">
                          <div className="flex items-center gap-4">
                            {image && (
                              <div className="relative h-14 w-14 rounded-full overflow-hidden">
                                <Image
                                  src={image.imageUrl}
                                  alt={`Portrait of ${testimonial.name}`}
                                  fill
                                  className="object-cover"
                                  data-ai-hint={image.imageHint}
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-headline font-semibold text-foreground">{testimonial.name}</p>
                              <p className="text-sm text-foreground/70">{testimonial.title}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
