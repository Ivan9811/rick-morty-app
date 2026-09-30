import Link from "next/link";

interface InfoItemProps {
  label: string; // título pequeño, p. ej. "Género"
  value: string | number; // el dato, p. ej. "Masculino"
  href?: string | null; // opcional: si existe, el dato es un enlace
}

export function InfoItem({ label, value, href }: InfoItemProps) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 font-semibold">
        {href ? (
          <Link href={href} className="text-portal hover:underline">
            {value}
          </Link>
        ) : (
          value || "—" // si el valor está vacío, muestra una raya
        )}
      </dd>
    </div>
  );
}