import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import sanityConfig from "@/sanity/config";

const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion ?? "2022-06-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

/** Build a Sanity image URL from an asset ref */
export function urlFor(source: string) {
  return builder.image(source);
}
