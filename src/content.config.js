import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60),
    description: z.string().max(160),
    excerpt: z.string(),
    keywords: z.array(z.string()).default([]),
    // Files live in public/assets/blog/<slug>.webp, with -720.webp and -og.jpg variants.
    image: z.object({ width: z.number(), height: z.number(), alt: z.string() }).optional(),
    takeaways: z.array(z.string()).default([]),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    tool: z.enum(['video', 'reels', 'photo', 'stories', 'audio']).default('reels'),
    draft: z.boolean().default(false),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([])
  })
});

export const collections = { blog };
