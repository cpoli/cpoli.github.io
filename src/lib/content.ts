import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';

// Card images: src/assets/packages/<lowercase package name>.png (gallery figure or logo).
const thumbnails = import.meta.glob<{ default: ImageMetadata }>('../assets/packages/*.png', { eager: true });
export const thumbnail = (pkg: string) => thumbnails[`../assets/packages/${pkg.toLowerCase()}.png`]?.default;

/** Absolute URL of a 1200px-wide PNG of a package's card image, for og:image. */
export async function shareImage(pkg: string, site: URL | undefined): Promise<string | undefined> {
  const src = thumbnail(pkg);
  if (!src) return undefined;
  const img = await getImage({ src, width: Math.min(1200, src.width), format: 'png' });
  return new URL(img.src, site).href;
}

/** Published notes, newest first. Drafts show only in `astro dev`. */
export async function publishedNotes() {
  const notes = await getCollection('notes', ({ data }) => import.meta.env.DEV || !data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
