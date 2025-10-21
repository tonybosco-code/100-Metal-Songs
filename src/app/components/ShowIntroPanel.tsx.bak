"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

/* ---------------- platform links ---------------- */
const LINKS = {
  apple:
    "https://podcasts.apple.com/us/podcast/100-songs-that-define-heavy-metal/id1778316009",
  spotify: "https://open.spotify.com/show/1rlYj3c5mpMMUPpNsPJDoD",
  iheart:
    "https://www.iheart.com/podcast/269-100-songs-that-define-heav-235613902/",
  ytmusic:
    "https://music.youtube.com/library/podcasts?addrssfeed=https://feeds.megaphone.fm/100heavymetal.xml",
  amazon:
    "https://music.amazon.com/podcasts/3209bf1b-715a-4731-9b47-0db64fa11feb/100-songs-that-define-heavy-metal",
  pocket:
    "https://pocketcasts.com/podcast/100-songs-that-define-heavy-metal/e2f164f0-87e7-013d-2105-0affe5d1842d",
  overcast: "https://overcast.fm/itunes1778316009",
  youtube: "https://www.youtube.com/@100MetalSongs",
};

export default function ShowIntroPanel() {
  return (
    <section
      className={clsx(
        "relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950/60",
        "px-4 md:px-6 lg:px-8 py-5 md:py-8"
      )}
    >
{/* MOBILE BRAND BANNER — mobile only */}
<div className="block md:hidden mb-4">
  <img
    src="/logo-masthead.webp?v=3"
    alt="100 Songs That Define Heavy Metal"
    className="w-full h-16 sm:h-20 object-contain rounded-lg ring-1 ring-white/10"
    loading="eager"
    decoding="async"
  />
</div>
      {/* Header row: title + cover art on desktop */}
      <div className="flex items-start gap-6">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[13px] text-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.25)]">
            About the show
          </span>

<h1 className="sr-only md:not-sr-only mt-3 text-2xl md:text-3xl lg:text-[32px] font-semibold text-white">

          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-300">
            <em>100 Songs That Define Heavy Metal</em> is a weekly podcast from{" "}
            <strong>Metal Blade Records</strong> and{" "}
            <strong>Pantheon Media</strong>, hosted by Metal Blade founder{" "}
            <strong>Brian Slagel</strong>. Each episode dives into one track
            that shaped heavy metal—production stories, historical angles, and
            why the song still matters today.
          </p>

          {/* Platform rows */}
          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-zinc-400">
              Listen on
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill href={LINKS.apple} label="Apple Podcasts" icon="apple" />
              <Pill href={LINKS.spotify} label="Spotify" icon="spotify" />
              <Pill href={LINKS.iheart} label="iHeartRadio" icon="heart" />
              <Pill href={LINKS.ytmusic} label="YouTube Music" icon="yt" />
              <Pill href={LINKS.amazon} label="Amazon Music" icon="amazon" />
              <Pill href={LINKS.pocket} label="Pocket Casts" icon="pocket" />
              <Pill href={LINKS.overcast} label="Overcast" icon="overcast" />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-zinc-400">
              Watch on
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill href={LINKS.youtube} label="YouTube" icon="youtube" />
            </div>
          </div>
        </div>

        {/* Cover art (desktop only) */}
        <div className="hidden md:block">
          <div className="relative h-36 w-36 lg:h-40 lg:w-40 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_28px_rgba(239,68,68,0.25)]">
            <Image
              src="/cover-100-metal.webp" // your existing artwork path
              alt="Podcast cover"
              fill
              sizes="160px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* Social proof cards (unchanged) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard icon="star" value="4.9" label="rating" />
        <StatCard icon="globe" value="200+" label="countries" />
        <StatCard icon="download" value="1M+" label="streams" />
      </div>
    </section>
  );
}

/* --------------------- small components --------------------- */

function Pill({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon:
    | "apple"
    | "spotify"
    | "heart"
    | "yt"
    | "amazon"
    | "pocket"
    | "overcast"
    | "youtube";
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 hover:bg-white/10 transition"
    >
      <Icon name={icon} />
      {label}
    </Link>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: "star" | "globe" | "download";
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center">
      <div className="mb-1 flex items-center justify-center">
        <Icon name={icon} className="h-5 w-5 text-zinc-300" />
      </div>
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  );
}

/* --------------------- icons (mono, balanced) --------------------- */
function Icon({
  name,
  className = "h-4 w-4",
}: {
  name:
    | "apple"
    | "spotify"
    | "heart"
    | "yt"
    | "amazon"
    | "pocket"
    | "overcast"
    | "youtube"
    | "star"
    | "globe"
    | "download";
  className?: string;
}) {
  switch (name) {
    case "apple":
      // Apple Podcasts "radiating" glyph (not the generic Apple logo)
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5Zm0 1.5a7.25 7.25 0 1 1 0 14.5 7.25 7.25 0 0 1 0-14.5Zm0 3.25a3.75 3.75 0 0 0-3.75 3.75.75.75 0 1 0 1.5 0A2.25 2.25 0 1 1 12 13.25a.75.75 0 0 0 0 1.5A3.75 3.75 0 0 0 12 8z"
          />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm4.9 12.7a.75.75 0 0 1-1.03.26c-2.82-1.73-6.38-2.12-10.56-1.16a.75.75 0 1 1-.34-1.46c4.57-1.06 8.5-.62 11.64 1.3.36.22.48.69.29 1.06Zm.78-2.96a.9.9 0 0 1-1.23.3c-3.23-1.96-8.16-2.54-11.98-1.39a.9.9 0 0 1-.52-1.73c4.31-1.3 9.69-.66 13.4 1.6a.9.9 0 0 1 .33 1.22Zm.11-3.04a1.02 1.02 0 0 1-1.38.34C12.9 7.9 7.91 7.43 4.33 8.5a1.02 1.02 0 0 1-.58-1.95c4.1-1.2 9.52-.66 13.84 1.95.49.29.65.92.3 1.39Z"
          />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.1 20.3c-.3.2-.7.2-1 0C7.1 17.3 3.8 14.3 3.8 10.6 3.8 8.3 5.6 6.5 7.9 6.5c1.4 0 2.7.7 3.4 1.8.7-1.1 2-1.8 3.4-1.8 2.3 0 4.1 1.8 4.1 4.1 0 3.7-3.2 6.7-6.7 9.7Z"
          />
        </svg>
      );
    case "yt":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8Zm0 17.4a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          />
          <path fill="currentColor" d="M10.2 8.5v7l5-3.5-5-3.5Z" />
        </svg>
      );
    case "amazon":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.4 17.8c-2.4 1.7-5.7 2.7-8.4 2.7-3.9 0-7.3-1.4-9.9-3.8-.3-.3 0-.8.4-.6 2.8 1.6 6.2 2.6 9.9 2.6 2.4 0 5.1-.5 7.6-1.7.4-.2.8.3.4.8Zm1.3-1.8c-.4-.6-2.6-1.6-3.8-2 .4-1.2.5-2.5.5-3.7C18.4 6.6 16.4 5 13.7 5c-1.8 0-3.2.6-4.1 1.9V5.5H7.2v11h2.5v-5.5c0-2 1-3.4 2.9-3.4 1.6 0 2.6 1 2.6 2.9 0 1.7-.3 3.6-1 5.1 1.6.6 3.7 1.7 4.3 2.4.2.2.4.2.6.1.2-.1.2-.4.1-.6Z"
          />
        </svg>
      );
    case "pocket":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.5 5.5H3.5A1.5 1.5 0 0 0 2 7v5a8 8 0 0 0 20 0V7a1.5 1.5 0 0 0-1.5-1.5Zm-3.9 5.1-3.7 3.7a1 1 0 0 1-1.4 0L7.8 10.6a1 1 0 1 1 1.4-1.4l2.6 2.6 3-3a1 1 0 1 1 1.4 1.4Z"
          />
        </svg>
      );
    case "overcast":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5Zm0 1.5a7.25 7.25 0 1 1 0 14.5 7.25 7.25 0 0 1 0-14.5ZM9.5 8.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5c0-.41.34-.75.75-.75Zm5.25.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 1.5 0Z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M21 8.1c-.2-1.2-1.2-2.1-2.4-2.2-2-.2-4.2-.2-6.6-.2s-4.6 0-6.6.2C4.2 6 3.2 6.9 3 8.1 2.8 9.5 2.8 11 2.8 12s0 2.5.2 3.9c.2 1.2 1.2 2.1 2.4 2.2 2 .2 4.2.2 6.6.2s4.6 0 6.6-.2c1.2-.1 2.1-1 2.4-2.2.2-1.4.2-2.9.2-3.9s0-2.5-.2-3.9ZM10 9.5l4.7 2.5L10 14.5v-5Z"
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="m12 3.8 2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 14.9l-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L12 3.8Z"
          />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm0 1.5a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5Zm0 1.5c-2.8 0-5.1 3-5.4 6.75h10.8C17.1 8.25 14.8 5.25 12 5.25Zm0 12.5c2.8 0 5.1-3 5.4-6.75H6.6c.3 3.75 2.6 6.75 5.4 6.75Z"
          />
        </svg>
      );
    case "download":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3.75a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.53 3.53a.75.75 0 0 1-1.06 0L7.9 10.53a.75.75 0 1 1 1.06-1.06L11.18 11.7V4.5A.75.75 0 0 1 12 3.75Zm-7.5 12h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1 0-1.5Z"
          />
        </svg>
      );
    default:
      return null;
  }
}
