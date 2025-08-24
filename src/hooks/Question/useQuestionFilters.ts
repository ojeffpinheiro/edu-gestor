import { useState, useMemo } from 'react';
import { Question, QuestionStatus, QuestionType } from '../../types/evaluation/Question';

export interface FilterOptions {
  searchTerm?: string;
  categories?: string[];
  difficulties?: Array<'easy' | 'medium' | 'hard'>;
  types?: QuestionType[];
  tags?: string[];
  disciplines?: string[];
  ratingRange?: [number, number];
  createdAtRange?: [string, string];
  status?: QuestionStatus[];
}

interface UseQuestionFiltersProps {
  questions: Question[];
  initialFilters?: FilterOptions;
}

export const useQuestionFilters = ({
  questions,
  initialFilters = {},
}: UseQuestionFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    categories: [],
    difficulties: [],
    types: [],
    tags: [],
    disciplines: [],
    ratingRange: [0, 5],
    createdAtRange: ['', ''],
    status: [],
    ...initialFilters,
  });

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Busca por texto (ajuste os campos para o que existe no seu Question)
      if (
        filters.searchTerm &&
        !(
          q.explanation?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          q.statement?.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      // Categoria
      if (
        filters.categories?.length &&
        !filters.categories.includes((q as any).categoryId || (q as any).category?.id)
      ) {
        return false;
      }

      // Dificuldade
      if (
        filters.difficulties?.length &&
        !filters.difficulties.includes((q as any).difficulty)
      ) {
        return false;
      }

      // Tipo de questão
      if (filters.types?.length && !filters.types.includes((q as any).type)) {
        return false;
      }

      // Tags
      if (
        filters.tags?.length &&
        !filters.tags.every((tag) => (q as any).tags?.includes(tag))
      ) {
        return false;
      }

      // Disciplinas
      if (
        filters.disciplines?.length &&
        !filters.disciplines.includes((q as any).discipline || '')
      ) {
        return false;
      }

      // Avaliação
      if (filters.ratingRange) {
        const rating = (q as any).rating ?? 0;
        if (
          rating < filters.ratingRange[0] ||
          rating > filters.ratingRange[1]
        ) {
          return false;
        }
      }

      // Data de criação
      if (filters.createdAtRange) {
        const [start, end] = filters.createdAtRange;
        const createdAt = (q as any).createdAt ? new Date((q as any).createdAt) : null;
        if (start && createdAt && createdAt < new Date(start)) return false;
        if (end && createdAt && createdAt > new Date(end)) return false;
      }

      // Status
      if (
        filters.status?.length &&
        !filters.status.includes((q as any).status)
      ) {
        return false;
      }

      return true;
    });
  }, [questions, filters]);

  return {
    filters,
    setFilters,
    filteredQuestions,
  };
};
