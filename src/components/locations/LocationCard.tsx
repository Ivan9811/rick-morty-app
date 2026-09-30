import Link from "next/link";
import { Globe, Users } from "lucide-react";
import type { Location } from "@/types";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <article className="group rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-amber-300/60">
      <Link href={`/locations/${location.id}`} className="block p-5">
        {/* Tipo de ubicación, p. ej. "Planet" */}
        <span className="inline-block rounded-md bg-amber-300/15 px-2 py-0.5 text-xs font-bold text-amber-300">
          {location.type || "Desconocido"}
        </span>

        <h3 className="mt-3 line-clamp-2 font-semibold group-hover:text-amber-300">{location.name}</h3>

        <p className="mt-2 flex items-center gap-1.5 truncate text-sm text-muted">
          <Globe className="size-4 shrink-0" />
          {location.dimension || "Dimensión desconocida"}
        </p>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
          <Users className="size-3.5" />
          {location.residents.length} residentes
        </p>
      </Link>
    </article>
  );
}
