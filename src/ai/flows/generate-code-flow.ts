'use server';
/**
 * @fileOverview An AI flow to provide advantages and buildable features for a technology.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GetTechDetailsInputSchema = z.object({
  technology: z.string().describe('The technology to analyze.'),
  language: z.enum(['id', 'en']).describe('The language for the output.'),
});
export type GetTechDetailsInput = z.infer<typeof GetTechDetailsInputSchema>;

const GetTechDetailsOutputSchema = z.object({
  advantages: z.array(z.string()).describe('List of 3 key advantages.'),
  features: z.array(z.string()).describe('List of 3 key features buildable with this tech.'),
});
export type GetTechDetailsOutput = z.infer<typeof GetTechDetailsOutputSchema>;

export async function generateCode(input: GetTechDetailsInput): Promise<GetTechDetailsOutput> {
  return getTechDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getTechDetailsPrompt',
  input: { schema: GetTechDetailsInputSchema },
  output: { schema: GetTechDetailsOutputSchema },
  prompt: `You are a senior technical consultant at IK Labs. For the given technology, provide an expert analysis including key advantages and potential features that can be built.

- Provide exactly 3 advantages and 3 features.
- Keep each point concise (max 10 words).
- Language: {{language}} (If 'id', respond in Bahasa Indonesia. If 'en', respond in English).

Technology: {{{technology}}}
`,
});

const getTechDetailsFlow = ai.defineFlow(
  {
    name: 'getTechDetailsFlow',
    inputSchema: GetTechDetailsInputSchema,
    outputSchema: GetTechDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);