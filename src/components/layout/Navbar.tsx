"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/constants/navigation";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { Menu, X } from "lucide-react";

export function Navbar() {
  // URL actual, por ejemplo "/characters"
  const pathname = usePathname();

  // ¿El menú del celular está abierto?
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Dice si un enlace corresponde a la página actual
  function estaActivo(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href); // "/characters/5" también activa "Personajes"
  }

  // Creamos los enlaces UNA vez y los usamos en escritorio y en celular
  const enlaces = NAV_LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setMenuAbierto(false)} // al navegar, se cierra el menú
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        estaActivo(link.href)
          ? "bg-portal/15 text-portal" // activo
          : "text-slate-300 hover:bg-surface-2 hover:text-white" // normal
      }`}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="container-app flex h-16 items-center gap-4">
        <Logo />

        {/* Menú de escritorio: oculto en celular (hidden), visible desde lg */}
        <div className="hidden gap-1 lg:flex">{enlaces}</div>

        {/* Buscador de escritorio: oculto en celular, visible desde md (tablet) */}
        <div className="ml-auto hidden w-72 md:block">
          <SearchBox />
        </div>

        {/* Botón ☰: solo en celular (lg:hidden) */}
        <button
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="ml-auto grid size-10 place-items-center rounded-lg border border-line md:ml-0 lg:hidden"
          aria-label="Abrir o cerrar menú"
        >
          {menuAbierto ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Menú del celular: solo se muestra si menuAbierto es true */}
      {menuAbierto && (
        <div className="border-t border-line lg:hidden">
          <div className="container-app flex flex-col gap-1 py-4">
            {/* Buscador dentro del menú (solo en celular) */}
            <div className="mb-3 md:hidden">
              <SearchBox onBuscar={() => setMenuAbierto(false)} />
            </div>
            {enlaces}
          </div>
        </div>
      )}
    </header>
  );
}
