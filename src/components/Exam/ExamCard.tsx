import React from 'react';

import { Exam } from '../../utils/types/Assessment';

import { Button } from '../../styles/buttons';

import {
  ExamActions,
  ExamCard,
  ExamMeta,
  ExamTitle,
  ExamStatistics,
  StatItem,
  StatValue,
  StatLabel
} from './styles'

interface ExamCardProps {
  exam: Exam;
  onOpenSecuritySettings: () => void;
  onOpenVariantGenerator: () => void;
}

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