import React from 'react';
import styled from 'styled-components';
import { slideIn } from '../../styles/animations';
import { flexColumn } from '../../styles/layoutUtils';
import { PrimaryActionButton } from '../../styles/buttons';

interface ExamEmptyStateProps {
  onCreateExam: () => void;
}

const EmptyState = styled.div`
  ${flexColumn}
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  text-align: center;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  margin: var(--space-xl) 0;
  animation: ${slideIn} 0.4s ease-out;
`;

const EmptyStateTitle = styled.h2`
  margin-bottom: var(--space-md);
  color: var(--color-text-secondary);
  font-weight: 500;
`;

const EmptyStateText = styled.p`
  margin-bottom: var(--space-lg);
  color: var(--color-text-third);
  max-width: 500px;
  line-height: 1.6;
`;

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