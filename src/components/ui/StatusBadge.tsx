import { STATUS_LABELS } from "@/constants/labels";
import type { CharacterStatus } from "@/types";

// Color del punto según el estado
const COLORES: Record<CharacterStatus, string> = {
  Alive: "bg-emerald-400", // verde
  Dead: "bg-rose-500", // rojo
  unknown: "bg-slate-400", // gris
};

interface StatusBadgeProps {
  status: CharacterStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-medium text-slate-200 backdrop-blur">
      {/* El punto de color */}
      <span className={`size-2 rounded-full ${COLORES[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}