import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { playLink } from "@/app/lib/playLink";
import { videoLink } from "@/app/lib/videoLink";

type Item = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string | null;
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

function twoSentences(text?: string | null) {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  const parts = cleaned.split(/(?<=[.!?])\s+/);
  return parts.slice(0, 2).join(" ");
}
function formatDate(d?: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(+dt)) return "";
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function formatDuration(secLike?: number | string | null) {
  if (secLike == null) return "–";
  const s = typeof secLike === "string" ? parseInt(secLike, 10) : secLike;
  if (!Number.isFinite(s) || s < 0) return "–";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = Math.floor(s % 60);
  return h ? `${h}h ${m}m` : `${m}m ${r}s`;
}

/** Deep YouTube finder (same as Hero) */
const ytRx =
  /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^ \n\r\t"]*v=[\w\-]+[^ \n\r\t"]*|youtu\.be\/[\w\-]+[^ \n\r\t"]*))/i;
function findYouTubeUrlDeep(v: any, depth = 0): string | null {
  if (depth > 5 || v == null) return null;
  if (typeof v === "string") {
    const m = v.match(ytRx);
    return m ? m[0] : null;
  }
  if (Array.isArray(v)) {
    for (const x of v) {
      const r = findYouTubeUrlDeep(x, depth + 1);
      if (r) return r;
    }
    return null;
  }
  if (typeof v === "object") {
    for (const k of Object.keys(v)) {
      const r = findYouTubeUrlDeep(v[k], depth + 1);
      if (r) return r;
    }
  }
  return null;
}

export default function EpisodesGrid({ items }: { items: Item[] }) {
  const list = (items || []).slice(0, 8);

  return (
    <section className="mt-10">
      <h2 className="sr-only">Recent Episodes</h2>
      <div className={clsx("grid gap-6", "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>
        {list.map((e) => {
          const href = `/episode/${e.slug}`;
          const title = e.title ?? "Episode";
          const date = formatDate(e.publishedAt);
          const duration = e.durationSeconds ?? e.duration ?? null;
          const imgUrl = e.coverImage?.asset?.url || DEFAULT_ART;

          const rawDesc =
            e.descriptionPlain ||
            (typeof e.description === "string" ? (e.description as string) : "") ||
            e.excerpt ||
            e.summary ||
            "";
          const desc = twoSentences(rawDesc);

          // Listen
          const playObj = playLink(e.links ?? null);
          const playHref =
            playObj?.href ??
            e.links?.spotify ??
            e.links?.apple ??
            e.audioUrl ??
            e.links?.rss ??
            null;

          // WATCH (robust): scan links, then the whole item, then helper fallback
          const videoObj = videoLink(title, e.links ?? null);
          const watchHref =
            findYouTubeUrlDeep(e.links) ??
            findYouTubeUrlDeep(e) ??
            videoObj?.href ??
            null;

          return (
            <article
              key={e._id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-zinc-900/40 ring-1 ring-white/10 shadow-lg transition hover:ring-white/20"
            >
              <Link href={href} className="block relative aspect-[1/1] bg-zinc-900">
                <Image
                  src={imgUrl}
                  alt={`${title} cover art`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4 md:p-5">
                <Link href={href} className="block">
                  <h3 className="text-base md:text-lg font-semibold text-zinc-100 line-clamp-2">
                    {title}
                  </h3>
                </Link>

                {(date || duration) && (
                  <p className="mt-1 text-xs text-zinc-400">
                    <span>{date}</span>
                    {date && duration ? <span> • </span> : null}
                    <span>{formatDuration(duration)}</span>
                  </p>
                )}

                {desc && <p className="mt-2 text-sm text-zinc-300">{desc}</p>}

                {/* Footer: buttons only */}
                <div className="mt-auto pt-4 flex items-center gap-2 justify-end">
                  {playHref && (
                    <a
                      href={playHref}
                      className="inline-flex items-center rounded-full bg-red-600 hover:bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      Listen
                    </a>
                  )}
                  {watchHref && (
                    <a
                      href={watchHref}
                      className="inline-flex items-center rounded-full bg-neutral-800/80 hover:bg-neutral-700 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/10"
                    >
                      Watch
                    </a>
                  )}
                  <Link
                    href={href}
                    className="inline-flex items-center rounded-full bg-neutral-800/60 hover:bg-neutral-700 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
