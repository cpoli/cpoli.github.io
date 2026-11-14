import type { APIRoute } from 'astro';

// Single-page site; lastmod is the build time, refreshed by the daily rebuild.
export const GET: APIRoute = ({ site }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('/', site)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
