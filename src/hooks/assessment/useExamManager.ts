import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Exam, ExamModalType } from '../../types/academic/Assessment';

/**
 * Custom hook para gerenciar o estado e a lógica do gerenciador de exames
 */
export const useExamManager = () => {
  const { 
    exams, 
    questions, 
    updateExam: contextUpdateExam, 
    resetToMockData, 
    createExam: contextCreateExam 
  } = useAssessment();
  
  const [activeModalType, setActiveModalType] = useState<ExamModalType>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [examList, setExamList] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Inicializa e atualiza a lista de exames quando o contexto muda
  useEffect(() => {
    try {
      setExamList(exams);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar exames:', error);
      setErrorMessage('Ocorreu um erro ao carregar os exames. Tente novamente.');
      setIsLoading(false);
    }
  }, [exams]);

  /**
   * Gerencia os modais do sistema
   */
  const modalManager = useMemo(() => ({
    open: (type: ExamModalType, exam: Exam | null = null) => {
      setSelectedExam(exam);
      setActiveModalType(type);
    },
    
    close: () => {
      setActiveModalType(null);
      setErrorMessage(null);
    }
  }), []);

  /**
   * Adiciona um exame recém-criado à lista
   */
  const handleExamCreation = useCallback(async (newExam: Exam) => {
    try {
      await contextCreateExam(newExam);
      modalManager.close();
      return true;
    } catch (error) {
      console.error('Erro ao criar exame:', error);
      setErrorMessage('Ocorreu um erro ao criar o exame. Tente novamente.');
      return false;
    }
  }, [contextCreateExam, modalManager]);

  /**
   * Atualiza um exame existente na lista
   */
  const handleExamUpdate = useCallback(async (updatedExam: Exam) => {
    try {
      await contextUpdateExam(updatedExam);
      modalManager.close();
      return true;
    } catch (error) {
      console.error('Erro ao atualizar exame:', error);
      setErrorMessage('Ocorreu um erro ao atualizar o exame. Tente novamente.');
      return false;
    }
  }, [contextUpdateExam, modalManager]);

  /**
   * Adiciona variantes geradas à lista de exames
   */
  const handleVariantGeneration = useCallback(async (variants: Exam[]) => {
    try {
      // Adiciona cada variante individualmente para garantir que todas sejam processadas corretamente
      const creationPromises = variants.map(variant => contextCreateExam(variant));
      await Promise.all(creationPromises);
      modalManager.close();
      return true;
    } catch (error) {
      console.error('Erro ao gerar variantes:', error);
      setErrorMessage('Ocorreu um erro ao gerar variantes. Tente novamente.');
      return false;
    }
  }, [contextCreateExam, modalManager]);

  /**
   * Reinicia os dados para o estado inicial
   */
  const handleDataReset = useCallback(() => {
    try {
      resetToMockData();
      setSelectedExam(null);
      setErrorMessage(null);
      return true;
    } catch (error) {
      console.error('Erro ao resetar dados:', error);
      setErrorMessage('Não foi possível resetar os dados. Tente novamente.');
      return false;
    }
  }, [resetToMockData]);

  return {
    // Estado
    activeModalType,
    selectedExam,
    examList,
    isLoading,
    errorMessage,
    questions,
    
    // Ações
    modalManager,
    handleExamCreation,
    handleExamUpdate,
    handleVariantGeneration,
    handleDataReset,
    createExam: contextCreateExam
  };
};

export default useExamManager;