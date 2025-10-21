// src/app/components/ShowIntroPanel.tsx
"use client";

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

type PillIcon =
  | "apple-podcasts"
  | "spotify"
  | "iheart"
  | "youtube-music"
  | "amazon-music"
  | "pocket-casts"
  | "overcast"
  | "youtube";

function BrandIcon({ name, className = "h-3.5 w-3.5" }: { name: PillIcon; className?: string }) {
  switch (name) {
    case "apple-podcasts":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2Zm0 4.8a4.8 4.8 0 0 0-1.3 9.4v2.3a1.3 1.3 0 1 0 2.6 0v-2.3A4.8 4.8 0 0 0 12 6.8Zm0 2.6a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Z" />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 1.8a10.2 10.2 0 1 1 0 20.4A10.2 10.2 0 0 1 12 1.8Zm4.7 13.8a.9.9 0 0 0-1.2-.3c-3.4 2.1-7.7 1.2-10.2-.1a.9.9 0 1 0-.8 1.6c1.5.8 3.2 1.3 5.1 1.3 1.9 0 4-.5 6-1.7.4-.2.6-.8.3-1.2Z" />
        </svg>
      );
    case "iheart":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 7.5c1.9-2.3 6.4-2.2 8.1.6 1.6 2.7.3 5.6-1.7 7.6l-5.7 5.7a1 1 0 0 1-1.4 0L5.6 15.7C3.6 13.7 2.3 10.8 3.9 8.1 5.6 5.3 10.1 5.2 12 7.5Z" />
        </svg>
      );
    case "youtube-music":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6Zm-2.2 6.6 6 3.2-6 3.2V8.8Z" />
        </svg>
      );
    case "amazon-music":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M3 17.5c2.7 1.9 6 3 9.6 3s6.9-1.1 9.6-3l.8 1.3c-2.9 2.1-6.5 3.2-10.4 3.2S5.1 20.9 2.2 18.8l.8-1.3Z" />
        </svg>
      );
    case "pocket-casts":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 3.2A8.8 8.8 0 1 0 20.8 12H19a7 7 0 1 1-7-7V3.2Z" />
        </svg>
      );
    case "overcast":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 2.8a.9.9 0 0 0-.9.9v8.6a.9.9 0 1 0 1.8 0V7.7a.9.9 0 0 0-.9-.9Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M23 7.5s-.2-1.7-.8-2.4c-.8-.8-1.7-.8-2.1-.9C16.8 4 12 4 12 4s-4.8 0-8.1.2c-.4 0-1.3.1-2.1.9C1.2 5.8 1 7.5 1 7.5s-.2 2-.2 4.1v.8c0 2.1.2 4.1.2 4.1s.2 1.7.8 2.4c.8.8 1.8.8 2.2.9 1.6.2 6.9.2 6.9.2s4.8 0 8.1-.2c.4 0 1.3-.1 2.1-.9.6-.7.8-2.4.8-2.4s.2-2.1.2-4.1v-.8c0-2.1-.2-4.1-.2-4.1ZM9.8 14.7V7.9l6.2 3.4-6.2 3.4Z" />
        </svg>
      );
  }
}

function Pill({ href, label, icon }: { href: string; label: string; icon: PillIcon }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800 transition"
    >
      <BrandIcon name={icon} />
      <span>{label}</span>
    </a>
  );
}

export default function ShowIntroPanel() {
  return (
    <section
      className="mt-10 relative overflow-hidden rounded-2xl border border-white/10
                 bg-gradient-to-b from-zinc-900/60 via-zinc-900/30 to-transparent
                 p-4 md:p-6 lg:p-8"
    >
      {/* Masthead strip (restored) */}
      <div className="w-full overflow-hidden">
        <img
          src="/logo-masthead.webp"
          alt="100 Metal Songs masthead"
          className="block w-full h-auto max-h-36 object-contain"
          loading="eager"
        />
      </div>

      <div className="mt-6 relative grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 items-start">
        {/* Left: copy + platform pills */}
        <div>
          <div className="inline-flex items-center rounded-full bg-blue-500/10 ring-1 ring-blue-400/40 px-3 py-1 text-xs font-medium text-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.35)]">
            About the show
          </div>

          {/* H1: hidden on mobile, visible md+ (SEO safe) */}
          <h1 className="sr-only md:not-sr-only mt-3 text-2xl md:text-3xl font-semibold text-white">
            100 Songs That Define Heavy Metal
          </h1>

          <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-zinc-300 max-w-2xl">
            <em>100 Songs That Define Heavy Metal</em> is a weekly podcast from{" "}
            <strong>Metal Blade Records</strong> and <strong>Pantheon Media</strong>,
            hosted by Metal Blade founder <strong>Brian Slagel</strong>. Each episode
            dives into one track that shaped heavy metal—production stories, historical
            angles, and why the song still matters today.
          </p>

          {/* Platforms */}
          <div className="mt-5 space-y-3">
            {/* LISTEN ON */}
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

            {/* WATCH ON */}
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

        {/* Right: cover art with subtle red glow (desktop only) */}
        <div className="hidden md:block justify-self-end">
          <div className="relative h-36 w-36 lg:h-40 lg:w-40 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_28px_rgba(239,68,68,0.25)]">
            <img
              src="https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif?w=400&h=400&fit=crop"
              alt="100 Songs That Define Heavy Metal cover"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* rating */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-yellow-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden fill="currentColor">
              <path d="M12 2.5 14.9 9l6.6.5-5 4 1.6 6.3L12 16.7 5.9 19.8 7.5 13l-5-4 6.6-.5L12 2.5Z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">4.9</div>
          <div className="text-[11px] text-zinc-400">rating</div>
        </div>

        {/* countries */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-cyan-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden fill="currentColor">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2c1.7 0 3.2.6 4.4 1.6H7.6A8 8 0 0 1 12 4Zm-6 8c0-.7.1-1.3.3-2h11.4c.2.7.3 1.3.3 2s-.1 1.3-.3 2H6.3A7.9 7.9 0 0 1 6 12Zm1.6 4.4h8.8A8 8 0 0 1 12 20a8 8 0 0 1-4.4-1.6Z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">200+</div>
          <div className="text-[11px] text-zinc-400">countries</div>
        </div>

        {/* streams */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden fill="currentColor">
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
