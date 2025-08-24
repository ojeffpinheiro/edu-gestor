import { useState, useEffect } from 'react';
import { Question } from '../../types/evaluation/Question';

interface SortOptions {
  value: string;
  label: string;
  defaultDirection?: 'asc' | 'desc';
}

export interface SortPreferences {
  field: string;
  direction: 'asc' | 'desc';
}

interface UseQuestionSortProps {
  localStorageKey?: string; // Nova prop para chave de localStorage
  initialField: string;
  initialDirection: 'asc' | 'desc';
  sortOptions: SortOptions[];
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void;
}

export const useQuestionSort = ({
  localStorageKey,
  initialField,
  initialDirection,
  sortOptions,
  onSortChange
}: UseQuestionSortProps) => {
  const [sortConfig, setSortConfig] = useState<SortPreferences>(() => {
    // Se houver chave de localStorage, tentar carregar as preferências salvas
    if (localStorageKey) {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return { field: initialField, direction: initialDirection };
  });

  // Persistir no localStorage quando houver mudanças (se localStorageKey for fornecido)
  useEffect(() => {
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(sortConfig));
    }
  }, [localStorageKey, sortConfig]);

  const handleSortChange = (field: string, direction?: 'asc' | 'desc') => {
    const newDirection = direction ||
      (sortConfig.field === field ?
        (sortConfig.direction === 'asc' ? 'desc' : 'asc') :
        sortOptions.find(opt => opt.value === field)?.defaultDirection || 'asc');

    const newConfig = { field, direction: newDirection };
    setSortConfig(newConfig);
    onSortChange?.(field, newDirection);
  };

  const sortQuestions = (questions: Question[]) => {
    return [...questions].sort((a, b) => {
      let comparison = 0;

      if (sortConfig.field === 'statement') {
        comparison = a.statement.localeCompare(b.statement);
      } else if (sortConfig.field === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortConfig.field === 'difficultyLevel') {
        const difficultyOrder: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
        comparison = difficultyOrder[a.difficultyLevel] - difficultyOrder[b.difficultyLevel];
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  };

  return {
    sortConfig,
    sortOptions,
    handleSortChange,
    sortQuestions,
  };
};