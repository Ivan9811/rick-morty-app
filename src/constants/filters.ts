import type { FilterField } from "@/types";
import { GENDER_LABELS, STATUS_LABELS } from "./labels";

/**
 * Convierte las traducciones en opciones para un <select>.
 * { Alive: "Vivo", Dead: "Muerto" }
 *   →  [{ value: "Alive", label: "Vivo" }, { value: "Dead", label: "Muerto" }]
 */
function crearOpciones(traducciones: Record<string, string>) {
  return Object.entries(traducciones).map(([value, label]) => ({ value, label }));
}

// Filtros de la página de personajes
export const CHARACTER_FILTERS: FilterField[] = [
  { name: "name", label: "Nombre", type: "text", placeholder: "Rick, Morty..." },
  { name: "status", label: "Estado", type: "select", options: crearOpciones(STATUS_LABELS) },
  { name: "gender", label: "Género", type: "select", options: crearOpciones(GENDER_LABELS) },
  { name: "species", label: "Especie", type: "text", placeholder: "Human, Alien..." },
  { name: "type", label: "Tipo", type: "text", placeholder: "Parasite, Clone..." },
];

// Filtros de la página de episodios
export const EPISODE_FILTERS: FilterField[] = [
  { name: "name", label: "Nombre", type: "text", placeholder: "Pilot, Rixty..." },
  {
    name: "episode", // la API filtra por código: "S01" trae todos los de la temporada 1
    label: "Temporada",
    type: "select",
    options: [
      { value: "S01", label: "Temporada 1" },
      { value: "S02", label: "Temporada 2" },
      { value: "S03", label: "Temporada 3" },
      { value: "S04", label: "Temporada 4" },
      { value: "S05", label: "Temporada 5" },
    ],
  },
];
// Filtros de la página de ubicaciones
export const LOCATION_FILTERS: FilterField[] = [
  { name: "name", label: "Nombre", type: "text", placeholder: "Earth, Citadel..." },
  { name: "type", label: "Tipo", type: "text", placeholder: "Planet, Space station..." },
  { name: "dimension", label: "Dimensión", type: "text", placeholder: "C-137, Replacement..." },
];
