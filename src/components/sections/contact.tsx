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
      {pending ? 'Mengirim...' : 'Kirim Pesan'}
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
          title: "Gagal mengirim formulir.",
          description: state.issues[0] || 'Silakan periksa kembali bidang di bawah ini.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Berhasil!',
          description: state.message,
        });
      }
    }
  }, [state, toast]);


  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hubungi Kami
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Punya proyek impian atau sekadar ingin menyapa? Isi formulir atau gunakan informasi kontak di bawah ini. Kami akan senang mendengar dari Anda.
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
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>Kami akan membalas pesan Anda sesegera mungkin.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nama</label>
                  <Input id="name" name="name" placeholder="Nama Anda" required defaultValue={state.fields?.name} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" name="email" type="email" placeholder="email@contoh.com" required defaultValue={state.fields?.email} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Pesan</label>
                  <Textarea id="message" name="message" placeholder="Tuliskan pesan Anda di sini..." required minLength={10} defaultValue={state.fields?.message} />
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