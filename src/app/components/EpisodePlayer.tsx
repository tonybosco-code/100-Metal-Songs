// src/app/episode/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/image";
import EpisodePlayer from "@/app/components/EpisodePlayer";
import type { Metadata } from "next";

type SanityImage = {
  asset?: { _ref?: string; _id?: string; url?: string };
  [key: string]: any;
};
type Episode = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  duration?: number;
  coverImage?: SanityImage | null;
  description?: any;
  audioUrl?: string | null; // <- ensure this exists in Sanity, or adjust to your field name
};

const EPISODE_QUERY = defineQuery(`
  *[_type=="episode" && slug.current==$slug][0]{
    _id, title, "slug": slug{current}, publishedAt, duration,
    coverImage, description, audioUrl
  }
`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ep = (await sanityClient.fetch(EPISODE_QUERY, { slug })) as Episode | null;
  const title = ep?.title ? `${ep.title} · 100 Metal Songs` : "Episode · 100 Metal Songs";
  const desc =
    typeof ep?.description === "string"
      ? ep.description
      : "Listen to this episode of 100 Songs That Define Heavy Metal.";
  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
    twitter: { title, description: desc },
  };
}

function toPlainText(value: Episode["description"]) {
  if (!value) return "";
  if (typeof value === "string") return value;
  try {
    return value
      .map((block: any) =>
        block?._type === "block"
          ? (block.children || [])
              .map((span: any) => (typeof span?.text === "string" ? span.text : ""))
              .join("")
          : ""
      )
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

function fmtDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

function fmtDuration(totalSec?: number) {
  if (!totalSec || totalSec <= 0) return "0:00";
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.floor(totalSec % 60);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const ep = (await sanityClient.fetch(EPISODE_QUERY, {
    slug,
  })) as Episode | null;

  if (!ep) {
    return (
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-16 text-zinc-300">
        <h1 className="text-2xl font-semibold mb-4">Episode not found</h1>
        <Link href="/episodes" className="text-red-400 hover:text-red-300">
          Back to Episodes
        </Link>
      </div>
    );
  }

  const cover =
    ep.coverImage &&
    urlFor(ep.coverImage).width(800).height(800).fit("crop").url();

  const desc = toPlainText(ep.description);
  const when = fmtDate(ep.publishedAt);
  const dur = fmtDuration(ep.duration);

  // We’ll include a Play button that triggers the in-page player via hash
  const playerAnchor = "#play";
  const hasLocalPlayback = Boolean(ep.audioUrl);

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          Home
        </Link>
        <span className="mx-2 text-zinc-700">›</span>
        <Link href="/episodes" className="hover:text-zinc-300">
          Episodes
        </Link>
        <span className="mx-2 text-zinc-700">›</span>
        <span className="text-zinc-300">{ep.title}</span>
      </nav>

      {/* Card */}
      <div className="rounded-3xl border border-zinc-900 bg-zinc-950/70 p-6 sm:p-7">
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8">
          {/* Cover */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950">
            {cover ? (
              <Image
                src={cover}
                alt={ep.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-zinc-700">
                No Image
              </div>
            )}
          </div>

          {/* Meta + Actions */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
              {ep.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
              {when && <span>{when}</span>}
              {when && dur && <span className="h-1 w-1 rounded-full bg-zinc-700" />}
              {dur && <span>{dur}</span>}
            </div>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-3">
              {hasLocalPlayback ? (
                // This is a simple anchor to the player, which will auto-scroll and play
                <a
                  href={playerAnchor}
                  onClick={(e) => {
                    // let the anchor scroll; EpisodePlayer will auto-play on click from its toggle anyway
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-white" />
                  Play Episode
                </a>
              ) : ep.audioUrl ? (
                // Fallback external link (should be rare if you have local URLs)
                <a
                  href={ep.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-white" />
                  Play on platform
                </a>
              ) : null}

              <Link
                href="/episodes"
                className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                Back to Episodes
              </Link>
            </div>

            {/* Description */}
            {desc && (
              <p className="mt-5 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
                {desc}
              </p>
            )}
          </div>
        </div>

        {/* Player */}
        {ep.audioUrl && (
          <div className="mt-8" id="play">
            <EpisodePlayer src={ep.audioUrl} title={ep.title} autoScrollId="play" />
          </div>
        )}
      </div>
    </div>
  );
}
