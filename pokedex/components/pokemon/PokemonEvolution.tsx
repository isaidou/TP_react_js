import React from 'react';
import Link from 'next/link';
import { PokemonEvolutionChain } from '@/types/pokemon';

interface PokemonEvolutionProps {
  evolutionChain: PokemonEvolutionChain;
  currentPokemonId: number;
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({
  evolutionChain,
  currentPokemonId,
}) => {
  const { evolutions } = evolutionChain;

  if (!evolutions || evolutions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">Évolutions</h3>
        <p className="text-gray-500">Ce Pokémon n'a pas d'évolutions connues.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Évolutions</h3>
      <div className="flex flex-wrap justify-around items-center gap-2">
        {evolutions.map((evolution, index) => {
          const isCurrentPokemon = evolution.id === currentPokemonId;
          
          return (
            <React.Fragment key={evolution.id}>
              {index > 0 && (
                <div className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              )}
              <div 
                className={`
                  text-center p-2 rounded-lg transition-all
                  ${isCurrentPokemon ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'}
                `}
              >
                {isCurrentPokemon ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={evolution.image}
                      alt={evolution.name}
                      className="w-24 h-24 object-contain"
                    />
                    <span className="font-medium mt-2 capitalize">{evolution.name}</span>
                  </div>
                ) : (
                  <Link href={`/pokemons/${evolution.id}`}>
                    <div className="flex flex-col items-center cursor-pointer">
                      <img
                        src={evolution.image}
                        alt={evolution.name}
                        className="w-24 h-24 object-contain"
                      />
                      <span className="font-medium mt-2 capitalize">{evolution.name}</span>
                    </div>
                  </Link>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonEvolution;