import { useCallback, useState } from 'react';
import { Question } from '../utils/types/Question';

interface UseSimilarQuestionsProps {
  questions: Question[];
}

export const useSimilarQuestions = ({ questions }: UseSimilarQuestionsProps) => {
  const [similarQuestions, setSimilarQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const findSimilar = useCallback((question: Question) => {
    setCurrentQuestion(question);
    try {
      const similar = questions.filter(q =>
        q.discipline === question.discipline &&
        q.id !== question.id
      );
      setSimilarQuestions(similar);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error finding similar questions:', error);
    }
  }, [questions]);

  return {
    similarQuestions,
    currentQuestion,
    isModalOpen,
    findSimilar,
    closeModal: () => setIsModalOpen(false)
  };
};