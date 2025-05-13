import { useCallback, useState } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { PokemonFilters, PokemonType, TypeOption } from '@/types/pokemon';
import { fetchPokemonById, fetchPokemons, fetchPokemonTypes } from '@/lib/api';

/**
 * Hook pour récupérer la liste des types de pokémon
 */
export const usePokemonTypes = () => {
  return useQuery<PokemonType[], Error>({
    queryKey: ['pokemon-types'],
    queryFn: fetchPokemonTypes,
    staleTime: Infinity, // Les types ne changent pas souvent
    select: (types) => 
      // Tri des types par nom
      [...types].sort((a, b) => a.name.localeCompare(b.name)),
  });
};

/**
 * Hook pour convertir les types en options pour le composant MultiSelect
 */
export const useTypeOptions = () => {
  const { data: types, isLoading } = usePokemonTypes();
  
  const typeOptions = types?.map((type) => ({
    value: type.id,
    label: type.name,
  })) || [];
  
  return { typeOptions, isLoading };
};

/**
 * Hook pour récupérer la liste des pokémons avec infinite scroll
 */
export const useInfinitePokemonList = (filters: PokemonFilters) => {
  const [totalPokemons, setTotalPokemons] = useState(0);
  
  const fetchPokemonsPage = useCallback(
    async ({ pageParam = 1 }) => {
      const response = await fetchPokemons({
        ...filters,
        page: pageParam,
      });
      
      setTotalPokemons(response.meta.totalItems);
      
      return {
        pokemons: response.data,
        currentPage: response.meta.currentPage,
        totalPages: response.meta.totalPages,
      };
    },
    [filters]
  );
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['pokemons', filters],
    queryFn: fetchPokemonsPage,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 60000, // 1 minute
  });
  
  // Extraction de tous les pokémons des pages
  const pokemons = data?.pages.flatMap((page) => page.pokemons) || [];
  
  return {
    pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    totalPokemons,
    refetch,
  };
};

/**
 * Hook pour récupérer les détails d'un pokémon par son ID
 */
export const usePokemonDetail = (id: number) => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonById(id),
    enabled: !!id,
    staleTime: 300000, // 5 minutes
  });
};