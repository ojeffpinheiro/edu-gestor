import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Adicionar ícone para consistência

import { PrimaryActionButton } from '../../styles/buttons';
import { EmptyState } from '../../styles/feedback';
import { EmptyStateIcon, EmptyStateText, EmptyStateTitle } from './styles';

interface ExamEmptyStateProps {
  onCreateExam: () => void;
}

/**
 * Componente que renderiza o estado vazio (quando não há exames)
 * Exibe uma mensagem amigável e um botão de ação para criar o primeiro exame
 */
const ExamEmptyState: React.FC<ExamEmptyStateProps> = ({ onCreateExam }) => {
  return (
    <EmptyState data-testid="empty-state-container">
      <EmptyStateIcon>
        <FaPlus size={42} />
      </EmptyStateIcon>
      <EmptyStateTitle>Nenhum exame encontrado</EmptyStateTitle>
      <EmptyStateText>
        Você ainda não criou nenhum exame. Clique no botão "Criar Novo Exame" para começar.
      </EmptyStateText>
      <PrimaryActionButton 
        onClick={onCreateExam}
        aria-label="Criar primeiro exame"
        data-testid="create-first-exam-button"
      >
        Criar Novo Exame
      </PrimaryActionButton>
    </EmptyState>
  );
};

export default React.memo(ExamEmptyState);