import { useCallback, useState } from "react";
import { useQuestionSelection } from "./useQuestionSelection";
import { Question } from "../utils/types/Question";

export const useQuestionSelectionManagement = (questions: Question[]) => {
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  
  const { clearSelection, toggleSelectAll, isAllSelected } = useQuestionSelection({
    availableQuestions: questions,
    selectedQuestions: Array.from(selectedQuestions)
      .map(id => questions.find(q => q.id === id))
      .filter(Boolean) as Question[],
    onQuestionsSelected: (selected) => {
      setSelectedQuestions(new Set(selected.map(q => q.id)));
    }
  });

  const handleQuestionSelect = useCallback((id: string | number) => {
    const idStr = id.toString();
    setSelectedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.has(idStr) ? newSet.delete(idStr) : newSet.add(idStr);
      return newSet;
    });
  }, []);

  return {
    selectedQuestions,
    setSelectedQuestions,
    clearSelection,
    toggleSelectAll,
    isAllSelected,
    handleQuestionSelect,
    selectedQuestionsCount: selectedQuestions.size
  };
};