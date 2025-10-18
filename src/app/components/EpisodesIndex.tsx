"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { playLink, EpisodeLinks } from "@/app/lib/playLink";

export type EpisodeListItem = {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string | any[];
  durationSec?: number | null;
  publishedAt?: string | null;
  coverImage?: { asset?: { url?: string }; alt?: string };
  links?: EpisodeLinks | null;
};

function formatDuration(s?: number | null) {
  if (!s || s < 1) return null;
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export default function EpisodesIndex({
  episodes,
  page = 1,
  perPage = 10,
}: {
  episodes: EpisodeListItem[];
  page?: number;
  perPage?: number;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return episodes;
    return episodes.filter((e) =>
      `${e.title} ${typeof e.description === "string" ? e.description : ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [episodes, q]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const clampedPage = Math.min(Math.max(1, page), pageCount);
  const start = (clampedPage - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  return (
    <section className="mx-auto mt-8 max-w-[1100px] px-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-zinc-200">
          Episodes
          <span className="ml-2 text-sm text-zinc-500">
            {total} episode{total === 1 ? "" : "s"} · Updated regularly
          </span>
        </h2>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search episodes..."
          className="w-[260px] rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <ul className="space-y-6">
        {current.map((e) => {
          const href = playLink(e.links);
          const toEpisode = e.slug?.current ? `/episode/${e.slug.current}` : "#";
          const dur = formatDuration(e.durationSec ?? null);

          return (
            <li
              key={e._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 hover:bg-zinc-900"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-xl border border-zinc-800 bg-black">
                  {e.coverImage?.asset?.url ? (
                    <Image
                      src={e.coverImage.asset.url}
                      alt={e.coverImage?.alt ?? e.title}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  ) : null}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Link
                      prefetch={false}
                      href={toEpisode}
                      className="text-base font-semibold text-zinc-100 hover:underline"
                    >
                      {e.title}
                    </Link>
                    {dur ? (
                      <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                        {dur}
                      </span>
                    ) : null}
                  </div>

                  {/* description (clamped) */}
                  {typeof e.description === "string" ? (
                    <p className="mt-1 line-clamp-2 max-w-[800px] text-sm text-zinc-400">
                      {e.description}
                    </p>
                  ) : null}

                  <div className="mt-3 flex items-center gap-3">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
                      >
                        ▶ Play
                      </a>
                    ) : (
                      <Link
                        prefetch={false}
                        href={toEpisode}
                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
                      >
                        ▶ Play
                      </Link>
                    )}

                    <Link
                      prefetch={false}
                      href={toEpisode}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3.5 py-1.5 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* pagination directly under list */}
      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            prefetch={false}
            href={clampedPage > 1 ? `?page=${clampedPage - 1}` : `?page=1`}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              clampedPage > 1
                ? "border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-600 pointer-events-none"
            }`}
          >
            ← Previous
          </Link>
          <span className="text-sm text-zinc-400">
            Page {clampedPage} of {pageCount}
          </span>
          <Link
            prefetch={false}
            href={
              clampedPage < pageCount
                ? `?page=${clampedPage + 1}`
                : `?page=${pageCount}`
            }
            className={`rounded-full border px-3 py-1.5 text-sm ${
              clampedPage < pageCount
                ? "border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-600 pointer-events-none"
            }`}
          >
            Next →
          </Link>
        </div>
      )}
    </section>
  );
}
