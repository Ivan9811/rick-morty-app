import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CharacterGrid } from "@/components/characters/CharacterGrid";
import { InfoItem } from "@/components/ui/InfoItem";
import { getIdsFromUrls } from "@/lib/utils";
import { getCharactersByIds } from "@/services/characters.service";
import { getEpisodeById } from "@/services/episodes.service";

// Pre-genera los primeros 20 episodios 
export function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({ params }: PageProps<"/episodes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const episodio = await getEpisodeById(Number(id));
  return { title: episodio ? `${episodio.episode} · ${episodio.name}` : "Episodio no encontrado" };
}

export default async function EpisodeDetailPage({ params }: PageProps<"/episodes/[id]">) {
  // 1. Leemos y validamos el id
  const { id } = await params;
  const idNumero = Number(id);

  if (!Number.isInteger(idNumero) || idNumero <= 0) {
    notFound();
  }

  // 2. Pedimos el episodio
  const episodio = await getEpisodeById(idNumero);

  if (!episodio) {
    notFound();
  }

  // 3. Pedimos los personajes del episodio (en una sola llamada)
  const personajes = await getCharactersByIds(getIdsFromUrls(episodio.characters));

  // 4. Dibujamos
  return (
    <>
      <Link
        href="/episodes"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-cyan"
      >
        <ArrowLeft className="size-4" />
        Volver a episodios
      </Link>

      {/* Encabezado del episodio */}
      <header className="rounded-3xl border border-line bg-gradient-to-br from-surface to-surface-2 p-6 sm:p-10">
        <span className="rounded-md bg-cyan/15 px-2.5 py-1 font-mono text-sm font-bold text-cyan">
          {episodio.episode}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{episodio.name}</h1>

        <dl className="mt-8 grid gap-3 sm:grid-cols-3">
          <InfoItem label="Fecha de emisión" value={episodio.air_date} />
          <InfoItem label="Código" value={episodio.episode} />
          <InfoItem label="Personajes" value={episodio.characters.length} />
        </dl>
      </header>

      {/* Personajes del episodio: ¡reutilizamos CharacterGrid del paso 6! */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">Personajes en este episodio</h2>
        <CharacterGrid characters={personajes} />
      </section>
    </>
  );
}