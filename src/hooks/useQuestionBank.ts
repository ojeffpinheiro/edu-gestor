// src/hooks/useQuestionBank.ts
import { useState, useCallback, useMemo } from 'react';
import { useAssessment } from '../contexts/AssessmentContext';

interface QuestionFilters {
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | '';
  searchTerm?: string;
}

export const useQuestionBank = () => {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useAssessment();
  const [filters, setFilters] = useState<QuestionFilters>({
    category: '',
    difficulty: '',
    searchTerm: ''
  });

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      // Filter by category
      if (filters.category && !question.categories.includes(filters.category)) {
        return false;
      }
      
      // Filter by difficulty
      if (filters.difficulty && question.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Filter by search term
      if (filters.searchTerm && !question.content.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [questions, filters]);

  const updateFilters = useCallback((newFilters: Partial<QuestionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Function to get categories from all questions
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    questions.forEach(question => {
      question.categories.forEach(category => categorySet.add(category));
    });
    return Array.from(categorySet);
  }, [questions]);

  return {
    questions: filteredQuestions,
    filters,
    updateFilters,
    categories,
    addQuestion,
    updateQuestion,
    deleteQuestion
  };
};