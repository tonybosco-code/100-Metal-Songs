// src/app/components/ShowIntro.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

/* ----------------- platform links ----------------- */
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

/* ----------------- tiny icon set (mono, optically balanced) ----------------- */
function IconApple() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.365 12.077c-.01-2.151 1.76-3.185 1.84-3.233-1.008-1.473-2.572-1.674-3.123-1.693-1.327-.135-2.59.78-3.264.78-.676 0-1.71-.76-2.81-.737-1.44.021-2.773.84-3.516 2.132-1.494 2.586-.381 6.393 1.072 8.485.711 1.02 1.56 2.168 2.67 2.13 1.078-.041 1.482-.689 2.782-.689 1.3 0 1.662.689 2.81.667 1.164-.02 1.902-1.043 2.61-2.067.824-1.203 1.164-2.37 1.175-2.432-.025-.01-2.26-.867-2.247-3.343Zm-2.11-6.105c.586-.71.978-1.69.87-2.672-.84.033-1.86.56-2.46 1.27-.54.623-1.01 1.61-.89 2.56.94.074 1.89-.48 2.48-1.158Z"
      />
    </svg>
  );
}
function IconSpotify() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm5.1 15.1a.75.75 0 0 1-1.03.26c-2.82-1.73-6.38-2.12-10.56-1.16a.75.75 0 1 1-.33-1.46c4.54-1.04 8.45-.59 11.52 1.3.36.22.48.69.26 1.02Zm1.35-3.06a.9.9 0 0 1-1.24.31c-3.22-1.97-8.14-2.54-11.94-1.39a.9.9 0 1 1-.52-1.73c4.27-1.29 9.63-.65 13.22 1.51.42.26.55.82.27 1.3Zm.14-3.15c-3.66-2.18-9.77-2.38-13.26-1.31a1.05 1.05 0 1 1-.63-2.02c4.06-1.27 10.77-1.02 15 1.5a1.05 1.05 0 0 1-1.11 1.83Z"
      />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.1 20.3c-.3.2-.7.2-1 0C7.1 17.3 3.8 14.3 3.8 10.6 3.8 8.3 5.6 6.5 7.9 6.5 9.3 6.5 10.6 7.2 11.3 8.3c.7-1 2-1.8 3.4-1.8 2.3 0 4.1 1.8 4.1 4.1 0 3.7-3.3 6.7-6.7 9.7Z"
      />
    </svg>
  );
}
function IconYTMusic() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="currentColor" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8Zm0 17.4a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
      <path fill="currentColor" d="M10.2 8.5v7l5-3.5-5-3.5Z" />
    </svg>
  );
}
function IconAmazon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.4 17.8c-2.4 1.7-5.7 2.7-8.4 2.7-3.9 0-7.3-1.4-9.9-3.8-.3-.3 0-.8.4-.6 2.8 1.6 6.2 2.6 9.9 2.6 2.4 0 5.1-.5 7.6-1.7.4-.2.8.3.4.8ZM21.7 16c-.4-.6-2.6-.3-3.6-.2-.3 0-.4-.2-.2-.4.5-.5 1.4-1 2.4-1 .6 0 1.2.1 1.4.4.3.3.3.9 0 1.3Z"
      />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M23 12s0-3-.4-4.4c-.2-.8-.8-1.4-1.6-1.6C19.6 5.5 12 5.5 12 5.5s-7.6 0-9 .5c-.8.2-1.4.8-1.6 1.6C1 9 1 12 1 12s0 3 .4 4.4c.2.8.8 1.4 1.6 1.6 1.4.5 9 .5 9 .5s7.6 0 9-.5c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-4.4.4-4.4ZM9.8 15.3V8.7l6 3.3-6 3.3Z"
      />
    </svg>
  );
}
function IconPocketCasts() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.25A9.75 9.75 0 1 0 21.75 12h-2.4A7.35 7.35 0 1 1 12 4.65v2.4a4.95 4.95 0 1 0 4.95 4.95h2.4A7.35 7.35 0 1 1 12 4.65"
      />
    </svg>
  );
}
function IconOvercast() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 0 0 0-19.2Zm0 17.2a7.6 7.6 0 1 1 0-15.2 7.6 7.6 0 0 1 0 15.2Zm0-11.2a.9.9 0 0 0-.9.9v5.6a.9.9 0 1 0 1.8 0V9.3a.9.9 0 0 0-.9-.9Zm-3 1c-.4-.7-1.5-.1-1.1.6l1.8 3.1-1.8 3.1a.7.7 0 0 0 1.1.7l2.1-3.7a.9.9 0 0 0 0-.8L9 9.4Zm6 0c.4-.7 1.5-.1 1.1.6l-1.8 3.1 1.8 3.1a.7.7 0 0 1-1.1.7l-2.1-3.7a.9.9 0 0 1 0-.8l2.1-3.7Z"
      />
    </svg>
  );
}

/* small set for social proof row (larger) */
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.6 14.2 9l5.1.4-3.9 3.2 1.2 5-4.6-2.8L7.4 17l1.2-5L4.7 9.4 9.8 9 12 3.6Z"
      />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.7 9h-3.2a13 13 0 0 0-1.1-5 8.02 8.02 0 0 1 4.3 5Zm-7.7 9c-1.7-1.8-2.9-4.5-3.2-7h6.4c-.3 2.5-1.5 5.2-3.2 7Zm-3.2-9c.3-2.5 1.5-5.2 3.2-7 1.7 1.8 2.9 4.5 3.2 7H7.8Zm1.1-5a13 13 0 0 0-1.1 5H4.6a8.02 8.02 0 0 1 4.3-5Zm-4.3 7h3.2c.3 2.2 1 4.1 2 5.7a8.02 8.02 0 0 1-5.2-5.7Zm9.8 5.7c1-1.6 1.7-3.5 2-5.7h3.2a8.02 8.02 0 0 1-5.2 5.7Z"
      />
    </svg>
  );
}
function IconWaves() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2v2c-2.5 0-2.5-2-5-2s-2.5 2-5 2-2.5-2-5-2-2.5 2-5 2V9Zm0 6c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2v2c-2.5 0-2.5-2-5-2s-2.5 2-5 2-2.5-2-5-2-2.5 2-5 2v-2Z"
      />
    </svg>
  );
}

/* ----------------- small button ----------------- */
function PlatformButton({
  href,
  label,
  Icon,
  tint = "neutral",
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<any>;
  tint?: "neutral" | "youtube";
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm",
        "ring-1 ring-white/10 bg-white/5 text-zinc-200",
        "hover:bg-white/10 hover:ring-white/20 transition-colors",
        tint === "youtube" && "hover:text-red-400"
      )}
    >
      <Icon />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}

/* ----------------- component ----------------- */
export default function ShowIntro() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,238,0.08),transparent_50%)] p-6 md:p-8">
      {/* subtle grid to differentiate from hero */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />

      {/* cover art — top-right on md+, hidden on small to avoid crowding */}
      <div className="hidden md:block absolute right-4 top-4 md:right-6 md:top-6">
        <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg">
          <Image
            src="https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif"
            alt="100 Songs That Define Heavy Metal cover art"
            fill
            className="object-cover"
            sizes="144px"
            priority={false}
          />
        </div>
      </div>

      {/* badge */}
      <span className="relative inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-400/25">
        About the show
      </span>
{/* Banner — responsive, subtle ring, no layout shift */}
<div className="mb-6 -mx-2 sm:mx-0">
  <Image
    src="/logo-banner.webp"
    alt="100 Metal Songs"
    width={1600}
    height={420}
    priority
    sizes="(max-width: 640px) 96vw, (max-width: 1024px) 80vw, 1200px"
    className="w-full h-16 sm:h-20 md:h-24 lg:h-28 object-contain rounded-lg ring-1 ring-white/10"
  />
</div>
      {/* content */}
      <div className="relative mt-4 md:pr-44">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          100 Songs That Define Heavy Metal
        </h1>
        <p className="mt-3 text-zinc-300 leading-relaxed max-w-3xl">
          Weekly deep dives on the tracks that forged the genre: stories, riffs,
          production, legacy. Hosted by Metal Blade Records CEO Brian Slagel and
          friends, with producers, musicians, and authors joining to unpack why
          these songs still matter.
        </p>

        {/* LISTEN ON */}
        <div className="mt-6">
          <span className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
            Listen on
          </span>
          <div className="flex flex-wrap gap-2">
            <PlatformButton href={LINKS.apple} label="Apple Podcasts" Icon={IconApple} />
            <PlatformButton href={LINKS.spotify} label="Spotify" Icon={IconSpotify} />
            <PlatformButton href={LINKS.iheart} label="iHeartRadio" Icon={IconHeart} />
            <PlatformButton href={LINKS.ytmusic} label="YouTube Music" Icon={IconYTMusic} />
            <PlatformButton href={LINKS.amazon} label="Amazon Music" Icon={IconAmazon} />
            <PlatformButton href={LINKS.pocket} label="Pocket Casts" Icon={IconPocketCasts} />
            <PlatformButton href={LINKS.overcast} label="Overcast" Icon={IconOvercast} />
          </div>
        </div>

        {/* WATCH ON */}
        <div className="mt-6">
          <span className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
            Watch on
          </span>
          <div className="flex flex-wrap gap-2">
            <PlatformButton
              href={LINKS.youtube}
              label="YouTube"
              Icon={IconYouTube}
              tint="youtube"
            />
          </div>
        </div>

        {/* social proof — larger icons, centered, separated by subtle border */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base">
            <div className="inline-flex items-center gap-3 text-zinc-300">
              <span className="text-yellow-400/90">
                <IconStar />
              </span>
              <span>
                <span className="font-semibold text-zinc-100">4.9</span> Rating
              </span>
            </div>
            <div className="inline-flex items-center gap-3 text-zinc-300">
              <span className="text-cyan-300/90">
                <IconGlobe />
              </span>
              <span>
                <span className="font-semibold text-zinc-100">200+</span> Countries
              </span>
            </div>
            <div className="inline-flex items-center gap-3 text-zinc-300">
              <span className="text-emerald-300/90">
                <IconWaves />
              </span>
              <span>
                <span className="font-semibold text-zinc-100">1M+</span> Streams
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
