import React, { useState, useRef, useEffect } from 'react';
import { TypeOption } from '@/types/pokemon';

interface SimpleMultiSelectProps {
  options: TypeOption[];
  value: TypeOption[];
  onChange: (selected: TypeOption[]) => void;
  placeholder?: string;
  label?: string;
}

const SimpleMultiSelect: React.FC<SimpleMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Sélectionner des types...",
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fermer le menu déroulant lorsque l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Vérifier si une option est sélectionnée
  const isSelected = (option: TypeOption) => {
    return value.some(item => item.value === option.value);
  };

  // Gérer la sélection/désélection d'une option
  const toggleOption = (option: TypeOption) => {
    const isAlreadySelected = isSelected(option);
    
    if (isAlreadySelected) {
      const newValue = value.filter(item => item.value !== option.value);
      onChange(newValue);
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
          {label}
        </label>
      )}
      
      {/* Zone cliquable pour ouvrir/fermer le menu */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '10px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: 'white',
          cursor: 'pointer',
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '42px',
          alignItems: 'center'
        }}
      >
        {value.length === 0 ? (
          <span style={{ color: '#9ca3af' }}>{placeholder}</span>
        ) : (
          <>
            {value.map(option => (
              <span 
                key={option.value} 
                style={{
                  backgroundColor: '#e5edff',
                  color: '#3b82f6',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  margin: '2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '14px'
                }}
              >
                {option.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newValue = value.filter(item => item.value !== option.value);
                    onChange(newValue);
                  }}
                  style={{
                    marginLeft: '4px',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '14px',
                    padding: '0 2px'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </>
        )}
      </div>
      
      {/* Menu déroulant */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          width: '100%',
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          marginTop: '4px',
          zIndex: 10,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => toggleOption(option)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isSelected(option) ? '#e5edff' : 'white',
                ':hover': {
                  backgroundColor: '#f3f4f6'
                }
              }}
            >
              <input
                type="checkbox"
                checked={isSelected(option)}
                onChange={() => {}}
                style={{ marginRight: '8px' }}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleMultiSelect;