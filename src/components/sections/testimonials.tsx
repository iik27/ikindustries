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
    quote: "Working with IK Industries was a game-changer for our business. Their expertise in AI solutions helped us automate critical processes, saving us countless hours and resources. The team is professional, responsive, and truly innovative.",
    name: "Jane Doe",
    title: "CEO, Tech Solutions Inc.",
    imageId: "testimonial-1",
  },
  {
    quote: "The web application they developed for us exceeded all our expectations. It's fast, intuitive, and beautifully designed. Their attention to detail and commitment to quality is evident in every aspect of the project.",
    name: "John Smith",
    title: "Marketing Director, Creative Co.",
    imageId: "testimonial-2",
  },
  {
    quote: "I was impressed by their ability to understand our complex requirements and translate them into a functional and elegant mobile app. IK Industries is a reliable partner for any development needs.",
    name: "Alex Johnson",
    title: "Founder, Startup Hub",
    imageId: "testimonial-3",
  },
    {
    quote: "From start to finish, the communication was excellent. They kept us in the loop at every stage and were always available to answer our questions. Highly recommended for their technical skill and customer service.",
    name: "Emily White",
    title: "Product Manager, Innovate Corp.",
    imageId: "testimonial-4",
  },
];

export default function Testimonials() {
  const testimonialImages = PlaceHolderImages.filter(p => p.id.startsWith('testimonial-'));

  return (
    <section id="testimonials" className="bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
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
                              <Image
                                src={image.imageUrl}
                                alt={`Portrait of ${testimonial.name}`}
                                width={56}
                                height={56}
                                className="rounded-full object-cover"
                                data-ai-hint={image.imageHint}
                              />
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
