export interface NavLink {
  href: string;   // a dónde lleva
  label: string;  // texto visible
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/characters", label: "Personajes" },
  { href: "/episodes", label: "Episodios" },
  { href: "/locations", label: "Ubicaciones" },
  { href: "/favorites", label: "Favoritos" },
];