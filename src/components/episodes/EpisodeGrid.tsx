import type { Episode } from "@/types";
import { EpisodeCard } from "./EpisodeCard";

interface EpisodeGridProps {
  episodes: Episode[];
}

export function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
