"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className={clsx(
        "px-3 py-2 text-sm rounded-md transition",
        pathname === href
          ? "text-white bg-white/10"
          : "text-white/70 hover:text-white hover:bg-white/5"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-red-500 shadow-[0_0_12px_theme(colors.red.500)]" />
          <span className="text-sm tracking-widest text-red-300/90">
            100 METAL SONGS
          </span>
        </Link>
<nav className="flex items-center gap-1">
  <NavLink href="/">Home</NavLink>
  <NavLink href="/about">About</NavLink>
  <NavLink href="/episodes">Episodes</NavLink>
</nav>
      </div>
    </header>
  );
}
