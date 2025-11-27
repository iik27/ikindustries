'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Mail, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [state, formAction] = useActionState<ContactFormState, FormData>(submitContactForm, {
    message: '',
  });

   useEffect(() => {
    if (state.message) {
      if (state.issues) {
        toast({
          title: "We couldn't submit the form.",
          description: state.issues[0] || 'Please check the fields below.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success!',
          description: state.message,
        });
        // Note: Resetting the form requires the form element.
        // We can get it via the event or by giving the form an ID.
        // For simplicity with server actions, a full-page redirect or just showing a success message is often easier.
      }
    }
  }, [state, toast]);


  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Have a project in mind or just want to say hello? Fill out the form or use the contact information below. I'd love to hear from you.
            </p>
            <div className="mt-8 space-y-4">
                <a href="mailto:contact@ikindustries.com" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>contact@ikindustries.com</span>
                </a>
                <a href="https://wa.me/6281462202381?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20Anda%20dan%20ingin%20bertanya%20lebih%20lanjut." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                    <Phone className="h-6 w-6 text-primary" />
                    <span>+6281462202381</span>
                </a>
            </div>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" name="name" placeholder="Your Name" required defaultValue={state.fields?.name} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" name="email" type="email" placeholder="your.email@example.com" required defaultValue={state.fields?.email} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" name="message" placeholder="Your message here..." required minLength={10} defaultValue={state.fields?.message} />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
