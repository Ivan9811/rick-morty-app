import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InfoItem } from "@/components/ui/InfoItem";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GENDER_LABELS } from "@/constants/labels";
import { getIdFromUrl, getIdsFromUrls } from "@/lib/utils";
import { getCharacterById } from "@/services/characters.service";
import { getEpisodesByIds } from "@/services/episodes.service";

/**
 * Pre-genera los primeros 20 personajes al hacer "npm run build".
 * Esas páginas quedan listas de antemano (súper rápidas).
 * El resto (21 a 826) se genera la primera vez que alguien las visita.
 */
export function generateStaticParams() {
  // Crea [{ id: "1" }, { id: "2" }, ..., { id: "20" }]
  return Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));
}

/** Título de la pestaña con el nombre del personaje, p. ej. "Rick Sanchez | Rick & Morty Explorer" */
export async function generateMetadata({ params }: PageProps<"/characters/[id]">): Promise<Metadata> {
  const { id } = await params;
  const personaje = await getCharacterById(Number(id));
  return { title: personaje?.name ?? "Personaje no encontrado" };
}

/** Convierte la URL de una ubicación en un enlace interno: ".../location/3" → "/locations/3" */
function enlaceUbicacion(url: string) {
  const id = getIdFromUrl(url);
  return id ? `/locations/${id}` : null;
}

export default async function CharacterDetailPage({ params }: PageProps<"/characters/[id]">) {
  // 1. Leemos el id de la URL y lo validamos
  const { id } = await params;
  const idNumero = Number(id);

  if (!Number.isInteger(idNumero) || idNumero <= 0) {
    notFound(); // /characters/abc → muestra la página 404
  }

  // 2. Pedimos el personaje
  const personaje = await getCharacterById(idNumero);

  if (!personaje) {
    notFound(); // /characters/99999 → no existe → 404
  }

  // 3. Pedimos sus episodios (todos en una sola llamada)
  const episodios = await getEpisodesByIds(getIdsFromUrls(personaje.episode));

  // 4. Dibujamos
  return (
    <>
      {/* Enlace para volver */}
      <Link
        href="/characters"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-portal"
      >
        <ArrowLeft className="size-4" />
        Volver a personajes
      </Link>

      {/* Parte superior: foto a la izquierda y datos a la derecha (en celular, uno debajo del otro) */}
      <article className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-line">
          <Image
            src={personaje.image}
            alt={personaje.name}
            fill
            priority // se carga primero porque es lo más importante de la página
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <StatusBadge status={personaje.status} />
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{personaje.name}</h1>
          <p className="mt-2 text-lg text-muted">{personaje.species}</p>

          {/* Cajitas de datos: 1 columna en celular, 2 desde tablet */}
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            <InfoItem label="Género" value={GENDER_LABELS[personaje.gender]} />
            <InfoItem label="Especie" value={personaje.species} />
            <InfoItem label="Tipo" value={personaje.type} />
            <InfoItem label="Episodios" value={personaje.episode.length} />
            <InfoItem
              label="Origen"
              value={personaje.origin.name}
              href={enlaceUbicacion(personaje.origin.url)}
            />
            <InfoItem
              label="Última ubicación"
              value={personaje.location.name}
              href={enlaceUbicacion(personaje.location.url)}
            />
          </dl>
        </div>
      </article>

      {/* Lista de episodios */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">Aparece en {episodios.length} episodios</h2>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {episodios.map((ep) => (
            <li key={ep.id}>
              <Link
                href={`/episodes/${ep.id}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition hover:border-cyan/60"
              >
                <span className="rounded-md bg-cyan/15 px-2 py-0.5 font-mono text-xs font-bold text-cyan">
                  {ep.episode}
                </span>
                <span className="truncate text-sm font-medium">{ep.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}