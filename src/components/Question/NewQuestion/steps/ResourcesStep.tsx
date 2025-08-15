import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaImage, FaVideo, FaLink, FaMusic, FaTrash, FaPlus } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { QuestionResource } from '../../../../utils/types/Question';
import { resourceSchema } from '../../../../utils/validation/schemas';
import {
  FormStepContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormActions,
  FormButton,
  ResourceItem,
  FormSection,
  FormErrorContainer
} from '../../QuestionForm.styles';

interface ResourcesStepProps {
  data: {
    resources: QuestionResource[];
  };
  isSubmitting: boolean;
  updateData: (data: Partial<any>) => void;
  onPrev: () => void;
  onSubmit?: () => void;
}

export const ResourcesStep: React.FC<ResourcesStepProps> = ({
  data,
  isSubmitting,
  updateData,
  onPrev,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(resourceSchema),
  });
  const [isAdding, setIsAdding] = useState(false);

  const resourceType = watch('type');

  const addResource = async (formData: Omit<QuestionResource, 'id'>) => {
    setIsAdding(true);
    try {
      const resource: QuestionResource = {
        id: Date.now().toString(),
        ...formData
      };

      updateData({
        resources: [...data.resources, resource]
      });
      reset();
    } finally {
      setIsAdding(false);
    }
  };

  const removeResource = (id: string) => {
    updateData({
      resources: data.resources.filter(r => r.id !== id)
    });
  };

  return (
    <FormStepContainer>
      <FormTitle>
        <FaPlus style={{ marginRight: '8px' }} />
        Recursos Adicionais
      </FormTitle>

      <form onSubmit={handleSubmit(addResource)}>
        <FormSection>
          <FormGroup>
            <FormLabel>Tipo de Recurso*</FormLabel>
            <FormSelect {...register('type')}>
              <option value="image">
                <FaImage style={{ marginRight: '8px' }} />Imagem
              </option>
              <option value="video">
                <FaVideo style={{ marginRight: '8px' }} />
                Vídeo
              </option>
              <option value="link">
                <FaLink style={{ marginRight: '8px' }} />
                Link
              </option>
              <option value="audio">
                <FaMusic style={{ marginRight: '8px' }} />
                Áudio
              </option>
            </FormSelect>
            {errors.type && (
              <FormErrorContainer>{errors.type.message}</FormErrorContainer>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel>URL*</FormLabel>
            <FormInput
              {...register('url')}
              placeholder={
                resourceType === 'image' ? 'https://exemplo.com/imagem.jpg' :
                  resourceType === 'video' ? 'https://youtube.com/watch?v=...' :
                    'https://...'
              }
            />
            {errors.url && (
              <FormErrorContainer>{errors.url.message}</FormErrorContainer>
            )}
          </FormGroup>

          {resourceType === 'image' && (
            <FormGroup>
              <FormLabel>Texto Alternativo (Acessibilidade)</FormLabel>
              <FormInput
                {...register('description')}
                placeholder="Descreva a imagem para acessibilidade"
              />
            </FormGroup>
          )}

          <FormButton type="submit" $isLoading={isAdding}>
            {isAdding ? 'Adicionando...' : 'Adicionar Recurso'}
          </FormButton>
        </FormSection>

        <FormSection>
          {data.resources.map(resource => (
            <ResourceItem key={resource.id}>
              <p><strong>{resource.type}:</strong> {resource.url}</p>
              {resource.description && <p>{resource.description}</p>}
              <FormButton
                type="button"
                $variant="danger"
                $size="sm"
                onClick={() => removeResource(resource.id)}
              >
                <FaTrash style={{ marginRight: '8px' }} />
                Remover
              </FormButton>
            </ResourceItem>
          ))}
        </FormSection>

        <FormActions>
          <FormButton type="button" onClick={onPrev} $variant="outline">
            Voltar
          </FormButton>
          <FormButton
            type="button"
            onClick={onSubmit}
            $isLoading={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Questão'}
          </FormButton>
        </FormActions>
      </form>
    </FormStepContainer>
  );
};