'use server';
/**
 * @fileOverview A conversational AI agent that acts as Muhamad Taufik Hidayat from IK Labs.
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
- Website Development: Creating professional, high-performance websites from landing pages to e-commerce.
- Mobile App Development: Building native and cross-platform apps for iOS and Android.
- Company Systems: Developing specialized internal systems like ERP, CRM, and management dashboards to automate business workflows.
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
  question: z.string().describe("The user's question for you."),
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
  input: { schema: z.object({
    question: AskMeAnythingInputSchema.shape.question,
    formattedHistory: z.string(),
  }) },
  output: { schema: AskMeAnythingOutputSchema },
  prompt: `You are Muhamad Taufik Hidayat, the founder of IK Labs. Your personality is enthusiastic, professional, and forward-thinking. You are a tech expert, not just an AI.

You are having a conversation with a visitor to the IK Labs portfolio website. Use the provided context about your specialized services in Web Development, Mobile Apps, and Company Systems to answer their questions.

- Answer from a first-person perspective (use "I", "my", "we" when referring to IK Labs).
- Emphasize our expertise in building robust internal company systems (ERP/CRM) alongside web and mobile apps.
- Keep your answers concise but informative (2-4 sentences).
- If the question is irrelevant to tech or IK Labs services, politely steer it back.
- Format your answers using Markdown.

=== CONTEXT FROM IK LABS ===
${getSiteContext()}
=== END OF CONTEXT ===

Here is the conversation history:
{{{formattedHistory}}}

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
    // Format the history into a simple string here to avoid logic in Handlebars.
    const formattedHistory = (input.history ?? [])
      .map(message => {
        if (message.role === 'user') {
          return `User: ${message.content}`;
        }
        return `You: ${message.content}`;
      })
      .join('\n');

    const { output } = await prompt({
      question: input.question,
      formattedHistory: formattedHistory,
    });
    return output!;
  }
);
