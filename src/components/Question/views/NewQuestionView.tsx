import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  AlternativesOrder,
  DifficultyLevel, OptionsLayout,
  Question,
  QuestionFormData, QuestionTypeConst,
} from '../../../utils/types/Question';
import { BasicInfoStep } from '../NewQuestion/steps/BasicInfoStep';
import { StatementStep } from '../NewQuestion/steps/StatementStep';
import AlternativesStep from '../NewQuestion/steps/AlternativesStep';
import { ResourcesStep } from '../NewQuestion/steps/ResourcesStep';
import { RubricStep } from '../NewQuestion/steps/RubricStep';

interface Props {
  questions: Question[];
  onQuestionCreated: (question: Question) => void;
}

const NewQuestionView: React.FC<Props> = ({ questions, onQuestionCreated }) => {
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
        { type: 'image', url: 'https://via.placeholder.com/150' },
        { type: 'link', url: 'https://pt.wikipedia.org/wiki/Velocidade' }
      ],
      optionsLayout: OptionsLayout.ONE_COLUMN,
      alternativesOrder: AlternativesOrder.NONE
    }
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateFormData = (field: keyof QuestionFormData, value: any) => {
    methods.setValue(field, value);
  };

  // Para atualizar objetos aninhados ou arrays:
  const updateNestedData = (field: keyof QuestionFormData, newData: any) => {
    methods.setValue(field, newData);
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
        return (<BasicInfoStep data={formData} updateData={updateFormData} onNext={nextStep} />);
      case 1:
        return (<StatementStep data={formData} updateData={updateFormData} onNext={nextStep} onPrev={prevStep} />);
      case 2:
        return formData.type === QuestionTypeConst.ESSAY ? (
          <RubricStep
            data={formData}
            isSubmitting={isSubmitting}
            updateData={(data) => updateNestedData('rubric', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        ) : (
          <AlternativesStep
            data={formData}
            updateData={(data) => updateNestedData('alternatives', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ResourcesStep
            data={formData}
            isSubmitting={isSubmitting}
            updateData={(data) => updateNestedData('resources', data)}
            onPrev={prevStep}
            onSubmit={methods.handleSubmit(onSubmit)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="question-form-wizard">
          <div className="progress-indicator">Passo {currentStep + 1} de 4</div>
          {renderStep()}
        </div>
      </form>
    </FormProvider>
  );
};

export default NewQuestionView;