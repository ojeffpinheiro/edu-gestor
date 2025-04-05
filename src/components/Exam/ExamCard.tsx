import React from 'react';

import { Exam } from '../../utils/types/Assessment';
import styled from 'styled-components';
import { flexColumn, flexRow, gap } from '../../styles/layoutUtils';
import { Button } from '../../styles/buttons';
import { cardHoverTransition } from '../../styles/animations';

interface ExamCardProps {
  exam: Exam;
  onOpenSecuritySettings: () => void;
  onOpenVariantGenerator: () => void;
}

const ExamCard = styled.article`
  ${flexColumn}
  padding: var(--space-lg);
  height: 100%;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: ${cardHoverTransition};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

const ExamTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-sm);
  color: var(--color-title-card);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ExamMeta = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
`;

const ExamStatistics = styled.div`
  ${flexRow}
  ${gap('md')}
  margin-bottom: var(--space-md);
  padding: var(--space-sm) 0;
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
`;

const StatValue = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-primary);
`;

const StatLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
`;

const ExamActions = styled.div`
  ${flexRow}
  ${gap('sm')}
  margin-top: auto;
  padding-top: var(--space-md);
`;

/**
 * Componente que renderiza um cartão individual de exame
 */
const ExamCardComponent: React.FC<ExamCardProps> = ({ 
  exam, 
  onOpenSecuritySettings, 
  onOpenVariantGenerator 
}) => {
  // Formata a data de criação do exame
  const formatCreationDate = (date: Date): string => {
    try {
      return date.toLocaleString();
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  // Obtém o número de questões no exame
  const getQuestionCount = (): number => {
    try {
      return exam.questions.length;
    } catch (error) {
      console.error('Erro ao contar questões:', error);
      return 0;
    }
  };

  // Obtém o tempo limite do exame
  const getTimeLimit = (): string => {
    try {
      return exam.timeLimit?.toString() || "-";
    } catch (error) {
      console.error('Erro ao obter tempo limite:', error);
      return "-";
    }
  };

  // Obtém o número de variantes do exame
  const getVariantCount = (): number => {
    try {
      return exam.variants?.length || 0;
    } catch (error) {
      console.error('Erro ao contar variantes:', error);
      return 0;
    }
  };

  return (
    <ExamCard className="fade-in">
      <ExamTitle data-testid={`exam-title-${exam.id}`}>
        {exam.title}
      </ExamTitle>
      <ExamMeta>
        ID: {exam.id} | Criado em: {formatCreationDate(exam.createdAt)}
      </ExamMeta>

      <ExamStatistics>
        <StatItem>
          <StatValue>{getQuestionCount()}</StatValue>
          <StatLabel>Questões</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{getTimeLimit()}</StatValue>
          <StatLabel>Minutos</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{getVariantCount()}</StatValue>
          <StatLabel>Variantes</StatLabel>
        </StatItem>
      </ExamStatistics>

      <ExamActions>
        <Button
          variant="secondary"
          onClick={onOpenSecuritySettings}
          aria-label={`Configurar segurança do exame ${exam.title}`}
        >
          Segurança
        </Button>
        <Button
          variant="primary"
          onClick={onOpenVariantGenerator}
          aria-label={`Gerar variantes para o exame ${exam.title}`}
        >
          Variantes
        </Button>
      </ExamActions>
    </ExamCard>
  );
};

export default ExamCardComponent;