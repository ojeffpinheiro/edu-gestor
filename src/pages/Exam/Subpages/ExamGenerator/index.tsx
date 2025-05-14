import React from 'react';

import { useExamCreator } from '../../../../hooks/useExamCreator';

import ProgressIndicator from '../../../../components/Exam/ExamCreator/ProgressIndicator';
import ExamPreview from '../../../../components/Exam/ExamCreator/ExamPreview';
import ExamSettingsForm from '../../../../components/Exam/ExamCreator/ExamSettingsForm';
import QuestionSelectionStep from '../../../../components/Exam/ExamCreator/QuestionSelectionStep';
import SecurityStep from '../../../../components/Exam/ExamCreator/SecurityStep';
import HeaderSection from '../../../../components/Exam/ExamCreator/HeaderSection';

import {
  ExamGeneratorContainer,
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

      {/**CONFIGURAÇÕES */}
      {currentStep === 1 && (
        <ExamSettingsForm
          examData={examData}
          onDataChange={setExamData}
          onTotalQuestionsChange={(value) => handleTotalQuestionsChange(value)}
          onNext={() => navigateToStep(2)}
          isFormValid={isFormValid}
        />
      )}

      {/* CABEÇALHO */}
      {currentStep === 2 && 
        <HeaderSection 
          examData={examData} 
          onDataChange={setExamData}
          onBack={() => navigateToStep(1)}
          onNext={() => navigateToStep(3)} />}

      {/* SELEÇÃO DE PREGUNTAS */}
      {currentStep === 3 &&
        <QuestionSelectionStep
          examData={examData}
          selectedQuestions={selectedQuestions}
          onQuestionsSelected={setSelectedQuestions}
          onDifficultyChange={handleDifficultyChange}
          onTotalQuestionsChange={handleTotalQuestionsChange}
          onBack={() => navigateToStep(2)}
          onNext={() => navigateToStep(4)}
          isReadyForPreview={isReadyForPreview} />
      }

      {/* SEGURANÇA */}
      {currentStep === 4 && 
      <SecurityStep 
        examData={examData} 
        setExamData={setExamData} 
        onBack={() => navigateToStep(3)}
        onNext={() => navigateToStep(5)}/>}

      {/* PRE-VISUALIZAÇÃO */}
      {currentStep === 5 && (
        <>
          <ExamPreview
            examData={examData}
            onBack={() => navigateToStep(4)}
            onComplete={handleSubmitExam}
          />
        </>
      )}
    </ExamGeneratorContainer>
  );
};

export default ExamGenerator;