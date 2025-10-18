// src/app/components/SiteHeader.tsx
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-sm supports-[backdrop-filter]:bg-black/50">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-8">
        {/* Logo / Title */}
        <Link
          href="/"
          className="relative font-black tracking-wide text-lg md:text-xl text-transparent bg-gradient-to-r from-red-600 via-red-400 to-white bg-clip-text"
        >
          100 METAL SONGS
          <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-gradient-to-r from-red-600/70 via-red-400/40 to-transparent"></span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-medium text-white/70">
          <Link
            href="/"
            className="transition hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,31,42,0.7)]"
          >
            Home
          </Link>
          <Link
            href="/#episodes"
            className="transition hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,31,42,0.7)]"
          >
            Episodes
          </Link>
        </nav>
      </div>
    </header>
  );
}
