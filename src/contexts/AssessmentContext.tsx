// src/contexts/AssessmentContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Question, Exam, EvaluationRubric, ExamResult } from '../utils/types/Assessment';
import { mockQuestions, mockExams, mockRubrics, mockResults } from '../mocks/assessmentData';
import { validateExam } from '../utils/examValidationUtils';

interface AssessmentContextType {
  questions: Question[];
  exams: Exam[];
  rubrics: EvaluationRubric[];
  results: ExamResult[];
  // CRUD operations for questions
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Question>;
  updateQuestion: (question: Question) => Promise<Question>;
  deleteQuestion: (id: string) => Promise<boolean>;
  // CRUD operations for exams
  createExam: (exam: Omit<Exam, 'id' | 'createdAt'>) => Promise<Exam>;
  updateExam: (exam: Exam) => Promise<Exam>;
  deleteExam: (id: string) => Promise<boolean>;
  // CRUD operations for rubrics
  createRubric: (rubric: Omit<EvaluationRubric, 'id'>) => Promise<EvaluationRubric>;
  updateRubric: (rubric: EvaluationRubric) => Promise<EvaluationRubric>;
  deleteRubric: (id: string) => Promise<boolean>;
  // Exam results
  saveExamResult: (result: Omit<ExamResult, 'id'>) => Promise<ExamResult>;
  getExamResultsByExam: (examId: string) => ExamResult[];
  getExamResultsByStudent: (studentId: string) => ExamResult[];
  // Mock data loading
  resetToMockData: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [rubrics, setRubrics] = useState<EvaluationRubric[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);

  // Carregar dados mockados
  useEffect(() => {
    resetToMockData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetToMockData = useCallback(() => {
    setQuestions(mockQuestions);
    setExams(mockExams);
    setRubrics(mockRubrics);
    setResults(mockResults);
  }, []);

  // Validação de questão
  const validateQuestion = useCallback((questionData: any): boolean => {
    // Implementar validações necessárias, por exemplo:
    if (!questionData.text || questionData.text.trim() === '') {
      throw new Error('O texto da questão é obrigatório');
    }
    return true;
  }, []);

  // Implementation of question management
  const addQuestion = useCallback(async (questionData: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      validateQuestion(questionData);
      
      const newQuestion: Question = {
        ...questionData,
        id: `question-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setQuestions(prev => [...prev, newQuestion]);
      return newQuestion;
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  }, [validateQuestion]);

  const updateQuestion = useCallback(async (question: Question) => {
    try {
      validateQuestion(question);
      
      const updatedQuestion = { ...question, updatedAt: new Date() };
      
      setQuestions(prev => 
        prev.map(q => q.id === question.id ? updatedQuestion : q)
      );
      
      return updatedQuestion;
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }, [validateQuestion]);

  const deleteQuestion = useCallback(async (id: string) => {
    try {
      // Verificar se a questão está sendo usada em algum exame
      const isUsedInExam = exams.some(exam => 
        exam.questions.includes(id)
      );
      
      if (isUsedInExam) {
        throw new Error('Esta questão está sendo usada em um ou mais exames e não pode ser excluída');
      }
      
      setQuestions(prev => prev.filter(q => q.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  }, [exams]);

  // Implementation of exam management
  const createExam = useCallback(async (examData: Omit<Exam, 'id' | 'createdAt'>) => {
    try {
      validateExam(examData);
      
      // Gerar ID seguro e único
      const newExam: Exam = {
        ...examData,
        id: `exam-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date(),
      };
      
      // Se o exame requer senha, garantir que ela esteja segura
      if (newExam.requirePassword && (!newExam.password || newExam.password.length < 6)) {
        throw new Error('A senha do exame deve ter pelo menos 6 caracteres');
      }
      
      setExams(prev => [...prev, newExam]);
      return newExam;
    } catch (error) {
      console.error('Error creating exam:', error);
      throw error;
    }
  }, [validateExam]);

  const updateExam = useCallback(async (exam: Exam) => {
    try {
      validateExam(exam);
      
      // Se o exame requer senha, garantir que ela esteja segura
      if (exam.requirePassword && (!exam.password || exam.password.length < 6)) {
        throw new Error('A senha do exame deve ter pelo menos 6 caracteres');
      }
      
      setExams(prev => 
        prev.map(e => e.id === exam.id ? exam : e)
      );
      
      return exam;
    } catch (error) {
      console.error('Error updating exam:', error);
      throw error;
    }
  }, [validateExam]);

  const deleteExam = useCallback(async (id: string) => {
    try {
      // Verificar se há resultados associados ao exame
      const hasResults = results.some(result => result.examId === id);
      
      if (hasResults) {
        throw new Error('Este exame possui resultados registrados e não pode ser excluído');
      }
      
      setExams(prev => prev.filter(e => e.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting exam:', error);
      throw error;
    }
  }, [results]);

  // Implementation of rubric management
  const createRubric = useCallback(async (rubricData: Omit<EvaluationRubric, 'id'>) => {
    try {
      const newRubric: EvaluationRubric = {
        ...rubricData,
        id: `rubric-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      };
      
      setRubrics(prev => [...prev, newRubric]);
      return newRubric;
    } catch (error) {
      console.error('Error creating rubric:', error);
      throw error;
    }
  }, []);

  const updateRubric = useCallback(async (rubric: EvaluationRubric) => {
    try {
      setRubrics(prev => 
        prev.map(r => r.id === rubric.id ? rubric : r)
      );
      
      return rubric;
    } catch (error) {
      console.error('Error updating rubric:', error);
      throw error;
    }
  }, []);

  const deleteRubric = useCallback(async (id: string) => {
    try {
      setRubrics(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting rubric:', error);
      throw error;
    }
  }, []);

  // Implementation of exam results management
  const saveExamResult = useCallback(async (resultData: Omit<ExamResult, 'id'>) => {
    try {
      const newResult: ExamResult = {
        ...resultData,
        id: `result-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      };
      
      setResults(prev => [...prev, newResult]);
      return newResult;
    } catch (error) {
      console.error('Error saving exam result:', error);
      throw error;
    }
  }, []);

  const getExamResultsByExam = useCallback((examId: string) => {
    if (!examId) return [];
    return results.filter(result => result.examId === examId);
  }, [results]);

  const getExamResultsByStudent = useCallback((studentId: string) => {
    if (!studentId) return [];
    return results.filter(result => result.studentId === studentId);
  }, [results]);

  const value = {
    questions,
    exams,
    rubrics,
    results,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    createExam,
    updateExam,
    deleteExam,
    createRubric,
    updateRubric,
    deleteRubric,
    saveExamResult,
    getExamResultsByExam,
    getExamResultsByStudent,
    resetToMockData,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};