'use server';
/**
 * @fileOverview An AI flow to generate sample code for a given technology.
 *
 * - generateCode - A function that handles the code generation process.
 * - GenerateCodeInput - The input type for the generateCode function.
 * - GenerateCodeOutput - The return type for the generateCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateCodeInputSchema = z.object({
  technology: z.string().describe('The programming language or technology to generate a code snippet for.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

export const GenerateCodeOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
  language: z.string().describe('The language of the generated code (e.g., "javascript", "python").'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;


export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  return generateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: { schema: GenerateCodeInputSchema },
  output: { schema: GenerateCodeOutputSchema },
  prompt: `You are an expert software developer. Your task is to generate a simple, elegant, and correct "Hello, World!" style code snippet for the given technology.

The code should be a canonical, beginner-friendly example.
- For languages like Python or JavaScript, a simple print/console.log is sufficient.
- For frameworks like React or Next.js, provide a minimal functional component.
- For CSS frameworks like Tailwind, show a simple HTML snippet using its utility classes.
- Do not include comments in the code.
- Provide the language identifier (e.g., "javascript", "python", "jsx") for syntax highlighting.

Technology: {{{technology}}}
`,
});

const generateCodeFlow = ai.defineFlow(
  {
    name: 'generateCodeFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
