import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import styled from 'styled-components';

import { ConversionRelation, UnitType } from '../../../utils/types/Question';
import { InfoBox } from '../../../styles/modals';
import { Input, Label, InputGroup, TextArea, Select } from '../../../styles/inputs';
import { Grid } from '../../../styles/layoutUtils';
import Modal from '../Modal';
import { ErrorMessage } from '../../../styles/feedback';

const FormulaPreview = styled.div`
  margin-top: var(--space-xs);
  background-color: var(--color-background-third);
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-family: monospace;
  font-size: var(--font-size-sm);
`;

interface ConversionRelationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (conversion: ConversionRelation) => void;
  units: UnitType[];
  editingConversion?: ConversionRelation | null;
  title?: string;
}

const ConversionRelationModal: React.FC<ConversionRelationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  units,
  editingConversion = null,
  title = 'Nova Relação de Conversão'
}) => {
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

  // Extrair tipos de unidades únicos
  const unitTypes = useMemo(() => 
    Array.from(new Set(units.map(unit => unit.type))),
    [units]
  );

  // Filtrar unidades pelo tipo selecionado
  const filteredFromUnits = useMemo(() => 
    units.filter(unit => !selectedFromUnitType || unit.type === selectedFromUnitType),
    [units, selectedFromUnitType]
  );

  const filteredToUnits = useMemo(() => 
    units.filter(unit => !selectedToUnitType || unit.type === selectedToUnitType),
    [units, selectedToUnitType]
  );

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
      resetForm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingConversion, units]);

  const resetForm = useCallback(() => {
    setConversion({
      fromUnit: '',
      toUnit: '',
      factor: 1,
      formula: 'value * 1',
      description: ''
    });
    setSelectedFromUnitType('');
    setSelectedToUnitType('');
    setFormError('');
  }, []);

  // Lidar com mudanças nos campos do formulário
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'factor') {
      const factor = parseFloat(value) || 0;
      setConversion(prev => ({
        ...prev,
        factor,
        formula: `value * ${factor}`
      }));
    } else {
      setConversion(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpar erros quando o usuário começa a digitar
    if (formError) {
      setFormError('');
    }
  }, [formError]);

  // Lidar com a mudança no tipo da unidade de origem
  const handleFromUnitTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedFromUnitType(type);
    setConversion(prev => ({
      ...prev,
      fromUnit: '' // Resetar a unidade de origem quando o tipo muda
    }));
  }, []);

  // Lidar com a mudança no tipo da unidade de destino
  const handleToUnitTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedToUnitType(type);
    setConversion(prev => ({
      ...prev,
      toUnit: '' // Resetar a unidade de destino quando o tipo muda
    }));
  }, []);

  // Validar formulário antes de salvar
  const validateForm = useCallback((): boolean => {
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
  }, [conversion]);

  // Manipular o envio do formulário
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(conversion);
      onClose();
    }
  }, [conversion, onSave, onClose, validateForm]);

  // Resetar o formulário quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      size='md'
      title={title}
      onSubmit={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
      submitText={editingConversion ? 'Atualizar' : 'Salvar'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <InfoBox>
          <FaInfoCircle />
          <div>
            Uma relação de conversão define como converter valores entre duas unidades de medida.
            O fator de conversão é aplicado na fórmula: valor_destino = valor_origem * fator.
          </div>
        </InfoBox>

        {formError && (
          <ErrorMessage role="alert">
            <FaExclamationTriangle />
            {formError}
          </ErrorMessage>
        )}

        <Grid columns={2} gap='md'>
          <div>
            <Label htmlFor="fromUnitType">Tipo de Unidade (Origem)</Label>
            <Select
              id="fromUnitType"
              value={selectedFromUnitType}
              onChange={handleFromUnitTypeChange}
              aria-label="Selecione o tipo de unidade de origem"
            >
              <option value="">Todos os tipos</option>
              {unitTypes.map(type => (
                <option key={`from-${type}`} value={type}>
                  {type}
                </option>
              ))}
            </Select>

            <Label htmlFor="fromUnit" style={{ marginTop: 'var(--space-md)' }}>
              Unidade de Origem <span className="required">*</span>
            </Label>
            <Select
              id="fromUnit"
              name="fromUnit"
              value={conversion.fromUnit}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!conversion.fromUnit && !!formError}
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
              aria-label="Selecione o tipo de unidade de destino"
            >
              <option value="">Todos os tipos</option>
              {unitTypes.map(type => (
                <option key={`to-${type}`} value={type}>
                  {type}
                </option>
              ))}
            </Select>

            <Label htmlFor="toUnit" style={{ marginTop: 'var(--space-md)' }}>
              Unidade de Destino <span className="required">*</span>
            </Label>
            <Select
              id="toUnit"
              name="toUnit"
              value={conversion.toUnit}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!conversion.toUnit && !!formError}
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
          Fator de Conversão <span className="required">*</span>
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
            aria-required="true"
            aria-invalid={conversion.factor <= 0 && !!formError}
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
          aria-label="Descrição opcional da relação de conversão"
        />
      </form>
    </Modal>
  );
};

export default ConversionRelationModal;