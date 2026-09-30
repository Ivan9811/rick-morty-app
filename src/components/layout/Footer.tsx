import Link from "next/link";
import { NAV_LINKS } from "@/constants/navigation";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-surface/50">
      <div className="container-app grid gap-8 py-10 sm:grid-cols-3">
        {/* Columna 1: descripción */}
        <div>
          <p className="font-bold">
            Rick <span className="text-portal">&amp;</span> Morty Explorer
          </p>
          <p className="mt-2 text-sm text-muted">
            PROYECTO ACADEMICO 
          </p>
        </div>


        {/* Columna 3: créditos */}
        <div className="text-sm text-muted">
          <p className="font-semibold text-white">Datos</p>
          <p className="mt-3">
            Información de{" "}
            <a
              href="https://rickandmortyapi.com"
              target="_blank"
              className="text-portal hover:underline"
            >
              The Rick and Morty API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
