import React, { useState } from 'react';
import { FaListUl, FaPaperclip, FaPlus, FaTrash } from 'react-icons/fa';
import { QuestionFormData, QuestionResource, ResourceType } from '../../../../utils/types/Question';
import {
  FormStepContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormButton,
  ResourceItem,
  FormSection,
  ResourcePreview,
  ResourceTypeBadge,
  TwoColumnGrid,
} from '../../QuestionForm.styles';
import { constants } from '../../../../utils/consts';

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
      <FormTitle>
        <FaPaperclip style={{ marginRight: '8px' }} />
        Recursos Adicionais
      </FormTitle>

      <TwoColumnGrid>
        <FormSection>
          <h3 style={{ marginBottom: constants.spacing.lg }}>
            <FaPlus style={{ marginRight: '8px' }} />
            Adicionar Novo Recurso
          </h3>

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
              padding: constants.spacing.lg
            }}>
              Nenhum recurso adicionado ainda.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: constants.spacing.md }}>
              {resources.map(resource => (
                <ResourceItem key={resource.id}>
                  <div style={{ display: 'flex' }} >
                    <ResourceTypeBadge type={resource.type}>
                      {resource.type}
                    </ResourceTypeBadge>

                    <ResourcePreview>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ wordBreak: 'break-all' }}
                      >
                        {resource.url}
                      </a>

                      {resource.description && (
                        <p style={{
                          marginTop: constants.spacing.sm,
                          color: 'var(--color-text)'
                        }}>
                          {resource.description}
                        </p>
                      )}
                      <FormButton
                        type="button"
                        $variant="danger"
                        $size="sm"
                        onClick={() => removeResource(resource.id)}
                        title="Remover recurso"
                      >
                        <FaTrash />
                      </FormButton>
                    </ResourcePreview>
                  </div>
                </ResourceItem>
              ))}
            </div>
          )}
        </FormSection>
      </TwoColumnGrid>
    </FormStepContainer>
  );
};