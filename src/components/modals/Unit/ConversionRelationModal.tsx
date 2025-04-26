// src/components/UnitsManagement/ConversionRelationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { ConversionRelation, UnitType } from '../../../utils/types/Question';

import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InfoBox
} from '../../../styles/modals';
import {
  Input,
  Label,
  InputGroup,
  TextArea,
  Select
} from '../../../styles/inputs';
import {
  CloseButton,
  ActionButton,
  CancelButton
} from '../../../styles/buttons';
import { Flex, Grid } from '../../../styles/layoutUtils';


interface ConversionRelationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (conversion: ConversionRelation) => void;
  units: UnitType[];
  editingConversion?: ConversionRelation | null;
  title?: string;
}

const FormulaPreview = styled.div`
  margin-top: var(--space-xs);
  background-color: var(--color-background-third);
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-family: monospace;
  font-size: var(--font-size-sm);
`;
const ConversionRelationModal: React.FC<ConversionRelationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  units,
  editingConversion = null,
  title = 'Nova Relação de Conversão'
}) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const [conversion, setConversion] = useState<ConversionRelation>({
    fromUnit: '',
    toUnit: '',
    factor: 1,
    formula: 'value * 1',
    description: ''
  });

  const [selectedFromUnitType, setSelectedFromUnitType] = useState<string>('');
  const [selectedToUnitType, setSelectedToUnitType] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [unitTypes, setUnitTypes] = useState<string[]>([]);

  // Inicializar o estado com os valores da conversão que estão sendo editados
  useEffect(() => {
    if (editingConversion) {
      setConversion(editingConversion);

      // Encontrar os tipos das unidades selecionadas
      const fromUnit = units.find(unit => unit.id === editingConversion.fromUnit);
      const toUnit = units.find(unit => unit.id === editingConversion.toUnit);

      if (fromUnit) setSelectedFromUnitType(fromUnit.type);
      if (toUnit) setSelectedToUnitType(toUnit.type);
    } else {
      // Reset para os valores padrão
      setConversion({
        fromUnit: '',
        toUnit: '',
        factor: 1,
        formula: 'value * 1',
        description: ''
      });
      setSelectedFromUnitType('');
      setSelectedToUnitType('');
    }
  }, [editingConversion, units]);

  // Extrair tipos de unidades únicos
  useEffect(() => {
    const types = Array.from(new Set(units.map(unit => unit.type)));
    setUnitTypes(types);
  }, [units]);

  /**
    * Fecha o modal ao clicar fora dele
  */
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  // Lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'factor') {
      const factor = parseFloat(value) || 0;
      setConversion({
        ...conversion,
        factor,
        formula: `value * ${factor}`
      });
    } else {
      setConversion({
        ...conversion,
        [name]: value
      });
    }
  };

  // Lidar com a mudança no tipo da unidade de origem
  const handleFromUnitTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedFromUnitType(type);
    setConversion({
      ...conversion,
      fromUnit: '' // Resetar a unidade de origem quando o tipo muda
    });
  };

  // Lidar com a mudança no tipo da unidade de destino
  const handleToUnitTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedToUnitType(type);
    setConversion({
      ...conversion,
      toUnit: '' // Resetar a unidade de destino quando o tipo muda
    });
  };

  // Validar formulário antes de salvar
  const validateForm = (): boolean => {
    if (!conversion.fromUnit) {
      setFormError('Selecione uma unidade de origem');
      return false;
    }

    if (!conversion.toUnit) {
      setFormError('Selecione uma unidade de destino');
      return false;
    }

    if (conversion.fromUnit === conversion.toUnit) {
      setFormError('As unidades de origem e destino não podem ser iguais');
      return false;
    }

    if (conversion.factor <= 0) {
      setFormError('O fator de conversão deve ser maior que zero');
      return false;
    }

    setFormError('');
    return true;
  };

  // Manipular o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(conversion);
      onClose();
    }
  };

  // Filtrar unidades pelo tipo selecionado
  const filteredFromUnits = units.filter(unit =>
    !selectedFromUnitType || unit.type === selectedFromUnitType
  );

  const filteredToUnits = units.filter(unit =>
    !selectedToUnitType || unit.type === selectedToUnitType
  );

  // Se o modal não está aberto, não renderizar nada
  if (!isOpen) return null;

  return (
    <ModalContainer role="dialog" aria-modal="true">
      <ModalContent ref={modalRef} size='sm' >
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <InfoBox>
              <FaInfoCircle />
              <div>
                Uma relação de conversão define como converter valores entre duas unidades de medida.
                O fator de conversão é aplicado na fórmula: valor_destino = valor_origem * fator.
              </div>
            </InfoBox>

            {formError && (
              <div style={{ color: 'var(--color-error)', marginBottom: 'var(--space-md)' }}>
                {formError}
              </div>
            )}

            <Grid columns={2} gap='md'>
              <div>
                <Label htmlFor="fromUnitType">Tipo de Unidade (Origem)</Label>
                <Select
                  id="fromUnitType"
                  value={selectedFromUnitType}
                  onChange={handleFromUnitTypeChange}
                >
                  <option value="">Todos os tipos</option>
                  {unitTypes.map(type => (
                    <option key={`from-${type}`} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>

                <Label htmlFor="fromUnit" style={{ marginTop: 'var(--space-md)' }}>
                  Unidade de Origem
                </Label>
                <Select
                  id="fromUnit"
                  name="fromUnit"
                  value={conversion.fromUnit}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma unidade</option>
                  {filteredFromUnits.map(unit => (
                    <option key={`from-unit-${unit.id}`} value={unit.id}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="toUnitType">Tipo de Unidade (Destino)</Label>
                <Select
                  id="toUnitType"
                  value={selectedToUnitType}
                  onChange={handleToUnitTypeChange}
                >
                  <option value="">Todos os tipos</option>
                  {unitTypes.map(type => (
                    <option key={`to-${type}`} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>

                <Label htmlFor="toUnit" style={{ marginTop: 'var(--space-md)' }}>
                  Unidade de Destino
                </Label>
                <Select
                  id="toUnit"
                  name="toUnit"
                  value={conversion.toUnit}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma unidade</option>
                  {filteredToUnits.map(unit => (
                    <option key={`to-unit-${unit.id}`} value={unit.id}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </Select>
              </div>
            </Grid>

            <Label htmlFor="factor" style={{ marginTop: 'var(--space-md)' }}>
              Fator de Conversão
            </Label>
            <InputGroup>
              <Input
                type="number"
                id="factor"
                name="factor"
                value={conversion.factor}
                onChange={handleChange}
                step="0.00000001"
                min="0.00000001"
                required
              />
            </InputGroup>

            <FormulaPreview>
              Fórmula: {conversion.formula || 'value * 1'}
            </FormulaPreview>

            <Label htmlFor="description" style={{ marginTop: 'var(--space-md)' }}>
              Descrição (opcional)
            </Label>
            <TextArea
              id="description"
              name="description"
              value={conversion.description || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Adicione notas ou explicações sobre esta relação de conversão"
            />
          </ModalBody>

          <ModalFooter>
            <Flex justify='end' gap='sm'>
              <CancelButton type="button" onClick={onClose}>
                Cancelar
              </CancelButton>
              <ActionButton type="submit">
                {editingConversion ? 'Atualizar' : 'Salvar'}
              </ActionButton>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ConversionRelationModal;