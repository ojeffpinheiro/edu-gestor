import React from 'react';
import { useExamCreator } from '../../../../hooks/useExamCreator';
import { mockQuestions } from '../../../../mocks/question';

import ProgressIndicator from '../../../../components/Exam/ExamCreator/ProgressIndicator';
import ExamPreview from '../../../../components/Exam/ExamCreator/ExamPreview';
import ExamSettingsForm from '../../../../components/Exam/ExamCreator/ExamSettingsForm';
import QuestionSelectionStep from '../../../../components/Exam/ExamCreator/QuestionSelectionStep';
import SecurityStep from '../../../../components/Exam/ExamCreator/SecurityStep';
import HeaderSection from '../../../../components/Exam/ExamCreator/HeaderSection';

import { ExamGeneratorContainer } from './styles';

const ExamGenerator = () => {
  const {
    currentStep,
    examData,
    selectedQuestions,
    isFormValid,
    isReadyForPreview,
    availableQuestions,
    updateExamConfig,
    handleTotalQuestionsChange,
    handleDifficultyChange,
    handleSelectQuestion,
    handleRandomSelection,
    navigateToStep,
    handleSubmitExam
  } = useExamCreator();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ExamSettingsForm
            examData={examData}
            onDataChange={updateExamConfig}
            onNext={() => navigateToStep(2)}
            isFormValid={isFormValid}
          />
        );
      case 2:
        return (
          <HeaderSection
            examData={examData}
            onDataChange={updateExamConfig}
            onBack={() => navigateToStep(1)}
            onNext={() => navigateToStep(3)}
          />
        );
      case 3:
        return (
          <QuestionSelectionStep
            examData={examData}
            questions={mockQuestions}
            availableQuestions={availableQuestions}
            selectedQuestions={selectedQuestions}
            onQuestionsSelected={handleSelectQuestion}
            onRandomSelection={handleRandomSelection}
            onBack={() => navigateToStep(2)}
            onNext={() => navigateToStep(4)}
            isReadyForPreview={isReadyForPreview}
            onDifficultyChange={handleDifficultyChange}
            onTotalQuestionsChange={handleTotalQuestionsChange}
          />
        );
      case 4:
        return (
          <SecurityStep
            examData={examData}
            setExamData={updateExamConfig}
            onBack={() => navigateToStep(3)}
            onNext={() => navigateToStep(5)}
          />
        );
      case 5:
        return (
          <ExamPreview
            examData={examData}
            onBack={() => navigateToStep(4)}
            onComplete={handleSubmitExam}
            onReset={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ExamGeneratorContainer>
      <header>
        <h1>Criar Nova Prova</h1>
        <p>Preencha os detalhes da prova em cada etapa</p>
      </header>

      <ProgressIndicator currentStep={currentStep} />
      
      {renderStepContent()}
    </ExamGeneratorContainer>
  );
};

export default React.memo(ExamGenerator);