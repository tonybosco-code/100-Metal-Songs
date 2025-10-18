// src/app/components/HeroLatest.tsx
import Image from "next/image";
import Link from "next/link";
import ActionButtons from "@/app/components/ActionButtons";
import { playLink } from "@/app/lib/playLink";
import { videoLink } from "@/app/lib/videoLink";

/** Types kept loose on purpose (to tolerate different shapes) */
type Ep = {
  _id: string;
  title: string;
  slug?: string | null;
  durationSeconds?: number | null;
  duration?: number | string | null;
  descriptionPlain?: string | null;
  description?: unknown; // Portable Text or string
  excerpt?: string | null;
  summary?: string | null;
  publishedAt?: string | null;
  pubDate?: string | null;
  _createdAt?: string | null;
  coverImage?: { asset?: { url?: string | null } | null } | null;
  audioUrl?: string | null;
  links?: Record<string, any> | null;
  [k: string]: any;
};

const DEFAULT_ART =
  "https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif";

/* ---------------- helpers ---------------- */

function fmtDate(ep: Ep) {
  const raw = ep.publishedAt ?? ep.pubDate ?? ep._createdAt ?? null;
  if (!raw) return null;
  const dt = new Date(raw);
  if (isNaN(+dt)) return null;
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function fmtDur(v?: number | string | null) {
  if (v == null) return null;
  const s = typeof v === "string" ? parseInt(v, 10) : v;
  if (!Number.isFinite(s)) return null;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = Math.floor(s % 60);
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${m}:${String(r).padStart(2, "0")}`;
}

/** Convert Sanity Portable Text (or other shapes) to plain text */
function portableTextToPlain(input: unknown): string {
  try {
    if (typeof input === "string") return input;
    if (Array.isArray(input)) {
      // array of blocks
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

/** Trim to 1–2 sentences */
function twoSentences(text?: string | null) {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  const parts = cleaned.split(/(?<=[.!?])\s+/);
  return parts.slice(0, 2).join(" ");
}

/** Deep scan for any YouTube URL anywhere on the object or text */
const YT =
  /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^ \n\r\t"]*v=[\w\-]+[^ \n\r\t"]*|youtu\.be\/[\w\-]+[^ \n\r\t"]*))/i;
function findYouTubeDeep(v: any, d = 0): string | null {
  if (d > 6 || v == null) return null;
  if (typeof v === "string") return v.match(YT)?.[0] ?? null;
  if (Array.isArray(v)) { for (const x of v) { const r = findYouTubeDeep(x, d + 1); if (r) return r; } return null; }
  if (typeof v === "object") { for (const k of Object.keys(v)) { const r = findYouTubeDeep(v[k], d + 1); if (r) return r; } }
  return null;
}

/* ---------------- component ---------------- */

export default function HeroLatest({ ep }: { ep: Ep }) {
  const title = ep?.title ?? "Latest Episode";
  const readHref = ep?.slug ? `/episode/${ep.slug}` : null;
  const date = fmtDate(ep);
  const time = fmtDur(ep.durationSeconds ?? ep.duration ?? null);
  const img = ep?.coverImage?.asset?.url || DEFAULT_ART;

  const plain =
    ep?.descriptionPlain ||
    portableTextToPlain(ep?.description) ||
    ep?.excerpt ||
    ep?.summary ||
    "";

  const desc = twoSentences(plain);

  const watchHref =
    ep?.links?.youtube ??
    findYouTubeDeep(ep?.links) ??
    findYouTubeDeep(plain) ??
    findYouTubeDeep(ep) ??
    null;

  const listenHref =
    ep?.audioUrl ??
    ep?.links?.spotify ??
    ep?.links?.apple ??
    ep?.links?.rss ??
    null;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-b from-zinc-900/70 to-zinc-900/20 p-5 md:p-6">
      {/* red halo */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.20),transparent_60%)]" />

      <div className="relative grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        {/* text */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex">
            <span className="inline-flex h-6 items-center rounded-full bg-red-500/10 px-3 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/25">
              • Latest Episode
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-semibold text-white">{title}</h1>

          {(date || time) && (
            <div className="text-xs md:text-sm text-zinc-400">
              {[date, time].filter(Boolean).join(" • ")}
            </div>
          )}

          {desc && (
            <p className="text-sm text-zinc-300 leading-relaxed">{desc}</p>
          )}

          {/* Buttons: Read more → Watch → Listen */}
<ActionButtons
  readHref={readHref}
  watchHref={watchHref}
  listenHref={listenHref}
  align="start"
  className="mt-1"
/>
        </div>

        {/* art: +25% from your previous compact size */}
        <div className="justify-self-end">
          <div className="relative h-40 w-40 md:h-48 md:w-48 overflow-hidden rounded-xl ring-1 ring-white/10">
            <Image
              src={img}
              alt={`${title} cover art`}
              fill
              sizes="(min-width:768px) 192px, 160px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
