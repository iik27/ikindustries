'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
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

    // In a real application, you would send an email or save this to a database.
    // For this demo, we'll just log it to the server console.
    console.log('New contact form submission:');
    console.log('Name:', parsed.name);
    console.log('Email:', parsed.email);
    console.log('Message:', parsed.message);

    return { message: 'Thank you! Your message has been sent successfully.' };
  } catch (error) {
     if (error instanceof z.ZodError) {
      return {
        message: "We couldn't submit the form. Please check the fields below.",
        fields: Object.fromEntries(data.entries()) as Record<string, string>,
        issues: error.issues.map((issue) => issue.message),
      };
    }
    return { message: 'An unexpected error occurred. Please try again later.' };
  }
}
