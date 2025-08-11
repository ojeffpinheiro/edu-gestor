import { useState, useMemo, useCallback } from 'react';
import { FilterOptions, Question } from '../utils/types/Question';

interface UseQuestionFiltersProps {
  questions: Question[];
  initialFilters?: Partial<FilterOptions>;
}

export const useQuestionFilters = ({
  questions,
  initialFilters = {},
}: UseQuestionFiltersProps) => {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    searchTerm: initialFilters.searchTerm || '',
    categories: initialFilters.categories || [],
    difficulties: initialFilters.difficulties || [],
    types: initialFilters.types || [],
    discipline: initialFilters.discipline || [],
    disciplines: initialFilters.disciplines || [],
    ratingRange: initialFilters.ratingRange || [0, 5],
    usageRange: initialFilters.usageRange || [0, 100],
    createdAtRange: initialFilters.createdAtRange || ['', ''],
    tags: initialFilters.tags || [],
  });

  const applyFilters = useCallback((questions: Question[], filters: FilterOptions) => {
    return questions.filter(question => {
      // Filtro por termo de busca
      if (filters.searchTerm) {
        const searchContent = [
          question.statement,
          question.explanation,
          ...(question.tags || []),
        ].join(' ').toLowerCase();
        
        if (!searchContent.includes(filters.searchTerm.toLowerCase())) {
          return false;
        }
      }

      // Filtro por categoria
      if (filters.categories.length > 0 && !filters.categories.includes(question.discipline)) {
        return false;
      }

      // Filtro por dificuldade
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(question.difficultyLevel)) {
        return false;
      }

      // Filtro por tipo
      if (filters.types.length > 0 && !filters.types.includes(question.questionType)) {
        return false;
      }

      // Filtro por rating
      if (filters.ratingRange && question.rating !== undefined) {
        if (question.rating < filters.ratingRange[0] || question.rating > filters.ratingRange[1]) {
          return false;
        }
      }

      // Filtro por data de criação
      if (filters.createdAtRange) {
        const [start, end] = filters.createdAtRange;
        const questionDate = new Date(question.createdAt).getTime();
        
        if (start && new Date(start).getTime() > questionDate) {
          return false;
        }
        if (end && new Date(end).getTime() < questionDate) {
          return false;
        }
      }

      // Filtro por tags
      if (filters.tags && filters.tags.length > 0 && question.tags) {
        const hasMatchingTag = filters.tags.some(tag => 
          question.tags?.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, []);

  const filteredQuestions = useMemo(() => {
    return applyFilters(questions, activeFilters);
  }, [questions, activeFilters, applyFilters]);

  return {
    activeFilters,
    setActiveFilters,
    filteredQuestions,
    searchTerm: activeFilters.searchTerm,
    setSearchTerm: (term: string) => setActiveFilters(prev => ({ ...prev, searchTerm: term })),
    setFilters: (newFilters: Partial<FilterOptions>) => setActiveFilters(prev => ({ ...prev, ...newFilters }))
  };
};