import { useState } from 'react';

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
  initialField: string;
  initialDirection: 'asc' | 'desc';
  sortOptions: SortOptions[];
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void;
}

export const useQuestionSort = ({
  initialField,
  initialDirection,
  sortOptions,
  onSortChange
}: UseQuestionSortProps) => {
  const [sortField, setSortField] = useState(initialField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialDirection);
 
  const handleSortChange = (field: string, direction?: 'asc' | 'desc') => {
    const newDirection = direction || (sortField === field ? 
      (sortDirection === 'asc' ? 'desc' : 'asc') : 
      'asc');
    
    setSortField(field);
    setSortDirection(newDirection);
    onSortChange?.(field, newDirection);
  };

  const sortQuestions = (questions: any[]) => {
    return [...questions].sort((a, b) => {
      let comparison = 0;

      if (sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === 'difficulty') {
        const difficultyOrder: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  return {
    sortField,
    sortDirection,
    sortOptions,
    handleSortChange,
    sortQuestions,
  };
};