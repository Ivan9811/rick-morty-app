import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      title="404 · Esta dimensión no existe"
      description="Parece que el portal te llevó a un lugar que no está en el mapa."
      action={{ href: "/", label: "Volver al inicio" }}
    />
  );
}