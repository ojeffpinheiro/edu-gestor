import { useCallback, useMemo } from 'react';
import { useQuestionFilters } from './useQuestionFilters';
import { useQuestionSort } from './useQuestionSort';
import { useSelection } from './useSelection';
import { useQuestionActions } from './useQuestionActions';
import { Question, QuestionStatus, QuestionType } from '../../types/evaluation/Question';

export interface QuestionManagerOptions {
  // Filtros
  initialFilters?: {
    searchTerm?: string;
    categories?: string[];
    difficulties?: Array<'easy' | 'medium' | 'hard'>;
    types?: QuestionType[];
    tags?: string[];
    disciplines?: string[];
    ratingRange?: [number, number];
    createdAtRange?: [string, string];
    status?: QuestionStatus[];
  };
  
  // Ordenação
  sortOptions?: {
    value: string;
    label: string;
    defaultDirection?: 'asc' | 'desc';
  }[];
  initialSortField?: string;
  initialSortDirection?: 'asc' | 'desc';
  localStorageKey?: string;
  
  // Ações
  onUpdateQuestions?: (updatedQuestions: Question[]) => void;
  onCombineSuccess?: (newQuestion: Question) => void;
}

export const useQuestionManager = (questions: Question[] = [], options: QuestionManagerOptions = {}) => {
  // Filtros
  const {
    filters,
    setFilters,
    filteredQuestions: questionsAfterFilter,
  } = useQuestionFilters({
    questions,
    initialFilters: options.initialFilters,
  });

  // Ordenação
  const {
    sortConfig,
    sortOptions,
    handleSortChange,
    sortQuestions,
  } = useQuestionSort({
    localStorageKey: options.localStorageKey,
    initialField: options.initialSortField || 'createdAt',
    initialDirection: options.initialSortDirection || 'desc',
    sortOptions: options.sortOptions || [
      { value: 'statement', label: 'Enunciado', defaultDirection: 'asc' },
      { value: 'createdAt', label: 'Data de criação', defaultDirection: 'desc' },
      { value: 'difficultyLevel', label: 'Dificuldade', defaultDirection: 'asc' },
    ],
  });

  const sortedQuestions = useMemo(() => {
    return sortQuestions(questionsAfterFilter);
  }, [questionsAfterFilter, sortQuestions]);

  // Seleção
  const {
    selectedQuestions,
    selectedQuestionsCount,
    isAllSelected,
    setSelectedQuestions,
    clearSelection,
    toggleSelectAll,
    toggleSelection,
  } = useSelection(sortedQuestions);

  // Ações
  const {
    isProcessing,
    error,
    createVariant,
    editQuestion,
    deleteQuestion,
    deleteQuestions,
    editQuestions,
    exportQuestions,
    combineQuestions,
    clearError,
  } = useQuestionActions({
    questions: sortedQuestions,
    selectedQuestionIds: selectedQuestions,
    onUpdateQuestions: options.onUpdateQuestions,
    onClearSelection: clearSelection,
    onCombineSuccess: options.onCombineSuccess,
  });

  // Combinação de questões
  const handleCombineQuestions = useCallback(async () => {
    if (selectedQuestions.size < 2) return;
    await combineQuestions(Array.from(selectedQuestions));
  }, [selectedQuestions, combineQuestions]);

  return {
    // Estados
    questions: sortedQuestions,
    isProcessing,
    error,
    
    // Filtros
    filters,
    setFilters,
    
    // Ordenação
    sortConfig,
    sortOptions,
    handleSortChange,
    
    // Seleção
    selectedQuestions,
    selectedQuestionsCount,
    isAllSelected,
    setSelectedQuestions,
    clearSelection,
    toggleSelectAll,
    toggleSelection,
    
    // Ações individuais
    createVariant,
    editQuestion,
    deleteQuestion,
    
    // Ações em massa
    deleteQuestions,
    editQuestions,
    exportQuestions,
    combineQuestions: handleCombineQuestions,
    
    // Utilitários
    clearError,
  };
};