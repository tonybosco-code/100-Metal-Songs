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

/* ----------------- Brand icons (mono, crisp, balanced) ----------------- */
type IconProps = React.SVGProps<SVGSVGElement>;
const S: IconProps = { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": true };

/** Apple Podcasts (concentric broadcast rings + person) */
function IconApplePodcasts(props: IconProps) {
  return (
    <svg {...S} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.2" />
      <circle cx="12" cy="10.2" r="1.6" fill="currentColor" stroke="none" />
      <path d="M9.9 16.8c.5-2.2 1.6-3.2 2.1-3.2s1.6 1 2.1 3.2" />
    </svg>
  );
}

/** Spotify (three arcs) */
function IconSpotify(props: IconProps) {
  return (
    <svg {...S} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4.5 10.2c4.9-1.3 9.1-.7 13 1.5" />
      <path d="M5.6 13.5c3.7-1 6.9-.5 9.8 1.2" />
      <path d="M6.7 16.5c2.3-.6 4.3-.3 6.1.9" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

/** iHeartRadio (heart with subtle ‘signal’ notch) */
function IconIHeartRadio(props: IconProps) {
  return (
    <svg {...S} {...props} fill="currentColor">
      <path d="M12.02 7.2c1.3-1.7 4.3-1.9 5.8-.4 1.7 1.6 1.7 4.2 0 5.9l-5.4 5.2a1 1 0 0 1-1.4 0l-5.4-5.2c-1.7-1.7-1.7-4.3 0-5.9 1.5-1.5 4.5-1.3 5.8.4.2.2.4.2.6 0Z"/>
      {/* tiny notch to suggest ‘radio’ */}
      <path d="M12 10.25v-1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

/** YouTube Music (disc + play) */
function IconYouTubeMusic(props: IconProps) {
  return (
    <svg {...S} {...props} fill="currentColor">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.6 9.8v4.4l3.8-2.2-3.8-2.2Z" />
    </svg>
  );
}

/** Amazon (smile + arrow, simplified and centered) */
function IconAmazon(props: IconProps) {
  return (
    <svg {...S} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* smile/arrow */}
      <path d="M6 15.8c3.1 1.6 6.9 1.6 10 0" />
      <path d="M14.7 16.1l1.8-.3-.3 1.8" />
    </svg>
  );
}

/** Pocket Casts (C-like arcs in a circle) */
function IconPocketCasts(props: IconProps) {
  return (
    <svg {...S} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M16.2 12a4.2 4.2 0 1 0-6.4 3.6" />
      <path d="M14.8 12a3 3 0 1 0-4.5 2.6" />
    </svg>
  );
}

/** Overcast (tower with broadcast rings) */
function IconOvercast(props: IconProps) {
  return (
    <svg {...S} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8.3v7.4" />
      <path d="M9.6 15.7h4.8l-2.4-4.2-2.4 4.2Z" fill="currentColor" stroke="none" />
      <path d="M8.2 9.6c-1 1-1.6 2.3-1.6 3.7s.6 2.7 1.6 3.7" />
      <path d="M15.8 9.6c1 1 1.6 2.3 1.6 3.7s-.6 2.7-1.6 3.7" />
    </svg>
  );
}

/* ----------------- Platform pills (use the icons above) ----------------- */
const PLATFORMS = [
  { label: "Apple Podcasts", href: LINKS.apple, Icon: IconApplePodcasts },
  { label: "Spotify", href: LINKS.spotify, Icon: IconSpotify },
  { label: "iHeartRadio", href: LINKS.iheart, Icon: IconIHeartRadio },
  { label: "YouTube Music", href: LINKS.ytmusic, Icon: IconYouTubeMusic },
  { label: "Amazon Music", href: LINKS.amazon, Icon: IconAmazon },
  { label: "Pocket Casts", href: LINKS.pocket, Icon: IconPocketCasts },
  { label: "Overcast", href: LINKS.overcast, Icon: IconOvercast },
];
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
