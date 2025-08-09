import { useState, useMemo, useCallback } from 'react';
import { Question, FilterOptions, QuestionType, DifficultyLevelType, QuestionStatus } from '../utils/types/Question';

interface DateRange {
  start: string;
  end: string;
}

// Interface estendida para incluir propriedades de compatibilidade
interface ExtendedFilterOptions extends Partial<FilterOptions> {
  discipline?: string[];
  type?: QuestionType | '';
  difficulty?: DifficultyLevelType | '';
  status?: QuestionStatus | '';
  dateStart?: string;
  dateEnd?: string;
  disciplines?: string[];
  dateRange?: DateRange; // Usando o tipo definido
  categories?: string[];
  ratingRange?: [number, number];
}

interface UseQuestionFiltersProps {
  questions: Question[];
  initialFilters?: ExtendedFilterOptions;
  // Parâmetros antigos para compatibilidade
  initialSearchTerm?: string;
  initialDiscipline?: string;
  initialType?: QuestionType | '';
  initialDifficulty?: DifficultyLevelType | '';
  initialStatus?: QuestionStatus | '';
  initialDateStart?: string;
  initialDateEnd?: string;
}

export const useQuestionFilters = ({
  questions,
  initialFilters = {},
  // Parâmetros antigos para compatibilidade
  initialSearchTerm = '',
  initialDiscipline = '',
  initialType = '',
  initialDifficulty = '',
  initialStatus = '',
  initialDateStart = '',
  initialDateEnd = '',
}: UseQuestionFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || initialSearchTerm);
  const [activeFilters, setActiveFilters] = useState<ExtendedFilterOptions>({
    ...initialFilters,
    // Mapeando os parâmetros antigos para a nova estrutura
    searchTerm: initialFilters.searchTerm || initialSearchTerm,
    disciplines: initialFilters.disciplines || (initialDiscipline ? [initialDiscipline] : []),
    types: initialFilters.types || (initialType ? [initialType as QuestionType] : []),
    difficulties: initialFilters.difficulties || (initialDifficulty ? [initialDifficulty as DifficultyLevelType] : []),
    status: initialFilters.status || initialStatus,
    dateRange: initialFilters.dateRange || (initialDateStart || initialDateEnd ? {
      start: initialDateStart,
      end: initialDateEnd
    } : undefined)
  });
  const [filters, setFilters] = useState({
    discipline: initialDiscipline,
    type: initialType,
    difficulty: initialDifficulty,
    status: initialStatus,
    dateStart: initialDateStart,
    dateEnd: initialDateEnd,
  });

  const applyFilters = useCallback((questions: Question[], filters: ExtendedFilterOptions) => {
    return questions.filter(question => {
      // Filtro por termo de busca
      const searchTermFilter = filters.searchTerm || '';
      if (searchTermFilter) {
        const searchContent = [
          question.statement,
          (question as any).content, // Propriedade opcional
          question.explanation
        ].filter(Boolean).join(' ').toLowerCase();

        if (!searchContent.includes(searchTermFilter.toLowerCase())) {
          return false;
        }
      }

      // Filtro por disciplina
      const disciplineFilter = filters.disciplines?.[0] || filters.discipline;
      if (disciplineFilter && question.discipline !== disciplineFilter) {
        return false;
      }

      // Filtro por tipo
      const typeFilter = filters.types?.[0] || filters.type;
      if (typeFilter && question.questionType !== typeFilter) {
        return false;
      }

      // Filtro por dificuldade
      const difficultyFilter = filters.difficulties?.[0] || filters.difficulty;
      if (difficultyFilter && question.difficultyLevel !== difficultyFilter) {
        return false;
      }

      // Filtro por status
      const statusFilter = filters.status;
      if (statusFilter && question.status !== statusFilter) {
        return false;
      }

      // Filtro por data
      const dateStart = filters.dateRange?.start || filters.dateStart;
      const dateEnd = filters.dateRange?.end || filters.dateEnd;

      if (dateStart && new Date(question.createdAt) < new Date(dateStart)) {
        return false;
      }
      if (dateEnd && new Date(question.createdAt) > new Date(dateEnd)) {
        return false;
      }

      // Filtro por categoria (se existir na questão)
      if (filters.categories?.length && (question as any).category &&
        !filters.categories.includes((question as any).category)) {
        return false;
      }

      // Filtro por rating (se existir na questão)
      if (filters.ratingRange && (question as any).rating !== undefined) {
        const rating = (question as any).rating;
        if (rating < filters.ratingRange[0] || rating > filters.ratingRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, []);

  const filteredQuestions = useMemo(() => {
    return applyFilters(questions, activeFilters);
  }, [questions, activeFilters, applyFilters]);

  // Funções de compatibilidade
  const setSearchTermCompat = useCallback((term: string) => {
    setSearchTerm(term);
    setActiveFilters(prev => ({ ...prev, searchTerm: term }));
  }, []);


  const setFiltersCompat = useCallback((newFilters: {
    discipline?: string;
    type?: QuestionType | '';
    difficulty?: DifficultyLevelType | '';
    status?: QuestionStatus | '';
    dateStart?: string;
    dateEnd?: string;
  }) => {
    setFilters(prev => ({ ...prev, ...newFilters }));

    setActiveFilters(prev => {
      const newDateRange = newFilters.dateStart || newFilters.dateEnd
        ? {
          start: newFilters.dateStart ?? prev.dateRange?.start ?? '',
          end: newFilters.dateEnd ?? prev.dateRange?.end ?? ''
        }
        : prev.dateRange;

      return {
        ...prev,
        disciplines: newFilters.discipline ? [newFilters.discipline] : prev.disciplines,
        types: newFilters.type ? [newFilters.type as QuestionType] : prev.types,
        difficulties: newFilters.difficulty ? [newFilters.difficulty as DifficultyLevelType] : prev.difficulties,
        status: newFilters.status || prev.status,
        dateRange: newDateRange
      };
    });
  }, []);

  return {
    // Novas propriedades
    activeFilters,
    setActiveFilters,
    filteredQuestions,

    // Propriedades antigas para compatibilidade
    searchTerm,
    setSearchTerm: setSearchTermCompat,
    filters,
    setFilters: setFiltersCompat,
  };
};