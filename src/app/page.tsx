// src/app/page.tsx
export const revalidate = 300; // re-fetch server data (including the RSS) every 5 minutes

import { createClient } from "@sanity/client";
import HeroLatest from "@/app/components/HeroLatest";
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

const DATE_KEY = "coalesce(publishedAt, pubDate, _createdAt)";

const heroQuery = `
*[_type == "episode"]
| order(${DATE_KEY} desc)[0]{
  ${episodeFields}
}
`;

const gridQuery = `
*[_type == "episode"]
| order(${DATE_KEY} desc)[1...9]{
  ${episodeFields}
}
`;

/* -----------------------------------------------------------
   Tiny RSS parser (no deps) for Megaphone feed
----------------------------------------------------------- */
type RssItem = {
  title: string;
  link: string;
  pubDate?: string;
  image?: string;
};

async function getLatestFromRSS(): Promise<RssItem | null> {
  const res = await fetch("https://feeds.megaphone.fm/100heavymetal", {
    // make sure this is not cached longer than our page revalidate
    next: { revalidate: 300 },
    headers: { "user-agent": "Mozilla/5.0" },
  });
  if (!res.ok) return null;
  const xml = await res.text();

  // grab the first <item>...</item>
  const itemMatch = xml.match(/<item[\s\S]*?<\/item>/i);
  if (!itemMatch) return null;
  const item = itemMatch[0];

  const pick = (tag: string) => {
    const m = item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
    return m ? m[1].trim() : undefined;
  };

  const linkMatch =
    item.match(/<link>([\s\S]*?)<\/link>/i)?.[1].trim() ||
    item.match(/<guid.*?>([\s\S]*?)<\/guid>/i)?.[1].trim();

  // itunes:image href="..."
  const imgMatch = item.match(
    /<itunes:image[^>]*href="([^"]+)"[^>]*\/?>/i
  )?.[1];

  return {
    title: pick("title") || "New Episode",
    link: linkMatch || "https://feeds.megaphone.fm/100heavymetal",
    pubDate: pick("pubDate"),
    image: imgMatch,
  };
}

/* -----------------------------------------------------------
   New Episode Banner — shows if RSS has something newer
   than the current Sanity hero (or always shows within 7 days)
----------------------------------------------------------- */
function formatDate(d?: string) {
  if (!d) return null;
  const t = Date.parse(d);
  if (Number.isNaN(t)) return null;
  return new Date(t);
}

function isRecent(date?: Date, days = 7) {
  if (!date) return false;
  const ms = days * 24 * 60 * 60 * 1000;
  return Date.now() - date.getTime() < ms;
}

async function NewEpisodeBanner({
  sanityLatestDateISO,
}: {
  sanityLatestDateISO?: string | null;
}) {
  const rss = await getLatestFromRSS();
  if (!rss) return null;

  const rssDate = formatDate(rss.pubDate);
  const sanityDate = sanityLatestDateISO ? new Date(sanityLatestDateISO) : undefined;

  const rssIsNewer =
    rssDate && sanityDate ? rssDate.getTime() > sanityDate.getTime() : true;

  // Show banner if RSS is newer OR the episode is within the last 7 days
  if (!(rssIsNewer || isRecent(rssDate, 7))) return null;

  return (
    <a
      href={rss.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-emerald-400/30 bg-emerald-500/10 
                 px-4 py-3 text-sm text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.25)]
                 hover:bg-emerald-500/15 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]
                 transition-all"
    >
      <div className="flex items-center gap-3">
        {/* optional thumbnail if present */}
        {rss.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={rss.image}
            alt=""
            className="h-8 w-8 rounded-md object-cover ring-1 ring-emerald-400/40"
          />
        ) : null}
        <div className="flex-1">
          <span className="font-medium">New episode is live:</span>{" "}
          <span className="opacity-90">{rss.title}</span>
        </div>
        <span className="text-emerald-300 text-xs hidden md:inline">Listen now →</span>
      </div>
    </a>
  );
}

/* ----------------------------- Page ----------------------------- */
export default async function Page() {
  const [hero, episodes] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(gridQuery),
  ]);

  // pick the date field from Sanity hero to compare with RSS
  const sanityLatestDateISO =
    (hero?.publishedAt || hero?.pubDate || hero?._createdAt) ?? null;

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 space-y-10">
      {/* Show Intro */}
      <ShowIntroPanel />

      {/* New Episode (from RSS) */}
      {/* This makes the newest Megaphone episode visible immediately */}
      {<NewEpisodeBanner sanityLatestDateISO={sanityLatestDateISO} />}

      {/* Latest Episode (from Sanity, as before) */}
      {hero ? <HeroLatest ep={hero} /> : null}

      {/* CTA — email signup */}
      <EmailSignup
        className="mt-8 md:mt-10"
        heading="Join the community"
        subtext="Get new episodes, behind-the-scenes updates, and exclusive metal stories!"
      />

      {/* Episodes grid */}
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
