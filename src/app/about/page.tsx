// src/app/about/page.tsx
import AboutIntro from "@/app/components/AboutIntro";
import EmailSignup from "@/app/components/EmailSignup";
import Link from "next/link";

export const metadata = {
  title: "About • 100 Songs That Define Heavy Metal",
  description:
    "How the show works, where to listen/watch, and why these songs still matter.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-10 space-y-6 md:space-y-7">
      {/* Intro — intentionally compact */}
      <AboutIntro />

      {/* Email signup CTA between the intro and the next section */}
      <EmailSignup
        className="mt-8"
        heading="Join the community"
        subtext="Get new episodes, behind-the-scenes updates, and more metal!"
      />

      {/* What the show covers */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
        <h2 className="mb-3 text-lg md:text-xl font-semibold text-white">
          What the show covers
        </h2>
        <p className="text-sm md:text-[15px] leading-relaxed text-zinc-300">
          From the New Wave of British Heavy Metal to thrash, death, and beyond,
          we unpack the songs that defined the sound: riffs, production choices,
          historical context, and why they still hit hard today.
        </p>
      </section>

      {/* Browse Episodes CTA */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/episodes"
          className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.45)] focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:ring-offset-2 focus:ring-offset-black"
        >
          Browse Episodes
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
        </Link>
      </div>
    </main>
  );
}
