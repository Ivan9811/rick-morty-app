import type { CharacterGender, CharacterStatus } from "@/types";

// Record<A, B> = "un objeto donde cada clave de tipo A tiene un valor de tipo B"
export const STATUS_LABELS: Record<CharacterStatus, string> = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
};

export const GENDER_LABELS: Record<CharacterGender, string> = {
  Female: "Femenino",
  Male: "Masculino",
  Genderless: "Sin género",
  unknown: "Desconocido",
};