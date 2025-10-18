// src/app/episode/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import groq from "groq";
import { createClient } from "@sanity/client";

import RelatedEpisodes from "@/app/components/RelatedEpisodes";
import SafePortable from "@/app/components/SafePortable";
import EpisodeActions from "@/app/components/EpisodeActions";

/* ---------------- Sanity client (read-only) ---------------- */
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
});

/* ---------------- Types ---------------- */
type EpisodeDoc = {
  _id: string;
  title: string;
  slug?: { current?: string | null } | null;
  publishedAt?: string | null;
  pubDate?: string | null;
  _createdAt?: string | null;
  durationSeconds?: number | null;
  duration?: number | string | null;
  description?: unknown;
  descriptionPlain?: string | null;
  excerpt?: string | null;
  summary?: string | null;
  coverImage?: { asset?: { url?: string | null } | null } | null;
  audioUrl?: string | null;
  links?: Record<string, any> | null;
};

const DEFAULT_ART =
  "https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif";

/* ---------------- Helpers ---------------- */
function plainFromPortable(input: unknown): string {
  try {
    if (typeof input === "string") return input;
    if (Array.isArray(input)) {
      const parts: string[] = [];
      for (const block of input as any[]) {
        if (block && typeof block === "object" && Array.isArray((block as any).children)) {
          const text = (block as any).children.map((c: any) => c?.text ?? "").join("");
          if (text.trim()) parts.push(text.trim());
        }
      }
      return parts.join("\n");
    }
    return "";
  } catch {
    return "";
  }
}

function formatDate(ep: EpisodeDoc) {
  const raw = ep.publishedAt ?? ep.pubDate ?? ep._createdAt ?? null;
  if (!raw) return null;
  const dt = new Date(raw);
  if (isNaN(+dt)) return null;
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatDuration(secLike?: number | string | null) {
  if (secLike == null) return null;
  const s = typeof secLike === "string" ? parseInt(secLike, 10) : secLike;
  if (!Number.isFinite(s) || s < 0) return null;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = Math.floor(s % 60);
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${m}:${String(r).padStart(2, "0")}`;
}

// Extract the artist from a title like: Artist - "Song"
function extractArtist(title?: string | null) {
  if (!title) return null;
  const dash = title.indexOf(" - ");
  if (dash > 0) return title.slice(0, dash).trim();
  const first = title.split(/\s+/)[0];
  return first?.trim() || null;
}

/* ---------------- GROQ queries ---------------- */
const EPISODE_QUERY = groq`*[_type == "episode" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt, pubDate, _createdAt,
  durationSeconds, duration,
  description, descriptionPlain, excerpt, summary,
  coverImage{ asset->{ url } },
  audioUrl,
  links
}`;

const RELATED_QUERY = groq`
  *[_type == "episode" && _id != $id && title match $artist] 
    | order(publishedAt desc)[0...4]{
      _id, title, slug, coverImage{ asset->{ url } }, publishedAt
    }
`;

/* ---------------- Page ---------------- */
export default async function EpisodePage({ params }: { params: { slug: string } }) {
  const ep = (await client.fetch(EPISODE_QUERY, { slug: params.slug })) as EpisodeDoc | null;
  if (!ep) return notFound();

  const title = ep.title || "Episode";
  const art = ep.coverImage?.asset?.url || DEFAULT_ART;
  const metaDate = formatDate(ep);
  const metaDur = formatDuration(ep.durationSeconds ?? ep.duration ?? null);

  const plain =
    ep.descriptionPlain ||
    plainFromPortable(ep.description) ||
    ep.excerpt ||
    ep.summary ||
    "";

  // Related episodes
  const artist = extractArtist(ep?.title ?? null);
  let related: any[] = [];
  if (artist) {
    related = await client.fetch(RELATED_QUERY, {
      id: ep._id,
      artist: `${artist}*`,
    });
  }

  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <header className="flex items-start gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">{title}</h1>
          {(metaDate || metaDur) && (
            <p className="mt-1 text-sm text-zinc-400">
              {[metaDate, metaDur].filter(Boolean).join(" • ")}
            </p>
          )}

          {/* Actions under header */}
          <div className="mt-3">
            <EpisodeActions
              title={ep.title}
              links={ep.links ?? null}
              audioUrl={ep.audioUrl ?? null}
            />
          </div>
        </div>

        <div className="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-xl ring-1 ring-white/10">
          <Image
            src={art}
            alt={`${title} cover art`}
            fill
            className="object-cover"
            sizes="128px"
            priority={false}
          />
        </div>
      </header>

      {/* Description / Body */}
      <article className="prose prose-invert max-w-none">
        {Array.isArray(ep.description) ? (
          <SafePortable value={ep.description} />
        ) : (
          <p className="text-zinc-300">{plain}</p>
        )}
      </article>

      {/* Similar Episodes — exactly once, below description */}
      {related?.length ? (
        <div className="mt-8">
          <RelatedEpisodes items={related} />
        </div>
      ) : null}
    </main>
  );
}
