import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm, UseFormSetValue } from 'react-hook-form';
import { FaArrowLeft, FaArrowRight, FaListOl, FaSave, FaSpinner, FaThLarge } from 'react-icons/fa';
import {
  Alternative,
  AlternativesOrder,
  DifficultyLevel, OptionsLayout,
  Question,
  QuestionFormData, QuestionTypeConst,
} from '../../../utils/types/Question';
import { BasicInfoStep } from '../NewQuestion/steps/BasicInfoStep';
import { StatementStep } from '../NewQuestion/steps/StatementStep'; // OK
import AlternativesStep from '../NewQuestion/steps/AlternativesStep'; // OK
import { ResourcesStep } from '../NewQuestion/steps/ResourcesStep'; // OK
import { RubricStep } from '../NewQuestion/steps/RubricStep'; // OK
import { FormActions, FormButton, FormContainer, StepsViewContainer, ViewToggle } from '../QuestionForm.styles';

interface Props {
  questions: Question[];
  onQuestionCreated: (question: Question) => void;
}

const NewQuestionView: React.FC<Props> = ({ onQuestionCreated }) => {
  const methods = useForm<QuestionFormData>({
    defaultValues: {
      title: 'Exemplo de questão mockada',
      topic: 'Física - Movimento Uniforme',
      content: 'Esta é uma questão de teste com dados mockados.',
      type: QuestionTypeConst.MULTIPLE_CHOICE,
      difficulty: DifficultyLevel.MEDIUM,
      statement: 'Um carro percorre 100 km em 2 horas. Qual é a sua velocidade média?',
      explanation: 'A velocidade média é calculada dividindo a distância pelo tempo total.',
      alternatives: [
        { id: 'a', text: '50 km/h', isCorrect: true },
        { id: 'b', text: '100 km/h', isCorrect: false },
        { id: 'c', text: '25 km/h', isCorrect: false },
        { id: 'd', text: '75 km/h', isCorrect: false }
      ],
      rubric: [
        {
          description: 'Cálculo correto da velocidade',
          weight: 5,
          levels: [
            { description: 'Resposta correta e unidade correta', points: 5 },
            { description: 'Resposta correta mas sem unidade', points: 3 }
          ]
        },
        {
          description: 'Unidade de medida correta',
          weight: 2,
          levels: [
            { description: 'Unidade correta', points: 2 },
            { description: 'Unidade incorreta', points: 0 }
          ]
        }
      ],
      resources: [
        { id: '1', type: 'image', url: 'https://via.placeholder.com/150' },
        { id: '2', type: 'link', url: 'https://pt.wikipedia.org/wiki/Velocidade' }
      ],
      optionsLayout: OptionsLayout.ONE_COLUMN,
      alternativesOrder: AlternativesOrder.NONE
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<'steps' | 'single'>('steps');

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateFormData: UseFormSetValue<QuestionFormData> = (name, value) => {
    methods.setValue(name, value);
  };

  const updateNestedData = <K extends keyof QuestionFormData>(
    field: K,
    value: NonNullable<QuestionFormData[K]>
  ) => {
    methods.setValue(field, value as any); // Usamos 'as any' temporariamente
  };

  const updateAlternativesData = (data: Alternative[] | OptionsLayout) => {
    if (Array.isArray(data)) {
      methods.setValue('alternatives', data);
    } else {
      methods.setValue('optionsLayout', data);
    }
  };

  const onSubmit: SubmitHandler<QuestionFormData> = (formData) => {
    setIsSubmitting(true);

    // Verificação dos campos obrigatórios
    if (!formData.title || !formData.statement ||
      (formData.type !== 'essay' && formData.alternatives.length < 2)) {
      alert('Preencha todos os campos obrigatórios');
      setIsSubmitting(false);
      return;
    }

    const question: Question = {
      id: `q-${Date.now()}`,
      contentId: formData.content,
      questionType: formData.type,
      difficultyLevel: formData.difficulty,
      statement: formData.statement,
      explanation: formData.explanation || '',
      alternatives: formData.alternatives,
      rubric: formData.rubric || [],
      resources: formData.resources || [],
      discipline: formData.topic,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      answers: [],
      optionsLayout: formData.optionsLayout,
      alternativesOrder: formData.alternativesOrder
    };

    console.log('Questão a ser salva:', question); // Para debug
    onQuestionCreated(question);

    // Reset apenas após confirmação do salvamento
    setTimeout(() => {
      methods.reset();
      setCurrentStep(0);
      setIsSubmitting(false);
    }, 500);
  };

  const renderStep = () => {
    const formData = methods.watch();

    switch (currentStep) {
      case 0:
        return <BasicInfoStep
          data={formData}
          updateData={(field, value) => updateFormData(field, value)}
          onNext={nextStep}
        />;
      case 1:
        return <StatementStep
          data={formData}
          updateData={(field, value) => updateFormData(field, value)}
          onNext={nextStep}
          onPrev={prevStep}
        />;
      case 2:
        return formData.type === QuestionTypeConst.ESSAY ? (
          <RubricStep
            data={formData}
            updateData={(data) => updateNestedData('rubric', data)}
            isSubmitting={isSubmitting}
            onNext={nextStep}
            onPrev={prevStep}
          />
        ) : (
          <AlternativesStep
            data={formData}
            updateData={updateAlternativesData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return <ResourcesStep
          data={formData}
          updateData={(data) => updateNestedData('resources', data)}
          isSubmitting={isSubmitting}
          onPrev={prevStep}
          onSubmit={methods.handleSubmit(onSubmit)}
        />;
      default:
        return null;
    }
  };

  // Renderização da visualização única
  const renderAllSteps = () => {
    const formData = methods.watch();

    return (
      <div className="single-view-container">
        <BasicInfoStep
          data={formData}
          updateData={(field, value) => updateFormData(field, value)}
        />
        <StatementStep
          data={formData}
          updateData={(field, value) => updateFormData(field, value)}
        />

        {formData.type === QuestionTypeConst.ESSAY ? (
          <RubricStep
            data={formData}
            updateData={(data) => updateNestedData('rubric', data)}
            isSubmitting={isSubmitting}
            onNext={nextStep}
            onPrev={prevStep}
          />
        ) : (
          <AlternativesStep
            data={formData}
            updateData={updateAlternativesData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        <ResourcesStep
          data={formData}
          updateData={(data) => updateNestedData('resources', data)}
          isSubmitting={isSubmitting}
          onPrev={prevStep}
          onSubmit={methods.handleSubmit(onSubmit)}
        />
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <ViewToggle>
          <button
            onClick={() => setViewMode('steps')}
            className={viewMode === 'steps' ? 'active' : ''}
          >
            <FaListOl /> Visualização em Passos
          </button>
          <button
            onClick={() => setViewMode('single')}
            className={viewMode === 'single' ? 'active' : ''}
          >
            <FaThLarge /> Visualização Única
          </button>
        </ViewToggle>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {viewMode === 'steps' ? (
            <StepsViewContainer>
              {renderStep()}
              <FormActions>
                {currentStep > 0 && (
                  <FormButton
                    $variant="outline"
                    type="button"
                    onClick={prevStep}
                    className="secondary"
                  >
                    <FaArrowLeft style={{ marginRight: '8px' }} />
                    Voltar
                  </FormButton>
                )}
                {currentStep < 3 ? (
                  <FormButton
                    type="button"
                    onClick={nextStep}
                    className="primary"
                  >
                    Próximo
                    <FaArrowRight style={{ marginLeft: '8px' }} />
                  </FormButton>
                ) : (
                  <button type="submit" className="primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="fa-spin" style={{ marginRight: '8px' }} />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <FaSave style={{ marginRight: '8px' }} />
                        Salvar Questão
                      </>
                    )}
                  </button>
                )}
              </FormActions>
            </StepsViewContainer>
          ) : (
            <>
              {renderAllSteps()}
              <FormActions>
                <button type="submit" className="primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="fa-spin" style={{ marginRight: '8px' }} />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <FaSave style={{ marginRight: '8px' }} />
                      Salvar Questão
                    </>
                  )}
                </button>
              </FormActions>
            </>
          )}
        </form>
      </FormContainer>
    </FormProvider>
  );
};

export default NewQuestionView;