import type { ApiResponse, Location, LocationFilters } from "@/types";
import { crearQuery, fetchApi } from "./api";

/** Lista de ubicaciones (con página y filtros opcionales). */
export async function getLocations(filtros: LocationFilters = {}) {
  const datos = await fetchApi<ApiResponse<Location>>(`/location${crearQuery(filtros)}`);
  return datos ?? { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
}

/** Una sola ubicación por su id. */
export async function getLocationById(id: number) {
  return fetchApi<Location>(`/location/${id}`);
}
