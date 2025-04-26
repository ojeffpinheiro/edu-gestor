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
import { formatDate } from '../../utils/dateFormatter';
import { FaShieldAlt } from 'react-icons/fa';

interface ExamCardProps {
  exam: Exam;
  onOpenSecuritySettings: () => void;
  onOpenVariantGenerator: () => void;
}

/**
 * ExamCard - Componente de cartão para exibir informações de um exame
 * 
 * Exibe detalhes do exame e fornece ações para gerenciamento como:
 * - Configurar segurança
 * - Gerar variantes
 */
const ExamCardComponent: React.FC<ExamCardProps> = ({ 
  exam, 
  onOpenSecuritySettings, 
  onOpenVariantGenerator 
}) => {

  // Funções seguras para obter dados do exame com validações
  const getQuestionCount = (): number => {
    try {
      return Array.isArray(exam.questions) ? exam.questions.length : 0;
    } catch (error) {
      console.error('Erro ao contar questões:', error);
      return 0;
    }
  };

  const getTimeLimit = (): string => {
    try {
      return exam.timeLimit?.toString() || "N/A";
    } catch (error) {
      console.error('Erro ao obter tempo limite:', error);
      return "N/A";
    }
  };

  const getVariantCount = (): number => {
    try {
      return Array.isArray(exam.variants) ? exam.variants.length : 0;
    } catch (error) {
      console.error('Erro ao contar variantes:', error);
      return 0;
    }
  };

  // Verifica se o exame tem configurações de segurança ativas
  const hasSecurityFeatures = (): boolean => {
    return Boolean(
      exam.useQRCode || 
      exam.useBarCode || 
      exam.requirePassword
    );
  };

  return (
    <ExamCard 
      className={`fade-in ${hasSecurityFeatures() ? 'has-security' : ''}`}
      data-testid={`exam-card-${exam.id}`}
    >
      <ExamTitle data-testid={`exam-title-${exam.id}`}>
        {exam.title || 'Exame sem título'}
      </ExamTitle>

      <ExamMeta>
        ID: {exam.id || 'N/A'} | Criado em: {formatDate(exam.createdAt.toISOString())}
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
          aria-label={`Configurar segurança do exame ${exam.title || 'sem título'}`}
          data-testid={`security-button-${exam.id}`}
        >
          {hasSecurityFeatures() ? (<><FaShieldAlt /> Segurança</>) : 'Segurança'}
        </Button>
        <Button
          variant="primary"
          onClick={onOpenVariantGenerator}
          aria-label={`Gerar variantes para o exame ${exam.title || 'sem título'}`}
          data-testid={`variants-button-${exam.id}`}
        >
          Variantes
        </Button>
      </ExamActions>
    </ExamCard>
  );
};

export default React.memo(ExamCardComponent);