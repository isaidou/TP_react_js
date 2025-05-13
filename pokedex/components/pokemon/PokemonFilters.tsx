import React, { useState, useEffect } from 'react';
import { PokemonFilters, TypeOption } from '@/types/pokemon';
import Input from '@/components/common/Input';
import MultiSelect from '@/components/common/MultiSelect';
import Button from '@/components/common/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { useTypeOptions } from '@/hooks/usePokemonQueries';

interface PokemonFiltersProps {
  filters: PokemonFilters;
  onFilterChange: (newFilters: PokemonFilters) => void;
  onResetFilters: () => void;
}

const PokemonFiltersComponent: React.FC<PokemonFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const [nameInput, setNameInput] = useState(filters.name || '');
  const debouncedName = useDebounce(nameInput, 500);
  const [selectedTypes, setSelectedTypes] = useState<number[]>(filters.types || []);
  const [limitInput, setLimitInput] = useState(filters.limit.toString());
  const debouncedLimit = useDebounce(limitInput, 500);
  
  const { typeOptions, isLoading: isLoadingTypes } = useTypeOptions();
  
  // Met à jour le filtre de nom lorsque la valeur debouncée change
  useEffect(() => {
    onFilterChange({ ...filters, name: debouncedName || undefined });
  }, [debouncedName]);
  
  // Met à jour la limite lorsque la valeur debouncée change
  useEffect(() => {
    const limit = parseInt(debouncedLimit);
    if (!isNaN(limit) && limit > 0) {
      onFilterChange({ ...filters, limit });
    }
  }, [debouncedLimit]);
  
  // Met à jour les types sélectionnés
  const handleTypeChange = (selectedOptions: TypeOption[]) => {
    const typeIds = selectedOptions.map(option => option.value);
    setSelectedTypes(typeIds);
    onFilterChange({ ...filters, types: typeIds.length > 0 ? typeIds : undefined });
  };
  
  // Fonction pour réinitialiser tous les filtres
  const handleResetFilters = () => {
    setNameInput('');
    setSelectedTypes([]);
    setLimitInput('50');
    onResetFilters();
  };
  
  // Conversion des IDs de types en options pour le MultiSelect
  const selectedTypeOptions = typeOptions.filter(option => 
    selectedTypes.includes(option.value)
  );
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
        Filtres
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Nom du Pokémon"
          placeholder="Rechercher un pokémon..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          fullWidth
          leftIcon={
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
        
        <MultiSelect
          label="Types"
          options={typeOptions}
          value={selectedTypeOptions}
          onChange={handleTypeChange}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          placeholder="Sélectionner des types..."
          isLoading={isLoadingTypes}
          className="w-full"
        />
        
        <Input
          label="Nombre de Pokémons"
          type="number"
          min={1}
          max={100}
          value={limitInput}
          onChange={(e) => setLimitInput(e.target.value)}
          fullWidth
        />
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button 
          variant="outline" 
          onClick={handleResetFilters}
          className="mr-2 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};

export default PokemonFiltersComponent;