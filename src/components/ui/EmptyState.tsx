import Link from "next/link";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string; // opcional
  action?: {
    // opcional: un botón con enlace
    href: string;
    label: string;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface/40 px-6 py-16 text-center">
      <SearchX className="size-12 text-portal" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>

      {/* Solo se muestra si nos pasaron description */}
      {description && <p className="mt-1 max-w-md text-sm text-muted">{description}</p>}

      {/* Solo se muestra si nos pasaron action */}
      {action && (
        <Link
          href={action.href}
          className="mt-6 rounded-full bg-portal px-5 py-2 text-sm font-semibold text-bg hover:bg-portal-dark"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}