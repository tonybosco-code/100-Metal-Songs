// src/sanity/schemas/episode.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),

    // slug (keep your current options if you have them)
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),

    // dates
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "pubDate", title: "Pub Date (Feed)", type: "datetime" }),

    // durations
    defineField({ name: "durationSeconds", title: "Duration (seconds)", type: "number" }),
    defineField({ name: "duration", title: "Duration (fallback)", type: "number" }),

    // descriptions (plain + rich)
    defineField({ name: "descriptionPlain", title: "Description (plain)", type: "text" }),
    defineField({ name: "description", title: "Description (portable text)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "summary", title: "Summary", type: "text" }),

    // artwork
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),

    // audio url (e.g., enclosure)
    defineField({ name: "audioUrl", title: "Audio URL (MP3/RSS)", type: "url" }),

    // ✅ PLATFORM LINKS (this is the bit that was failing)
    defineField({
      name: "links",
      title: "Platform Links",
      type: "object",
      fields: [
        defineField({ name: "rss", title: "Audio (RSS/MP3)", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "spotify", title: "Spotify", type: "url" }),
        defineField({ name: "apple", title: "Apple Podcasts", type: "url" }),
        defineField({ name: "watch", title: "Watch (alt)", type: "url" }),
        defineField({ name: "video", title: "Video (alt)", type: "url" }),
      ],
    }),

    // GUID or any ids you track
    defineField({ name: "guid", title: "GUID", type: "string" }),
  ],
});
