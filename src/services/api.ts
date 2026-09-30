// Dirección base de la API. de donde se va realizar el consume
const API_URL = "https://rickandmortyapi.com/api";

/**
 * Pide datos a la API.
 * - endpoint: la parte final de la URL, por ejemplo "/character?page=2"
 * - Devuelve los datos, o null si la API dice "no encontrado" (404).
 */
export async function fetchApi<T>(endpoint: string): Promise<T | null> {
  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 3600 }, // Next.js guarda la respuesta
  });

  // La API responde 404 cuando no hay resultados (p. ej. un filtro sin coincidencias)
  if (respuesta.status === 404) {
    return null;
  }

  // Cualquier otro error: avisamos
  if (!respuesta.ok) {
    throw new Error("Error al consultar la API");
  }

  return respuesta.json();
}

/**
 * Convierte un objeto de filtros en texto para la URL.
 * Ignora los valores vacíos.
 */
export function crearQuery(filtros: object): string {
  const params = new URLSearchParams();

  for (const [clave, valor] of Object.entries(filtros)) {
    if (valor !== undefined && valor !== "") {
      params.set(clave, String(valor));
    }
  }

  const texto = params.toString();
  return texto ? `?${texto}` : "";
}
