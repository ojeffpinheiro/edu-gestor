import React from 'react';
import { Exam } from '../../../../../../types/evaluation/Exam';
import { DifficultyLevelType, Question } from '../../../../../../types/evaluation/Question';

import {
  DifficultyDistributionContainer,
  DistributionHeader,
  DistributionRow,
  DistributionInput,
  DistributionProgress,
  ProgressBar,
  ProgressLabel,
  SelectionSummary,
  AlertMessage,
  AlertIcon,
  AutoCorrectButton,
  WarningText,
  ExcessIndicator
} from './styles';
import { FaExclamationTriangle } from 'react-icons/fa';

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

  // Verifica se a distribuição está correta
  const verifyDistribution = () => {
    return examData.questionDistribution.every(dist => {
      const selectedCount = selectedQuestions.filter(
        q => q.difficultyLevel === dist.difficulty
      ).length;
      return selectedCount >= dist.count;
    });
  };

  // Calcula a distribuição atual
  const getCurrentDistribution = () => {
    const distribution: Record<string, number> = { easy: 0, medium: 0, hard: 0 };

    selectedQuestions.forEach(question => {
      distribution[question.difficultyLevel] += 1;
    });

    return distribution;
  };

  // Lógica de auto-correção
  const handleAutoCorrect = () => {
    const currentDist = getCurrentDistribution();
    const missingQuestions: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
    let remainingQuestions = examData.totalQuestions - selectedQuestions.length;

    // Calcular questões faltantes por nível
    examData.questionDistribution.forEach(dist => {
      const current = currentDist[dist.difficulty] || 0;
      missingQuestions[dist.difficulty] = Math.max(0, dist.count - current);
    });

    // Implementar lógica de correção aqui (exemplo simplificado)
    // Na prática, você precisaria de acesso ao banco de questões
    console.log('Questões necessárias para auto-correção:', missingQuestions);
    alert('Funcionalidade de auto-correção será implementada aqui');
  };

  // Atualize o retorno do componente DifficultyDistribution
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
        {!verifyDistribution() && (
          <AutoCorrectButton onClick={handleAutoCorrect}>
            Auto-correção
          </AutoCorrectButton>
        )}
      </div>
    </DistributionHeader>

    {examData.questionDistribution.map((dist) => {
      const selectedCount = selectedQuestions.filter(
        q => q.difficultyLevel === dist.difficulty
      ).length;
      const isLevelComplete = selectedCount >= dist.count;
      const progress = dist.count ? (selectedCount / dist.count) * 100 : 0;

      return (
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
              {selectedCount}/{dist.count} selecionadas
              {!isLevelComplete && (
                <WarningText> (Faltam {dist.count - selectedCount})</WarningText>
              )}
            </ProgressLabel>
            <ProgressBar
              progress={progress}
              color={getProgressBarColor(progress)}
              isComplete={isLevelComplete}
            />
            {progress > 100 && (
              <ExcessIndicator>+{selectedCount - dist.count}</ExcessIndicator>
            )}
          </DistributionProgress>
        </DistributionRow>
      );
    })}

    <SelectionSummary isValid={isReadyForPreview && verifyDistribution()}>
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
        {examData.questionDistribution.map(dist => {
          const selectedCount = selectedQuestions.filter(
            q => q.difficultyLevel === dist.difficulty
          ).length;
          return (
            <span key={dist.difficulty} style={{ marginLeft: '8px' }}>
              {getDifficultyLabel(dist.difficulty)}: {selectedCount}/{dist.count}
            </span>
          );
        })}
      </div>
      {!verifyDistribution() && (
        <AlertMessage>
          <AlertIcon><FaExclamationTriangle /></AlertIcon>
          A distribuição não atende aos requisitos
        </AlertMessage>
      )}
    </SelectionSummary>
  </DifficultyDistributionContainer>
);
};

export default DifficultyDistribution;