// src/app/components/ShowIntroPanel.tsx
"use client";

import {
  SiApplepodcasts,
  SiSpotify,
  SiIheartradio,
  SiYoutubemusic,
  SiPocketcasts,
  SiOvercast,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

/* ------------------- Platform Links ------------------- */
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
  pocketcasts:
    "https://pocketcasts.com/podcast/100-songs-that-define-heavy-metal/e2f164f0-87e7-013d-2105-0affe5d1842d",
  overcast: "https://overcast.fm/itunes1778316009",
  youtube: "https://www.youtube.com/@100MetalSongs",
};

/* ------------------- Brand Colors (for glow) ------------------- */
const BRAND_COLORS: Record<string, string> = {
  "apple-podcasts": "#A06BFF",
  spotify: "#1DB954",
  iheart: "#EC1C24",
  "youtube-music": "#FF0000",
  "amazon-music": "#00A8E1",
  "pocket-casts": "#F43C3C",
  overcast: "#FF9500",
  youtube: "#FF0000",
};

/* ------------------- Icon Mapper ------------------- */
function BrandIcon({ name }: { name: string }) {
  const common = "h-4 w-4 md:h-3.5 md:w-3.5 text-white";
  switch (name) {
    case "apple-podcasts":
      return <SiApplepodcasts className={common} title="" />;
    case "spotify":
      return <SiSpotify className={common} title="" />;
    case "iheart":
      return <SiIheartradio className={common} title="" />;
    case "youtube-music":
      return <SiYoutubemusic className={common} title="" />;
    case "pocket-casts":
      return <SiPocketcasts className={common} title="" />;
    case "overcast":
      return <SiOvercast className={common} title="" />;
    case "youtube":
      return <SiYoutube className={common} title="" />;

    /* Amazon Music: use local official SVG */
    case "amazon-music":
      return (
        <img
          src="/icons/amazon-music.svg"
          alt=""
          className="h-4 w-4 md:h-3.5 md:w-3.5"
          loading="eager"
        />
      );

    default:
      return null;
  }
}

/* ------------------- Pill ------------------- */
function Pill({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: keyof typeof BRAND_COLORS | string;
}) {
  const brand = BRAND_COLORS[icon as string] || "#ffffff";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full
                 bg-zinc-900/70 px-3 py-2 text-xs md:py-1.5 md:text-[13px]
                 text-zinc-200 ring-1 ring-white/10 transition-colors duration-300
                 hover:bg-zinc-800"
      style={{ color: "white" }}
    >
      {/* Glow: mobile default ON (opacity-40), desktop on hover */}
      <span
        className="pointer-events-none absolute inset-[-2px] rounded-full blur-lg
                   opacity-40 md:opacity-0 md:group-hover:opacity-100
                   transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${brand}66 0%, ${brand}22 35%, transparent 70%)`,
          boxShadow: `0 0 18px ${brand}66, 0 0 32px ${brand}33`,
          mixBlendMode: "screen",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        <BrandIcon name={icon as string} />
        <span className="text-zinc-200 group-hover:text-white">{label}</span>
      </span>
    </a>
  );
}

/* ------------------- Main Component ------------------- */
export default function ShowIntroPanel() {
  return (
    <section
      className="mt-10 relative overflow-hidden rounded-2xl border border-white/10
                 bg-gradient-to-b from-zinc-900/60 via-zinc-900/30 to-transparent
                 p-4 md:p-6 lg:p-8"
    >
      {/* Masthead */}
      <div className="w-full overflow-hidden">
        <img
          src="/logo-masthead.webp"
          alt="100 Metal Songs masthead"
          className="block w-full h-auto max-h-24 md:max-h-36 object-contain mx-auto"
          loading="eager"
        />
      </div>

      {/* Copy + Platforms */}
      <div className="mt-5 md:mt-6">
        <div className="inline-flex items-center rounded-full bg-blue-500/10 ring-1 ring-blue-400/40 px-3 py-1 text-xs font-medium text-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.35)]">
          About the show
        </div>

        <h1 className="sr-only md:not-sr-only mt-3 text-2xl md:text-3xl font-semibold text-white">
          100 Songs That Define Heavy Metal
        </h1>

        <p className="mt-3 text-[15px] leading-relaxed text-zinc-300 md:max-w-2xl">
          <em>100 Songs That Define Heavy Metal</em> is a weekly podcast from{" "}
          <strong>Metal Blade Records</strong> and <strong>Pantheon Media</strong>,
          hosted by Metal Blade founder <strong>Brian Slagel</strong>. Each episode
          dives into one track that shaped heavy metal—production stories, historical
          angles, and why the song still matters today.
        </p>

        {/* Platform pills */}
        <div className="mt-5 space-y-3">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1.5">
              Listen on
            </p>
            <div className="flex flex-wrap gap-2">
              <Pill href={LINKS.apple} label="Apple Podcasts" icon="apple-podcasts" />
              <Pill href={LINKS.spotify} label="Spotify" icon="spotify" />
              <Pill href={LINKS.iheart} label="iHeartRadio" icon="iheart" />
              <Pill href={LINKS.ytmusic} label="YouTube Music" icon="youtube-music" />
              <Pill href={LINKS.amazon} label="Amazon Music" icon="amazon-music" />
              <Pill href={LINKS.pocketcasts} label="Pocket Casts" icon="pocket-casts" />
              <Pill href={LINKS.overcast} label="Overcast" icon="overcast" />
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1.5">
              Watch on
            </p>
            <div className="flex flex-wrap gap-2">
              <Pill href={LINKS.youtube} label="YouTube" icon="youtube" />
            </div>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-yellow-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" fill="currentColor" aria-hidden>
              <path d="M12 2.5 14.9 9l6.6.5-5 4 1.6 6.3L12 16.7 5.9 19.8 7.5 13l-5-4 6.6-.5L12 2.5Z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">4.9</div>
          <div className="text-[11px] text-zinc-400">rating</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-cyan-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2c1.7 0 3.2.6 4.4 1.6H7.6A8 8 0 0 1 12 4Zm-6 8c0-.7.1-1.3.3-2h11.4c.2.7.3 1.3.3 2s-.1 1.3-.3 2H6.3A7.9 7.9 0 0 1 6 12Zm1.6 4.4h8.8A8 8 0 0 1 12 20a8 8 0 0 1-4.4-1.6Z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">200+</div>
          <div className="text-[11px] text-zinc-400">countries</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" fill="currentColor" aria-hidden>
              <path d="M12 3a1 1 0 0 1 1 1v8.6l2.6-2.6 1.4 1.4L12 17.4 7 11.4l1.4-1.4 2.6 2.6V4a1 1 0 0 1 1-1Zm-7 14h14v2H5v-2Z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">1M+</div>
          <div className="text-[11px] text-zinc-400">streams</div>
        </div>
      </div>
    </section>
  );
}
