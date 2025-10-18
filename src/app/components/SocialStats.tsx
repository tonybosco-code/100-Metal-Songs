// src/app/components/SocialStats.tsx
import { Users, Headphones, Globe, Star } from "lucide-react";

export default function SocialStats() {
  const items = [
    {
      icon: Users,
      value: "85k+",
      label: "Monthly listeners",
    },
    {
      icon: Headphones,
      value: "2.1M+",
      label: "All-time downloads",
    },
    {
      icon: Globe,
      value: "100+",
      label: "Countries reached",
    },
    {
      icon: Star,
      value: "4.9 / 5",
      label: "Average rating",
    },
  ];

  return (
    <section className="mx-auto mt-10 max-w-[1200px] px-4 md:mt-12 lg:mt-14">
      <div
        className="
          grid grid-cols-2 gap-4 md:grid-cols-4
          rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-4
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]
        "
      >
        {items.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-3 hover:border-zinc-800/80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-600/20 bg-red-600/10 text-red-300">
              <Icon size={18} />
            </div>
            <div>
              <div className="text-lg font-semibold text-zinc-100">{value}</div>
              <div className="text-xs text-zinc-400">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
