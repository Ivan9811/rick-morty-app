import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SearchParamsRecord } from "@/types";

interface PaginationProps {
  currentPage: number; // página actual
  totalPages: number; // total de páginas (viene de la API: info.pages)
  basePath: string; // ruta de la página, p. ej. "/characters"
  searchParams: SearchParamsRecord; // parámetros actuales (para NO perder los filtros)
}

export function Pagination({ currentPage, totalPages, basePath, searchParams }: PaginationProps) {
  // Si solo hay una página, no mostramos nada
  if (totalPages <= 1) return null;

  /**
   * Arma la URL de una página conservando los demás parámetros.
   * Si estoy en /characters?name=rick y voy a la página 2:
   * → /characters?name=rick&page=2   (¡no se pierde el name!)
   */
  function crearEnlace(pagina: number) {
    const params = new URLSearchParams();

    // Copiamos todos los parámetros actuales, excepto "page"
    for (const [clave, valor] of Object.entries(searchParams)) {
      if (typeof valor === "string" && clave !== "page") {
        params.set(clave, valor);
      }
    }

    params.set("page", String(pagina));
    return `${basePath}?${params.toString()}`;
  }

  const hayAnterior = currentPage > 1;
  const haySiguiente = currentPage < totalPages;

  // Estilos compartidos por los dos botones
  const estiloBoton =
    "flex items-center gap-1 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium transition hover:border-portal hover:text-portal";
  const estiloDeshabilitado =
    "flex items-center gap-1 rounded-lg border border-line/50 px-4 py-2 text-sm text-slate-600";

  return (
    <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-3">
      {/* Botón Anterior: si no hay página anterior, se muestra gris y sin enlace */}
      {hayAnterior ? (
        <Link href={crearEnlace(currentPage - 1)} className={estiloBoton}>
          <ChevronLeft className="size-4" />
          Anterior
        </Link>
      ) : (
        <span className={estiloDeshabilitado}>
          <ChevronLeft className="size-4" />
          Anterior
        </span>
      )}

      {/* Indicador de página */}
      <span className="text-sm text-muted">
        Página <strong className="text-white">{currentPage}</strong> de {totalPages}
      </span>

      {/* Botón Siguiente */}
      {haySiguiente ? (
        <Link href={crearEnlace(currentPage + 1)} className={estiloBoton}>
          Siguiente
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className={estiloDeshabilitado}>
          Siguiente
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}