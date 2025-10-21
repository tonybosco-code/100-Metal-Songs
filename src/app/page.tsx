// src/app/page.tsx
import { createClient } from "@sanity/client";
import HeroLatest from "@/app/components/HeroLatest";
import EpisodesGridClean from "@/app/components/EpisodesGridClean";
import EmailSignup from "@/app/components/EmailSignup";
import ShowIntroPanel from "@/app/components/ShowIntroPanel";

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

/* ----------------------------- Page ----------------------------- */
export default async function Page() {
  const [hero, episodes] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(gridQuery),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 space-y-10">
      {/* Show Intro (contains the masthead + H1 handling) */}
      <ShowIntroPanel />

      {/* Latest Episode */}
      {hero ? <HeroLatest ep={hero} /> : null}

      {/* CTA — email signup */}
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
            className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.45)] focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:ring-offset-2 focus:ring-offset-black"
          >
            More Episodes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
