import type { Character } from "@/types";
import { CharacterCard } from "./CharacterCard";

interface CharacterGridProps {
  characters: Character[]; // el [] significa "lista de"
}

export function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}