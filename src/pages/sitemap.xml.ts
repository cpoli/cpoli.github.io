import type { APIRoute } from 'astro';

// Sitemap index: this site's own sitemap plus each package's docs sitemap
// (separate GitHub Pages project sites served under cpoli.github.io/<kit>/).
const KITS = [
  'blockchainkit',
  'chemistrykit',
  'earthsciencekit',
  'engineeringkit',
  'financialkit',
  'mathematicskit',
  'physicskit',
  'tbkit',
];

export const GET: APIRoute = ({ site }) => {
  const locs = ['/sitemap-home.xml', ...KITS.map((kit) => `/${kit}/sitemap.xml`)];
  const entries = locs
    .map((path) => `  <sitemap>\n    <loc>${new URL(path, site)}</loc>\n  </sitemap>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
