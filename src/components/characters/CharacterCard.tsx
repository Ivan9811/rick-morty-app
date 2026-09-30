import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Character } from "@/types";

interface CharacterCardProps {
  character: Character; // recibe un personaje completo
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-portal/60">
      {/* Toda la tarjeta es un enlace al detalle  */}
      <Link href={`/characters/${character.id}`}>
        {/* Contenedor de la imagen: cuadrado (aspect-square) */}
        <div className="relative aspect-square overflow-hidden bg-surface-2">
          <Image
            src={character.image}
            alt={character.name}
            fill // la imagen ocupa todo el contenedor
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          {/* Etiqueta de estado encima de la foto, en la esquina */}
          <div className="absolute left-3 top-3">
            <StatusBadge status={character.status} />
          </div>
        </div>

        {/* Textos */}
        <div className="p-4">
          <h3 className="truncate font-semibold group-hover:text-portal">{character.name}</h3>
          <p className="text-sm text-muted">{character.species}</p>

          <p className="mt-3 flex items-center gap-1 truncate text-xs text-slate-400">
            <MapPin className="size-3.5 shrink-0" />
            {character.location.name}
          </p>
        </div>
      </Link>
    </article>
  );
}