import React from 'react';
import { PokemonStat } from '@/types/pokemon';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  const getStatColor = (value: number) => {
    if (value < 50) return 'bg-red-500';
    if (value < 70) return 'bg-yellow-500';
    if (value < 90) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const formatStatName = (name: string) => {
    const statNames: Record<string, string> = {
      hp: 'HP',
      attack: 'Attaque',
      defense: 'Défense',
      'special-attack': 'Attaque Spé.',
      'special-defense': 'Défense Spé.',
      speed: 'Vitesse',
    };

    return statNames[name.toLowerCase()] || name;
  };

  // Vérifier si stats est un tableau valide
  if (!stats || !Array.isArray(stats) || stats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
        <p className="text-gray-500">Aucune statistique disponible pour ce Pokémon.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name}>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-sm">{formatStatName(stat.name)}</span>
              <span className="text-sm text-gray-600">{stat.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${getStatColor(stat.value)} h-2.5 rounded-full`}
                style={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;