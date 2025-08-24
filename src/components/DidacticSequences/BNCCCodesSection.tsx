import React, { useState } from 'react';
import { useFieldArray, UseFormRegister, Control, FieldErrors } from 'react-hook-form';
import { FaTimes, FaPlus } from "react-icons/fa";

import { SequenceFormStyle } from './style';
import { Label } from '../../styles/inputs';
import { SequenceFormData } from '../../types/academic/DidacticSequence';
import { FormGroup } from '../../styles/formControls';
import { SectionTitle } from '../../styles/baseComponents';
import { ErrorMessage } from '../../styles/feedback';

interface BNCCCodesFormProps {
  control: Control<SequenceFormData>;
  register: UseFormRegister<SequenceFormData>;
  errors: FieldErrors<SequenceFormData>;
}

const { 
  Chip,
  ChipContainer, 
  ChipDeleteButton,
  AddItemContainer,
  AddItemInput,
  AddItemButton
 } = SequenceFormStyle

const BNCCCodesSection: React.FC<BNCCCodesFormProps> = ({
  control,
  register,
  errors
}) => {
  const [newBNCCCode, setNewBNCCCode] = useState('');

  // Setup field array for BNCC codes - fixed the name to match the schema
  const { fields: bnccCodeFields, append: appendBnccCode, remove: removeBnccCode } = useFieldArray({ 
    control, 
    name: 'stages'
  });

  // Add a new BNCC code - fixed the append to match expected type
  const handleAddBNCCCode = () => {
    if (newBNCCCode.trim()) {
      appendBnccCode({
        id: Date.now().toString(),
        title: newBNCCCode.trim(),
        description: '',
        duration: 0,
        status: "draft",
        type: "bncc",
        objectives: [],
        skills: [],
        evaluationCriteria: [],
        methodologies: [],
        bnccCodes: [newBNCCCode.trim()],
        prerequisites: [],
        comments: [],
        attachments: [],
        estimatedTime: 0,
        difficulty: "medium",
        resources: [],
        activities: [],
        contentExplanation: '',
        evaluationType: '',
        evaluationMethod: '',
        evaluationWeight: 0,
        evaluationNotes: ''
      });
      setNewBNCCCode('');
    }
  };

  // Key press handler for entering BNCC codes
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddBNCCCode();
    }
  };

  return (
    <FormGroup>
      <SectionTitle>Códigos BNCC</SectionTitle>
      
      <Label>Códigos da Base Nacional Comum Curricular</Label>
      <ChipContainer>
        {bnccCodeFields.map((field, index) => (
          <Chip key={field.id}>
            {String(field)}
            <ChipDeleteButton
              type="button"
              onClick={() => removeBnccCode(index)}
              aria-label="Remover código BNCC"
            >
              <FaTimes />
            </ChipDeleteButton>
          </Chip>
        ))}
      </ChipContainer>
      {errors.bnccCodes && <ErrorMessage>{String(errors.bnccCodes.message)}</ErrorMessage>}

      <AddItemContainer>
        <AddItemInput
          value={newBNCCCode}
          onChange={(e) => setNewBNCCCode(e.target.value)}
          placeholder="Adicionar código BNCC..."
          onKeyPress={handleKeyPress}
        />
        <AddItemButton
          type="button"
          onClick={handleAddBNCCCode}
          disabled={!newBNCCCode.trim()}
        >
          <FaPlus /> Adicionar
        </AddItemButton>
      </AddItemContainer>
    </FormGroup>
  );
};

export default BNCCCodesSection;