import React from 'react';
import { Exam } from '../../../../../utils/types/Exam';
import { DifficultyLevelType, Question } from '../../../../../utils/types/Question';

import {
  DifficultyDistributionContainer,
  DistributionHeader,
  DistributionRow,
  DistributionInput,
  DistributionProgress,
  ProgressBar,
  ProgressLabel,
  SelectionSummary
} from './styles';

interface DifficultyDistributionProps {
  examData: Exam;
  selectedQuestions: Question[];
  onDifficultyChange: (difficulty: DifficultyLevelType, value: number) => void;
  onTotalQuestionsChange: (value: number) => void;
}

const DifficultyDistribution: React.FC<DifficultyDistributionProps> = ({
  examData,
  selectedQuestions,
  onDifficultyChange,
  onTotalQuestionsChange
}) => {
  const getDifficultyLabel = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  const getProgressBarColor = (progress: number): string => {
    if (progress === 0) return '#e5e7eb';
    if (progress < 50) return '#f59e0b';
    if (progress < 100) return '#3b82f6';
    return '#10b981';
  };

  const handleDifficultyChange = (difficulty: DifficultyLevelType, value: number) => {
    const newValue = Math.max(0, Math.min(value, examData.totalQuestions));
    const currentSum = examData.questionDistribution.reduce(
      (sum, dist) => dist.difficulty === difficulty ? sum : sum + dist.count, 0);

    if (currentSum + newValue <= examData.totalQuestions) {
      onDifficultyChange(difficulty, newValue);
    }
  };

  const totalSelected = selectedQuestions.length;
  const isReadyForPreview = totalSelected === examData.totalQuestions;

  return (
    <DifficultyDistributionContainer>
      <DistributionHeader>
        <h4>Distribuição de Questões</h4>
        <div>
          <span>Total de questões: </span>
          <input
            type="number"
            value={examData.totalQuestions}
            onChange={(e) => onTotalQuestionsChange(parseInt(e.target.value) || 0)}
            min="1"
            aria-label="Total de questões"
          />
        </div>
      </DistributionHeader>

      {examData.questionDistribution.map((dist) => (
        <DistributionRow key={dist.difficulty}>
          <label htmlFor={`dist-${dist.difficulty}`}>
            {getDifficultyLabel(dist.difficulty)}:
          </label>

          <DistributionInput
            id={`dist-${dist.difficulty}`}
            type="number"
            value={dist.count}
            onChange={(e) => onDifficultyChange(dist.difficulty as DifficultyLevelType, parseInt(e.target.value) || 0)}
            min="0"
            max={examData.totalQuestions}
          />

          <DistributionProgress>
            <ProgressLabel>
              {dist.selected} / {dist.count} selecionadas
            </ProgressLabel>
            <ProgressBar
              progress={dist.count ? (dist.selected / dist.count) * 100 : 0}
              color={getProgressBarColor((dist.selected / Math.max(1, dist.count)) * 100)}
            />
          </DistributionProgress>
        </DistributionRow>
      ))}

      <SelectionSummary isValid={isReadyForPreview}>
        <div>
          <strong>Total selecionado:</strong> {totalSelected}/{examData.totalQuestions}
          {!isReadyForPreview && (
            <span className="warning-message">
              {totalSelected > examData.totalQuestions
                ? " Remova algumas questões"
                : " Selecione mais questões"}
            </span>
          )}
        </div>
        <div>
          <strong>Distribuição:</strong>
          {examData.questionDistribution.map(dist => (
            <span key={dist.difficulty} style={{ marginLeft: '8px' }}>
              {getDifficultyLabel(dist.difficulty)}: {dist.selected}/{dist.count}
            </span>
          ))}
        </div>
      </SelectionSummary>
    </DifficultyDistributionContainer>
  );
};

export default DifficultyDistribution;