import React, { useState } from 'react';
import { FaCheck, FaArrowRight, FaLock, FaQrcode, FaBarcode } from 'react-icons/fa';
import { Exam, Question } from '../../../utils/types/Assessment'

import ExamSecurityManager from './ExamSecurityManager';
import ExamConfig from './ExamConfig';
import QuestionSelector from './QuestionSelector';

import useExamSecurity from '../../../hooks/assessment/useExamSecurity';
import useExamGenerator from '../../../hooks/assessment/useExamGenerator';

import { StepIndicator } from '../../../styles/indicators';
import { 
  ActionContainer, 
  ExamPreview, 
  ExamPreviewItem, 
  GenerateExamButton, 
  NextStepButton, 
  QuestionSelectionActions, 
  RandomSelectButton, 
  StepContainer, 
  StepContent, 
  StepTitle } from './ExamGeneratorStyles';
import { SuccessMessage } from '../../../styles/feedback';

interface ExamGeneratorProps {
  questions: Question[];
  createExam: (exam: Omit<Exam, 'id' | 'createdAt'>) => Promise<Exam>;
  onExamCreated: (exam: Exam) => void;
}

/**
 * Componente principal para geração de provas
 * Guia o usuário através de um processo passo-a-passo
 */
const ExamGenerator: React.FC<ExamGeneratorProps> = ({ 
  questions, 
  createExam, 
  onExamCreated 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Hooks customizados para separar a lógica
  const {
    examConfig,
    selectedQuestions,
    filteredQuestions,
    availableCategories,
    handleConfigChange,
    handleSelectQuestion,
    handleRemoveQuestion,
    handleRandomSelection,
    resetExamGenerator
  } = useExamGenerator(questions);
  
  const {
    handlePrepareExam,
    handleGenerateExam,
    currentExam,
    generatedExamId,
    handleUpdateExam,
    resetSecurity,
    error
  } = useExamSecurity({
    examConfig,
    selectedQuestions,
    createExam,
    onExamCreated,
    setCurrentStep
  });

  const resetForm = () => {
    resetExamGenerator();
    resetSecurity();
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Configurações básicas
        return (
          <StepContainer>
            <StepTitle>
              <StepIndicator active>1</StepIndicator>
              <h2>Configurações da Prova</h2>
            </StepTitle>
            
            <StepContent>
              <ExamConfig
                config={{
                  title: examConfig.title,
                  description: examConfig.description,
                  numQuestions: examConfig.numQuestions,
                  categories: examConfig.questionDistribution.categories,
                  difficulty: examConfig.questionDistribution.difficulty
                }}
                availableCategories={availableCategories}
                onChange={handleConfigChange}
              />
              
              <ActionContainer>
                <NextStepButton
                  onClick={() => setCurrentStep(2)}
                  disabled={!examConfig.title}
                >
                  Próximo: Selecionar Questões <FaArrowRight />
                </NextStepButton>
              </ActionContainer>
            </StepContent>
          </StepContainer>
        );
        
      case 2: // Seleção de questões
        return (
          <StepContainer>
            <StepTitle>
              <StepIndicator>1</StepIndicator>
              <h2 onClick={() => setCurrentStep(1)} style={{ cursor: 'pointer' }}>
                Configurações da Prova
              </h2>
              <StepIndicator active>2</StepIndicator>
              <h2>Seleção de Questões</h2>
            </StepTitle>
            
            <StepContent>
              <QuestionSelectionActions>
                <RandomSelectButton 
                  onClick={handleRandomSelection}
                  disabled={filteredQuestions.length === 0}
                >
                  Selecionar {examConfig.numQuestions} Questões Aleatoriamente
                </RandomSelectButton>
                <span>ou selecione manualmente abaixo:</span>
              </QuestionSelectionActions>

              <QuestionSelector
                availableQuestions={filteredQuestions}
                selectedQuestions={selectedQuestions}
                onSelectQuestion={handleSelectQuestion}
                onRemoveQuestion={handleRemoveQuestion}
                numQuestionsNeeded={examConfig.numQuestions}
              />

              <ActionContainer>
                <NextStepButton
                  onClick={handlePrepareExam}
                  disabled={selectedQuestions.length === 0}
                >
                  Próximo: Configurações de Segurança <FaArrowRight />
                </NextStepButton>
              </ActionContainer>
            </StepContent>
          </StepContainer>
        );

      case 3: // Configurações de segurança
        return currentExam ? (
          <StepContainer>
            <StepTitle>
              <StepIndicator>1</StepIndicator>
              <h2 onClick={() => setCurrentStep(1)} style={{ cursor: 'pointer' }}>
                Configurações da Prova
              </h2>
              <StepIndicator>2</StepIndicator>
              <h2 onClick={() => setCurrentStep(2)} style={{ cursor: 'pointer' }}>
                Seleção de Questões
              </h2>
              <StepIndicator active>3</StepIndicator>
              <h2>Configurações de Segurança</h2>
            </StepTitle>
            
            <StepContent>
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              <ExamPreview>
                <ExamPreviewItem>
                  <strong>Título:</strong> {currentExam.title}
                </ExamPreviewItem>
                <ExamPreviewItem>
                  <strong>Questões:</strong> {currentExam.questions.length}
                </ExamPreviewItem>
                <ExamPreviewItem>
                  <strong>Segurança:</strong>
                  {currentExam.requirePassword && <span><FaLock /> Com senha</span>}
                  {currentExam.useQRCode && <span><FaQrcode /> QR Code</span>}
                  {currentExam.useBarCode && <span><FaBarcode /> Código de Barras</span>}
                </ExamPreviewItem>
              </ExamPreview>
              
              <ExamSecurityManager
                exam={currentExam}
                onUpdate={handleUpdateExam}
              />
              
              <ActionContainer>
                <GenerateExamButton onClick={handleGenerateExam}>
                  Finalizar e Gerar Prova <FaCheck />
                </GenerateExamButton>
              </ActionContainer>
            </StepContent>
          </StepContainer>
        ) : null;

      case 4: // Sucesso
        return (
          <SuccessMessage>
            <h2>Prova gerada com sucesso!</h2>
            <p>ID da Prova: {generatedExamId}</p>
            <NextStepButton onClick={resetForm}>
              Criar Nova Prova
            </NextStepButton>
          </SuccessMessage>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderStepContent()}
    </>
  );
};

export default ExamGenerator;