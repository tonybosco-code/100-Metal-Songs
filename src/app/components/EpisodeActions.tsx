// src/app/components/EpisodeActions.tsx
import ActionButtons from "@/app/components/ActionButtons";
import { playLink } from "@/app/lib/playLink";
import { videoLink } from "@/app/lib/videoLink";

export default function EpisodeActions({
  title,
  links,
  audioUrl,
  align = "start",
}: {
  title: string;
  links?: Record<string, any> | null;
  audioUrl?: string | null;
  align?: "start" | "center" | "end";
}) {
  // prefer platform helpers; fall back to raw fields
  const listenHref =
    (links ? playLink(links) : null) ?? audioUrl ?? links?.spotify ?? links?.apple ?? links?.rss ?? null;

  const watchHref =
    links?.youtube ?? (links ? videoLink(title, links) : null) ?? null;

  return (
    <div className="mt-3 space-y-2">
      {/* Keep detail page simple: Watch + Listen on one row, icon buttons match the homepage */}
      <ActionButtons
        readHref={null}
        watchHref={watchHref}
        listenHref={listenHref}
        align={align}
      />
    </div>
  );
}
