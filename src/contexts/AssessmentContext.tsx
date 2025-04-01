// src/contexts/AssessmentContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Question, Exam, EvaluationRubric, ExamResult } from '../utils/types/Assessment';
import { mockQuestions, mockExams, mockRubrics, mockResults } from '../mocks/assessmentData';

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
  }, []);

  const resetToMockData = () => {
    setQuestions(mockQuestions);
    setExams(mockExams);
    setRubrics(mockRubrics);
    setResults(mockResults);
  };

  // Implementation of question management
  const addQuestion = async (questionData: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // In a real app, this would be an API call
      const newQuestion: Question = {
        ...questionData,
        id: `question-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setQuestions(prev => [...prev, newQuestion]);
      return newQuestion;
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  };

  const updateQuestion = async (question: Question) => {
    try {
      // In a real app, this would be an API call
      const updatedQuestion = { ...question, updatedAt: new Date() };
      setQuestions(prev => 
        prev.map(q => q.id === question.id ? updatedQuestion : q)
      );
      return updatedQuestion;
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  };

  const deleteQuestion = async (id: string) => {
    try {
      // In a real app, this would be an API call
      setQuestions(prev => prev.filter(q => q.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  };

  // Implementation of exam management
  const createExam = async (examData: Omit<Exam, 'id' | 'createdAt'>) => {
    try {
      // In a real app, this would be an API call
      const newExam: Exam = {
        ...examData,
        id: `exam-${Date.now()}`,
        createdAt: new Date(),
      };
      setExams(prev => [...prev, newExam]);
      return newExam;
    } catch (error) {
      console.error('Error creating exam:', error);
      throw error;
    }
  };

  const updateExam = async (exam: Exam) => {
    try {
      setExams(prev => 
        prev.map(e => e.id === exam.id ? exam : e)
      );
      return exam;
    } catch (error) {
      console.error('Error updating exam:', error);
      throw error;
    }
  };

  const deleteExam = async (id: string) => {
    try {
      setExams(prev => prev.filter(e => e.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting exam:', error);
      throw error;
    }
  };

  // Implementation of rubric management
  const createRubric = async (rubricData: Omit<EvaluationRubric, 'id'>) => {
    try {
      const newRubric: EvaluationRubric = {
        ...rubricData,
        id: `rubric-${Date.now()}`,
      };
      setRubrics(prev => [...prev, newRubric]);
      return newRubric;
    } catch (error) {
      console.error('Error creating rubric:', error);
      throw error;
    }
  };

  const updateRubric = async (rubric: EvaluationRubric) => {
    try {
      setRubrics(prev => 
        prev.map(r => r.id === rubric.id ? rubric : r)
      );
      return rubric;
    } catch (error) {
      console.error('Error updating rubric:', error);
      throw error;
    }
  };

  const deleteRubric = async (id: string) => {
    try {
      setRubrics(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting rubric:', error);
      throw error;
    }
  };

  // Implementation of exam results management
  const saveExamResult = async (resultData: Omit<ExamResult, 'id'>) => {
    try {
      const newResult: ExamResult = {
        ...resultData,
        id: `result-${Date.now()}`,
      };
      setResults(prev => [...prev, newResult]);
      return newResult;
    } catch (error) {
      console.error('Error saving exam result:', error);
      throw error;
    }
  };

  const getExamResultsByExam = (examId: string) => {
    return results.filter(result => result.examId === examId);
  };

  const getExamResultsByStudent = (studentId: string) => {
    return results.filter(result => result.studentId === studentId);
  };

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