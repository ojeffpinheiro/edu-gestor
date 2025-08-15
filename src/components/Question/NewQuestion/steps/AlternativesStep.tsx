import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alternative, AlternativesOrder, OptionsLayout } from '../../../../utils/types/Question';
import { alternativeSchema } from '../../../../utils/validation/schemas';
import {
  FormStepContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormActions,
  FormButton,
  AlternativeItem,
  FormSection,
  FormErrorContainer
} from '../../QuestionForm.styles';

interface AlternativesStepProps {
  data: {
    alternatives: Alternative[];
    optionsLayout: OptionsLayout;
    alternativesOrder: AlternativesOrder;
  };
  updateData: (data: Partial<any>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AlternativesStep: React.FC<AlternativesStepProps> = ({
  data,
  updateData,
  onNext,
  onPrev
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(alternativeSchema),
  });

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const toggleCorrect = (id: string) => {
    updateData({
      alternatives: data.alternatives.map(alt =>
        alt.id === id ? { ...alt, isCorrect: !alt.isCorrect } : alt
      )
    });
  };

  const addAlternative = (formData: any) => {
    try {
      const alternative: Alternative = {
        id: Date.now().toString(),
        text: formData.text,
        isCorrect: showCorrectAnswer,
        feedback: formData.feedback || ''
      };

      // Limita o número máximo de alternativas
      if (data.alternatives.length >= 10) {
        alert('Máximo de 10 alternativas permitidas');
        return;
      }

      updateData({
        alternatives: [...data.alternatives, alternative]
      });
      reset();
      setShowCorrectAnswer(false);
    } catch (error) {
      console.error('Error adding alternative:', error);
    }
  };

  const removeAlternative = (id: string) => {
    updateData({
      alternatives: data.alternatives.filter(alt => alt.id !== id)
    });
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateData({
      alternativesOrder: e.target.value as AlternativesOrder
    });
  };

  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateData({
      optionsLayout: e.target.value as OptionsLayout
    });
  };

  return (
    <FormStepContainer>
      <FormTitle>Alternativas</FormTitle>

      <form onSubmit={handleSubmit(addAlternative)}>
        <FormSection>
          <FormGroup>
            <FormLabel>Texto da Alternativa*</FormLabel>
            <FormInput
              {...register('text')}
              placeholder="Digite a alternativa"
            />
            {errors.text?.message && (
              <FormErrorContainer>{errors.text.message.toString()}</FormErrorContainer>
            )}
          </FormGroup>

          <FormGroup>
            <label>
              <input
                type="checkbox"
                checked={showCorrectAnswer}
                onChange={() => setShowCorrectAnswer(!showCorrectAnswer)}
              />
              Esta é a resposta correta?
            </label>
          </FormGroup>

          <FormButton type="submit">Adicionar Alternativa</FormButton>
        </FormSection>

        <FormSection>
          {data.alternatives.map(alt => (
            <AlternativeItem key={alt.id}>
              <input
                type="checkbox"
                checked={alt.isCorrect}
                onChange={() => toggleCorrect(alt.id)}
              />
              <span>{alt.text}</span>
              <FormButton
                type="button"
                $variant="danger"
                $size="sm"
                onClick={() => removeAlternative(alt.id)}
              >
                Remover
              </FormButton>
            </AlternativeItem>
          ))}
        </FormSection>

        <FormSection>
          <FormGroup>
            <FormLabel>Layout das Alternativas</FormLabel>
            <FormSelect value={data.optionsLayout} onChange={handleLayoutChange}>
              {Object.values(OptionsLayout).map(layout => (
                <option key={layout} value={layout}>{layout}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Ordenação das Alternativas</FormLabel>
            <FormSelect value={data.alternativesOrder} onChange={handleOrderChange}>
              {Object.values(AlternativesOrder).map(order => (
                <option key={order} value={order}>{order}</option>
              ))}
            </FormSelect>
          </FormGroup>
        </FormSection>

        <FormActions>
          <FormButton type="button" onClick={onPrev} $variant="outline">Voltar</FormButton>
          <FormButton type="button" onClick={onNext}>Próximo</FormButton>
        </FormActions>
      </form>
    </FormStepContainer>
  );
};