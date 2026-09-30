import { CharacterGrid } from "@/components/characters/CharacterGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCharacters } from "@/services/characters.service";

export default async function HomePage() {
  const { results } = await getCharacters({ page: 1 });

  return (
    <>
      <PageHeader
        title="Rick & Morty Explorer"
        description="Explora los personajes del multiverso."
      />

      {/* Si hay personajes, muestra la cuadrícula; si no, el mensaje vacío */}
      {results.length > 0 ? (
        <CharacterGrid characters={results} />
      ) : (
        <EmptyState
          title="No encontramos personajes"
          description="Prueba con otra búsqueda."
        />
      )}
    </>
  );
}