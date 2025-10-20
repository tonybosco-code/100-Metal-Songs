// src/app/components/HeroLatest.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

/** ---------- Local types (kept minimal to make this file drop-in) ---------- */
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

/** ------------------------ Small helpers ------------------------ */
function formatDate(ep: EpisodeDoc) {
  const raw = ep.publishedAt ?? ep.pubDate ?? ep._createdAt ?? null;
  if (!raw) return null;
  const dt = new Date(raw);
  if (Number.isNaN(+dt)) return null;
  return dt.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(secLike?: number | string | null) {
  if (secLike == null) return null;
  const s = typeof secLike === "string" ? parseInt(secLike, 10) : secLike;
  if (!Number.isFinite(s) || s < 0) return null;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = Math.floor(s % 60);
  return h
    ? `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`
    : `${m}:${String(r).padStart(2, "0")}`;
}

function plainFromPortable(input: unknown): string {
  try {
    if (typeof input === "string") return input;
    if (Array.isArray(input)) {
      const parts: string[] = [];
      for (const block of input as any[]) {
        if (
          block &&
          typeof block === "object" &&
          Array.isArray((block as any).children)
        ) {
          const text = (block as any).children
            .map((c: any) => c?.text ?? "")
            .join("");
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

/** Get best listen/watch links */
function getListenHref(ep: EpisodeDoc) {
  return (
    ep.audioUrl ??
    ep.links?.spotify ??
    ep.links?.apple ??
    ep.links?.rss ??
    null
  );
}
function getWatchHref(ep: EpisodeDoc) {
  return ep.links?.youtube ?? null;
}

/** ----------------------------- Component ----------------------------- */
export default function HeroLatest({ ep }: { ep: EpisodeDoc }) {
  if (!ep) return null;

  const title = ep.title || "Latest Episode";
  const date = formatDate(ep);
  const dur = formatDuration(ep.durationSeconds ?? ep.duration ?? null);

  const art =
    ep.coverImage?.asset?.url ||
    "https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif";

  const readHref = ep.slug?.current ? `/episode/${ep.slug.current}` : null;
  const watchHref = getWatchHref(ep);
  const listenHref = getListenHref(ep);

  const plain =
    ep.descriptionPlain ||
    plainFromPortable(ep.description) ||
    ep.excerpt ||
    ep.summary ||
    "";

  return (
    <section
      aria-label="Latest Episode"
      className="relative"
    >
      <div
        className="
          relative rounded-2xl border border-white/10 
          bg-gradient-to-br from-red-900/20 via-zinc-900/20 to-black 
          ring-1 ring-white/5 shadow-md
          p-5 md:p-7 lg:p-8
        "
      >
        {/* Badge */}
        <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300 ring-1 ring-red-500/30">
          • Latest Episode
        </span>

        {/* Title, Meta, Copy */}
        <div className="mt-3 pr-0 sm:pr-36 md:pr-40 lg:pr-44">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {title}
          </h1>

          {(date || dur) && (
            <p className="mt-2 text-sm text-zinc-400">
              {[date, dur].filter(Boolean).join(" • ")}
            </p>
          )}

          {/* Description */}
          {plain ? (
            <p className="mt-4 text-zinc-300 line-clamp-6">{plain}</p>
          ) : null}

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {readHref && (
              <Link
                href={readHref}
                className="inline-flex items-center rounded-full bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition"
              >
                Read more
              </Link>
            )}

            {watchHref && (
              <a
                href={watchHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-zinc-800/80 hover:bg-zinc-700 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition"
              >
                {/* mini TV icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M4 6h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm2 11h12v2H6v-2Z"
                  />
                </svg>
                Watch
              </a>
            )}

            {listenHref && (
              <a
                href={listenHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-medium text-white transition"
              >
                {/* headphones icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 3a7 7 0 0 0-7 7v6a2 2 0 0 0 2 2h1v-6H7a5 5 0 0 1 10 0h-1v6h1a2 2 0 0 0 2-2v-6a7 7 0 0 0-7-7Z"
                  />
                </svg>
                Listen
              </a>
            )}
          </div>
        </div>

        {/* Cover art — pinned top-right on small+ screens */}
        <div className="hidden sm:block absolute right-4 top-4">
          <div className="relative h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 overflow-hidden rounded-xl ring-1 ring-white/10">
            <Image
              src={art}
              alt={`${title} cover art`}
              fill
              sizes="(max-width: 768px) 96px, 128px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        {/* Mobile art (kept at bottom for XS screens to avoid crowding) */}
        <div className="sm:hidden mt-5 flex justify-end">
          <div className="relative h-28 w-28 overflow-hidden rounded-xl ring-1 ring-white/10">
            <Image
              src={art}
              alt={`${title} cover art`}
              fill
              sizes="112px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
