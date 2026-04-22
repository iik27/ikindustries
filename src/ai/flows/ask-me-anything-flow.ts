
'use server';
/**
 * @fileOverview Agen AI percakapan yang bertindak sebagai Muhamad Taufik Hidayat dari IK Labs.
 *
 * - askMeAnything - Fungsi yang menangani proses percakapan.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { PortfolioItems } from '@/lib/portfolio-items';
import { BlogPosts } from '@/lib/blog-posts';

const getSiteContext = () => {
    const portfolioContext = PortfolioItems.slice(0, 5).map(item => 
        `- Proyek: ${item.title} (${item.technologies.slice(0, 3).join(', ')})`
    ).join('\n');

    const blogContext = BlogPosts.slice(0, 3).map(post => 
        `- Artikel: ${post.title}`
    ).join('\n');

    const servicesContext = `
- Pengembangan Website profesional.
- Aplikasi Mobile iOS & Android.
- Sistem Perusahaan (ERP, CRM, Dashboard Management).
    `;

    return `
LAYANAN:
${servicesContext}

PORTOFOLIO UNGGULAN:
${portfolioContext}

BLOG TERBARU:
${blogContext}
    `;
};


const AskMeAnythingInputSchema = z.object({
  question: z.string().describe("Pertanyaan pengguna."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('Riwayat percakapan.'),
});
export type AskMeAnythingInput = z.infer<typeof AskMeAnythingInputSchema>;

const AskMeAnythingOutputSchema = z.object({
  answer: z.string().describe('Tanggapan dalam format Markdown.'),
});
export type AskMeAnythingOutput = z.infer<typeof AskMeAnythingOutputSchema>;


export async function askMeAnything(input: AskMeAnythingInput): Promise<AskMeAnythingOutput> {
  return askMeAnythingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askMeAnythingPrompt',
  input: { schema: z.object({
    question: z.string(),
    formattedHistory: z.string(),
    context: z.string(),
  }) },
  output: { schema: AskMeAnythingOutputSchema },
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
    ]
  },
  prompt: `Anda adalah Muhamad Taufik Hidayat, pendiri IK Labs. Anda antusias, profesional, dan visioner.

Tugas Anda adalah membantu pengunjung situs IK Labs. Gunakan konteks di bawah ini:

=== KONTEKS IK LABS ===
{{{context}}}
=== AKHIR KONTEKS ===

Aturan:
- Gunakan "saya" atau "kami".
- Jawab dalam Bahasa Indonesia yang ramah namun profesional.
- Singkat (2-3 kalimat).
- Jika tidak relevan, arahkan kembali ke layanan IK Labs dengan sopan.
- Gunakan Markdown.

Riwayat:
{{{formattedHistory}}}

User: {{{question}}}
`,
});

const askMeAnythingFlow = ai.defineFlow(
  {
    name: 'askMeAnythingFlow',
    inputSchema: AskMeAnythingInputSchema,
    outputSchema: AskMeAnythingOutputSchema,
  },
  async (input) => {
    const formattedHistory = (input.history ?? [])
      .map(message => message.role === 'user' ? `User: ${message.content}` : `Anda: ${message.content}`)
      .join('\n');

    const { output } = await prompt({
      question: input.question,
      formattedHistory: formattedHistory,
      context: getSiteContext(),
    });
    return output!;
  }
);
