export type EpisodeLinks = {
  apple?: string | null;
  spotify?: string | null;
  youtube?: string | null;
  rss?: string | null;
  web?: string | null;
};

export function videoLink(title: string, links?: EpisodeLinks | null): string | null {
  // Prefer explicit YouTube field
  if (links?.youtube) return links.youtube;

  // If 'web' already points to YouTube, use it
  if (links?.web && /(?:youtube\.com|youtu\.be)/i.test(links.web)) {
    return links.web;
    }

  // Fallback: search
  const handle = "@100MetalSongs";
  const q = `${title} ${handle}`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}
