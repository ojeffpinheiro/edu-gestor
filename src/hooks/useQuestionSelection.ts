// hooks/useQuestionSelection.ts
import { useCallback, useMemo } from 'react';
import { Question } from '../utils/types/Question';

interface UseQuestionSelectionProps {
  availableQuestions: Question[];
  selectedQuestions: Question[];
  onQuestionsSelected: (questions: Question[]) => void;
}

export const useQuestionSelection = ({
  availableQuestions,
  selectedQuestions,
  onQuestionsSelected
}: UseQuestionSelectionProps) => {
  const toggleQuestionSelection = useCallback((question: Question) => {
    const isSelected = selectedQuestions.some(q => q.id === question.id);
    
    if (isSelected) {
      onQuestionsSelected(selectedQuestions.filter(q => q.id !== question.id));
    } else {
      onQuestionsSelected([...selectedQuestions, question]);
    }
  }, [selectedQuestions, onQuestionsSelected]);

  const toggleSelectAll = useCallback((select: boolean) => {
    if (select) {
      // Adiciona todas as questões disponíveis, evitando duplicatas
      const newSelection = [...new Set([...selectedQuestions, ...availableQuestions])];
      onQuestionsSelected(newSelection);
    } else {
      // Remove apenas as questões que estão na lista de disponíveis
      const remainingQuestions = selectedQuestions.filter(
        q => !availableQuestions.some(aq => aq.id === q.id)
      );
      onQuestionsSelected(remainingQuestions);
    }
  }, [availableQuestions, selectedQuestions, onQuestionsSelected]);

  const clearSelection = useCallback(() => {
    onQuestionsSelected([]);
  }, [onQuestionsSelected]);

  const isAllSelected = useMemo(() => {
    return availableQuestions.length > 0 && 
           availableQuestions.every(q => 
             selectedQuestions.some(sq => sq.id === q.id)
           );
  }, [availableQuestions, selectedQuestions]);

  return {
    toggleQuestionSelection,
    toggleSelectAll,
    clearSelection,
    isAllSelected
  };
};