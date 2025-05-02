// components/exam/steps/ReviewStep.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

import QuestionManager from '../QuestionManager/QuestionManager';
import { ExamGenerationParams, Question } from '../../../services/examsService';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { ErrorMessage } from '../../../styles/feedback';
import { SectionTitle } from '../../../styles/baseComponents';

interface ReviewStepProps {
  formData: ExamGenerationParams;
  selectedQuestions: Question[];
  onComplete: () => Promise<void>;
  isSubmitting?: boolean;
  error?: string | null;
  isValid: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  selectedQuestions,
  onComplete,
  isSubmitting = false,
  error = null,
  isValid
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmedGeneration = async () => {
    setShowConfirmation(false);
    await onComplete();
  };

  return (
    <ReviewContainer>
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <ConfigurationSummary>
        <SectionTitle>Resumo da Configuração</SectionTitle>
        <SummaryGrid>
          <SummaryItem>
            <SummaryLabel>Título:</SummaryLabel>
            <span>{formData.title}</span>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Número de Variantes:</SummaryLabel>
            <span>{formData.numberOfExams}</span>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Questões por Prova:</SummaryLabel>
            <span>{formData.questionsPerExam}</span>
          </SummaryItem>
          {formData.difficultyDistribution && (
            <SummaryItem>
              <SummaryLabel>Distribuição:</SummaryLabel>
              <span>
                Fácil: {formData.difficultyDistribution.easy || 0},
                Média: {formData.difficultyDistribution.medium || 0},
                Difícil: {formData.difficultyDistribution.hard || 0}
              </span>
            </SummaryItem>
          )}
          {formData.shuffleQuestions && (
            <SummaryItem>
              <SummaryLabel>Embaralhar questões</SummaryLabel>
            </SummaryItem>
          )}
          {formData.shuffleOptions && (
            <SummaryItem>
              <SummaryLabel>Embaralhar alternativas</SummaryLabel>
            </SummaryItem>
          )}
          {formData.password && (
            <SummaryItem>
              <SummaryLabel>Protegido por senha</SummaryLabel>
            </SummaryItem>
          )}
        </SummaryGrid>
      </ConfigurationSummary>

      <QuestionsSection>
        <SectionTitle>
          Questões Selecionadas ({selectedQuestions.length})
        </SectionTitle>
        <QuestionManager
          questions={selectedQuestions}
          readOnly={true}
          initialTopics={formData.selectedTopics}
          onTopicsChange={() => { }}
        />
      </QuestionsSection>

      {showConfirmation && (
        <ConfirmDialog
          title="Confirmar Geração de Provas"
          message="Tem certeza que deseja gerar as provas com as configurações atuais?"
          confirmLabel="Confirmar"
          cancelLabel="Revisar"
          onConfirm={handleConfirmedGeneration}
          onCancel={() => setShowConfirmation(false)}
          type="info"
        />
      )}
    </ReviewContainer>
  );
};

// Manter os estilos existentes
const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ConfigurationSummary = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const QuestionsSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryLabel = styled.strong`
  margin-right: 0.5rem;
`;

export default ReviewStep;