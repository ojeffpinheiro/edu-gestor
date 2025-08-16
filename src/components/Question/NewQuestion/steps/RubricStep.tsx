import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck, FaTimes, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { QuestionFormData, RubricCriteria } from '../../../../utils/types/Question';
import { rubricCriteriaSchema } from '../../../../utils/validation/schemas';
import {
  FormStepContainer, CriteriaItem,
  FormActions, FormTitle,
  FormSection, FormGroup, FormLabel,
  FormInput, FormButton,
  FormErrorContainer,
  TwoColumnGrid,
  FormSectionTitle,
  LevelsContainer,
  LevelItem
} from '../../QuestionForm.styles';
import { constants } from '../../../../utils/consts';

interface RubricStepProps {
  data: Pick<QuestionFormData, 'rubric'>;
  updateData: (data: RubricCriteria[]) => void;
  isSubmitting: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const RubricStep: React.FC<RubricStepProps> = ({
  data,
  isSubmitting,
  updateData,
  onNext,
  onPrev
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(rubricCriteriaSchema),
  });

  const [showLevelsForm, setShowLevelsForm] = useState(false);
  const [currentLevels, setCurrentLevels] = useState([
    { description: 'Excelente', points: 5 },
    { description: 'Bom', points: 3 },
    { description: 'Regular', points: 1 }
  ]);

  const addCriteria = (formData: any) => {
    const criteria: RubricCriteria = {
      id: Date.now().toString(),
      description: formData.description,
      weight: Number(formData.weight),
      levels: currentLevels
    };

    updateData([...(data.rubric || []), criteria]);
    reset();
    setShowLevelsForm(false);
  };

  const removeCriteria = (id: string) => {
    updateData((data.rubric || []).filter(c => c.id !== id));
  };

  const addLevel = () => {
    setCurrentLevels([...currentLevels, { description: '', points: 0 }]);
  };

  const updateLevel = (index: number, field: string, value: string | number) => {
    const updatedLevels = [...currentLevels];
    updatedLevels[index] = { ...updatedLevels[index], [field]: value };
    setCurrentLevels(updatedLevels);
  };

  return (
    <FormStepContainer>
      <FormTitle>
        <FaCheck style={{ marginRight: '8px' }} />
        Critérios de Avaliação
      </FormTitle>

      <form onSubmit={handleSubmit(addCriteria)}>
        <TwoColumnGrid>
          <FormSection>
            <FormGroup>
              <FormLabel>Descrição do Critério*</FormLabel>
              <FormInput
                {...register('description')}
                placeholder="Ex: Clareza da argumentação"
              />
              {errors.description && (
                <FormErrorContainer>
                  {errors.description.message?.toString()}
                </FormErrorContainer>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Peso (1-10)*</FormLabel>
              <FormInput
                type="number"
                {...register('weight')}
                min="1"
                max="10"
              />
              {errors.weight && (
                <FormErrorContainer>
                  {errors.weight.message && typeof errors.weight.message === 'string'
                    ? errors.weight.message
                    : 'Peso inválido'}
                </FormErrorContainer>
              )}
            </FormGroup>

            <FormButton
              type="button"
              onClick={() => setShowLevelsForm(!showLevelsForm)}
              $variant="outline"
              style={{ marginTop: constants.spacing.md }}
            >
              {showLevelsForm ? (
                <>
                  <FaTimes style={{ marginRight: '8px' }} />
                  Ocultar Níveis
                </>
              ) : (
                <>
                  <FaEdit style={{ marginRight: '8px' }} />
                  Configurar Níveis
                </>
              )}
            </FormButton>
          </FormSection>

          {showLevelsForm && (
            <FormSection>
              <h4>
                <FaEdit style={{ marginRight: '8px' }} />
                Níveis de Avaliação
              </h4>

              <LevelsContainer>
                {currentLevels.map((level, index) => (
                  <LevelItem key={index}>
                    <FormGroup>
                      <FormLabel>Descrição do Nível {index + 1}*</FormLabel>
                      <FormInput
                        value={level.description}
                        onChange={(e) => updateLevel(index, 'description', e.target.value)}
                        placeholder="Ex: Excelente"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Pontos*</FormLabel>
                      <FormInput
                        type="number"
                        value={level.points}
                        onChange={(e) => updateLevel(index, 'points', parseInt(e.target.value))}
                        min="0"
                      />
                    </FormGroup>
                  </LevelItem>
                ))}

                <FormButton
                  type="button"
                  onClick={addLevel}
                  $variant="outline"
                >
                  <FaPlus style={{ marginRight: '8px' }} />
                  Adicionar Nível
                </FormButton>
              </LevelsContainer>
            </FormSection>
          )}
        </TwoColumnGrid>

        <FormSection>
          <FormSectionTitle>
            <FaCheck style={{ marginRight: '8px' }} />
            Critérios Adicionados
          </FormSectionTitle>

          {data.rubric.length === 0
            ? (
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Nenhum critério adicionado ainda.
              </p>
            )
            : (
              data.rubric.map(criteria => (
                <CriteriaItem key={criteria.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h4>{criteria.description} (Peso: {criteria.weight})</h4>
                    <FormButton
                      type="button"
                      $variant="danger"
                      $size="sm"
                      onClick={() => removeCriteria(criteria.id)}
                    >
                      <FaTrash 
                      color={constants.colors.status.error}
                        style={{ marginRight: '8px' }} />
                      Remover
                    </FormButton>
                  </div>
                  <ul style={{ marginTop: constants.spacing.sm }}>
                    {criteria.levels.map((level, idx) => (
                      <li key={idx}>
                        <strong>{level.description}:</strong> {level.points} pontos
                      </li>
                    ))}
                  </ul>
                </CriteriaItem>
              ))
            )}
        </FormSection>

        <FormActions>
          <FormButton type="button" onClick={onPrev} $variant="outline">
            <FaTimes style={{ marginRight: '8px' }} />
            Voltar
          </FormButton>
          <div>
            {showLevelsForm && (
              <FormButton
                type="button"
                onClick={() => setShowLevelsForm(false)}
                $variant="outline"
                style={{ marginRight: '8px' }}
              >
                <FaTimes style={{ marginRight: '8px' }} />
                Cancelar
              </FormButton>
            )}
            <FormButton
              type="submit"
              $isLoading={isSubmitting}
              disabled={showLevelsForm && currentLevels.some(l => !l.description || isNaN(l.points))}
            >
              {showLevelsForm ? (
                <>
                  <FaCheck style={{ marginRight: '8px' }} />
                  Confirmar Critério
                </>
              ) : (
                <>
                  <FaPlus style={{ marginRight: '8px' }} />
                  Adicionar Critério
                </>
              )}
            </FormButton>
          </div>
        </FormActions>
      </form>
    </FormStepContainer>
  );
};