import type { Metadata } from "next";
import { EpisodeGrid } from "@/components/episodes/EpisodeGrid";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { EPISODE_FILTERS } from "@/constants/filters";
import { leerPagina, leerTexto } from "@/lib/search-params";
import { getEpisodes } from "@/services/episodes.service";

export const metadata: Metadata = {
  title: "Episodios",
};

export default async function EpisodesPage({ searchParams }: PageProps<"/episodes">) {
  // 1. Leemos la URL
  const params = await searchParams;
  const page = leerPagina(params);

  const filtros = {
    name: leerTexto(params, "name"),
    episode: leerTexto(params, "episode"),
  };

  // 2. Pedimos los datos
  const { info, results } = await getEpisodes({ ...filtros, page });

  // 3. Dibujamos
  return (
    <>
      <PageHeader
        title="Episodios"
        description={`Cada aventura de Rick y Morty, temporada por temporada. ${info.count} episodios encontrados.`}
      />

      <FilterPanel fields={EPISODE_FILTERS} basePath="/episodes" values={filtros} />

      {results.length > 0 ? (
        <EpisodeGrid episodes={results} />
      ) : (
        <EmptyState
          title="No encontramos episodios"
          description="Ningún episodio coincide con la búsqueda."
          action={{ href: "/episodes", label: "Ver todos" }}
        />
      )}

      <Pagination
        currentPage={page}
        totalPages={info.pages}
        basePath="/episodes"
        searchParams={params}
      />
    </>
  );
}