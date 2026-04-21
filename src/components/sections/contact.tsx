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
import { useLanguage } from '../language-provider';
import { translations } from '@/lib/translations';

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? pendingLabel : label}
    </Button>
  );
}

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const { toast } = useToast();
  const [state, formAction] = useActionState<ContactFormState, FormData>(submitContactForm, {
    message: '',
  });

   useEffect(() => {
    if (state.message) {
      if (state.issues) {
        toast({
          title: t.errorTitle,
          description: state.issues[0] || t.errorDescription,
          variant: 'destructive',
        });
      } else {
        toast({
          title: language === 'id' ? 'Berhasil!' : 'Success!',
          description: state.message,
        });
      }
    }
  }, [state, toast, t, language]);


  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              {t.subtitle}
            </p>
            <div className="mt-8 space-y-4">
                <a href="mailto:contact@ikindustries.com" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>contact@ikindustries.com</span>
                </a>
                <a href="https://wa.me/6281462202381" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                    <Phone className="h-6 w-6 text-primary" />
                    <span>+6281462202381</span>
                </a>
            </div>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t.send}</CardTitle>
              <CardDescription>{language === 'id' ? 'Kami akan membalas pesan Anda sesegera mungkin.' : 'We will reply to your message as soon as possible.'}</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">{t.name}</label>
                  <Input id="name" name="name" placeholder={t.name} required defaultValue={state.fields?.name} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">{t.email}</label>
                  <Input id="email" name="email" type="email" placeholder="email@example.com" required defaultValue={state.fields?.email} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">{t.message}</label>
                  <Textarea id="message" name="message" placeholder={language === 'id' ? 'Tuliskan pesan Anda di sini...' : 'Write your message here...'} required minLength={10} defaultValue={state.fields?.message} />
                </div>
                <SubmitButton label={t.send} pendingLabel={t.sending} />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}