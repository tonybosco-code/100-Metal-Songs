// src/image.ts
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "@/sanity/client";

/**
 * Reusable Sanity image URL builder.
 * Usage: urlFor(doc.coverImage).width(800).height(800).url()
 */
const builder: ImageUrlBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
