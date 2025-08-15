import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck, FaTimes, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { RubricCriteria } from '../../../../utils/types/Question';
import { rubricCriteriaSchema } from '../../../../utils/validation/schemas';
import {
  FormStepContainer, CriteriaItem,
  FormActions, FormTitle,
  FormSection, FormGroup, FormLabel,
  FormInput, FormButton,
  FormErrorContainer
} from '../../QuestionForm.styles';


interface RubricStepProps {
  data: {
    rubric: RubricCriteria[];
  };
  isSubmitting: boolean;
  updateData: (data: Partial<any>) => void;
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
      ...formData,
      levels: currentLevels
    };

    updateData({
      rubric: [...data.rubric, criteria]
    });
    reset();
    setShowLevelsForm(false);
  };

  const removeCriteria = (id: string) => {
    updateData({
      rubric: data.rubric.filter(c => c.id !== id)
    });
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
        <FormSection>
          <FormGroup>
            <FormLabel>Descrição do Critério*</FormLabel>
            <FormInput
              {...register('description')}
              placeholder="Ex: Clareza da argumentação"
            />
            {errors.description && (
              <FormErrorContainer>{errors.description.message}</FormErrorContainer>
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
              <FormErrorContainer>{errors.weight.message}</FormErrorContainer>
            )}
          </FormGroup>

          {showLevelsForm && (
            <>
              <h4>
                <FaEdit style={{ marginRight: '8px' }} />
                Níveis de Avaliação
              </h4>
              {currentLevels.map((level, index) => (
                <div key={index}>
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
                </div>
              ))}
              <FormButton
                type="button"
                onClick={addLevel}
                $variant="outline"
              >
                <FaPlus style={{ marginRight: '8px' }} />
                Adicionar Nível
              </FormButton>
            </>
          )}
        </FormSection>

        <FormSection>
          {data.rubric.map(criteria => (
            <CriteriaItem key={criteria.id}>
              <h4>{criteria.description} (Peso: {criteria.weight})</h4>
              <ul>
                {criteria.levels.map((level, idx) => (
                  <li key={idx}>
                    {level.description}: {level.points} pontos
                  </li>
                ))}
              </ul>
              <FormButton
                type="button"
                $variant="danger"
                $size="sm"
                onClick={() => removeCriteria(criteria.id)}
              >
                Remover
              </FormButton>
            </CriteriaItem>
          ))}
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
            <FormButton type="submit" $isLoading={isSubmitting}>
              {showLevelsForm ? 'Confirmar Critério' : 'Adicionar Critério'}
            </FormButton>
          </div>
        </FormActions>
      </form>
    </FormStepContainer>
  );
};