import React, { useState } from 'react';
import { useFieldArray, UseFormRegister, Control, FieldErrors } from 'react-hook-form';
import { FaTimes, FaPlus } from "react-icons/fa";

import { SequenceFormStyle } from './style';
import { Label } from '../../styles/inputs';
import { SequenceFormData } from '../../utils/types/DidacticSequence';
import { FormGroup } from '../../styles/formControls';
import { SectionTitle } from '../../styles/baseComponents';
import { ErrorMessage } from '../../styles/feedback';

interface ObjectivesFormProps {
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

const ObjectivesSection: React.FC<ObjectivesFormProps> = ({ 
  control, 
  register, 
  errors 
}) => {
  const [newObjective, setNewObjective] = useState('');

  // Setup field array for objectives
  const { 
    fields: objectivesFields, 
    append: appendObjective, 
    remove: removeObjective 
  } = useFieldArray({ control, name: 'stages' });

  // Add a new objective
  const handleAddObjective = () => {
    if (newObjective.trim()) {
      appendObjective({ 
        id: Date.now().toString(),
        title: newObjective.trim(),
        description: '',
        duration: 0,
        status: "draft",
        type: "bncc",
        objectives: [],
        skills: [],
        evaluationCriteria: [],
        methodologies: [],
        bnccCodes: [newObjective.trim()],
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
      setNewObjective('');
    }
  };

  // Key press handler for entering objectives
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddObjective();
    }
  };

  return (
    <FormGroup>
      <SectionTitle>Objetivos</SectionTitle>
      
      <Label>Objetivos de Aprendizagem</Label>
      <ChipContainer>
        {objectivesFields.map((field, index) => (
          <Chip key={field.id}>
            {(field as any).value}
            <ChipDeleteButton
              type="button"
              onClick={() => removeObjective(index)}
              aria-label="Remover objetivo"
            >
              <FaTimes />
            </ChipDeleteButton>
          </Chip>
        ))}
      </ChipContainer>
      {errors.objectives && <ErrorMessage>{String(errors.objectives.message)}</ErrorMessage>}

      <AddItemContainer>
        <AddItemInput
          value={newObjective}
          onChange={(e) => setNewObjective(e.target.value)}
          placeholder="Adicionar objetivo..."
          onKeyPress={handleKeyPress}
        />
        <AddItemButton
          type="button"
          onClick={handleAddObjective}
          disabled={!newObjective.trim()}
        >
          <FaPlus /> Adicionar
        </AddItemButton>
      </AddItemContainer>
    </FormGroup>
  );
};

export default ObjectivesSection;