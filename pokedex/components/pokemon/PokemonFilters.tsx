import React, { useState, useEffect } from 'react';
import { PokemonFilters, TypeOption } from '@/types/pokemon';
import SimpleMultiSelect from './SimpleMultiSelect';
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
  
  // Styles en ligne pour le composant
  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      padding: '16px',
      marginBottom: '24px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center'
    },
    filterIcon: {
      color: 'blue',
      marginRight: '8px'
    },
    grid: {
      display: 'grid',
      gap: '16px',
      gridTemplateColumns: '1fr',
      '@media (min-width: 768px)': {
        gridTemplateColumns: '1fr 1fr'
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: '1fr 1fr 1fr'
      }
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '16px'
    },
    resetButton: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '1px solid #3b82f6',
      borderRadius: '6px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <span style={styles.filterIcon}>🔍</span> Filtres
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        {/* Filtre par nom */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom du Pokémon</label>
          <input
            type="text"
            placeholder="Rechercher un pokémon..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            style={styles.input}
          />
        </div>
        
        {/* Filtre par types */}
        <div style={styles.formGroup}>
          <SimpleMultiSelect
            label="Types"
            options={typeOptions}
            value={selectedTypeOptions}
            onChange={handleTypeChange}
            placeholder="Sélectionner des types..."
          />
        </div>
        
        {/* Limite de pokémons */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de Pokémons</label>
          <input
            type="number"
            min={1}
            max={100}
            value={limitInput}
            onChange={(e) => setLimitInput(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>
      
      <div style={styles.buttonContainer}>
        <button 
          onClick={handleResetFilters}
          style={styles.resetButton}
        >
          <span style={{ marginRight: '8px' }}>↺</span> Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default PokemonFiltersComponent;