// src/app/components/ShowIntroSection.tsx
"use client";

import Image from "next/image";
import ShowIntroPanel from "./ShowIntroPanel";

export default function ShowIntroSection() {
  return (
    <section className="relative">
      {/* Mobile-only brand banner (uses the v2 file under /public) */}
      <div className="block md:hidden mb-4 -mx-1 sm:mx-0">
        <Image
          src="/logo-banner-v2.webp"
          alt="100 Songs That Define Heavy Metal"
          width={1600}
          height={420}
          priority
          sizes="(max-width: 640px) 96vw, 600px"
          className="w-full h-16 sm:h-20 object-contain rounded-lg ring-1 ring-white/10"
        />
      </div>

      {/* Existing intro panel */}
      <ShowIntroPanel />
    </section>
  );
}
