import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useAssessment } from '../../contexts/AssessmentContext';
import { Exam } from '../../utils/types/Assessment';


import ExamCardComponent from '../../components/Exam/ExamCard';
import ExamEmptyState from '../../components/Exam/ExamEmptyState';
import ExamModals from '../../components/modals/ExamModals';

import { Button } from '../../styles/buttons';
import {
  ExamManagerContainer,
  Header,
  Title,
  ActionsContainer,
  ExamsGrid
} from './styles';

// Tipos
type ModalType = 'create' | 'security' | 'variants' | null;

/**
 * Conteúdo principal do gerenciador de exames
 */
const ExamManagerContent: React.FC = () => {
  const { exams, resetToMockData } = useAssessment();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [displayedExams, setDisplayedExams] = useState<Exam[]>([]);

  // Atualiza a lista de exames quando o contexto muda
  useEffect(() => {
    try {
      setDisplayedExams(exams);
    } catch (error) {
      console.error('Erro ao atualizar lista de exames:', error);
      setDisplayedExams([]);
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
    }
  };

  /**
   * Fecha o modal atual
   */
  const closeModal = () => {
    setModalType(null);
  };

  /**
   * Adiciona um exame recém-criado à lista
   */
  const handleExamCreated = (newExam: Exam) => {
    try {
      setDisplayedExams(prevExams => [...prevExams, newExam]);
      closeModal();
    } catch (error) {
      console.error('Erro ao adicionar novo exame:', error);
    }
  };

  /**
   * Atualiza um exame na lista
   */
  const handleExamUpdated = (updatedExam: Exam) => {
    try {
      setDisplayedExams(prevExams =>
        prevExams.map(exam => exam.id === updatedExam.id ? updatedExam : exam)
      );
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar exame:', error);
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
      console.error('Erro ao adicionar variantes:', error);
    }
  };

  /**
   * Reinicia os dados para o estado inicial
   */
  const handleResetData = () => {
    try {
      resetToMockData();
      setSelectedExam(null);
    } catch (error) {
      console.error('Erro ao resetar dados:', error);
      alert('Não foi possível resetar os dados. Tente novamente.');
    }
  };

  return (
    <ExamManagerContainer>
      <Header>
        <Title>Gerenciamento de Exames</Title>
        <ActionsContainer>
          <Button
            variant="secondary"
            onClick={handleResetData}
            aria-label="Resetar todos os dados"
          >
            Resetar Dados
          </Button>

          <Button
            variant='primary'
            onClick={() => openModal('create')} aria-label='Criar um novo exame'>
            <FaPlus /> Criar Exame
          </Button>
        </ActionsContainer>
      </Header>

      {displayedExams.length > 0 ? (
        <ExamsGrid>
          {displayedExams.map((exam) => (
            <ExamCardComponent
              key={exam.id}
              exam={exam}
              onOpenSecuritySettings={() => openModal('security', exam)}
              onOpenVariantGenerator={() => openModal('variants', exam)}
            />
          ))}
        </ExamsGrid>
      ) : (
        <ExamEmptyState onCreateExam={() => openModal('create')} />
      )}

      <ExamModals
        modalType={modalType}
        selectedExam={selectedExam}
        onClose={closeModal}
        onExamCreated={handleExamCreated}
        onExamUpdated={handleExamUpdated}
        onVariantsGenerated={handleVariantsGenerated}
      />
    </ExamManagerContainer>
  );
};

export default ExamManagerContent;