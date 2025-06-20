import React, { useEffect, useState } from 'react';
import { FormGroup, TextArea } from '../../../../styles/formControls';
import { ErrorMessage } from '../../../../styles/feedback';
import { Button, ButtonGroup } from '../../../../styles/buttons';
import { GeneralObjective } from '../../../../utils/types/Planning';
import { ModalBody } from '../../../../styles/modals';

interface GeneralObjectiveModalProps {
  isOpen: boolean;
  initialData?: Partial<GeneralObjective>;
  onSave: (data: { description: string }) => void;
  onClose: () => void;
}

const GeneralObjectiveModal: React.FC<GeneralObjectiveModalProps> = ({
  isOpen,
  initialData = {},
  onSave,
  onClose
}) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Por favor, insira uma descrição para o objetivo');
      return;
    }
    onSave({ description });
  };

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <ModalBody>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Descrição do Objetivo:</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Descreva o objetivo geral..."
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormGroup>

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Adicionar Objetivo
          </Button>
        </ButtonGroup>
      </form>
    </ModalBody>
  );
};

export default GeneralObjectiveModal;