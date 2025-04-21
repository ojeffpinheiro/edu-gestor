import React from 'react';

import { PrimaryActionButton } from '../../styles/buttons';

import { EmptyState, EmptyStateText, EmptyStateTitle } from './styles'

interface ExamEmptyStateProps {
  onCreateExam: () => void;
}

/**
 * Componente que renderiza o estado vazio (quando não há exames)
 */
const ExamEmptyState: React.FC<ExamEmptyStateProps> = ({ onCreateExam }) => {
  return (
    <EmptyState>
      <EmptyStateTitle>Nenhum exame encontrado</EmptyStateTitle>
      <EmptyStateText>
        Você ainda não criou nenhum exame. Clique no botão "Criar Novo Exame" para começar.
      </EmptyStateText>
      <PrimaryActionButton 
        onClick={onCreateExam}
        aria-label="Criar primeiro exame"
      >
        Criar Novo Exame
      </PrimaryActionButton>
    </EmptyState>
  );
};

export default ExamEmptyState;