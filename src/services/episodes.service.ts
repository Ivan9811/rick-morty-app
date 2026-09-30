import type { ApiResponse, Episode, EpisodeFilters } from "@/types";
import { crearQuery, fetchApi } from "./api";

export async function getEpisodes(filtros: EpisodeFilters = {}) {
  const datos = await fetchApi<ApiResponse<Episode>>(`/episode${crearQuery(filtros)}`);
  return datos ?? { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
}

export async function getEpisodeById(id: number) {
  return fetchApi<Episode>(`/episode/${id}`);
}

/**
 * Pide varios episodios en UNA sola llamada: /episode/1,2,3
 * Ojo: si se pide un solo id, la API devuelve un objeto (no una lista).
 */
export async function getEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return []; // sin ids, no llamamos a la API

  const datos = await fetchApi<Episode | Episode[]>(`/episode/${ids.join(",")}`);

  if (!datos) return [];
  // Si llegó una lista, la devolvemos; si llegó un objeto, lo metemos en una lista
  return Array.isArray(datos) ? datos : [datos];
}