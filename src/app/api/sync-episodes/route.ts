// src/app/api/sync-episodes/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { parseStringPromise } from "xml2js";
import slugify from "slugify";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN; // required for upsert
const FEED_URL =
  process.env.PODCAST_FEED_URL || "https://feeds.megaphone.fm/100heavymetal";

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: false,
  token: WRITE_TOKEN,
});

function makeSlug(title: string, pubIso?: string) {
  const base = slugify(title, { lower: true, strict: true });
  if (!pubIso) return base;
  const y = new Date(pubIso).getFullYear();
  return `${base}-${y}`;
}

function parseDurationToSeconds(itunesDuration: unknown): number | undefined {
  if (!itunesDuration || typeof itunesDuration !== "string") return undefined;
  const parts = itunesDuration.split(":").map((n) => Number(n));
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  const n = Number(itunesDuration);
  return Number.isFinite(n) ? n : undefined;
}

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export async function GET() {
  if (!WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Missing SANITY_WRITE_TOKEN" },
      { status: 400 }
    );
  }
  if (!PROJECT_ID) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID" },
      { status: 400 }
    );
  }

  try {
    // 1) Fetch feed
    const rss = await fetch(FEED_URL, { cache: "no-store" });
    if (!rss.ok) throw new Error(`Feed fetch failed: ${rss.status}`);
    const xml = await rss.text();

    // 2) Parse feed
    const parsed: any = await parseStringPromise(xml, {
      explicitArray: false,
      mergeAttrs: true,
    });
    const channel = parsed?.rss?.channel;
    const items: any[] = channel?.item
      ? Array.isArray(channel.item)
        ? channel.item
        : [channel.item]
      : [];

    let created = 0;
    let updated = 0;
    const touched: string[] = [];
    const errors: { title?: string; guid?: string; message: string }[] = [];

    // 3) Process items
    for (const it of items) {
      try {
        const title: string = (it?.title || "").toString().trim();
        if (!title) continue;

        const guidVal: string | null =
          (it?.guid?._ || it?.guid || "").toString().trim() || null;

        const pubDateIso: string | undefined = it?.pubDate
          ? new Date(it.pubDate).toISOString()
          : undefined;

        const durationSeconds: number | undefined = parseDurationToSeconds(
          it?.["itunes:duration"]
        );

        const enclosureUrl: string | null = it?.enclosure?.url || null;

        // Prefer string description for now; your Studio renderer can use portable text later
        const description: string =
          (it?.description || "").toString();

        const baseSlug = makeSlug(title, pubDateIso);

        // 3a) Extract YouTube URL
        const rawLink: string = (it?.link?._ ?? it?.link ?? "")
          .toString()
          .trim();

        const bodyHtml =
          (typeof it?.["content:encoded"] === "string"
            ? it["content:encoded"]
            : "") +
          " " +
          (typeof it?.description === "string" ? it.description : "");

        const YT =
          /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^ \n\r\t"]*v=[\w\-]+[^ \n\r\t"]*|youtu\.be\/[\w\-]+[^ \n\r\t"]*))/i;

        let youtubeUrl: string | null = null;
        if (rawLink && /(youtube\.com|youtu\.be)/i.test(rawLink)) {
          youtubeUrl = rawLink;
        } else {
          const m = bodyHtml.match(YT);
          youtubeUrl = m ? m[0] : null;
        }

        // 3b) Build doc payload
        const baseDoc: any = {
          _type: "episode",
          title,
          slug: { _type: "slug", current: baseSlug },
          publishedAt: pubDateIso,
          description,
          duration: durationSeconds,
          audioUrl: enclosureUrl,
          guid: guidVal,
          links: {
            rss: enclosureUrl || null,
            ...(youtubeUrl ? { youtube: youtubeUrl } : {}),
          },
        };

        // 3c) Find existing by guid (best) or slug (fallback)
        const existingByGuid = guidVal
          ? await client.fetch(
              '*[_type=="episode" && guid==$g][0]{ _id, links }',
              { g: guidVal }
            )
          : null;

        const existingBySlug = existingByGuid
          ? null
          : await client.fetch(
              '*[_type=="episode" && slug.current==$s][0]{ _id, links }',
              { s: baseSlug }
            );

        const existingDoc = existingByGuid || existingBySlug;

        // 3d) Upsert using a stable _id where possible
        const chosenId: string | undefined =
          existingDoc?._id ?? (guidVal ? `episode-${guidVal}` : undefined);

        let usedDocId: string;

        if (chosenId) {
          await client.createOrReplace({ _id: chosenId, ...baseDoc });
          updated++;
          touched.push(chosenId);
          usedDocId = chosenId;
        } else {
          const createdDoc = await client.create(baseDoc);
          created++;
          touched.push(createdDoc._id);
          usedDocId = createdDoc._id;
        }

        // 3e) Ensure links.youtube persisted (idempotent)
        if (youtubeUrl) {
          const alreadySame = existingDoc?.links?.youtube === youtubeUrl;
          if (!alreadySame) {
            await client
              .patch(usedDocId)
              .setIfMissing({ links: {} })
              .set({ "links.youtube": youtubeUrl })
              .commit();
          }
        }
      } catch (err: any) {
        errors.push({
          title: (it?.title || "").toString(),
          guid: (it?.guid?._ || it?.guid || "").toString(),
          message: err?.message || String(err),
        });
      }
    }

    // 4) Done
    return NextResponse.json({
      ok: true,
      feedItems: items.length,
      created,
      updated,
      touchedCount: touched.length,
      errors,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
