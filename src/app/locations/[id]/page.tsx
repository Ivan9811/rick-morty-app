import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CharacterGrid } from "@/components/characters/CharacterGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { InfoItem } from "@/components/ui/InfoItem";
import { getIdsFromUrls } from "@/lib/utils";
import { getCharactersByIds } from "@/services/characters.service";
import { getLocationById } from "@/services/locations.service";

// Pre-genera las primeras 20 ubicaciones en el build (SSG)
export function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[id]">): Promise<Metadata> {
  const { id } = await params;
  const ubicacion = await getLocationById(Number(id));
  return { title: ubicacion?.name ?? "Ubicación no encontrada" };
}

export default async function LocationDetailPage({ params }: PageProps<"/locations/[id]">) {
  // 1. Leemos y validamos el id
  const { id } = await params;
  const idNumero = Number(id);

  if (!Number.isInteger(idNumero) || idNumero <= 0) {
    notFound();
  }

  // 2. Pedimos la ubicación
  const ubicacion = await getLocationById(idNumero);

  if (!ubicacion) {
    notFound();
  }

  // 3. Pedimos los residentes (en una sola llamada)
  const residentes = await getCharactersByIds(getIdsFromUrls(ubicacion.residents));

  // 4. Dibujamos
  return (
    <>
      <Link
        href="/locations"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-amber-300"
      >
        <ArrowLeft className="size-4" />
        Volver a ubicaciones
      </Link>

      <header className="rounded-3xl border border-line bg-gradient-to-br from-surface to-surface-2 p-6 sm:p-10">
        <span className="rounded-md bg-amber-300/15 px-2.5 py-1 text-sm font-bold text-amber-300">
          {ubicacion.type || "Desconocido"}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{ubicacion.name}</h1>

        <dl className="mt-8 grid gap-3 sm:grid-cols-3">
          <InfoItem label="Tipo" value={ubicacion.type} />
          <InfoItem label="Dimensión" value={ubicacion.dimension} />
          <InfoItem label="Residentes" value={ubicacion.residents.length} />
        </dl>
      </header>

      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">Residentes</h2>

        {/* Si hay residentes, la cuadrícula; si no, el mensaje vacío */}
        {residentes.length > 0 ? (
          <CharacterGrid characters={residentes} />
        ) : (
          <EmptyState
            title="Sin residentes conocidos"
            description="No hay personajes registrados en esta ubicación."
          />
        )}
      </section>
    </>
  );
}
