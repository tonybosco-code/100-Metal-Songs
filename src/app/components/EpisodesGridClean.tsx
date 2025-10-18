// src/app/components/EpisodesGridClean.tsx
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import ActionButtons from "@/app/components/ActionButtons";

type Card = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string | null;
  pubDate?: string | null;
  _createdAt?: string | null;
  durationSeconds?: number | null;
  duration?: number | string | null;
  descriptionPlain?: string | null;
  description?: unknown;
  excerpt?: string | null;
  summary?: string | null;
  coverImage?: { asset?: { url?: string | null } | null } | null;
  audioUrl?: string | null;
  links?: Record<string, any> | null;
  [k: string]: any;
};

const DEFAULT_ART =
  "https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif";

/* -------- helpers -------- */
function dateText(ep: Card) {
  const raw = ep.publishedAt ?? ep.pubDate ?? ep._createdAt ?? null;
  if (!raw) return "";
  const dt = new Date(raw);
  if (isNaN(+dt)) return "";
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function durText(v?: number | string | null) {
  if (v == null) return "–";
  const s = typeof v === "string" ? parseInt(v, 10) : v;
  if (!Number.isFinite(s) || s < 0) return "–";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = Math.floor(s % 60);
  return h ? `${h}h ${m}m` : `${m}m ${r}s`;
}
function ptToPlain(input: unknown): string {
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
function twoSentences(s: string) {
  const cleaned = s.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const parts = cleaned.split(/(?<=[.!?])\s+/);
  return parts.slice(0, 2).join(" ");
}
const YT =
  /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^ \n\r\t"]*v=[\w\-]+[^ \n\r\t"]*|youtu\.be\/[\w\-]+[^ \n\r\t"]*))/i;
function findYouTubeDeep(v: any, d = 0): string | null {
  if (d > 6 || v == null) return null;
  if (typeof v === "string") return v.match(YT)?.[0] ?? null;
  if (Array.isArray(v)) { for (const x of v) { const r = findYouTubeDeep(x, d + 1); if (r) return r; } return null; }
  if (typeof v === "object") { for (const k of Object.keys(v)) { const r = findYouTubeDeep(v[k], d + 1); if (r) return r; } }
  return null;
}

/* -------- component -------- */
export default function EpisodesGridClean({ episodes }: { episodes: Card[] }) {
  const items = (episodes || []).slice(0, 8);

  return (
    <div
      className={clsx(
        "grid gap-6",
        // compact cards: 4 columns on lg+
        "sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
      )}
    >
      {items.map((ep) => {
        const href = `/episode/${ep.slug}`;
        const date = dateText(ep);
        const dur = durText(ep.durationSeconds ?? ep.duration ?? null);

        const plain =
          ep.descriptionPlain ||
          ptToPlain(ep.description) ||
          ep.excerpt ||
          ep.summary ||
          "";
        const desc = twoSentences(plain);

        const imgUrl = ep.coverImage?.asset?.url || DEFAULT_ART;

        // listen/watch targets
        const listenHref =
          ep.audioUrl ??
          ep.links?.spotify ??
          ep.links?.apple ??
          ep.links?.rss ??
          null;

        const watchHref =
          ep.links?.youtube ??
          findYouTubeDeep(ep.links) ??
          findYouTubeDeep(plain) ??
          findYouTubeDeep(ep) ??
          null;

        return (
          <article
            key={ep._id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-zinc-900/40 ring-1 ring-white/10 shadow-lg transition hover:ring-white/20"
          >
            <Link href={href} className="block relative aspect-[1/1] bg-zinc-900">
              <Image
                src={imgUrl}
                alt={`${ep.title} cover art`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 25vw"
                priority={false}
              />
            </Link>

            <div className="flex flex-1 flex-col p-3 md:p-4">
              <Link href={href} className="block">
                <h3 className="text-sm md:text-base font-semibold text-zinc-100 line-clamp-2">
                  {ep.title}
                </h3>
              </Link>

              {(date || dur) && (
                <p className="mt-1 text-[11px] md:text-xs text-zinc-400">
                  <span>{date}</span>
                  {date && dur ? <span> • </span> : null}
                  <span>{dur}</span>
                </p>
              )}

              {/* description always shown (1–2 sentences) */}
              {desc && (
                <p className="mt-2 text-sm text-zinc-300 line-clamp-3">{desc}</p>
              )}

{/* Row 1: centered Read more */}
<ActionButtons
  readHref={href}
  align="center"
  className="pt-3"
/>

{/* Row 2: centered Watch + Listen */}
<ActionButtons
  watchHref={watchHref}
  listenHref={listenHref}
  align="center"
  className="-mt-1"
/>
            </div>
          </article>
        );
      })}
    </div>
  );
}
