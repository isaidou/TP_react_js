import React from 'react';
import { PokemonBasic } from '@/types/pokemon';
import PokemonCard from './PokemonCard';
import Loading from '@/components/common/Loading';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface PokemonListProps {
  pokemons: PokemonBasic[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  totalPokemons: number;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  totalPokemons,
}) => {
  const { ref } = useInfiniteScroll({
    onReachEnd: fetchNextPage,
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md p-6">
        <Loading size="lg" />
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun Pokémon trouvé</h3>
        <p className="text-gray-600">
          Essayez de modifier vos filtres pour voir plus de résultats.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          <span className="font-medium text-gray-700">{pokemons.length}</span> sur <span className="font-medium text-gray-700">{totalPokemons}</span> Pokémons affichés
        </div>
        <div className="text-xs text-gray-500">
          Faites défiler pour charger plus
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      {/* Élément sentinelle pour l'infinite scroll */}
      <div ref={ref} className="py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Loading className="mt-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;