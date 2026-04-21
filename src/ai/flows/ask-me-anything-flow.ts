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
    const portfolioContext = PortfolioItems.map(item => 
        `Proyek: ${item.title}\nDeskripsi: ${item.description}\nTeknologi: ${item.technologies.join(', ')}\n`
    ).join('\n');

    const blogContext = BlogPosts.map(post => 
        `Artikel Blog: ${post.title}\nRingkasan: ${post.description}\nTag: ${post.tags.join(', ')}\n`
    ).join('\n');

    const servicesContext = `
- Pengembangan Website: Membuat website profesional dan berperforma tinggi dari landing page hingga e-commerce.
- Aplikasi Mobile: Membangun aplikasi native dan cross-platform untuk iOS dan Android.
- Sistem Perusahaan: Mengembangkan sistem internal khusus seperti ERP, CRM, dan dashboard manajemen untuk mengotomatiskan alur kerja bisnis.
    `;

    return `
=== Portofolio Kami ===
${portfolioContext}

=== Artikel Blog Kami ===
${blogContext}

=== Layanan Kami ===
${servicesContext}
    `;
};


const AskMeAnythingInputSchema = z.object({
  question: z.string().describe("Pertanyaan pengguna untuk Anda."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('Riwayat percakapan.'),
});
export type AskMeAnythingInput = z.infer<typeof AskMeAnythingInputSchema>;

const AskMeAnythingOutputSchema = z.object({
  answer: z.string().describe('Tanggapan Anda terhadap pertanyaan pengguna, dalam format Markdown.'),
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
  prompt: `Anda adalah Muhamad Taufik Hidayat, pendiri IK Labs. Kepribadian Anda antusias, profesional, dan visioner. Anda adalah ahli teknologi sejati.

Anda sedang berbincang dengan pengunjung situs portofolio IK Labs. Gunakan konteks yang disediakan tentang layanan khusus kami di Pengembangan Web, Aplikasi Mobile, dan Sistem Perusahaan untuk menjawab pertanyaan mereka.

- Jawab dari sudut pandang orang pertama (gunakan "saya", "kami" saat merujuk ke IK Labs).
- Tekankan keahlian kami dalam membangun sistem internal perusahaan yang kuat (ERP/CRM) di samping aplikasi web dan mobile.
- Selalu jawab dalam Bahasa Indonesia yang profesional namun ramah.
- Jaga jawaban tetap singkat namun informatif (2-4 kalimat).
- Jika pertanyaan tidak relevan dengan teknologi atau layanan IK Labs, arahkan kembali dengan sopan.
- Format jawaban Anda menggunakan Markdown.

=== KONTEKS DARI IK LABS ===
${getSiteContext()}
=== AKHIR KONTEKS ===

Berikut adalah riwayat percakapan:
{{{formattedHistory}}}

Pertanyaan Baru dari Pengguna: {{{question}}}

Jawaban Anda (dalam Bahasa Indonesia):
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
      .map(message => {
        if (message.role === 'user') {
          return `Pengguna: ${message.content}`;
        }
        return `Anda: ${message.content}`;
      })
      .join('\n');

    const { output } = await prompt({
      question: input.question,
      formattedHistory: formattedHistory,
    });
    return output!;
  }
);