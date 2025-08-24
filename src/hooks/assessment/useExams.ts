import { useState, useCallback } from 'react';
import { Exam, ExamResult, TimeframeFilter } from '../../types/academic/Assessment';
import examService from '../../services/examService';

export const useExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchExams = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await examService.getAllExams();
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch exams');
      }
      setExams(response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch exams'));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getExamById = useCallback(async (examId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await examService.getExamById(examId);
      if (!response.success || !response.data) {
        throw new Error(response.error || `Failed to fetch exam with ID: ${examId}`);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch exam with ID: ${examId}`));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createExam = useCallback(async (examData: Omit<Exam, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await examService.createExam(examData);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create exam');
      }
      const newExam = response.data;
      setExams(prev => [...prev, newExam]);
      return newExam;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create exam'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateExam = useCallback(async (examId: string, examData: Partial<Exam>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await examService.updateExam(examId, examData);
      if (!response.success || !response.data) {
        throw new Error(response.error || `Failed to update exam with ID: ${examId}`);
      }
      const updatedExam = response.data;
      setExams(prev => prev.map(exam => exam.id === examId ? updatedExam : exam));
      return updatedExam;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to update exam with ID: ${examId}`));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteExam = useCallback(async (examId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await examService.deleteExam(examId);
      if (!response.success) {
        throw new Error(response.error || `Failed to delete exam with ID: ${examId}`);
      }
      setExams(prev => prev.filter(exam => exam.id !== examId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to delete exam with ID: ${examId}`));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getExamResults = useCallback(async (timeframe: TimeframeFilter = 'month', classId?: string, examId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // This method needs to be implemented in examService
      const response = await examService.getExamResults({ timeframe, classId, examId });
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch exam results');
      }
      setExamResults(response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch exam results'));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStudentResults = useCallback(async (studentId: string, timeframe: TimeframeFilter = 'semester') => {
    setIsLoading(true);
    setError(null);

    try {
      // This method needs to be implemented in examService
      const response = await examService.getStudentResults(studentId, timeframe);
      if (!response.success || !response.data) {
        throw new Error(response.error || `Failed to fetch results for student: ${studentId}`);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch results for student: ${studentId}`));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getClassPerformance = useCallback(async (classId: string, timeframe: TimeframeFilter = 'semester') => {
    setIsLoading(true);
    setError(null);

    try {
      // This method needs to be implemented in examService
      const response = await examService.getClassPerformance(classId, timeframe);
      if (!response.success || !response.data) {
        throw new Error(response.error || `Failed to fetch performance for class: ${classId}`);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch performance for class: ${classId}`));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    exams,
    examResults,
    isLoading,
    error,
    fetchExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam,
    getExamResults,
    getStudentResults,
    getClassPerformance
  };
};