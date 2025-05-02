// src/context/ExamContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exam, ExamGenerationParams, ExamService, Question } from '../services/examsService';

interface ExamContextType {
  questions: Question[];
  exams: Exam[];
  currentExam: Exam | null;
  isLoading: boolean;
  error: string | null;
  examParams: ExamGenerationParams;
  selectedQuestionIds: string[];
  setExamParams: (params: Partial<ExamGenerationParams>) => void;
  setSelectedQuestionIds: (ids: string[]) => void;
  setCurrentExam: (exam: Exam | null) => void;
  generateRandomExams: () => Promise<Exam[]>;
  generateSpecificExam: (title: string, password?: string) => Promise<void>;
  saveExamAsPDF: (examId: string) => Promise<Blob>;
  exportAnswerKey: (examId: string) => Promise<Blob>;
  refreshExams: () => Promise<void>;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const examService = ExamService.getInstance();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [examParams, setExamParamsState] = useState<ExamGenerationParams>({
    numberOfExams: 1,
    questionsPerExam: 10,
    topics: [],
    selectedTopics: [],
    difficulty: 'all',
    title: 'Nova Prova',
    selectedQuestionIds: []
  });
  
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [loadedQuestions, loadedExams] = await Promise.all([
          examService.loadQuestions(),
          examService.getExams()
        ]);
        setQuestions(loadedQuestions);
        setExams(loadedExams);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados iniciais');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [examService]);
  
  const setExamParams = (params: Partial<ExamGenerationParams>) => {
    setExamParamsState(prev => ({ ...prev, ...params }));
  };

  const generateRandomExams = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Verifica se há questões selecionadas OU tópicos selecionados
      const hasSelectedQuestions = examParams.selectedQuestionIds.length > 0;
      const hasSelectedTopics = examParams.selectedTopics.length > 0;

      if (!hasSelectedQuestions && !hasSelectedTopics) {
        console.log(`tem ${examParams.selectedQuestionIds.length} questões selecionadas` )
      throw new Error('Selecione pelo menos um tópico na aba "Filtrar por Tópico" OU marque questões específicas na lista');
    }

    // Se há questões selecionadas, ignora os tópicos
    const paramsToUse = hasSelectedQuestions
      ? { ...examParams, topics: [], selectedTopics: [] }
      : examParams;
  
      const newExams = await examService.generateRandomExams(paramsToUse);
    setExams(prev => [...prev, ...newExams]);
    setCurrentExam(newExams[0] || null);
    return newExams;
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Ocorreu um erro ao gerar as provas';
    
    setError(errorMessage);
    throw error;
  } finally {
    setIsLoading(false);
  }
  };
  
  const generateSpecificExam = async (title: string, password?: string) => {
    if (selectedQuestionIds.length === 0) {
      setError('Selecione pelo menos uma questão para gerar a prova');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const newExam = await examService.generateSpecificExam(
        title, 
        selectedQuestionIds,
        password
      );
      
      if (newExam) {
        setExams(prev => [...prev, newExam]);
        setCurrentExam(newExam);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar prova específica');
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveExamAsPDF = async (examId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await examService.saveExamAsPDF(examId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar prova como PDF');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const exportAnswerKey = async (examId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await examService.exportAnswerKey(examId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao exportar gabarito');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const refreshExams = async () => {
    setIsLoading(true);
    try {
      const loadedExams = await examService.getExams();
      setExams(loadedExams);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar lista de provas');
    } finally {
      setIsLoading(false);
    }
  };
  
  const contextValue: ExamContextType = {
    questions,
    exams,
    currentExam,
    isLoading,
    error,
    examParams,
    selectedQuestionIds,
    setExamParams,
    setSelectedQuestionIds,
    setCurrentExam,
    generateRandomExams,
    generateSpecificExam,
    saveExamAsPDF,
    exportAnswerKey,
    refreshExams
  };
  
  return (
    <ExamContext.Provider value={contextValue}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam deve ser usado dentro de um ExamProvider');
  }
  return context;
};