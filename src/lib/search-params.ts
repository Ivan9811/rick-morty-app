import type { SearchParamsRecord } from "@/types";

/**
 * Lee un parámetro de texto de la URL.
 * ?name=rick  →  leerTexto(params, "name")  →  "rick"
 * Si no existe o está vacío, devuelve undefined.
 */
export function leerTexto(params: SearchParamsRecord, clave: string): string | undefined {
  const valor = params[clave];

  // Si alguien repite el parámetro (?name=a&name=b), llega como lista; tomamos el primero
  const texto = Array.isArray(valor) ? valor[0] : valor;

  return texto?.trim() || undefined;
}

/**
 * Lee el número de página. Siempre devuelve un número válido (mínimo 1).
 * ?page=3 → 3   |   ?page=abc → 1   |   (sin page) → 1
 */
export function leerPagina(params: SearchParamsRecord): number {
  const pagina = Number(leerTexto(params, "page"));

  if (Number.isInteger(pagina) && pagina > 0) {
    return pagina;
  }
  return 1;
}
