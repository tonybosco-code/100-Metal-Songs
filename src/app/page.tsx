// src/app/page.tsx
// Clean version: RSS Latest Episode replaces HeroLatest

export const dynamic = "force-dynamic"; // always fetch fresh RSS
export const revalidate = 0;

import { createClient } from "@sanity/client";
import EpisodesGridClean from "@/app/components/EpisodesGridClean";
import EmailSignup from "@/app/components/EmailSignup";
import ShowIntroPanel from "@/app/components/ShowIntroPanel";

/* ---------------- Sanity client (read-only) ---------------- */
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
});

/* ---------------- Shared episode fields / queries ---------------- */
const episodeFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt, pubDate, _createdAt,
  "durationSeconds": coalesce(durationSeconds, duration),
  descriptionPlain, description, excerpt, summary,
  coverImage{ asset->{ url } },
  audioUrl,
  links
`;

const gridQuery = `
*[_type == "episode"]
| order(coalesce(publishedAt, pubDate, _createdAt) desc)[0...9]{
  ${episodeFields}
}
`;

/* ---------------- Megaphone RSS (no cache) ---------------- */
type RssItem = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  image?: string;
};

function parseTag(xmlChunk: string, tag: string) {
  const rx = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xmlChunk.match(rx);
  return m ? m[1].trim() : undefined;
}

function stripHtml(s?: string) {
  if (!s) return "";
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

async function fetchLatestFromRSS(): Promise<RssItem | null> {
  const res = await fetch("https://feeds.megaphone.fm/100heavymetal", {
    cache: "no-store",
    headers: { "user-agent": "Mozilla/5.0" },
  });
  if (!res.ok) return null;
  const xml = await res.text();

  const item = xml.match(/<item[\s\S]*?<\/item>/i)?.[0];
  if (!item) return null;

  const title = parseTag(item, "title") || "New Episode";
  const link =
    parseTag(item, "link") ||
    item.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1]?.trim() ||
    "https://feeds.megaphone.fm/100heavymetal";
  const pubDate = parseTag(item, "pubDate");
  const itunesImage = item.match(/<itunes:image[^>]*href="([^"]+)"/i)?.[1];
  const description =
    parseTag(item, "content:encoded") ||
    parseTag(item, "description") ||
    "";

  return {
    title,
    link,
    pubDate,
    description: stripHtml(description),
    image: itunesImage,
  };
}

function toDate(s?: string | null) {
  if (!s) return undefined;
  const t = Date.parse(s);
  return Number.isNaN(t) ? undefined : new Date(t);
}

/* ---------------- RSS Latest Card ---------------- */
function RssLatestCard({ item }: { item: RssItem }) {
  const date = toDate(item.pubDate);
  const dateStr = date
    ? date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <section className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-zinc-900/40 to-zinc-900/20 p-5 md:p-6 shadow-[0_0_24px_rgba(239,68,68,0.25)]">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-200 ring-1 ring-red-500/30">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        Latest Episode
      </div>

      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-1">
            {item.title}
          </h2>
          {dateStr ? (
            <div className="text-xs text-zinc-400 mb-3">{dateStr}</div>
          ) : null}
          {item.description ? (
            <p className="text-sm text-zinc-300 mb-4 line-clamp-4">
              {item.description}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.45)] focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:ring-offset-2 focus:ring-offset-black"
            >
              Listen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@100MetalSongs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
            >
              Watch
            </a>
          </div>
        </div>

        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="hidden md:block h-28 w-28 flex-none rounded-xl object-cover ring-1 ring-red-500/50 shadow-[0_0_22px_rgba(239,68,68,0.35)]"
          />
        ) : null}
      </div>
    </section>
  );
}

/* ----------------------------- Page ----------------------------- */
export default async function Page() {
  const [episodes, rssLatest] = await Promise.all([
    client.fetch(gridQuery),
    fetchLatestFromRSS(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 space-y-10">
      {/* Show Intro */}
      <ShowIntroPanel />

      {/* RSS: always display the latest episode */}
      {rssLatest ? <RssLatestCard item={rssLatest} /> : null}

      {/* CTA — email signup */}
      <EmailSignup
        className="mt-8 md:mt-10"
        heading="Join the community"
        subtext="Get new episodes, behind-the-scenes updates, and exclusive metal stories!"
      />

      {/* Episodes grid (Sanity) */}
      <section className="mt-2">
        <h2 className="text-sm font-medium text-zinc-300 mb-4">Recent Episodes</h2>
        {Array.isArray(episodes) && episodes.length > 0 ? (
          <EpisodesGridClean episodes={episodes} />
        ) : null}

        {/* More Episodes button */}
        <div className="mt-6 flex justify-center">
          <a
            href="/episodes"
            className="inline-flex items-center gap-2 rounded-full
                      bg-red-600/90 px-5 py-2.5 text-sm font-medium text-white
                      shadow-[0_0_15px_rgba(239,68,68,0.35)]
                      transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.45)]
                      focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:ring-offset-2 focus:ring-offset-black"
          >
            More Episodes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
