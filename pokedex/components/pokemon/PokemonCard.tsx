import React from 'react';
import Link from 'next/link';
import { PokemonBasic } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonBasic;
}

const getTypeColor = (typeName: string) => {
  const colors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  return colors[typeName.toLowerCase()] || 'bg-gray-400';
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link href={`/pokemons/${pokemon.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer h-full border border-gray-200">
        <div className="bg-gray-100 p-4 flex justify-center">
          <img
            src={pokemon.image}
            alt={`Image de ${pokemon.name}`}
            className="h-32 object-contain"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
            <span className="text-sm font-medium px-2 py-1 bg-gray-200 rounded-full">#{pokemon.id}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.id}
                className={`${getTypeColor(type.name)} text-white px-2 py-1 rounded-full text-xs font-semibold`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;