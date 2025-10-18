// src/app/episodes/page.tsx
import EpisodesGrid from "../components/EpisodesGrid";

export const metadata = {
  title: "Episodes • 100 Metal Songs",
  description: "Browse the archive of episodes.",
};

export default function EpisodesPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-8">
      <h1 className="text-2xl font-semibold text-white mb-6">Episodes</h1>
      <EpisodesGrid />
    </main>
  );
}
