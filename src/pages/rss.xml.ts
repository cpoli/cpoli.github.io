import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { publishedNotes } from '../lib/content';

export const GET: APIRoute = async ({ site }) =>
  rss({
    title: 'Notes · Charles Poli',
    description: "Short notes on the breakthroughs behind Charles Poli's open-source toolkits, with runnable examples.",
    site: site!,
    items: (await publishedNotes()).map((n) => ({
      title: n.data.title,
      description: n.data.description,
      pubDate: n.data.date,
      link: `/notes/${n.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
