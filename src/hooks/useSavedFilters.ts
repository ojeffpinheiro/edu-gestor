// hooks/useSavedFilters.ts
import { useState, useEffect } from 'react';
import { SavedFilter } from '../utils/types/Question';

export const useSavedFilters = () => {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);

  useEffect(() => {
    // Carregar do localStorage
    const storedFilters = localStorage.getItem('savedFilters');
    if (storedFilters) {
      setSavedFilters(JSON.parse(storedFilters));
    }
  }, []);

  const saveFilter = (filter: Omit<SavedFilter, 'id'>) => {
    const newFilter = {
      ...filter,
      id: Date.now().toString()
    };
    const updatedFilters = [...savedFilters, newFilter];
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
  };

  return { savedFilters, saveFilter };
};