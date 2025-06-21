import React from 'react';
import { useExamCreator } from '../../../../hooks/useExamCreator';
import { mockQuestions } from '../../../../mocks/question';

import ProgressIndicator from '../../../../components/Exam/ExamCreator/ProgressIndicator';

import ExamSettingsForm from '../../../../components/Exam/ExamCreator/step/ExamSettingsForm';
import HeaderSection from '../../../../components/Exam/ExamCreator/step/HeaderSection';
import QuestionSelectionStep from '../../../../components/Exam/ExamCreator/step/QuestionSelectionStep';
import CorrectionForm from '../../../../components/Exam/ExamCreator/step/CorrectionForm';
import VariantGeneratorStep from '../../../../components/Exam/ExamCreator/step/VariantGeneratorStep';

import VariantPreview from '../../../../components/Exam/ExamCreator/VariantPreview';

import { ExamGeneratorContainer } from './styles';

const ExamGenerator = () => {
  const {
    currentStep,
    examData,
    selectedQuestions,
    isFormValid,
    isReadyForPreview,
    updateExamConfig,
    handleTotalQuestionsChange,
    handleDifficultyChange,
    handleSelectQuestion,
    handleRandomSelection,
    navigateToStep,
    generateExamVariants,
    handlePrintVariant,
    handleDownloadVariant,
    handleSubmitExam
  } = useExamCreator();

  const handleGenerateVariants = () => {
    const updatedExam = generateExamVariants(examData);
    updateExamConfig(updatedExam);
  };

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
          <CorrectionForm
            examData={examData}
            setExamData={updateExamConfig}
            onBack={() => navigateToStep(3)}
            onNext={() => navigateToStep(5)}
          />
        );
      case 5:
        return (
          <VariantGeneratorStep
            examData={examData}
            setExamData={updateExamConfig}
            onBack={() => navigateToStep(4)}
            onNext={() => navigateToStep(6)}
            onGenerateVariants={handleGenerateVariants}
          />
        );
      case 6:
        return (
          <VariantPreview
            examData={examData}
            onBack={() => navigateToStep(5)}
            onComplete={handleSubmitExam}
            onPrint={handlePrintVariant}
            onDownload={handleDownloadVariant}
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