import { useState, useMemo } from 'react';
import { Question } from '../utils/types/Question';
import { FilterValues } from '../components/Exam/ExamCreator/QuestionSelectionStep/QuestionSelector/types';

export const useQuestionFilters = (questions: Question[], initialFilters: Partial<FilterValues>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterValues>({
    discipline: initialFilters.discipline || '',
    type: initialFilters.type || '',
    difficulty: initialFilters.difficulty || '',
    status: initialFilters.status || '',
    dateStart: initialFilters.dateStart || '',
    dateEnd: initialFilters.dateEnd || '',
  });

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.statement.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDiscipline = !filters.discipline || q.discipline === filters.discipline;
      const matchesDifficulty = !filters.difficulty || q.difficultyLevel === filters.difficulty;
      const matchesType = !filters.type || q.questionType === filters.type;
      const matchesStatus = !filters.status || q.status === filters.status;
      const matchesDateStart = !filters.dateStart || new Date(q.createdAt) >= new Date(filters.dateStart);
      const matchesDateEnd = !filters.dateEnd || new Date(q.createdAt) <= new Date(filters.dateEnd);

      return matchesSearch && matchesDiscipline && matchesDifficulty &&
        matchesType && matchesStatus && matchesDateStart && matchesDateEnd;
    });
  }, [questions, searchTerm, filters]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredQuestions,
  };
};