/**
 * Saca el número del final de una URL de la API.
 * "https://rickandmortyapi.com/api/episode/28"  →  28
 * Si no hay número válido, devuelve null.
 */
export function getIdFromUrl(url: string): number | null {
  const ultimaParte = url.split("/").pop(); // divide por "/" y toma el último pedazo: "28"
  const id = Number(ultimaParte);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * Lo mismo, pero para una lista de URLs.
 * ["…/episode/1", "…/episode/2"]  →  [1, 2]
 */
export function getIdsFromUrls(urls: string[]): number[] {
  const ids: number[] = [];
  for (const url of urls) {
    const id = getIdFromUrl(url);
    if (id !== null) ids.push(id);
  }
  return ids;
}