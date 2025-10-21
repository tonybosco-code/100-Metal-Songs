"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function ShowIntroPanel() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]
                 px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 text-zinc-300"
    >
      {/* --- Mobile-only Banner (appears above the pill) --- */}
      <div className="block md:hidden mb-6 -mx-2 sm:mx-0">
        <Image
          src="/logo-banner.webp"
          alt="100 Songs That Define Heavy Metal"
          width={1600}
          height={420}
          priority
          sizes="(max-width: 640px) 96vw, (max-width: 1024px) 80vw, 1200px"
          className="w-full h-16 sm:h-20 md:h-24 object-contain rounded-lg ring-1 ring-white/10"
        />
      </div>

      {/* --- Pill + Title --- */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span
            className="inline-block rounded-full border border-red-500/40 bg-red-500/10
                       px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-400
                       shadow-[0_0_12px_rgba(239,68,68,0.35)]"
          >
            About the show
          </span>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            100 Songs That Define Heavy Metal
          </h2>
          <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-400">
            Hosted by Metal Blade Records founder <strong>Brian Slagel</strong>,
            each episode explores one song that shaped the genre — from Metallica
            to Mercyful Fate, Pantera to Priest — with history, production
            insights, and stories from the artists themselves.
          </p>
        </div>

        {/* --- Desktop Cover Art (top right) --- */}
        <div className="hidden md:block relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
          <Image
            src="/logo-banner.webp"
            alt="100 Songs That Define Heavy Metal logo"
            fill
            sizes="(max-width: 1024px) 25vw, 160px"
            className="object-contain rounded-lg"
          />
        </div>
      </div>

      {/* --- Listen Links --- */}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        {[
          { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/100-songs-that-define-heavy-metal/id1778316009" },
          { label: "Spotify", href: "https://open.spotify.com/show/1rlYj3c5mpMMUPpNsPJDoD" },
          { label: "iHeart", href: "https://www.iheart.com/podcast/269-100-songs-that-define-heav-235613902/" },
          { label: "YouTube", href: "https://www.youtube.com/@100MetalSongs" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="inline-flex items-center rounded-full border border-white/10
                       bg-white/5 hover:bg-red-600/80 hover:text-white px-4 py-2
                       text-white/80 transition-all"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* --- Social Proof Section --- */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs sm:text-sm text-zinc-400">
        <div>
          <div className="text-lg sm:text-xl font-semibold text-white">4.9★</div>
          <div>Average Rating</div>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-semibold text-white">200+</div>
          <div>Countries</div>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-semibold text-white">1M+</div>
          <div>Streams</div>
        </div>
      </div>
    </section>
  );
}
