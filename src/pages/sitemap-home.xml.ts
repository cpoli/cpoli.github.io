import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { publishedNotes } from '../lib/content';

// The hub's own pages; lastmod is the build time, refreshed by the daily rebuild.
export const GET: APIRoute = async ({ site }) => {
  const now = new Date().toISOString();
  const pages = [
    { path: '/', lastmod: now },
    ...(await getCollection('projects')).map((p) => ({ path: `/projects/${p.id}/`, lastmod: now })),
    { path: '/notes/', lastmod: now },
    ...(await publishedNotes()).map((n) => ({
      path: `/notes/${n.id}/`,
      lastmod: (n.data.updated ?? n.data.date).toISOString(),
    })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>\n    <loc>${new URL(p.path, site)}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
