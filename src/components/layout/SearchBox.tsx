"use client"; // necesita useState, onChange y useRouter → Client Component

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

// Props que recibe el componente.
// El "?" significa opcional: se puede usar <SearchBox /> sin pasarle nada.
interface SearchBoxProps {
  onBuscar?: () => void; // función que se ejecuta después de buscar
}

export function SearchBox({ onBuscar }: SearchBoxProps) {
  const router = useRouter();
  const [texto, setTexto] = useState("");

  // Se ejecuta al presionar Enter
  function manejarEnvio(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // evita que el navegador recargue la página

    const busqueda = texto.trim(); // .trim() quita los espacios de los extremos
    if (busqueda === "") return;   // si está vacío, no hacemos nada

    // encodeURIComponent convierte caracteres especiales para la URL
    // (por ejemplo, "Mr. Poopybutthole" → "Mr.%20Poopybutthole")
    router.push(`/characters?name=${encodeURIComponent(busqueda)}`);

    // Si el padre nos pasó onBuscar, lo llamamos (el ?. evita un error si no existe)
    onBuscar?.();
  }

  return (
    <form onSubmit={manejarEnvio} className="relative w-full">
      {/* Ícono de lupa (de la librería Lucide) */}
<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

      <input
        type="search"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar personaje..."
        aria-label="Buscar personaje"
        className="w-full rounded-full border border-line bg-surface py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-portal focus:ring-2 focus:ring-portal/30"
      />
    </form>
  );
}