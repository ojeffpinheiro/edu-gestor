import React, { useState } from 'react';
import { FaImage, FaLink, FaListUl, FaMusic, FaPaperclip, FaPlus, FaTrash, FaVideo } from 'react-icons/fa';
import { QuestionFormData, QuestionResource, ResourceType } from '../../../../types/evaluation/Question';
import {
  FormStepContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormButton,
  FormSection,
  ResourceTypeBadge,
  ResourceCard,
  RemoveButton,
  ResourceLink,
} from '../../QuestionForm.styles';
import { constants } from '../../../../utils/consts';

const getResourceIcon = (type: ResourceType) => {
  switch (type) {
    case 'image': return <FaImage />;
    case 'video': return <FaVideo />;
    case 'link': return <FaLink />;
    case 'audio': return <FaMusic />;
    default: return <FaPaperclip />;
  }
};

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
    if (window.confirm('Tem certeza que deseja remover este recurso?')) {
      updateData(resources.filter(r => r.id !== id));
    }
  };

  return (
    <FormStepContainer>
      <FormTitle>
        <FaPaperclip style={{ marginRight: '8px' }} />
        Recursos Adicionais
      </FormTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: constants.spacing.xl }}>
        <FormSection>
          <h3 style={{ marginBottom: constants.spacing.lg }}>
            <FaPlus style={{ marginRight: '8px' }} />
            Adicionar Novo Recurso
          </h3>

          <div style={{ display: 'grid', gap: constants.spacing.md }}>
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

            <FormGroup>
              <FormLabel>Descrição (Opcional)</FormLabel>
              <FormInput
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                placeholder="Descrição do recurso"
              />
            </FormGroup>

            <FormButton
              type="button"
              onClick={addResource}
              disabled={!newResource.url.trim()}
            >
              <FaPlus style={{ marginRight: '8px' }} />
              Adicionar Recurso
            </FormButton>
          </div>
        </FormSection>

        <FormSection>
          <h3 style={{ marginBottom: constants.spacing.lg }}>
            <FaListUl style={{ marginRight: '8px' }} />
            Recursos Adicionados ({resources.length})
          </h3>

          {resources.length === 0 ? (
            <p style={{
              color: 'var(--color-text-secondary)',
              textAlign: 'center',
              padding: constants.spacing.lg,
              background: 'var(--color-background-third)',
              borderRadius: constants.borderRadius.md
            }}>
              Nenhum recurso adicionado ainda.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: constants.spacing.md }}>
              {resources.map(resource => (
                <ResourceCard key={resource.id}>
                  {getResourceIcon(resource.type)}
                  <ResourceTypeBadge type={resource.type}>
                    {resource.type === 'image' && 'Imagem'}
                    {resource.type === 'video' && 'Vídeo'}
                    {resource.type === 'link' && 'Link'}
                    {resource.type === 'audio' && 'Áudio'}
                  </ResourceTypeBadge>
                  <ResourceLink
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.url}
                  </ResourceLink>

                  {resource.description && (
                    <p style={{
                      marginTop: constants.spacing.sm,
                      color: 'var(--color-text)',
                      fontSize: constants.fontSize.sm
                    }}>
                      {resource.description}
                    </p>
                  )}
                  <RemoveButton
                    type="button"
                    onClick={() => removeResource(resource.id)}
                    title="Remover recurso"
                  >
                    <FaTrash />
                  </RemoveButton>
                </ResourceCard>
              ))}
            </div>
          )}
        </FormSection>
      </div>
    </FormStepContainer>
  );
};