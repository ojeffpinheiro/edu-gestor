import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { useAssessment } from '../../../contexts/AssessmentContext';
import { Exam } from '../../../utils/types/Assessment';

import ExamGenerator from '../../../components/Assessment/ExamGenerator/ExamGenerator';
import ExamSecurityManager from '../../../components/Assessment/ExamGenerator/ExamSecurityManager';
import ExamVariantGenerator from '../../../components/Assessment/ExamGenerator/ExamVariantGenerator';

import { Button, CloseButton } from '../../../styles/buttons';
import { FormContainer } from '../../../styles/containers';
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '../../../styles/modals';


type ModalType = 'create' | 'security' | 'variants' | null;

interface ExamModalsProps {
  modalType: ModalType;
  selectedExam: Exam | null;
  onClose: () => void;
  onExamCreated: (exam: Exam) => void;
  onExamUpdated: (exam: Exam) => void;
  onVariantsGenerated: (variants: Exam[]) => void;
}

/**
 * Componente que gerencia todos os modais do gerenciador de exames
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
      )
    },
    security: {
      title: `Configurações de Segurança: ${selectedExam?.title || ''}`,
      content: selectedExam && (
        <ExamSecurityManager
          exam={selectedExam}
          onUpdate={onExamUpdated}
        />
      )
    },
    variants: {
      title: `Gerar Variantes: ${selectedExam?.title || ''}`,
      content: selectedExam && (
        <ExamVariantGenerator
          baseExam={selectedExam}
          questions={getRelatedQuestions()}
          onVariantsGenerated={onVariantsGenerated}
        />
      )
    }
  };

  /**
   * Manipula o clique fora do modal para fechá-lo
   */
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContainer onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <ModalContent>
        <ModalHeader>
          <h3>{modalConfig[modalType].title}</h3>
          <CloseButton onClick={onClose} aria-label="Fechar modal">
            <FaTimes size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <FormContainer>
            {modalConfig[modalType].content}
          </FormContainer>
        </ModalBody>

        <ModalFooter>
          <div className="navigation-buttons">
            <Button 
              variant="secondary" 
              onClick={onClose}
              aria-label="Cancelar ação"
            >
              Cancelar
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default ExamModals;