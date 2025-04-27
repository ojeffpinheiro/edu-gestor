import React, { useEffect, useState } from "react";
import { EvaluationPart } from "../../../utils/types/AssessmentEvaluation";
import { ModalOverlay } from "../../../styles/baseComponents";
import { ModalContent, ModalHeader } from "../../../styles/modals";
import { ActionButton, CancelButton, CloseButton } from "../../../styles/buttons";
import { FaTimes } from "react-icons/fa";
import { FormGroup } from "../../../styles/formControls";
import { Input, Label } from "../../../styles/inputs";
import { ButtonGroup } from "./styles";
import { ErrorMessage } from "../../../styles/feedback";

export const CriteriaFormModal: React.FC<{ 
  isOpen: boolean;
  title: string;
  initialData: EvaluationPart;
  onClose: () => void;
  onSave: (part: EvaluationPart) => void;
  error?: string;
}> = ({ isOpen, title, initialData, onClose, onSave, error }) => {
  const [formData, setFormData] = useState<EvaluationPart>({ ...initialData });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'weight' || name === 'maxScore' ? Number(value) : value 
    }));
    
    // Limpar erro do campo quando o usuário digita
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome do critério é obrigatório';
    }
    
    if (formData.weight < 0 || formData.weight > 100) {
      errors.weight = 'Peso deve estar entre 0 e 100';
    }
    
    if (formData.maxScore <= 0) {
      errors.maxScore = 'Nota máxima deve ser maior que zero';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      await onSave(formData);
      setFormData({ id: '', name: '', weight: 0, maxScore: 10 });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent size="md" >
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <FormGroup>
          <Label htmlFor="name">Nome do Critério</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Apresentação, Conteúdo, Metodologia"
          />
          {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="weight">Peso (%)</Label>
          <Input
            id="weight"
            type="number"
            name="weight"
            min="0"
            max="100"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Peso em porcentagem (0-100)"
          />
          {formErrors.weight && <ErrorMessage>{formErrors.weight}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="maxScore">Nota Máxima</Label>
          <Input
            id="maxScore"
            type="number"
            name="maxScore"
            min="1"
            value={formData.maxScore}
            onChange={handleInputChange}
            placeholder="Ex: 10, 100, etc."
          />
          {formErrors.maxScore && <ErrorMessage>{formErrors.maxScore}</ErrorMessage>}
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <ActionButton 
            onClick={handleSave} 
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : 'Salvar Critério'}
          </ActionButton>
          <CancelButton onClick={onClose}>
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};