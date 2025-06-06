'use client';

import { useState } from 'react';
import PokemonList from '@/components/pokemon/PokemonList';
import PokemonFilters from '@/components/pokemon/PokemonFilters';
import { PokemonFilters as PokemonFiltersType } from '@/types/pokemon';
import { useInfinitePokemonList } from '@/hooks/usePokemonQueries';

export default function PokemonsPage() {
  // État des filtres avec valeurs par défaut
  const [filters, setFilters] = useState<PokemonFiltersType>({
    limit: 50,
    page: 1,
  });

  // Récupération des données avec React Query
  const {
    pokemons,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    totalPokemons,
    refetch,
  } = useInfinitePokemonList(filters);

  // Mise à jour des filtres
  const handleFilterChange = (newFilters: PokemonFiltersType) => {
    setFilters(newFilters);
  };

  // Réinitialisation des filtres
  const handleResetFilters = () => {
    setFilters({
      limit: 50,
      page: 1,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Liste des Pokémons</h1>
      
      {/* Composant de filtres */}
      <PokemonFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
      
      {/* Liste des pokémons */}
      <PokemonList
        pokemons={pokemons}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        totalPokemons={totalPokemons}
      />
    </div>
  );
}