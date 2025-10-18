// src/app/components/RelatedEpisodes.tsx
import Link from "next/link";
import Image from "next/image";

type EpLite = {
  _id: string;
  title: string;
  slug?: { current?: string | null } | string | null;
  coverImage?: { asset?: { url?: string | null } | null } | null;
  publishedAt?: string | null;
};

function getSlug(slug: EpLite["slug"]) {
  if (!slug) return null;
  if (typeof slug === "string") return slug;
  return slug.current ?? null;
}

const DEFAULT_ART =
  "https://cdn.sanity.io/images/yd8iqvcg/production/8aa72bb1b387eba52a058b29af4c77fa1779985f-3000x3000.heif";

export default function RelatedEpisodes({ items }: { items: EpLite[] }) {
  if (!items?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold text-white">Similar Episodes</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((ep) => {
          const slug = getSlug(ep.slug);
          const href = slug ? `/episode/${slug}` : "#";
          const img = ep.coverImage?.asset?.url || DEFAULT_ART;

          return (
            <article
              key={ep._id}
              className="overflow-hidden rounded-xl bg-zinc-900/40 ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              <Link href={href} className="block relative aspect-[1/1] bg-zinc-900">
                <Image
                  src={img}
                  alt={ep.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Link>
              <div className="p-3">
                <Link href={href} className="block">
                  <h3 className="text-sm font-medium text-zinc-100 line-clamp-2">
                    {ep.title}
                  </h3>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
