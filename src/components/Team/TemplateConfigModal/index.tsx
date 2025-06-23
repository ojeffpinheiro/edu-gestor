// components/Team/LayoutControls/TemplateConfigModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { ActionButton } from '../../../styles/buttons';
import { ModalOverlay } from '../../../styles/baseComponents';
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '../../../styles/modals';

interface TemplateConfigModalProps {
  onClose: () => void;
  onApply: (config: { groupSize?: number; numGroups?: number }) => void;
}

const TemplateConfigModal: React.FC<TemplateConfigModalProps> = ({ onClose, onApply }) => {
  const [configType, setConfigType] = useState<'groupSize' | 'numGroups'>('groupSize');
  const [groupSize, setGroupSize] = useState<number>(4);
  const [numGroups, setNumGroups] = useState<number>(0);

  const handleApply = () => {
    if (configType === 'groupSize') {
      onApply({ groupSize });
    } else {
      onApply({ numGroups });
    }
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent size='md' onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h3>Configurar Grupos</h3>
        </ModalHeader>
        <ModalBody>
          <ConfigOption>
            <input
              type="radio"
              id="groupSizeOption"
              checked={configType === 'groupSize'}
              onChange={() => setConfigType('groupSize')}
            />
            <label htmlFor="groupSizeOption">Definir tamanho dos grupos</label>
            
            {configType === 'groupSize' && (
              <NumberInput
                type="number"
                min="2"
                max="8"
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
              />
            )}
          </ConfigOption>

          <ConfigOption>
            <input
              type="radio"
              id="numGroupsOption"
              checked={configType === 'numGroups'}
              onChange={() => setConfigType('numGroups')}
            />
            <label htmlFor="numGroupsOption">Definir número de grupos</label>
            
            {configType === 'numGroups' && (
              <NumberInput
                type="number"
                min="1"
                max="20"
                value={numGroups}
                onChange={(e) => setNumGroups(Number(e.target.value))}
              />
            )}
          </ConfigOption>
        </ModalBody>
        <ModalFooter>
          <ActionButton onClick={onClose}>
            Cancelar
          </ActionButton>
          <ActionButton onClick={handleApply}>
            Aplicar
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

const ConfigOption = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;

  label {
    margin-left: 0.5rem;
    font-weight: 500;
  }
`;

const NumberInput = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

export default TemplateConfigModal;