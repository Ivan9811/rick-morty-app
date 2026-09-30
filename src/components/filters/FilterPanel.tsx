import Form from "next/form";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import type { FilterField } from "@/types";

interface FilterPanelProps {
  fields: FilterField[]; // qué campos dibujar (viene de constants/filters.ts)
  basePath: string; // a qué página enviar el formulario, p. ej. "/characters"
  values: Record<string, string | undefined>; // valores actuales de la URL
}

// Estilo compartido por inputs y selects
const estiloCampo =
  "w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-portal focus:ring-2 focus:ring-portal/30";

export function FilterPanel({ fields, basePath, values }: FilterPanelProps) {
  return (
    <Form
      action={basePath}
      // Si cambian los filtros en la URL, React vuelve a crear el formulario
      // para que los campos muestren los valores nuevos
      key={JSON.stringify(values)}
      className="mb-6 rounded-2xl border border-line bg-surface p-4"
    >
      {/* Un campo por cada elemento de la lista */}
      <div className={`grid gap-3 sm:grid-cols-2 ${fields.length >= 4 ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}>
        {fields.map((field) => (
          <label key={field.name} className="flex flex-col gap-1.5 text-xs font-medium text-muted">
            {field.label}

            {field.type === "select" ? (
              // Campo de selección (Estado, Género)
              <select name={field.name} defaultValue={values[field.name] ?? ""} className={estiloCampo}>
                <option value="">Todos</option>
                {field.options?.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            ) : (
              // Campo de texto (Nombre, Especie, Tipo)
              <input
                type="text"
                name={field.name}
                defaultValue={values[field.name] ?? ""}
                placeholder={field.placeholder}
                className={estiloCampo}
              />
            )}
          </label>
        ))}
      </div>

      {/* Botones */}
      <div className="mt-4 flex justify-end gap-3">
        {/* "Limpiar" es un enlace a la página sin parámetros */}
        <Link
          href={basePath}
          className="flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-portal hover:text-portal"
        >
          <X className="size-4" />
          Limpiar
        </Link>

        <button
          type="submit"
          className="flex items-center gap-1 rounded-full bg-portal px-5 py-2 text-sm font-semibold text-bg hover:bg-portal-dark"
        >
          <SlidersHorizontal className="size-4" />
          Filtrar
        </button>
      </div>
    </Form>
  );
}