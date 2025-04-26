import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaSave, FaTimes } from 'react-icons/fa';

import { Topic } from '../../utils/types/Topic';
import { Input, InputGroup, Label, Select } from '../../styles/inputs';
import { CancelButton, IconButton, PrimaryActionButton } from '../../styles/buttons';
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';

const FormField = styled(InputGroup)`
  margin-bottom: var(--space-md);
`;

interface TopicFormProps {
  showModal: boolean;
  isEditing: boolean;
  selectedTopic: Topic | null;
  formData: {
    name: string;
    discipline: string;
    knowledgeArea: string;
    parentId: string;
  };
  knowledgeAreas: string[];
  topicsList: Topic[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onClose: () => void;
}

const TopicForm: React.FC<TopicFormProps> = ({
  showModal,
  isEditing,
  selectedTopic,
  formData,
  knowledgeAreas,
  topicsList,
  onInputChange,
  onSave,
  onClose
}) => {
  if (!showModal) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const modalRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <ModalContainer role='dialog' aria-modal>
      <ModalContent ref={modalRef} size='sm' >
        <ModalHeader>
          <h3>{isEditing ? 'Editar Tópico' : 'Adicionar Novo Tópico'}</h3>
          <IconButton onClick={onClose}>
            <FaTimes />
          </IconButton>
        </ModalHeader>
        <ModalBody>
          <FormField>
            <Label htmlFor="name">Nome do Tópico</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Digite o nome do tópico"
              required
            />
          </FormField>

          <FormField>
            <Label htmlFor="discipline">Disciplina</Label>
            <Select
              id="discipline"
              name="discipline"
              value={formData.discipline}
              onChange={onInputChange}
            >
              <option value="physics">Física</option>
              <option value="math">Matemática</option>
            </Select>
          </FormField>

          <FormField>
            <Label htmlFor="knowledgeArea">Área de Conhecimento</Label>
            <Select
              id="knowledgeArea"
              name="knowledgeArea"
              value={formData.knowledgeArea}
              onChange={onInputChange}
              required
            >
              <option value="">Selecione uma área</option>
              {knowledgeAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </Select>
          </FormField>

          {!isEditing && (
            <FormField>
              <Label htmlFor="parentId">Tópico Pai (opcional)</Label>
              <Select
                id="parentId"
                name="parentId"
                value={formData.parentId}
                onChange={onInputChange}
              >
                <option value="">Nenhum (Tópico principal)</option>
                {topicsList.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {'-'.repeat(topic.level)} {topic.title}
                  </option>
                ))}
              </Select>
            </FormField>
          )}
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onClose}>
            Cancelar
          </CancelButton>
          <PrimaryActionButton onClick={onSave}>
            <FaSave />
            {isEditing ? 'Atualizar Tópico' : 'Salvar Tópico'}
          </PrimaryActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default TopicForm;