export interface PokemonType {
    id: number;
    name: string;
  }
  
  export interface PokemonStat {
    name: string;
    value: number;
  }
  
  export interface PokemonEvolution {
    id: number;
    name: string;
    image: string;
  }
  
  export interface PokemonEvolutionChain {
    evolutions: PokemonEvolution[];
  }
  
  export interface PokemonBasic {
    id: number;
    name: string;
    image: string;
    types: PokemonType[];
  }
  
  export interface Pokemon extends PokemonBasic {
    stats: PokemonStat[];
    evolutionChain: PokemonEvolutionChain;
  }
  
  export interface PokemonListResponse {
    data: PokemonBasic[];
    meta: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  }
  
  export interface PokemonFilters {
    name?: string;
    types?: number[];
    limit: number;
    page: number;
  }
  
  export interface TypeOption {
    value: number;
    label: string;
  }