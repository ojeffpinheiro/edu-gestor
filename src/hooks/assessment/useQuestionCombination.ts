import { useCallback, useState } from 'react';
import { Question } from '../../utils/types/Question';
import { combineQuestions } from '../../utils/questionUtils';

interface UseQuestionCombinationProps {
  questions: Question[];
  onCombineSuccess?: (newQuestion: Question) => void;
  onClearSelection?: () => void;
}

export const useQuestionCombination = ({ questions, onCombineSuccess, onClearSelection }: UseQuestionCombinationProps) => {
  const [isCombining, setIsCombining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const combine = useCallback(async (questionIds: string[]) => {
    setIsCombining(true);
    setError(null);

    try {
      const newQuestion = combineQuestions(questionIds, questions);
      onCombineSuccess?.(newQuestion);
      onClearSelection?.();
      return newQuestion;
    } catch (e) {
      setError('Failed to combine questions');
      throw e;
    } finally {
      setIsCombining(false);
    }
  }, [questions, onCombineSuccess, onClearSelection]);

  return {
    combine,
    isCombining,
    error
  };
};