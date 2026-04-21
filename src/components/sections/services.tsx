import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Smartphone, LayoutDashboard } from "lucide-react";

const services = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Website Development",
    description: "Creating professional, high-performance websites. From stunning landing pages to complex e-commerce platforms, we build web solutions that deliver results.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Mobile App Development",
    description: "Building native and cross-platform mobile applications. We deliver seamless user experiences on iOS and Android to keep your business accessible on the go.",
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: "Company Systems",
    description: "Developing robust internal systems including ERP, CRM, and custom dashboards. We automate your workflows and centralize your business data.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Specializations</h2>
          <p className="mt-4 text-lg text-foreground/80">
            We provide specialized digital solutions to help your business operate more efficiently and reach more customers.
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
