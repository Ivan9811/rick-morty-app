import type { Location } from "@/types";
import { LocationCard } from "./LocationCard";

interface LocationGridProps {
  locations: Location[];
}

export function LocationGrid({ locations }: LocationGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
