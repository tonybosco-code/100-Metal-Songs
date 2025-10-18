// src/app/episodes/page.tsx
import Link from "next/link";
import { createClient } from "@sanity/client";
import clsx from "clsx";

// ---- Sanity client (read-only)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
});

// ---- Fields we need for list
const episodeFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt, pubDate, _createdAt,
  "durationSeconds": coalesce(durationSeconds, duration),
  descriptionPlain, description, excerpt, summary
`;

// canonical date key for ordering
const DATE_KEY = "coalesce(publishedAt, pubDate, _createdAt)";

// all episodes, newest first
const episodesQuery = `
*[_type == "episode"]
| order(${DATE_KEY} desc){
  ${episodeFields}
}
`;

// ---- utils
function timeAgo(input?: string | null) {
  if (!input) return "";
  const ts = new Date(input).getTime();
  if (isNaN(ts)) return "";
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  const y = Math.floor(mo / 12);
  return `${y}y ago`;
}

function canonicalDate(ep: any) {
  return ep?.publishedAt ?? ep?.pubDate ?? ep?._createdAt ?? null;
}

function durationText(v?: number | string | null) {
  if (v == null) return "";
  const s = typeof v === "string" ? parseInt(v, 10) : v;
  if (!Number.isFinite(s) || s < 0) return "";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h} hr ${m} min`;
  return `${m} min`;
}

function plain2Lines(ep: any) {
  const src =
    ep?.descriptionPlain ??
    (Array.isArray(ep?.description)
      ? ep.description
          .map((b: any) =>
            (Array.isArray(b?.children) ? b.children.map((c: any) => c?.text ?? "").join("") : "") as string,
          )
          .join(" ")
      : ep?.description ?? "") ??
    ep?.excerpt ??
    ep?.summary ??
    "";
  return String(src).replace(/\s+/g, " ").trim();
}

export default async function EpisodesPage() {
  const episodes = await client.fetch(episodesQuery);

  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-xl md:text-2xl font-semibold text-white mb-6">Episodes</h1>

      <ul
        className={clsx(
          "rounded-2xl ring-1 ring-white/10 bg-zinc-900/30",
          "divide-y divide-white/10"
        )}
      >
        {episodes?.map((ep: any) => {
          const when = canonicalDate(ep);
          const rel = timeAgo(when);
          const dur = durationText(ep?.durationSeconds);
          const desc = plain2Lines(ep);

          return (
            <li key={ep._id}>
              <Link
                href={`/episode/${ep.slug}`}
                className={clsx(
                  "block px-4 md:px-6 py-4 md:py-5 transition-colors",
                  "hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Left: date + text */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] md:text-xs uppercase tracking-wide text-zinc-400">
                      {rel || (when ? new Date(when).toLocaleDateString() : "")}
                    </div>
                    <h2 className="mt-1 text-sm md:text-base font-semibold text-white">
                      {ep.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-300 line-clamp-2">
                      {desc}
                    </p>
                  </div>

                  {/* Right: duration */}
                  <div className="pl-3 pt-1 shrink-0">
                    <div className="text-xs md:text-sm text-zinc-400 whitespace-nowrap">
                      {dur}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
