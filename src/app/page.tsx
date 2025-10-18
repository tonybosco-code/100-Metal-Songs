// src/app/page.tsx
import { createClient } from "@sanity/client";
import HeroLatest from "@/app/components/HeroLatest";
import EpisodesGridClean from "@/app/components/EpisodesGridClean";
import EmailSignup from "@/app/components/EmailSignup";

/* ---------------- Sanity client (read-only) ---------------- */
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
});

/* ---------------- Shared episode fields / queries ---------------- */
const episodeFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt, pubDate, _createdAt,
  "durationSeconds": coalesce(durationSeconds, duration),
  descriptionPlain, description, excerpt, summary,
  coverImage{ asset->{ url } },
  audioUrl,
  links
`;

const DATE_KEY = "coalesce(publishedAt, pubDate, _createdAt)";

const heroQuery = `
*[_type == "episode"]
| order(${DATE_KEY} desc)[0]{
  ${episodeFields}
}
`;

const gridQuery = `
*[_type == "episode"]
| order(${DATE_KEY} desc)[1...9]{
  ${episodeFields}
}
`;

/* -----------------------------------------------------------
   Show Intro — right-aligned art with subtle red glow
----------------------------------------------------------- */
function ShowIntroSection() {
  return (
    <section
      className="mt-10 relative overflow-hidden rounded-2xl border border-white/10
                 bg-gradient-to-b from-zinc-900/60 via-zinc-900/30 to-transparent
                 p-4 md:p-6 lg:p-8"
    >
      <div className="relative flex flex-col lg:flex-row justify-between items-start gap-6">
        {/* Left: copy + platform pills */}
        <div className="flex-1">
          {/* blue badge */}
          <div className="inline-flex items-center rounded-full bg-blue-500/10
                          ring-1 ring-blue-400/40 px-3 py-1 text-xs font-medium
                          text-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.35)]">
            About the show
          </div>

          <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-white">
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
                <a
                  href="https://podcasts.apple.com/us/podcast/100-songs-that-define-heavy-metal/id1778316009"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M16.365 1.43c.07.897-.298 1.755-.91 2.41-.62.661-1.48 1.12-2.38 1.05-.08-.87.29-1.74.92-2.41.61-.66 1.67-1.15 2.37-1.05ZM20.34 17.3c-.35.82-.76 1.61-1.29 2.35-.7 1-1.44 1.98-2.54 2-.99.02-1.3-.65-2.43-.65-1.13 0-1.49.63-2.44.67-1.04.04-1.83-1.08-2.53-2.07-1.37-1.96-2.42-5.56-1-7.98.69-1.2 1.92-1.96 3.28-1.98 1.03-.02 2 .7 2.44.7.45 0 1.58-.86 2.67-.73 0 0 2.35.28 3.15 2.73-.18.11-2.08 1.22-2.06 3.65.01 2.91 2.54 3.79 2.55 3.81Z" />
                  </svg>
                  Apple Podcasts
                </a>

                <a
                  href="https://open.spotify.com/show/1rlYj3c5mpMMUPpNsPJDoD"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M12 1.8c5.63 0 10.2 4.57 10.2 10.2S17.63 22.2 12 22.2 1.8 17.63 1.8 12 6.37 1.8 12 1.8Zm4.72 13.77a.9.9 0 0 0-1.24-.31c-3.4 2.08-7.67 1.22-10.18-.12a.9.9 0 1 0-.86 1.58c1.46.8 3.2 1.31 5.12 1.31 1.93 0 4.03-.5 5.95-1.66.43-.26.57-.82.31-1.24Z" />
                  </svg>
                  Spotify
                </a>

                <a
                  href="https://www.iheart.com/podcast/269-100-songs-that-define-heav-235613902/"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M12 7.5c1.9-2.32 6.4-2.23 8.1.62 1.6 2.72.26 5.64-1.7 7.6l-5.7 5.7a1 1 0 0 1-1.4 0L5.6 15.7C3.64 13.74 2.3 10.83 3.9 8.1 5.6 5.27 10.1 5.18 12 7.5Z" />
                  </svg>
                  iHeartRadio
                </a>

                <a
                  href="https://music.youtube.com/library/podcasts?addrssfeed=https://feeds.megaphone.fm/100heavymetal.xml"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6Zm-2.2 6.6 6 3.2-6 3.2V8.8Z" />
                  </svg>
                  YouTube Music
                </a>

                <a
                  href="https://music.amazon.com/podcasts/3209bf1b-715a-4731-9b47-0db64fa11feb/100-songs-that-define-heavy-metal"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M3 17.5c2.7 1.9 6 3 9.6 3s6.9-1.1 9.6-3l.8 1.3c-2.9 2.1-6.5 3.2-10.4 3.2S5.1 20.9 2.2 18.8l.8-1.3Z" />
                  </svg>
                  Amazon Music
                </a>

                <a
                  href="https://pocketcasts.com/podcast/100-songs-that-define-heavy-metal/e2f164f0-87e7-013d-2105-0affe5d1842d"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M12 3.2A8.8 8.8 0 1 0 20.8 12H19a7 7 0 1 1-7-7V3.2Z" />
                  </svg>
                  Pocket Casts
                </a>

                <a
                  href="https://overcast.fm/itunes1778316009"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 2.8a.9.9 0 0 0-.9.9v8.6a.9.9 0 1 0 1.8 0V7.7a.9.9 0 0 0-.9-.9Z" />
                  </svg>
                  Overcast
                </a>
              </div>
            </div>

            {/* WATCH ON */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1.5">
                Watch on
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.youtube.com/@100MetalSongs"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70
                             px-3 py-1.5 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M23 7.5s-.2-1.7-.8-2.4c-.8-.8-1.7-.8-2.1-.9C16.8 4 12 4 12 4h0s-4.8 0-8.1.2c-.4 0-1.3.1-2.1.9C1.2 5.8 1 7.5 1 7.5S.8 9.5.8 11.6v.8C.8 14.5 1 16.5 1 16.5s.2 1.7.8 2.4c.8.8 1.8.8 2.2.9 1.6.2 6.9.2 6.9.2s4.8 0 8.1-.2c.4 0 1.3-.1 2.1-.9.6-.7.8-2.4.8-2.4s.2-2.1.2-4.1v-.8c0-2.1-.2-4.1-.2-4.1ZM9.8 14.7V7.9l6.2 3.4-6.2 3.4Z" />
                  </svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: cover art with subtle red glow */}
        <div className="hidden lg:block absolute top-6 right-6">
          <div className="h-36 w-36 md:h-40 md:w-40 overflow-hidden rounded-xl
                          ring-1 ring-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.55)]">
            <img
              src="https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif?w=400&h=400&fit=crop"
              alt="100 Songs That Define Heavy Metal"
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
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" fill="currentColor">
              <path d="M12 2.5 14.9 9l6.6.5-5 4 1.6 6.3L12 16.7 5.9 19.8 7.5 13l-5-4 6.6-.5L12 2.5Z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">4.9</div>
          <div className="text-[11px] text-zinc-400">rating</div>
        </div>

        {/* countries — same globe style used on About page */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-cyan-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2c1.7 0 3.2.6 4.4 1.6H7.6A8 8 0 0 1 12 4Zm-6 8c0-.7.1-1.3.3-2h11.4c.2.7.3 1.3.3 2s-.1 1.3-.3 2H6.3A7.9 7.9 0 0 1 6 12Zm1.6 4.4h8.8A8 8 0 0 1 12 20a8 8 0 0 1-4.4-1.6Z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white">200+</div>
          <div className="text-[11px] text-zinc-400">countries</div>
        </div>

        {/* streams */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
          <div className="mx-auto mb-1 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" fill="currentColor">
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

/* ----------------------------- Page ----------------------------- */
export default async function Page() {
  const [hero, episodes] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(gridQuery),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 space-y-10">
      {/* Show Intro */}
      <ShowIntroSection />

      {/* Latest Episode */}
      {hero ? <HeroLatest ep={hero} /> : null}

      {/* CTA — email signup (restored) */}
      <EmailSignup
        className="mt-8 md:mt-10"
        heading="Join the community"
        subtext="Get new episodes, behind-the-scenes updates, and exclusive metal stories!"
      />

      {/* Episodes grid */}
      <section className="mt-2">
        <h2 className="text-sm font-medium text-zinc-300 mb-4">Recent Episodes</h2>
        {Array.isArray(episodes) && episodes.length > 0 ? (
          <EpisodesGridClean episodes={episodes} />
        ) : null}
{/* More Episodes button */}
<div className="mt-6 flex justify-center">
  <a
    href="/episodes"
    className="
      inline-flex items-center gap-2 rounded-full
      bg-red-600/90 px-5 py-2.5 text-sm font-medium text-white
      shadow-[0_0_15px_rgba(239,68,68,0.35)]
      transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.45)]
      focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:ring-offset-2 focus:ring-offset-black
    "
  >
    More Episodes
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className='h-4 w-4'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
    </svg>
  </a>
</div>
      </section>
    </main>
  );
}
