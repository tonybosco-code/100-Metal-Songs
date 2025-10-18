import Image from "next/image";
import Link from "next/link";

/* ---------- inline SVG icons ---------- */
const IconStar = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
const IconGlobe = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.92 6h-3.19a15.9 15.9 0 0 0-1.42-3.53A8.03 8.03 0 0 1 18.92 8ZM12 4c.74.96 1.39 2.27 1.86 4H10.14C10.61 6.27 11.26 4.96 12 4Zm-3.31.47A15.9 15.9 0 0 0 7.27 8H4.08a8.03 8.03 0 0 1 4.61-3.53ZM4.06 10h3.02a18.6 18.6 0 0 0-.09 2c0 .69.03 1.35.09 2H4.06a7.98 7.98 0 0 1 0-4Zm.02 6h3.19c.35 1.27.83 2.5 1.42 3.53A8.03 8.03 0 0 1 4.08 16Zm7.92 4c-.74-.96-1.39-2.27-1.86-4h3.72c-.47 1.73-1.12 3.04-1.86 4Zm3.31-.47c.59-1.03 1.07-2.26 1.42-3.53h3.19a8.03 8.03 0 0 1-4.61 3.53ZM19.94 14h-3.02c.06-.65.08-1.31.08-2s-.02-1.35-.08-2h3.02a7.98 7.98 0 0 1 0 4Zm-5.16-4c.06.65.09 1.31.09 2s-.03 1.35-.09 2h-5.56A16.7 16.7 0 0 1 9 12c0-.69-.03-1.35-.09-2h5.87Z" />
  </svg>
);
const IconDownload = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M5 20h14v-2H5v2Zm7-16v8.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V4h1Z" />
  </svg>
);

/* ---------- helpers ---------- */
function GlowBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.6)_0%,_rgba(56,189,248,0.22)_45%,_transparent_70%)] blur-md"
      />
      <span className="inline-flex items-center rounded-full bg-sky-500/12 px-2 py-[3px] text-[11px] font-medium text-sky-200 ring-1 ring-inset ring-sky-400/30 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
        {children}
      </span>
    </span>
  );
}

type Platform = { href: string; label: string; icon: React.ReactNode };
function Pill({ href, label, icon }: Platform) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[12px] text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/[0.09]"
    >
      {icon}
      {label}
    </Link>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
      <span className="text-[18px] leading-none">{icon}</span>
      <div className="leading-tight">
        <div className="text-[13px] font-semibold text-white">{value}</div>
        <div className="text-[11px] text-zinc-400">{label}</div>
      </div>
    </div>
  );
}

/* ---------- component ---------- */
export default function AboutIntro() {
  const listen: Platform[] = [
    {
      href:
        "https://podcasts.apple.com/us/podcast/100-songs-that-define-heavy-metal/id1778316009",
      label: "Apple Podcasts",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-white/80" />,
    },
    {
      href: "https://open.spotify.com/show/1rlYj3c5mpMMUPpNsPJDoD",
      label: "Spotify",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-green-400/90" />,
    },
    {
      href:
        "https://www.iheart.com/podcast/269-100-songs-that-define-heav-235613902/",
      label: "iHeartRadio",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-rose-400/90" />,
    },
    {
      href:
        "https://music.youtube.com/library/podcasts?addrssfeed=https://feeds.megaphone.fm/100heavymetal.xml",
      label: "YouTube Music",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-red-500/90" />,
    },
    {
      href:
        "https://music.amazon.com/podcasts/3209bf1b-715a-4731-9b47-0db64fa11feb/100-songs-that-define-heavy-metal",
      label: "Amazon Music",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-purple-400/90" />,
    },
    {
      href:
        "https://pocketcasts.com/podcast/100-songs-that-define-heavy-metal/e2f164f0-87e7-013d-2105-0affe5d1842d",
      label: "Pocket Casts",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-orange-400/90" />,
    },
    {
      href: "https://overcast.fm/itunes1778316009",
      label: "Overcast",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-amber-300/90" />,
    },
  ];

  const watch: Platform[] = [
    {
      href: "https://www.youtube.com/@100MetalSongs",
      label: "YouTube",
      icon: <span className="inline-block h-3.5 w-3.5 rounded-full bg-red-500/90" />,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 md:p-6">
      {/* Cover art: upper right */}
      <div className="absolute right-5 top-5 hidden md:block">
        <div className="relative h-28 w-28 overflow-hidden rounded-xl ring-1 ring-white/10">
          <Image
            src="https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif"
            alt="100 Songs That Define Heavy Metal cover"
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
      </div>

      {/* Content: header high, body lower – with right padding to avoid logo */}
      <div className="relative z-10 pt-1 md:pt-2 md:pr-40">
        {/* Header (raised) */}
        <div className="mb-2 -mt-1">
          <GlowBadge>About the show</GlowBadge>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          100 Songs That Define Heavy Metal
        </h1>

        {/* Body copy (pushed down) */}
        <div className="mt-6 md:mt-8 space-y-2 text-[13px] md:text-[14px] leading-[1.6] text-zinc-300">
          <p>
            <em>100 Songs That Define Heavy Metal</em> is a weekly podcast from{" "}
            <strong>Metal Blade Records</strong> and{" "}
            <strong>Pantheon Media</strong>, hosted by Metal Blade founder{" "}
            <strong>Brian Slagel</strong>. Each episode dives into one track that
            shaped heavy metal—production stories, historical angles, and why the
            song still matters today.
          </p>
          <p>
            Expect insights from producers, historians, and artists—voices like{" "}
            <em>Martin Popoff</em>, <em>Jay Ruston</em>, and{" "}
            <em>Christian Bladt</em>—plus the context that connects bands across
            eras, from <em>Metallica</em> and <em>Slayer</em> to{" "}
            <em>Cannibal Corpse</em> and <em>Alice Cooper</em>.
          </p>
        </div>

        {/* Platforms */}
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-zinc-400">
            Listen on
          </p>
          <div className="flex flex-wrap gap-2">
            {listen.map((p) => (
              <Pill key={p.href} {...p} />
            ))}
          </div>

          <p className="mb-1 mt-3 text-[10px] uppercase tracking-wide text-zinc-400">
            Watch on
          </p>
          <div className="flex flex-wrap gap-2">
            {watch.map((p) => (
              <Pill key={p.href} {...p} />
            ))}
          </div>
        </div>

        {/* Social proof (compact) */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:max-w-[680px]">
          <Metric
            icon={<IconStar className="h-4 w-4 text-amber-300" />}
            value="4.9"
            label="rating"
          />
          <Metric
            icon={<IconGlobe className="h-4 w-4 text-cyan-300" />}
            value="200+"
            label="countries"
          />
          <Metric
            icon={<IconDownload className="h-4 w-4 text-emerald-300" />}
            value="1M+"
            label="streams"
          />
        </div>
      </div>
    </section>
  );
}
