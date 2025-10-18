// src/app/api/sync-links/route.ts
import Parser from "rss-parser";
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2023-10-01",
  useCdn: false,
});

const FEED_URL = "https://feeds.megaphone.fm/100heavymetal";

export async function GET(req: Request) {
  try {
    const parser = new Parser({
      customFields: {
        item: [["itunes:image", "itunesImage"]],
      },
    });

    const feed = await parser.parseURL(FEED_URL);

    let updatedCount = 0;
    const updated: any[] = [];
    const errors: any[] = [];

    for (const item of feed.items) {
      try {
        const guid = item.guid?.trim();
        if (!guid) continue;

        const docId = `episode-${guid}`;
        const title = item.title?.trim() || "Untitled Episode";
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

        // 🎵 Basic URLs
        const rssUrl = item.enclosure?.url || item.link || null;
        const webUrl = item.link || null;

        // 🖼️ Cover art (tries iTunes image first, then enclosure)
        const coverUrl =
          (item.itunesImage as string) ||
          (item.itunes?.image as string) ||
          item.enclosure?.url ||
          item.image?.url ||
          null;

        // 🧾 Description
        const description = item.contentSnippet || item.content || null;

        // 🕒 Publish date
        const publishedAt = item.pubDate ? new Date(item.pubDate) : null;

        // --- 1️⃣ Ensure doc exists ---
        await client.createIfNotExists({
          _id: docId,
          _type: "episode",
          title,
          slug: { current: slug },
        });

        // --- 2️⃣ Patch fields (idempotent updates) ---
        await client
          .patch(docId)
          .setIfMissing({ links: {}, cover: {} })
          .set({
            "links.rss": rssUrl ?? null,
            "links.web": webUrl ?? null,
            "cover.url": coverUrl ?? null,
            description,
            publishedAt,
          })
          .commit();

        updatedCount++;
        updated.push({
          title,
          coverUrl,
          rssUrl,
          description: description?.slice(0, 80) + "...",
        });
      } catch (err: any) {
        errors.push({
          title: item.title,
          guid: item.guid,
          message: err.message,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      feedItems: feed.items.length,
      updatedCount,
      updated,
      errors,
    });
  } catch (err: any) {
    console.error("Sync error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
