import React, { useState } from 'react';
import { FaListUl, FaPlus, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import {
  FormStepContainer, FormTitle, FormGroup, FormLabel,
  FormInput, FormSelect, FormButton,
  AlternativeItem, FormSection,
  AlternativeText,
  AlternativeActions,
  StyledCorrectAnswerIndicator,
  StyledRemoveButton
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
  const [isAlternativesCollapsed, setIsAlternativesCollapsed] = useState(false);

  const addAlternative = () => {
    if (!newAlternative.text.trim()) return;

    const updatedAlternatives = [...data.alternatives];
    const alternative: Alternative = {
      id: Date.now().toString(),
      ...newAlternative
    };

    if (newAlternative.isCorrect) {
      updatedAlternatives.forEach(alt => {
        alt.isCorrect = false;
      });
    }

    updateData([...updatedAlternatives, alternative]);
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
      data.alternatives.map(alt => {
        if (alt.id === id && !alt.isCorrect) {
          return { ...alt, isCorrect: true };
        }
        return {
          ...alt,
          isCorrect: alt.id === id ? !alt.isCorrect : false
        };
      })
    );
  };

  return (
    <FormStepContainer>
      <FormTitle>
        <FaListUl style={{ marginRight: '8px' }} />
        Alternativas
      </FormTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: constants.spacing.xl }}>
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
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: constants.spacing.sm,
              cursor: 'pointer',
              padding: constants.spacing.sm,
              borderRadius: constants.borderRadius.md,
              background: newAlternative.isCorrect ? 'var(--color-success-light)' : 'transparent',
              transition: 'background 0.2s ease'
            }}>
              <input
                type="checkbox"
                checked={newAlternative.isCorrect}
                onChange={(e) => setNewAlternative({ ...newAlternative, isCorrect: e.target.checked })}
                style={{ cursor: 'pointer' }}
              />
              <span>Marcar como resposta correta</span>
            </label>
          </FormGroup>

          <div style={{ display: 'flex', gap: constants.spacing.md }}>
            <FormButton 
              type="button" 
              onClick={addAlternative}
              disabled={!newAlternative.text.trim()}
              style={{ flex: 1 }}
            >
              <FaPlus style={{ marginRight: '8px' }} />
              Adicionar Alternativa
            </FormButton>
          </div>
        </FormSection>

        <FormSection>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: constants.spacing.lg,
            cursor: 'pointer'
          }} onClick={() => setIsAlternativesCollapsed(!isAlternativesCollapsed)}>
            <h3>
              Alternativas Adicionadas ({data.alternatives.length})
            </h3>
            {isAlternativesCollapsed ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          
          {!isAlternativesCollapsed && (
            <>
              {data.alternatives.length === 0 ? (
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  textAlign: 'center',
                  padding: constants.spacing.md,
                  background: 'var(--color-background-third)',
                  borderRadius: constants.borderRadius.md
                }}>
                  Nenhuma alternativa adicionada ainda.
                </p>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: constants.spacing.sm 
                }}>
                  {data.alternatives.map(alt => (
                    <AlternativeItem 
                      key={alt.id}
                      style={{
                        borderLeft: alt.isCorrect 
                          ? `4px solid var(--color-success)`
                          : '4px solid transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <StyledCorrectAnswerIndicator
                        isCorrect={alt.isCorrect} 
                        onClick={() => toggleCorrect(alt.id)}
                        title={alt.isCorrect ? "Resposta correta - Clique para alterar" : "Clique para marcar como correta"}
                      />
                      
                      <AlternativeText>
                        {alt.text}
                        {alt.feedback && (
                          <div style={{ 
                            fontSize: constants.fontSize.sm, 
                            color: 'var(--color-text-secondary)', 
                            marginTop: constants.spacing.xs 
                          }}>
                            <strong>Feedback:</strong> {alt.feedback}
                          </div>
                        )}
                      </AlternativeText>
                      
                      <AlternativeActions>
                        <StyledRemoveButton
                          type="button"
                          onClick={() => removeAlternative(alt.id)}
                          title="Remover alternativa"
                        >
                          <FaTrash />
                        </StyledRemoveButton>
                      </AlternativeActions>
                    </AlternativeItem>
                  ))}
                </div>
              )}
            </>
          )}
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
      </div>
    </FormStepContainer>
  );
};

export default AlternativesStep;