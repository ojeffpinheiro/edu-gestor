import { useState, useEffect } from 'react';

export const useSortPreferences = (key: string, initialField: string, initialDirection: 'asc' | 'desc') => {
  const [sortField, setSortField] = useState<string>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved).field : initialField;
  });

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved).direction : initialDirection;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ field: sortField, direction: sortDirection }));
  }, [key, sortField, sortDirection]);

  return { sortField, sortDirection, setSortField, setSortDirection };
};