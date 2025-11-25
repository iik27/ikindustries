import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Globe, Smartphone } from "lucide-react";

const services = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Website Development",
    description: "Crafting beautiful, high-performance websites with modern technologies. From corporate sites to e-commerce platforms, we build for the future of the web.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Application Development",
    description: "Developing robust and scalable mobile and desktop applications. We create intuitive user experiences that run seamlessly on any device.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI Solutions",
    description: "Integrating cutting-edge Artificial Intelligence to automate processes, gain insights, and create smarter products. We bring the power of AI to your business.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/80">
            We offer a comprehensive suite of technology services to bring your vision to life.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.title} className="text-center hover:shadow-xl transition-shadow duration-300 bg-background">
              <CardHeader className="items-center p-8">
                <div className="bg-primary/10 p-4 rounded-full">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}