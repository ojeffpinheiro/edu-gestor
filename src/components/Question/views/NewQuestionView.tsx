import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  AlternativesOrder,
  DifficultyLevel, OptionsLayout,
  QuestionFormData, QuestionTypeConst,
} from '../../../utils/types/Question';
import { BasicInfoStep } from '../NewQuestion/steps/BasicInfoStep';
import { StatementStep } from '../NewQuestion/steps/StatementStep';
import { AlternativesStep } from '../NewQuestion/steps/AlternativesStep';
import { ResourcesStep } from '../NewQuestion/steps/ResourcesStep';
import { RubricStep } from '../NewQuestion/steps/RubricStep';

const NewQuestionView: React.FC = () => {
  const methods = useForm<QuestionFormData>({
    defaultValues: {
      title: '',
      topic: '',
      content: '',
      type: QuestionTypeConst.MULTIPLE_CHOICE,
      difficulty: DifficultyLevel.MEDIUM,
      statement: '',
      explanation: '',
      alternatives: [],
      rubric: [],
      resources: [],
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
    const currentValue = methods.getValues(field) || [];
    methods.setValue(field, [...currentValue, newData]);
  };


  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Dados do formulário:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Lógica para salvar a questão
    } finally {
      setIsSubmitting(false);
    }
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