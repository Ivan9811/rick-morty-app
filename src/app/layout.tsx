import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rick & Morty Explorer",
    template: "%s | Rick & Morty Explorer",
  },
  description: "Explora personajes, episodios y ubicaciones de Rick and Morty.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="container-app flex-1 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}