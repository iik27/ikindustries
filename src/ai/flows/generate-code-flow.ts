'use server';
/**
 * @fileOverview An AI flow to generate sample code for a given technology.
 *
 * - generateCode - A function that handles the code generation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateCodeInputSchema = z.object({
  technology: z.string().describe('The programming language or technology to generate a code snippet for.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
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
  prompt: `You are an expert software developer. Your task is to generate a simple, elegant, and correct code snippet for the given technology. The code should be a canonical, beginner-friendly example.

- Do not include comments in the code.
- Provide the language identifier (e.g., "javascript", "python", "jsx") for syntax highlighting.

Follow these specific rules for certain technologies:
- For web frameworks like React, Next.js, or Svelte: Provide a minimal functional "Hello, World!" component.
- For UI/CSS frameworks like Tailwind CSS: Show a simple HTML snippet with a styled button.
- For programming languages like Python, JavaScript, Java, Kotlin, PHP, or Dart: Provide a simple "Hello, World!" print statement.
- For databases like PostgreSQL: Show a SQL statement to create a simple 'users' table with id, username, and email columns.
- For platforms like Firebase: Show a JavaScript snippet for initializing the Firebase app.
- For tools like Git: Provide a sample '.gitignore' file for a Node.js project.
- For editors like VS Code: Provide a sample 'settings.json' with a few common settings (e.g., theme, font size, autosave).
- For Node.js: Show a simple HTTP server that responds with "Hello, World!".

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
