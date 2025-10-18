import { groq } from "next-sanity";

/** Single source of truth for what our pages/components need */
export const EPISODE_FIELDS = groq`{
  _id,
  title,
  "slug": select(
    defined(slug.current) => slug.current,
    defined(slug) && slug match "*/*" => slug,
    null
  ),
  description,
  "descriptionPlain": pt::text(coalesce(description, body)),
  duration,
  publishedAt,
  pubDate,
  _createdAt,
  coverImage{ asset->{ url } },
  links
}`;

export const EP_SORT = groq`coalesce(publishedAt, pubDate, _createdAt) desc`;
