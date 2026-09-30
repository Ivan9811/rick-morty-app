import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";
import type { Episode } from "@/types";

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className="group rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-cyan/60">
      <Link href={`/episodes/${episode.id}`} className="block p-5">
        {/* Código del episodio, p. ej. S01E01 */}
        <span className="inline-block rounded-md bg-cyan/15 px-2 py-0.5 font-mono text-xs font-bold text-cyan">
          {episode.episode}
        </span>

        {/* line-clamp-2: máximo 2 líneas; si es más largo, pone "..." */}
        <h3 className="mt-3 line-clamp-2 font-semibold group-hover:text-cyan">{episode.name}</h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <CalendarDays className="size-4" />
          {episode.air_date}
        </p>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
          <Users className="size-3.5" />
          {episode.characters.length} personajes
        </p>
      </Link>
    </article>
  );
}