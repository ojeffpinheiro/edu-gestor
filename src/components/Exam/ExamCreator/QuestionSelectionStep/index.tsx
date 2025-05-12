import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Exam } from '../../../../utils/types/Exam';
import { DifficultyLevelType, Question } from '../../../../utils/types/Question';

import { ButtonGroup } from '../../../../pages/Exam/Subpages/ExamGenerator/styles';
import DifficultyDistribution from './DifficultyDistribution';
import QuestionSelector from './QuestionSelector';

interface QuestionSelectionStepProps {
  examData: Exam;
  selectedQuestions: Question[];
  onQuestionsSelected: (questions: Question[]) => void;
  onDifficultyChange: (difficulty: DifficultyLevelType, value: number) => void;
  onTotalQuestionsChange: (value: number) => void;
  onBack: () => void;
  onNext: () => void;
  isReadyForPreview: boolean;
}

const QuestionSelectionStep: React.FC<QuestionSelectionStepProps> = ({
  examData,
  selectedQuestions,
  onQuestionsSelected,
  onDifficultyChange,
  onTotalQuestionsChange,
  onBack,
  onNext,
  isReadyForPreview
}) => {
  return (
    <>
      <DifficultyDistribution
        examData={examData}
        selectedQuestions={selectedQuestions}
        onDifficultyChange={onDifficultyChange}
        onTotalQuestionsChange={onTotalQuestionsChange}
      />

      <QuestionSelector
        examData={examData}
        selectedQuestions={selectedQuestions}
        onQuestionsSelected={onQuestionsSelected}
      />

      <ButtonGroup>
        <button type="button" onClick={onBack} className="secondary">
          <FiArrowLeft /> Voltar
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isReadyForPreview}
          title={!isReadyForPreview ? `Selecione ${examData.totalQuestions} questões para visualizar` : ""}
        >
          Pré-visualizar <FiArrowRight />
        </button>
      </ButtonGroup>
    </>
  );
};

export default QuestionSelectionStep;