import React from 'react';

import { useAssessment } from '../../../contexts/AssessmentContext';
import { Exam, ExamModalType } from '../../../types/academic/Assessment';

import ExamGenerator from '../../../components/Assessment/ExamGenerator/ExamGenerator';
import ExamSecurityManager from '../../../components/Assessment/ExamGenerator/ExamSecurityManager';
import ExamVariantGenerator from '../../../components/Assessment/ExamGenerator/ExamVariantGenerator';
import Modal from '../Modal';

interface ExamModalsProps {
  modalType: ExamModalType;
  selectedExam: Exam | null;
  onClose: () => void;
  onExamCreated: (exam: Exam) => void;
  onExamUpdated: (exam: Exam) => void;
  onVariantsGenerated: (variants: Exam[]) => void;
}

/**
 * Componente aprimorado que gerencia todos os modais do gerenciador de exames
 * Utilizando o componente Modal reutilizável
 */
const ExamModals: React.FC<ExamModalsProps> = ({
  modalType,
  selectedExam,
  onClose,
  onExamCreated,
  onExamUpdated,
  onVariantsGenerated
}) => {
  const { questions, createExam } = useAssessment();

  // Se não houver tipo de modal, não renderiza nada
  if (!modalType) return null;

  /**
   * Obtém as questões relacionadas ao exame selecionado
   */
  const getRelatedQuestions = () => {
    if (!selectedExam) return [];
    try {
      return questions.filter(q => selectedExam.questions.includes(q.id));
    } catch (error) {
      console.error('Erro ao filtrar questões relacionadas:', error);
      return [];
    }
  };

  /**
   * Configurações para o modal atual
   */
  const modalConfig = {
    create: {
      title: 'Criar Novo Exame',
      content: (
        <ExamGenerator
          questions={questions}
          createExam={createExam}
          onExamCreated={onExamCreated}
        />
      ),
      hasSubmit: false
    },
    security: {
      title: `Configurações de Segurança: ${selectedExam?.title || ''}`,
      content: selectedExam && (
        <ExamSecurityManager
          exam={selectedExam}
          onUpdate={onExamUpdated}
        />
      ),
      hasSubmit: false
    },
    variants: {
      title: `Gerar Variantes: ${selectedExam?.title || ''}`,
      content: selectedExam && (
        <ExamVariantGenerator
          baseExam={selectedExam}
          questions={getRelatedQuestions()}
          onVariantsGenerated={onVariantsGenerated}
        />
      ),
      hasSubmit: false
    }
  };

  const currentConfig = modalConfig[modalType];

  return (
    <Modal
      isOpen={!!modalType}
      title={currentConfig.title}
      onClose={onClose}
      showFooter={true}
      size="md"
    >
      {currentConfig.content}
    </Modal>
  );
};

export default ExamModals;