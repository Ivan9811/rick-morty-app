import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold">
      {/* Círculo verde tipo "portal" */}
      <span className="grid size-9 place-items-center rounded-full bg-portal/15 ring-2 ring-portal">
        <span className="size-4 rounded-full bg-portal" />
      </span>
      <span className="text-lg">
        Rick <span className="text-portal">&amp;</span> Morty
      </span>
    </Link>
  );
}