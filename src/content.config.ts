// The two types of posts on the site: Guides and News.
// Each post is a Markdown file. The admin page writes these files for you.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ question: z.string(), answer: z.string() })).optional();

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional().nullable(),
    category: z.enum(['Starting a Business', 'Choosing Machines', 'Locations', 'Repairs & Issues', 'Running Your Business']),
    cover: z.string().optional().nullable(),
    coverAlt: z.string().optional().nullable(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    faq,
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: z.string().optional().nullable(),
    coverAlt: z.string().optional().nullable(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides, news };
