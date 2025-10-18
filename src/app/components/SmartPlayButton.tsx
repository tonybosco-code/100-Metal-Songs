"use client";

import { useMemo } from "react";
import { Play } from "lucide-react";
import clsx from "clsx";

export type Links = Partial<{
  spotify: string;
  apple: string;
  youtube: string;
  amazon: string;
  google: string;
  rss: string;
}>;

type Props = {
  links: Links;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Pick a primary link in a sensible order.
 * Prefer Apple & Spotify (good native support), then YouTube, Amazon, Google, RSS.
 */
function pickPrimary(links: Links): { label: string; url: string } | null {
  const order: Array<keyof Links> = [
    "apple",
    "spotify",
    "youtube",
    "amazon",
    "google",
    "rss",
  ];
  for (const key of order) {
    const val = links[key];
    if (val) {
      const label =
        key === "rss" ? "RSS" : key.charAt(0).toUpperCase() + key.slice(1);
      return { label, url: val };
  }
  }
  return null;
}

export default function SmartPlayButton({ links, size = "sm", className }: Props) {
  const primary = useMemo(() => pickPrimary(links), [links]);

  const handleClick = () => {
    if (!primary?.url) return;
    // Open user’s preferred app in a new tab, keep your site open
    window.open(primary.url, "_blank", "noopener,noreferrer");
  };

  const base =
    "inline-flex items-center gap-2 rounded-full font-medium transition focus:outline-none focus:ring-2 focus:ring-blood/40";
  const styles =
    size === "md"
      ? "px-4 py-2 text-sm bg-blood/90 hover:bg-blood text-white"
      : "px-3 py-1.5 text-xs bg-blood/80 hover:bg-blood text-white";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(base, styles, className)}
      aria-label={primary ? `Play on ${primary.label}` : "Play"}
      disabled={!primary}
      title={primary ? `Play on ${primary.label}` : "No links available"}
    >
      <Play className="h-4 w-4" />
      {primary ? "Play" : "Play"}
    </button>
  );
}
