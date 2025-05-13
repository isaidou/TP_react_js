'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePokemonDetail } from '@/hooks/usePokemonQueries';
import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import PokemonStats from '@/components/pokemon/PokemonStats';
import PokemonEvolution from '@/components/pokemon/PokemonEvolution';

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const router = useRouter();
  const pokemonId = parseInt(params.id);
  
  // Vérification que l'ID est un nombre valide
  const [isValidId, setIsValidId] = useState(true);
  
  useEffect(() => {
    if (isNaN(pokemonId) || pokemonId <= 0) {
      setIsValidId(false);
    }
  }, [pokemonId]);
  

  const { data: pokemon, isLoading, isError } = usePokemonDetail(pokemonId);
  

  const handleBack = () => {
    router.push('/pokemons');
  };
  

  if (!isValidId) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erreur</h1>
        <p className="text-lg mb-6">L'ID du Pokémon n'est pas valide.</p>
        <Button onClick={handleBack} variant="primary">Retour à la liste</Button>
      </div>
    );
  }
  

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 flex justify-center items-center h-64">
        <Loading size="lg" />
      </div>
    );
  }
  

  if (isError || !pokemon) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erreur</h1>
        <p className="text-lg mb-6">
          Impossible de charger les détails du Pokémon. Veuillez réessayer.
        </p>
        <Button onClick={handleBack} variant="primary">Retour à la liste</Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Button onClick={handleBack} variant="outline" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Retour à la liste
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-b from-gray-100 to-white p-8 flex flex-col items-center">
          <img
            src={pokemon.image}
            alt={`Image de ${pokemon.name}`}
            className="h-48 object-contain pokemon-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
            }}
          />
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
            <p className="text-gray-500 mt-1 bg-gray-100 inline-block px-3 py-1 rounded-full">#{pokemon.id}</p>
            <div className="flex justify-center mt-3 gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.id}
                  className={`bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm`}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Statistiques du Pokémon */}
          <PokemonStats stats={pokemon.stats} />
          
          {/* Évolutions du Pokémon */}
          <PokemonEvolution 
            evolutionChain={pokemon.evolutionChain} 
            currentPokemonId={pokemon.id} 
          />
        </div>
      </div>
    </div>
  );
}