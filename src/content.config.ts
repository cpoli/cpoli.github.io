import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Short articles in the hub's Notes section, usually distilled from a kit's
// history of breakthroughs. The share image is the kit's card figure.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Kit the note is about; picks src/assets/packages/<kit>.png as its image. */
    kit: z.string(),
    /** Drafts build locally but are left out of the production site, RSS and sitemap. */
    draft: z.boolean().default(false),
  }),
});

// Case studies for Iguanas, Gators and tbkit, linked from their cards.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    /** GitHub owner/name, also the PyPI name when lowercased. */
    repo: z.string(),
    docs: z.string().url(),
    install: z.string(),
    /** Cards and share images use src/assets/packages/<image>.png. */
    image: z.string(),
    imageAlt: z.string(),
    logo: z.boolean().default(false),
    keywords: z.array(z.string()),
  }),
});

export const collections = { notes, projects };
