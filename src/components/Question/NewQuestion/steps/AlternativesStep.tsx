import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  FormStepContainer, FormTitle, FormGroup, FormLabel,
  FormInput, FormSelect, FormActions, FormButton,
  AlternativeItem, FormSection
} from '../../QuestionForm.styles';
import { Alternative, OptionsLayout, QuestionFormData } from '../../../../utils/types/Question';

interface AlternativesStepProps {
  data: Pick<QuestionFormData, 'alternatives' | 'optionsLayout' | 'alternativesOrder'>;
  updateData: (data: Alternative[] | OptionsLayout) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AlternativesStep: React.FC<AlternativesStepProps> = ({
  data,
  updateData,
  onNext,
  onPrev
}) => {
  const [newAlternative, setNewAlternative] = useState({
    text: '',
    isCorrect: false,
    feedback: ''
  });

  const addAlternative = () => {
    if (!newAlternative.text.trim()) return;

    const alternative: Alternative = {
      id: Date.now().toString(),
      ...newAlternative
    };
    updateData([...data.alternatives, alternative]);
    setNewAlternative({
      text: '',
      isCorrect: false,
      feedback: ''
    });
  };

  const removeAlternative = (id: string) => {
    updateData(data.alternatives.filter(alt => alt.id !== id));
  };

  const toggleCorrect = (id: string) => {
    updateData(
      data.alternatives.map(alt =>
        alt.id === id ? { ...alt, isCorrect: !alt.isCorrect } : alt
      ));
  };

  return (
    <FormStepContainer>
      <FormTitle>Alternativas</FormTitle>

      <FormSection>
        <FormGroup>
          <FormLabel>Texto da Alternativa*</FormLabel>
          <FormInput
            value={newAlternative.text}
            onChange={(e) => setNewAlternative({ ...newAlternative, text: e.target.value })}
            placeholder="Digite a alternativa"
          />
        </FormGroup>

        <FormGroup>
          <label>
            <input
              type="checkbox"
              checked={newAlternative.isCorrect}
              onChange={(e) => setNewAlternative({ ...newAlternative, isCorrect: e.target.checked })}
            />
            Resposta Correta
          </label>
        </FormGroup>

        <FormButton type="button" onClick={addAlternative}>
          Adicionar Alternativa
        </FormButton>
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
              <FaTrash /> Remover
            </FormButton>
          </AlternativeItem>
        ))}
      </FormSection>

      <FormSection>
        <FormGroup>
          <FormLabel>Layout das Alternativas</FormLabel>
          <FormSelect
            value={data.optionsLayout}
            onChange={(e) => {
              updateData(e.target.value as OptionsLayout);
              console.log('Layout alterado para:', e.target.value);
            }}
          >
            <option value="one-column">Uma coluna</option>
            <option value="two-columns">Duas colunas</option>
            <option value="three-columns">Três colunas</option>
          </FormSelect>
        </FormGroup>
      </FormSection>

      <FormActions>
        <FormButton type="button" onClick={onPrev} $variant="outline">
          Voltar
        </FormButton>
        <FormButton type="button" onClick={onNext}>
          Próximo
        </FormButton>
      </FormActions>
    </FormStepContainer>
  );
};

export default AlternativesStep;