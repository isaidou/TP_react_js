import { Pokemon, PokemonFilters, PokemonListResponse, PokemonType } from '@/types/pokemon';

const API_BASE_URL = 'https://nestjs-pokedex-api.vercel.app';

export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => url.searchParams.append(key, item.toString()));
        } else {
          url.searchParams.append(key, value.toString());
        }
      }
    });
  }
  
  return url.toString();
};

export const fetchPokemons = async (filters: PokemonFilters): Promise<PokemonListResponse> => {
  const { name, types, limit, page } = filters;
  
  const params: Record<string, any> = {
    page,
    limit,
  };
  
  if (name) {
    params.name = name;
  }
  
  if (types && types.length > 0) {
    if (types.length === 1) {
      params.typeId = types[0];
    } else {
      params.types = types;
    }
  }
  
  const url = buildUrl('/pokemons', params);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data) {
      throw new Error('Réponse API invalide');
    }
    
    if (Array.isArray(data)) {
      const pokemons = data.map(pokemon => ({
        ...pokemon,
        image: getPokemonImageUrl(pokemon.id)
      }));
      
      return {
        data: pokemons,
        meta: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: pokemons.length,
          totalPages: 1
        }
      };
    } else if (data.data && Array.isArray(data.data)) {
      return {
        ...data,
        data: data.data.map(pokemon => ({
          ...pokemon,
          image: getPokemonImageUrl(pokemon.id)
        }))
      };
    } else if (data.results && Array.isArray(data.results)) {
      const pokemons = data.results.map((pokemon: any) => {
        const id = pokemon.id || extractIdFromUrl(pokemon.url);
        return {
          id,
          name: pokemon.name,
          image: getPokemonImageUrl(id),
          types: pokemon.types || []
        };
      });
      
      return {
        data: pokemons,
        meta: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: data.count || pokemons.length,
          totalPages: Math.ceil((data.count || pokemons.length) / limit)
        }
      };
    } else {
      console.warn('Format de réponse API non reconnu:', data);
      return {
        data: [],
        meta: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: 0,
          totalPages: 0
        }
      };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des pokémons:', error);
    return {
      data: [],
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: 0,
        totalPages: 0
      }
    };
  }
};

const extractIdFromUrl = (url: string): number => {
  if (!url) return 0;
  
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  
  const parts = cleanUrl.split('/');
  const idStr = parts[parts.length - 1];
  
  const id = parseInt(idStr);
  return isNaN(id) ? 0 : id;
};

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  const url = buildUrl(`/pokemons/${id}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Traiter les statistiques pour s'assurer qu'elles sont dans le bon format
    let formattedStats = [];
    
    // Vérifier si stats existe et est un tableau
    if (data.stats && Array.isArray(data.stats)) {
      formattedStats = data.stats;
    } 
    // Si stats est un objet avec des propriétés numériques (ex: { hp: 45, attack: 60, ... })
    else if (data.stats && typeof data.stats === 'object') {
      formattedStats = Object.entries(data.stats).map(([name, value]) => ({
        name,
        value: typeof value === 'number' ? value : parseInt(value as string) || 0
      }));
    }
    // Format de fallback avec des statistiques par défaut
    else {
      formattedStats = [
        { name: 'hp', value: 0 },
        { name: 'attack', value: 0 },
        { name: 'defense', value: 0 },
        { name: 'special-attack', value: 0 },
        { name: 'special-defense', value: 0 },
        { name: 'speed', value: 0 }
      ];
    }
    
    const adaptedPokemon: Pokemon = {
      id: data.id,
      name: data.name,
      image: getPokemonImageUrl(data.id),
      types: data.types || [],
      stats: formattedStats,
      evolutionChain: {
        evolutions: (data.evolutionChain?.evolutions || []).map((evolution: any) => ({
          ...evolution,
          image: getPokemonImageUrl(evolution.id)
        }))
      }
    };
    
    return adaptedPokemon;
  } catch (error) {
    console.error(`Erreur lors de la récupération du pokémon ${id}:`, error);
    throw error;
  }
};

export const fetchPokemonTypes = async (): Promise<PokemonType[]> => {
  const url = buildUrl('/types');
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data.results && Array.isArray(data.results)) {
      return data.results.map((type: any, index: number) => ({
        id: type.id || index + 1,
        name: type.name
      }));
    }
    
    console.warn('Format de types de pokémon non reconnu:', data);
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des types de pokémon:', error);
    return [];
  }
};