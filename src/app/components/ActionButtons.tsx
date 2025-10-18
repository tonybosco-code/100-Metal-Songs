// src/app/components/ActionButtons.tsx
import Link from "next/link";
import { Headphones, MonitorPlay } from "lucide-react";

type Props = {
  readHref?: string | null;
  listenHref?: string | null;
  watchHref?: string | null;
  align?: "start" | "center" | "end"; // default center
  className?: string;
};

export default function ActionButtons({
  readHref,
  listenHref,
  watchHref,
  align = "center",
  className = "",
}: Props) {
  const justify =
    align === "start" ? "justify-start" : align === "end" ? "justify-end" : "justify-center";

  return (
    <div className={`mt-3 flex flex-wrap ${justify} gap-2 ${className}`}>
      {readHref && (
        <Link
          href={readHref}
          className="inline-flex items-center rounded-full bg-transparent px-4 py-2 text-sm text-zinc-200 ring-1 ring-white/10 hover:bg-white/5"
        >
          Read more
        </Link>
      )}

      {watchHref && (
        <a
          href={watchHref}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-800/80 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-neutral-700"
        >
          <MonitorPlay className="h-4 w-4" aria-hidden />
          <span>Watch</span>
        </a>
      )}

      {listenHref && (
        <a
          href={listenHref}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          <Headphones className="h-4 w-4" aria-hidden />
          <span>Listen</span>
        </a>
      )}
    </div>
  );
}
