import type { ApiResponse, Character, CharacterFilters } from "@/types";
import { crearQuery, fetchApi } from "./api";

/** Lista de personajes con página y filtros opcionales  */
export async function getCharacters(filtros: CharacterFilters = {}) {
  const datos = await fetchApi<ApiResponse<Character>>(`/character${crearQuery(filtros)}`);

  // Si no hubo resultados, devolvemos una lista vacía en vez de null
  return datos ?? { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
}

/** Un solo personaje por su id. */
export async function getCharacterById(id: number) {
  return fetchApi<Character>(`/character/${id}`);
}

/**
 * Pide varios personajes en UNA sola llamada: /character/1,2,3
 * (igual que getEpisodesByIds del paso 9)
 */
export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];

  const datos = await fetchApi<Character | Character[]>(`/character/${ids.join(",")}`);

  if (!datos) return [];
  return Array.isArray(datos) ? datos : [datos];
}