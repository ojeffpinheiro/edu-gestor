import React, { useState } from 'react';
import { FaListUl, FaPlus, FaTrash } from 'react-icons/fa';
import {
  FormStepContainer, FormTitle, FormGroup, FormLabel,
  FormInput, FormSelect, FormButton,
  AlternativeItem, FormSection,
  TwoColumnGrid,
  CorrectAnswerIndicator,
  AlternativeText,
  AlternativeActions
} from '../../QuestionForm.styles';
import { Alternative, OptionsLayout, QuestionFormData } from '../../../../utils/types/Question';
import { constants } from '../../../../utils/consts';

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
      <FormTitle>
        <FaListUl style={{ marginRight: '8px' }} />
        Alternativas
      </FormTitle>

      <TwoColumnGrid>
        <FormSection>
          <h3 style={{ marginBottom: constants.spacing.lg }}>
            Adicionar Nova Alternativa
          </h3>
          
          <FormGroup>
            <FormLabel>Texto da Alternativa*</FormLabel>
            <FormInput
              value={newAlternative.text}
              onChange={(e) => setNewAlternative({ ...newAlternative, text: e.target.value })}
              placeholder="Digite o texto da alternativa"
            />
          </FormGroup>

          <FormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
              <input
                type="checkbox"
                checked={newAlternative.isCorrect}
                onChange={(e) => setNewAlternative({ ...newAlternative, isCorrect: e.target.checked })}
              />
              <span>Marcar como resposta correta</span>
            </label>
          </FormGroup>

          <FormButton 
            type="button" 
            onClick={addAlternative}
            disabled={!newAlternative.text.trim()}
          >
            <FaPlus style={{ marginRight: '8px' }} />
            Adicionar Alternativa
          </FormButton>
        </FormSection>

        <FormSection>
          <h3 style={{ marginBottom: constants.spacing.lg }}>
            Configurações de Exibição
          </h3>
          
          <FormGroup>
            <FormLabel>Layout das Alternativas</FormLabel>
            <FormSelect
              value={data.optionsLayout}
              onChange={(e) => updateData(e.target.value as OptionsLayout)}
            >
              <option value="one-column">Uma coluna</option>
              <option value="two-columns">Duas colunas</option>
              <option value="three-columns">Três colunas</option>
            </FormSelect>
          </FormGroup>
        </FormSection>
      </TwoColumnGrid>

      <FormSection>
        <h3 style={{ marginBottom: constants.spacing.lg }}>
          Alternativas Adicionadas ({data.alternatives.length})
        </h3>
        
        {data.alternatives.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Nenhuma alternativa adicionada ainda.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: constants.spacing.sm }}>
            {data.alternatives.map(alt => (
              <AlternativeItem key={alt.id}>
                <CorrectAnswerIndicator 
                  isCorrect={alt.isCorrect} 
                  onClick={() => toggleCorrect(alt.id)}
                  title={alt.isCorrect ? "Resposta correta - Clique para alterar" : "Resposta incorreta - Clique para alterar"}
                />
                
                <AlternativeText>
                  {alt.text}
                  {alt.feedback && (
                    <div style={{ fontSize: constants.fontSize.sm, color: 'var(--color-text-secondary)', marginTop: constants.spacing.xs }}>
                      <strong>Feedback:</strong> {alt.feedback}
                    </div>
                  )}
                </AlternativeText>
                
                <AlternativeActions>
                  <FormButton
                    type="button"
                    $variant="danger"
                    $size="sm"
                    onClick={() => removeAlternative(alt.id)}
                    title="Remover alternativa"
                  >
                    <FaTrash />
                  </FormButton>
                </AlternativeActions>
              </AlternativeItem>
            ))}
          </div>
        )}
      </FormSection>
    </FormStepContainer>
  );
};

export default AlternativesStep;