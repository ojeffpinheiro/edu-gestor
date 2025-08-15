import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { QuestionFormData, QuestionResource, ResourceType } from '../../../../utils/types/Question';
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
} from '../../QuestionForm.styles';

interface ResourcesStepProps {
  data: Pick<QuestionFormData, 'resources'>;
  updateData: (data: QuestionResource[]) => void;
  isSubmitting: boolean;
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
  const resources = Array.isArray(data.resources) ? data.resources : [];
  const [newResource, setNewResource] = useState<{
    type: ResourceType;
    url: string;
    description: string;
  }>({
    type: 'image',
    url: '',
    description: ''
  });

  const addResource = () => {
    if (!newResource.url.trim()) return;

    const resource: QuestionResource = {
      id: `res-${Date.now()}`,
      type: newResource.type,
      url: newResource.url,
      description: newResource.description
    };

    updateData([...resources, resource]);

    setNewResource({
      type: 'image',
      url: '',
      description: ''
    });
  };

  const removeResource = (id: string) => {
    if (window.confirm('Remover este recurso?')) {
      updateData(resources.filter(r => r.id !== id));
    }
  };

  return (
    <FormStepContainer>
      <FormTitle>Recursos Adicionais</FormTitle>

      <FormSection>
        <FormGroup>
          <FormLabel>Tipo de Recurso</FormLabel>
          <FormSelect
            value={newResource.type}
            onChange={(e) => setNewResource({ ...newResource, type: e.target.value as ResourceType })}
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
            <option value="link">Link</option>
            <option value="audio">Áudio</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>URL*</FormLabel>
          <FormInput
            value={newResource.url}
            onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
            placeholder="https://exemplo.com/recurso.jpg"
          />
        </FormGroup>

        <FormButton type="button" onClick={addResource}>
          Adicionar Recurso
        </FormButton>
      </FormSection>

      <FormSection>
        {resources.map(resource => (
          <ResourceItem key={resource.id}>
            <div>
              <strong>{resource.type}:</strong> {resource.url}
              {resource.description && <p>{resource.description}</p>}
            </div>
            <FormButton
              type="button"
              $variant="danger"
              $size="sm"
              onClick={() => removeResource(resource.id)}
            >
              <FaTrash /> Remover
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
    </FormStepContainer>
  );
};