import { useCallback, useState } from "react";
import { useQuestionSelection } from "../assessment/useQuestionSelection";
import { Question } from "../../types/evaluation/Question";

export const useSelection = (questions: Question[]) => {
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

  const toggleSelection = useCallback((id: string | number) => {
    const idStr = id.toString();
    setSelectedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.has(idStr) ? newSet.delete(idStr) : newSet.add(idStr);
      return newSet;
    });
  }, []);

  return {
    selectedQuestions,
    selectedQuestionsCount: selectedQuestions.size,
    isAllSelected,
    setSelectedQuestions,
    clearSelection,
    toggleSelectAll,
    toggleSelection,
  };
};