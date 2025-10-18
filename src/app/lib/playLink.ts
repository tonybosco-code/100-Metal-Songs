export type EpisodeLinks = {
  apple?: string | null;
  spotify?: string | null;
  youtube?: string | null;
  rss?: string | null;
  web?: string | null;
};

/** Priority: Apple → Spotify → YouTube → RSS → Web */
export function playLink(links?: EpisodeLinks | null): string | null {
  if (!links) return null;
  const order: (keyof EpisodeLinks)[] = ["apple", "spotify", "youtube", "rss", "web"];
  for (const key of order) {
    const url = links[key];
    if (url && /^https?:\/\//i.test(url)) return url;
  }
  return null;
}
