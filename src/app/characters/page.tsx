import type { Metadata } from "next";
import { CharacterGrid } from "@/components/characters/CharacterGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { leerPagina, leerTexto } from "@/lib/search-params";
import { getCharacters } from "@/services/characters.service";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { CHARACTER_FILTERS } from "@/constants/filters";

// Título de la pestaña del navegador: "Personajes | Rick & Morty Explorer"
export const metadata: Metadata = {
  title: "Personajes",
};

export default async function CharactersPage({ searchParams }: PageProps<"/characters">) {
  // 1. Leemos la URL
  const params = await searchParams; // 👈 CORRECCIÓN 1: esta línea faltaba
  const page = leerPagina(params);

  // Leemos todos los filtros de la URL
  const filtros = {
    name: leerTexto(params, "name"),
    status: leerTexto(params, "status"),
    gender: leerTexto(params, "gender"),
    species: leerTexto(params, "species"),
    type: leerTexto(params, "type"),
  };

  // 2. Pedimos los datos a la API (con página y filtros)
  const { info, results } = await getCharacters({ ...filtros, page });

  // 3. Dibujamos la página
  return (
    <>
      <PageHeader
        title="Personajes"
        description={`Filtra por estado, género, especie o tipo. ${info.count} personajes encontrados.`}
      />

      <FilterPanel fields={CHARACTER_FILTERS} basePath="/characters" values={filtros} />

      {results.length > 0 ? (
        <CharacterGrid characters={results} />
      ) : (
        <EmptyState
          title="No encontramos personajes"
          description="Ningún personaje coincide con los filtros. Prueba con otros valores."
          action={{ href: "/characters", label: "Ver todos" }}
        />
      )}

      <Pagination
        currentPage={page}
        totalPages={info.pages}
        basePath="/characters"
        searchParams={params}
      />
    </>
  );
}