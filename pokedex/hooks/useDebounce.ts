import { useState, useEffect } from 'react';

/**
 * Hook de debounce pour limiter les requêtes API lors de la saisie
 * @param value La valeur à debouncer
 * @param delay Le délai en ms avant de mettre à jour la valeur
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}