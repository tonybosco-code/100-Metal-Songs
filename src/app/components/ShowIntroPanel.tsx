// src/app/components/ShowIntroPanel.tsx
import Image from "next/image";
import Link from "next/link";

const COVER =
  "https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif";

type Plat = { href: string; label: string; icon: React.ReactNode };

// lightweight inline SVGs so we don’t add a lib just for 3 icons
const Star = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
const Globe = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
    <path d="M3 12h18M12 3c3.5 4 3.5 14 0 18M12 3c-3.5 4-3.5 14 0 18" strokeWidth="1.5" />
  </svg>
);
const Download = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 19h14" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const listenRow: Plat[] = [
  { href: "https://podcasts.apple.com/us/podcast/100-songs-that-define-heavy-metal/id1778316009", label: "Apple Podcasts", icon: <span className="i"></span> },
  { href: "https://open.spotify.com/show/1rlYj3c5mpMMUPpNsPJDoD", label: "Spotify", icon: <span>🎧</span> },
  { href: "https://www.iheart.com/podcast/269-100-songs-that-define-heav-235613902/", label: "iHeartRadio", icon: <span>❤</span> },
  { href: "https://music.youtube.com/library/podcasts?addrssfeed=https://feeds.megaphone.fm/100heavymetal.xml", label: "YouTube Music", icon: <span>▶️</span> },
  { href: "https://music.amazon.com/podcasts/3209bf1b-715a-4731-9b47-0db64fa11feb/100-songs-that-define-heavy-metal", label: "Amazon Music", icon: <span>⚑</span> },
  { href: "https://pocketcasts.com/podcast/100-songs-that-define-heavy-metal/e2f164f0-87e7-013d-2105-0affe5d1842d", label: "Pocket Casts", icon: <span>◔</span> },
  { href: "https://overcast.fm/itunes1778316009/100-songs-that-define-heavy-metal", label: "Overcast", icon: <span>◎</span> },
];

const watchRow: Plat[] = [
  { href: "https://www.youtube.com/@100MetalSongs", label: "YouTube", icon: <span>▶️</span> },
];
{/* Brand banner — positioned above the pill */}
<div className="mb-6 -mx-2 sm:mx-0">
  <Image
    src="/logo-banner.webp"  // use "/logo-banner.webp" if you put it under /public/images/
    alt="100 Songs That Define Heavy Metal"
    width={1600}
    height={420}
    priority
    sizes="(max-width: 640px) 96vw, (max-width: 1024px) 80vw, 1200px"
    className="w-full h-16 sm:h-20 md:h-24 lg:h-28 object-contain rounded-lg ring-1 ring-white/10"
  />
</div>

function Pill({ href, label, icon }: Plat) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3.5 py-2 text-sm text-zinc-200 hover:bg-white/5 hover:border-white/20"
    >
      <span className="text-zinc-300/90">{icon}</span>
      {label}
    </a>
  );
}

export default function ShowIntroPanel() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-900/10 p-6 md:p-8">
      {/* blue halo badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300 ring-1 ring-sky-500/30 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
        About the show
      </div>

      {/* cover art on the right */}
      <div className="pointer-events-none absolute right-6 top-6 hidden md:block">
        <div className="relative h-28 w-28 lg:h-32 lg:w-32 overflow-hidden rounded-xl ring-1 ring-white/10">
          <Image src={COVER} alt="Show cover" fill className="object-cover" sizes="128px" />
        </div>
      </div>

      {/* title & copy */}
      <div className="mt-4 md:mt-5 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          100 Songs That Define Heavy Metal
        </h1>
        <p className="mt-3 text-zinc-300 leading-relaxed">
          Weekly deep dives into the tracks that forged the genre—stories, riffs, production, and legacy.
          Hosted by Metal Blade founder Brian Slagel with producers, musicians, and authors joining to unpack
          why these songs still matter.
        </p>
      </div>

      {/* listen row */}
      <div className="mt-5">
        <p className="text-xs font-medium text-zinc-400 mb-2">LISTEN ON</p>
        <div className="flex flex-wrap gap-2">
          {listenRow.map((p) => (
            <Pill key={p.href} {...p} />
          ))}
        </div>
      </div>

      {/* watch row */}
      <div className="mt-4">
        <p className="text-xs font-medium text-zinc-400 mb-2">WATCH ON</p>
        <div className="flex flex-wrap gap-2">
          {watchRow.map((p) => (
            <Pill key={p.href} {...p} />
          ))}
        </div>
      </div>

      {/* smaller social-proof cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-center">
          <Star className="mx-auto h-6 w-6 text-yellow-300" />
          <div className="mt-1 text-lg font-semibold text-white">4.9</div>
          <div className="text-xs text-zinc-400">rating</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-center">
          <Globe className="mx-auto h-6 w-6 text-sky-300" />
          <div className="mt-1 text-lg font-semibold text-white">200+</div>
          <div className="text-xs text-zinc-400">countries</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-center">
          <Download className="mx-auto h-6 w-6 text-emerald-300" />
          <div className="mt-1 text-lg font-semibold text-white">1M+</div>
          <div className="text-xs text-zinc-400">streams</div>
        </div>
      </div>
    </section>
  );
}
