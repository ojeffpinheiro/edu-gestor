import React from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

import { useExamCreator } from '../../../../hooks/useExamCreator';

import ProgressIndicator from '../../../../components/Exam/ExamCreator/ProgressIndicator';
import ExamPreview from '../../../../components/Exam/ExamCreator/ExamPreview';
import ExamSettingsForm from '../../../../components/Exam/ExamCreator/ExamSettingsForm';
import QuestionSelectionStep from '../../../../components/Exam/ExamCreator/QuestionSelectionStep';
import SecurityStep from '../../../../components/Exam/ExamCreator/SecurityStep';

import {
  ExamGeneratorContainer,
  ButtonGroup,
} from './styles';

const ExamGenerator = () => {
  // Usando o hook centralizado que criamos
  const {
    currentStep,
    examData,
    selectedQuestions,
    isFormValid,
    isReadyForPreview,
    navigateToStep,
    setExamData,
    setSelectedQuestions,
    handleTotalQuestionsChange,
    handleDifficultyChange,
    handleSubmitExam
  } = useExamCreator();

  return (
    <ExamGeneratorContainer>
      <h1>Criar Nova Prova</h1>
      <p>Preencha os detalhes da prova em cada etapa</p>

      <ProgressIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <ExamSettingsForm
          examData={examData}
          onDataChange={setExamData}
          onTotalQuestionsChange={(value) => handleTotalQuestionsChange(value)}
          onNext={() => navigateToStep(2)}
          isFormValid={isFormValid}
        />
      )}

      {currentStep === 2 &&
        <QuestionSelectionStep
          examData={examData}
          selectedQuestions={selectedQuestions}
          onQuestionsSelected={setSelectedQuestions}
          onDifficultyChange={handleDifficultyChange}
          onTotalQuestionsChange={handleTotalQuestionsChange}
          onBack={() => navigateToStep(1)}
          onNext={() => navigateToStep(3)}
          isReadyForPreview={isReadyForPreview} />
      }

      {currentStep === 3 && 
      <SecurityStep 
        examData={examData} 
        setExamData={setExamData} 
        onBack={() => navigateToStep(2)}
        onNext={() => navigateToStep(4)}/>}

      {currentStep === 4 && (
        <>
          <ExamPreview
            examData={examData}
            onBack={() => navigateToStep(3)}
            onComplete={handleSubmitExam}
          />

          <ButtonGroup>
            <button type="button" onClick={() => navigateToStep(3)} className="secondary">
              <FiArrowLeft /> Voltar
            </button>
            <button
              type="button"
              onClick={handleSubmitExam}
              className="primary"
            >
              <FiCheck /> Finalizar
            </button>
          </ButtonGroup>
        </>
      )}
    </ExamGeneratorContainer>
  );
};

export default ExamGenerator;