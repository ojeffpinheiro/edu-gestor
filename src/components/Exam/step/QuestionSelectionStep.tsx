// components/exam/steps/QuestionSelectionStep.tsx
import React from 'react';
import styled from 'styled-components';
import { ExamGenerationParams, Question } from '../../../services/examsService';
import { FormGroup, Input, Label } from '../../../styles/formControls';
import { ErrorMessage } from '../../../styles/feedback';
import { Flex, Grid } from '../../../styles/layoutUtils';
import { BaseCard } from '../../../styles/baseComponents';
import QuestionManager from '../QuestionManager/QuestionManager';

interface QuestionSelectionStepProps {
  formData: ExamGenerationParams;
  errors: Record<string, string>;
  availableQuestions: Question[];
  onFormUpdate: (updates: Partial<ExamGenerationParams>) => void;
  onQuestionsUpdate: (ids: string[]) => void;
  onTopicsUpdate: (topics: string[]) => void;
}

const QuestionSelectionStep: React.FC<QuestionSelectionStepProps> = ({
  formData,
  errors,
  availableQuestions,
  onFormUpdate,
  onQuestionsUpdate,
  onTopicsUpdate,
}) => {
  
  const handleQuestionsPerExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    onFormUpdate({ questionsPerExam: value });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Math.max(0, Number(value));
    
    onFormUpdate({
      difficultyDistribution: {
        ...(formData.difficultyDistribution || { easy: 0, medium: 0, hard: 0 }),
        [name]: numericValue,
      }
    });
  };
  
  // Calcular total de questões selecionadas por dificuldade
  const totalSelected = formData.difficultyDistribution 
    ? (formData.difficultyDistribution.easy || 0) +
      (formData.difficultyDistribution.medium || 0) +
      (formData.difficultyDistribution.hard || 0)
    : 0;

  return (
    <StepContainer>
      <ConfigurationSection>
        <FormGroup>
          <Label htmlFor="questionsPerExam">Número de Questões por Prova</Label>
          <Input
            id="questionsPerExam"
            type="number"
            min="1"
            value={formData.questionsPerExam}
            onChange={handleQuestionsPerExamChange}
            required
            aria-invalid={!!errors.questionsPerExam}
          />
          {errors.questionsPerExam && (
            <ErrorMessage>{errors.questionsPerExam}</ErrorMessage>
          )}
        </FormGroup>

        <DifficultySection>
          <Label>Distribuição por Dificuldade (Número de Questões)</Label>
          <DifficultyGrid>
            <FormGroup>
              <Label htmlFor="easy">Fácil</Label>
              <Input
                id="easy"
                name="easy"
                type="number"
                min="0"
                value={formData.difficultyDistribution?.easy || 0}
                onChange={handleDifficultyChange}
                aria-invalid={!!errors.difficultyDistribution}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="medium">Média</Label>
              <Input
                id="medium"
                name="medium"
                type="number"
                min="0"
                value={formData.difficultyDistribution?.medium || 0}
                onChange={handleDifficultyChange}
                aria-invalid={!!errors.difficultyDistribution}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="hard">Difícil</Label>
              <Input
                id="hard"
                name="hard"
                type="number"
                min="0"
                value={formData.difficultyDistribution?.hard || 0}
                onChange={handleDifficultyChange}
                aria-invalid={!!errors.difficultyDistribution}
              />
            </FormGroup>
          </DifficultyGrid>
          <SelectionSummary>
            <SelectedCount>
              <strong>Total:</strong> {totalSelected} questão{totalSelected !== 1 ? 's' : ''}
            </SelectedCount>
            {errors.difficultyDistribution && (
              <ErrorMessage>{errors.difficultyDistribution}</ErrorMessage>
            )}
          </SelectionSummary>
        </DifficultySection>
      </ConfigurationSection>

      <QuestionsSection>
        <QuestionManager
          questions={availableQuestions}
          selectedIds={formData.selectedQuestionIds}
          onSelectionChange={onQuestionsUpdate}
          initialTopics={formData.selectedTopics}
          onTopicsChange={onTopicsUpdate}
          readOnly={false}
        />
        
        <SelectionSummary>
          <SelectedCount>
            <strong>{formData.selectedQuestionIds.length}</strong> questão{formData.selectedQuestionIds.length !== 1 ? 's' : ''} selecionada{formData.selectedQuestionIds.length !== 1 ? 's' : ''}
          </SelectedCount>
          {errors.questions && (
            <ErrorMessage>{errors.questions}</ErrorMessage>
          )}
        </SelectionSummary>
      </QuestionsSection>
    </StepContainer>
  );
};

// Manter os estilos existentes
const StepContainer = styled(Flex).attrs({ direction: 'column', gap: 'lg' })`
  @media (max-width: 768px) {
    gap: var(--space-md);
  }
`;

const ConfigurationSection = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const DifficultySection = styled.div`
  margin-top: 1rem;
`;

const DifficultyGrid = styled(Grid).attrs({ columns: 3, gap: 'md' })``;

const QuestionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SelectionSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
`;

const SelectedCount = styled.div`
  font-size: 0.9rem;
  color: #495057;
`;

export default QuestionSelectionStep;