import { useState, useEffect } from 'react';
import { useAssessment } from '../contexts/AssessmentContext';
import { Exam } from '../utils/types/Assessment';

// Tipos
export type ModalType = 'create' | 'security' | 'variants' | null;

/**
 * Custom hook para gerenciar o estado e a lógica do gerenciador de exames
 */
export const useExamManager = () => {
  const { 
    exams, 
    questions, 
    updateExam, 
    resetToMockData, 
    createExam 
  } = useAssessment();
  
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [displayedExams, setDisplayedExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Inicializa e atualiza a lista de exames quando o contexto muda
  useEffect(() => {
    try {
      setDisplayedExams(exams);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar exames:', error);
      setError('Ocorreu um erro ao carregar os exames. Tente novamente.');
      setIsLoading(false);
    }
  }, [exams]);

  /**
   * Abre um modal específico e opcionalmente seleciona um exame
   */
  const openModal = (type: ModalType, exam: Exam | null = null) => {
    try {
      setSelectedExam(exam);
      setModalType(type);
    } catch (error) {
      console.error('Erro ao abrir modal:', error);
      setError('Não foi possível abrir o modal. Tente novamente.');
    }
  };

  /**
   * Fecha o modal atual
   */
  const closeModal = () => {
    setModalType(null);
    setError(null);
  };

  /**
   * Adiciona um exame recém-criado à lista
   */
  const handleExamCreated = (newExam: Exam) => {
    try {
      setDisplayedExams(prevExams => [...prevExams, newExam]);
      closeModal();
    } catch (error) {
      console.error('Erro ao criar exame:', error);
      setError('Ocorreu um erro ao criar o exame. Tente novamente.');
    }
  };

  /**
   * Atualiza um exame existente na lista
   */
  const handleExamUpdated = (updatedExam: Exam) => {
    try {
      updateExam(updatedExam);
      setDisplayedExams(prevExams =>
        prevExams.map(exam => exam.id === updatedExam.id ? updatedExam : exam)
      );
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar exame:', error);
      setError('Ocorreu um erro ao atualizar o exame. Tente novamente.');
    }
  };

  /**
   * Adiciona variantes geradas à lista de exames
   */
  const handleVariantsGenerated = (variants: Exam[]) => {
    try {
      setDisplayedExams(prevExams => [...prevExams, ...variants]);
      closeModal();
    } catch (error) {
      console.error('Erro ao gerar variantes:', error);
      setError('Ocorreu um erro ao gerar variantes. Tente novamente.');
    }
  };

  /**
   * Reinicia os dados para o estado inicial
   */
  const handleResetData = () => {
    try {
      resetToMockData();
      setSelectedExam(null);
      setError(null);
    } catch (error) {
      console.error('Erro ao resetar dados:', error);
      setError('Não foi possível resetar os dados. Tente novamente.');
    }
  };

  return {
    // Estado
    modalType,
    selectedExam,
    displayedExams,
    isLoading,
    error,
    questions,
    
    // Ações
    openModal,
    closeModal,
    handleExamCreated,
    handleExamUpdated,
    handleVariantsGenerated,
    handleResetData,
    createExam
  };
};

export default useExamManager;