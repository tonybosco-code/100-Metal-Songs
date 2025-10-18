/* -------------------------------------------
   Footer — aligned to main content width
   - Containers use max-w-6xl (matches episodes)
   - Even 3-col grid so Pages & Info align cleanly
-------------------------------------------- */

import Link from "next/link";

type PillProps = {
  href: string;
  label: string;
  children?: React.ReactNode;
};

function Pill({ href, label, children }: PillProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70 px-3 py-1.5 text-sm text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800/80 transition"
    >
      {children}
      <span>{label}</span>
    </Link>
  );
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mr-3 text-xs uppercase tracking-wider text-zinc-400">
      {children}
    </span>
  );
}

/* Simple mono icons (unchanged) */
function IconApple() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M16.365 1.43c0 1.14-.46 2.225-1.21 3.01-.78.82-2.06 1.45-3.13 1.37-.15-1.09.44-2.27 1.17-3.03.8-.83 2.18-1.45 3.17-1.35zM20.77 17.3c-.57 1.29-1.25 2.56-2.25 3.68-.9 1-1.95 2.12-3.34 2.13-1.38.01-1.74-.69-3.24-.69-1.5 0-1.9.67-3.25.7-1.36.03-2.4-1.1-3.31-2.1-1.8-1.94-3.2-5.48-2.2-8.4.76-2.2 2.66-3.6 4.82-3.64 1.33-.03 2.58.75 3.24.75.65 0 2.24-.93 3.77-.79.64.03 2.46.26 3.61 2.07-3.2 1.68-2.69 6.06.65 7.29z"/></svg>); }
function IconSpotify() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M12 1.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Zm5.07 14.76a.9.9 0 0 1-1.24.3c-3.4-2.08-7.68-2.55-12.02-1.36a.9.9 0 0 1-.48-1.74c4.73-1.3 9.45-.76 13.2 1.52.42.26.55.81.3 1.28Zm1.67-3.25a1.11 1.11 0 0 1-1.53.37c-3.95-2.39-9.96-3.09-14.62-1.65a1.11 1.11 0 1 1-.65-2.12c5.2-1.6 11.74-.82 16.2 1.88.52.31.7.99.37 1.52Zm.15-3.37c-4.5-2.66-12.02-2.9-16.28-1.57a1.31 1.31 0 1 1-.77-2.5c4.86-1.5 13-.99 18 1.94a1.31 1.31 0 0 1-1.34 2.13Z"/></svg>); }
function IconHeart() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M12 21s-6.72-4.32-9.33-7.5C.8 11.3 2.1 7.9 5.2 7.5 7.04 7.26 8.31 8.43 12 11c3.7-2.57 4.96-3.74 6.8-3.5 3.12.4 4.4 3.8 2.53 6-2.62 3.18-9.33 7.5-9.33 7.5Z"/></svg>); }
function IconYTMusic() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm-3 6.75 7 3.25-7 3.25V8.75Z"/></svg>); }
function IconAmazon() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M7 7h10v10H7z"/></svg>); }
function IconPocket() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M3 5h18v8a7.5 7.5 0 0 1-15 0V5Zm9.88 8.53 4.24-3.89-1.36-1.48-3.06 2.8-3.06-2.8-1.36 1.48 4.24 3.89c.2.18.52.18.7 0Z"/></svg>); }
function IconOvercast() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 7v10M8 9l1.5 1.5M16 9 14.5 10.5" stroke="currentColor" strokeWidth="2"/></svg>); }
function IconYouTube() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M23 7.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C15.9 3.9 12 3.9 12 3.9h0s-3.9 0-7.7.24c-.46.05-1.46.06-2.36 1C.23 5.86 0 7.5 0 7.5S-.24 9.5-.24 11.5v1c0 2 .24 4 .24 4s.23 1.64.94 2.36c.9.94 2.08.9 2.61 1 1.9.18 7.45.24 7.45.24s3.9 0 7.7-.24c.46-.05 1.46-.06 2.36-1 .71-.72.94-2.36.94-2.36s.24-2 .24-4v-1c0-2-.24-4-.24-4ZM9.5 14.5v-6l6 3-6 3Z"/></svg>); }

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      {/* TOP: brand + columns (aligned to episodes width) */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
        {/* Brand & tagline */}
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-red-500 shadow-[0_0_12px_theme(colors.red.500)]" />
            <span className="text-sm tracking-widest text-red-300/90">100 METAL SONGS</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-zinc-300">
            Songs that define Heavy Metal
          </p>
          <p className="mt-1 max-w-sm text-sm text-zinc-400">
            Weekly deep dives on the tracks that forged the genre—stories, riffs, production, legacy.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-zinc-400">Pages</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/" className="text-zinc-200 hover:text-white">Home</Link></li>
            <li><Link href="/episodes" className="text-zinc-200 hover:text-white">Episodes</Link></li>
            <li><Link href="/about" className="text-zinc-200 hover:text-white">About</Link></li>
          </ul>
        </div>

        {/* Info (closer to Pages due to equal 3-col grid) */}
        <div className="pt-[2px]">
          <h4 className="text-xs uppercase tracking-wider text-zinc-400">Info</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/contact" className="text-zinc-200 hover:text-white">
                Contact form
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* RIBBONS — same width as episodes */}
      <div className="border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <RowLabel>Listen on</RowLabel>
            <Pill href="https://podcasts.apple.com/us/podcast/100-songs-that-define-heavy-metal/id1778316009" label="Apple Podcasts"><IconApple /></Pill>
            <Pill href="https://open.spotify.com/show/1rlYj3c5mpMMUPpNsPJDoD" label="Spotify"><IconSpotify /></Pill>
            <Pill href="https://www.iheart.com/podcast/269-100-songs-that-define-heav-235613902/" label="iHeartRadio"><IconHeart /></Pill>
            <Pill href="https://music.youtube.com/library/podcasts?addrssfeed=https://feeds.megaphone.fm/100heavymetal.xml" label="YouTube Music"><IconYTMusic /></Pill>
            <Pill href="https://music.amazon.com/podcasts/3209bf1b-715a-4731-9b47-0db64fa11feb/100-songs-that-define-heavy-metal" label="Amazon Music"><IconAmazon /></Pill>
            <Pill href="https://pocketcasts.com/podcast/100-songs-that-define-heavy-metal/e2f164f0-87e7-013d-2105-0affe5d1842d" label="Pocket Casts"><IconPocket /></Pill>
            <Pill href="https://overcast.fm/itunes1778316009" label="Overcast"><IconOvercast /></Pill>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <RowLabel>Watch on</RowLabel>
            <Pill href="https://www.youtube.com/@100MetalSongs" label="YouTube">
              <IconYouTube />
            </Pill>
          </div>
        </div>
      </div>

      {/* COPYRIGHT — same width as episodes */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-4 text-xs text-zinc-400">
          © {new Date().getFullYear()} 100 Metal Songs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
