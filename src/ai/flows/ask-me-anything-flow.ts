'use server';
/**
 * @fileOverview A conversational AI agent that acts as Muhamad Taufik Hidayat.
 *
 * - askMeAnything - A function that handles the conversational process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { PortfolioItems } from '@/lib/portfolio-items';
import { BlogPosts } from '@/lib/blog-posts';

// This function formats the website content to be injected into the prompt.
const getSiteContext = () => {
    const portfolioContext = PortfolioItems.map(item => 
        `Project: ${item.title}\nDescription: ${item.description}\nTechnologies: ${item.technologies.join(', ')}\n`
    ).join('\n');

    const blogContext = BlogPosts.map(post => 
        `Blog Post: ${post.title}\nSummary: ${post.description}\nTags: ${post.tags.join(', ')}\n`
    ).join('\n');

    const servicesContext = `
- Website Development: Crafting beautiful, high-performance websites with modern technologies.
- Application Development: Developing robust and scalable mobile and desktop applications.
- AI Solutions: Integrating cutting-edge Artificial Intelligence to automate processes, gain insights, and create smarter products.
    `;

    return `
=== My Portfolio ===
${portfolioContext}

=== My Blog Posts ===
${blogContext}

=== My Services ===
${servicesContext}
    `;
};


const AskMeAnythingInputSchema = z.object({
  question: z.string().describe('The user\'s question for you.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
});
export type AskMeAnythingInput = z.infer<typeof AskMeAnythingInputSchema>;

const AskMeAnythingOutputSchema = z.object({
  answer: z.string().describe('Your response to the user\'s question, in Markdown format.'),
});
export type AskMeAnythingOutput = z.infer<typeof AskMeAnythingOutputSchema>;


export async function askMeAnything(input: AskMeAnythingInput): Promise<AskMeAnythingOutput> {
  return askMeAnythingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askMeAnythingPrompt',
  input: { schema: AskMeAnythingInputSchema },
  output: { schema: AskMeAnythingOutputSchema },
  prompt: `You are Muhamad Taufik Hidayat, a passionate and professional technologist behind IK Industries. Your personality is enthusiastic, knowledgeable, and friendly. You are not a generic AI; you are Taufik.

You are having a conversation with a visitor to your portfolio website. Use the provided context about your projects, blog posts, and services to answer their questions in a natural, conversational way.

- Answer from a first-person perspective (use "I", "my", "we" when referring to IK Industries).
- Keep your answers concise but informative. Aim for 2-4 sentences.
- If the question is about a topic outside of your expertise or the provided context (e.g., "what's the weather like?"), politely decline to answer and steer the conversation back to technology, your work, or how you can help them.
- Format your answers using Markdown for better readability (e.g., use bullet points for lists).

=== CONTEXT FROM YOUR WEBSITE ===
${getSiteContext()}
=== END OF CONTEXT ===

Here is the conversation history:
{{#each history}}
  {{#if (eq role 'user')}}User: {{content}}{{/if}}
  {{#if (eq role 'model')}}You: {{content}}{{/if}}
{{/each}}

New Question from User: {{{question}}}

Your Answer:
`,
});

const askMeAnythingFlow = ai.defineFlow(
  {
    name: 'askMeAnythingFlow',
    inputSchema: AskMeAnythingInputSchema,
    outputSchema: AskMeAnythingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
