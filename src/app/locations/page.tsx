import type { Metadata } from "next";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { LocationGrid } from "@/components/locations/LocationGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { LOCATION_FILTERS } from "@/constants/filters";
import { leerPagina, leerTexto } from "@/lib/search-params";
import { getLocations } from "@/services/locations.service";

export const metadata: Metadata = {
  title: "Ubicaciones",
};

export default async function LocationsPage({ searchParams }: PageProps<"/locations">) {
  // 1. Leemos la URL
  const params = await searchParams;
  const page = leerPagina(params);

  const filtros = {
    name: leerTexto(params, "name"),
    type: leerTexto(params, "type"),
    dimension: leerTexto(params, "dimension"),
  };

  // 2. Pedimos los datos
  const { info, results } = await getLocations({ ...filtros, page });

  // 3. Dibujamos
  return (
    <>
      <PageHeader
        title="Ubicaciones"
        description={`Planetas, estaciones espaciales, dimensiones y más. ${info.count} ubicaciones encontradas.`}
      />

      <FilterPanel fields={LOCATION_FILTERS} basePath="/locations" values={filtros} />

      {results.length > 0 ? (
        <LocationGrid locations={results} />
      ) : (
        <EmptyState
          title="No encontramos ubicaciones"
          description="Ninguna ubicación coincide con los filtros."
          action={{ href: "/locations", label: "Ver todas" }}
        />
      )}

      <Pagination
        currentPage={page}
        totalPages={info.pages}
        basePath="/locations"
        searchParams={params}
      />
    </>
  );
}
