// components/exam/ExamGenerationFlow.tsx
import React, { useCallback, useState } from 'react';

import { ExamGenerationParams, Question } from '../../services/examsService';

import ConfirmDialog from '../shared/ConfirmDialog';


import StepFormModal from '../modals/StepFormModal';

import ConfigurationStep from './step/ConfigurationStep';
import QuestionSelectionStep from './step/QuestionSelectionStep';
import ReviewStep from './step/ReviewStep';

import { ErrorMessage } from '../../styles/feedback';
import { useExamForm } from '../../hooks/assessment/useExamForm';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import Notification from '../shared/Notification';

interface ExamGenerationFlowProps {
  initialExamParams: ExamGenerationParams;
  availableQuestions: Question[];
  isLoading: boolean;
  onExamGenerate: (params: ExamGenerationParams) => Promise<void>;
  onModalClose: () => void;
}

const ExamGenerationFlow: React.FC<ExamGenerationFlowProps> = ({
  initialExamParams,
  availableQuestions,
  isLoading,
  onExamGenerate,
  onModalClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);


  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const {
    formData,
    errors,
    isValid,
    updateFormData,
    updateSelectedQuestions,
    updateSelectedTopics,
    validateForm
  } = useExamForm({
    initialParams: initialExamParams,
    availableQuestions
  });

  const handleExamGeneration = async (generationParams: ExamGenerationParams) => {
    try {
      if (!validateForm()) {
        throw new Error('Por favor, corrija os erros no formulário');
      }

      await onExamGenerate(generationParams);
      setNotification({
        message: 'Prova(s) gerada(s) com sucesso!',
        type: 'success',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ?
        error.message : 'Erro ao gerar prova(s)';

      setNotification({
        message: errorMessage,
        type: 'error',
      });
      console.error('Erro na geração de provas:', error);
      console.log(`parametros: ${generationParams.topics}`)
    }
  };

  const handleExamSubmission = async () => {
    setIsSubmitting(true);
    setGenerationError(null);

    try {
      await handleExamGeneration(formData);
    } catch (error) {
      const errorMessage = error instanceof Error ?
        error.message : 'Erro ao gerar provas';
      setGenerationError(errorMessage);
      setIsSubmitting(false);

      setTimeout(() => {
        const errorElement = document.getElementById('generation-error');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const onTopicsUpdate = useCallback((topics: string[]) => {
    updateSelectedTopics(topics);
}, [updateSelectedTopics]);

  const generationSteps = [
    {
      stepTitle: 'Configuração da Prova',
      stepContent: (
        <ConfigurationStep
          formData={formData}
          errors={errors}
          onFormUpdate={updateFormData}
        />
      ),
    },
    {
      stepTitle: 'Seleção de Questões',
      stepContent: (
        <QuestionSelectionStep
          formData={formData}
          errors={errors}
          availableQuestions={availableQuestions}
          onFormUpdate={updateFormData}
          onQuestionsUpdate={updateSelectedQuestions}
          onTopicsUpdate={onTopicsUpdate}
        />
      ),
    },
    {
      stepTitle: 'Revisão e Confirmação',
      stepContent: (
        <ReviewStep
          formData={formData}
          selectedQuestions={availableQuestions.filter(q =>
            formData.selectedQuestionIds.includes(q.id)
          )}
          onComplete={handleExamSubmission}
          isSubmitting={isSubmitting}
          error={generationError}
          isValid={isValid}
        />
      ),
    },
  ];

  return (
    <ErrorBoundary fallback={<div>Erro ao carregar a visualização da prova</div>}>
      <StepFormModal
        modalTitle={generationSteps[currentStepIndex].stepTitle}
        isModalOpen={true}
        steps={generationSteps}
        currentActiveStep={currentStepIndex}
        onStepChange={setCurrentStepIndex}
        onModalClose={() => setShowCancelConfirmation(true)}
        onSubmitHandler={handleExamSubmission}
        submitButtonText="Gerar Provas"
        isSubmitDisabled={isSubmitting || !isValid}
        shouldHideNavigation={false}
      />

      {generationError && (
        <ErrorMessage id="generation-error">
          <strong>Erro:</strong> {generationError}
        </ErrorMessage>
      )}

      {showCancelConfirmation && (
        <ConfirmDialog
          title="Cancelar Geração de Prova"
          message="Tem certeza que deseja cancelar a geração da prova? Todas as alterações serão perdidas."
          confirmLabel="Confirmar"
          cancelLabel="Continuar Editando"
          onConfirm={onModalClose}
          onCancel={() => setShowCancelConfirmation(false)}
          type="warning"
        />
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </ErrorBoundary>
  );
};

export default ExamGenerationFlow;