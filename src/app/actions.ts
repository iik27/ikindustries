'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus minimal 2 karakter.' }),
  email: z.string().email({ message: 'Silakan masukkan email yang valid.' }),
  message: z.string().min(10, { message: 'Pesan harus minimal 10 karakter.' }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function submitContactForm(
  _prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  try {
    const parsed = contactSchema.parse({
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    });

    console.log('Pengiriman formulir kontak baru:');
    console.log('Nama:', parsed.name);
    console.log('Email:', parsed.email);
    console.log('Pesan:', parsed.message);
    
    return { message: 'Terima kasih! Pesan Anda telah kami terima.' };
  } catch (error) {
     if (error instanceof z.ZodError) {
      return {
        message: "Kami tidak dapat mengirim formulir. Silakan periksa bidang di bawah ini.",
        fields: Object.fromEntries(data.entries()) as Record<string, string>,
        issues: error.issues.map((issue) => issue.message),
      };
    }
    console.error('Unexpected error:', error);
    return { message: 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.' };
  }
}