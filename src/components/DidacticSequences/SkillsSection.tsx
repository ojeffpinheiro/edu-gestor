import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FaTimes, FaPlus, FaExclamationTriangle } from "react-icons/fa";

import { SequenceFormData } from '../../types/academic/DidacticSequence';

import { Label } from '../../styles/inputs';

import {SequenceFormStyle} from './style';
import { FormGroup, FormSection } from '../../styles/formControls';
import { SectionTitle } from '../../styles/baseComponents';
import { ErrorMessage } from '../../styles/feedback';


const {
    ChipContainer, 
    Chip, 
    ChipDeleteButton, 
    AddItemContainer, 
    ErrorSection,
    AddItemInput,
    AddItemButton
 } = SequenceFormStyle;

const SkillsSection: React.FC = () => {
  const [newSkill, setNewSkill] = useState('');
  const { 
    control, 
    watch, 
    formState: { errors } 
  } = useFormContext<SequenceFormData>();

  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({ control, name: 'stages' });

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      appendSkill({ 
        id: Date.now().toString(),
        title: newSkill.trim(),
        description: '',
        duration: 0,
        status: "draft",
        type: "atividade",
        objectives: [],
        skills: [],
        evaluationCriteria: [],
        methodologies: [],
        bnccCodes: [],
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
      setNewSkill('');
    }
  };

  // Key press handler for entering skills
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  try {
    return (
      <FormSection>
        <SectionTitle>Habilidades</SectionTitle>

        <FormGroup>
          <Label>Habilidades Desenvolvidas</Label>
          <ChipContainer>
            {skillsFields.map((field, index) => (
              <Chip key={field.id}>
                {watch(`stages.${index}.title`)}
                <ChipDeleteButton
                  type="button"
                  onClick={() => removeSkill(index)}
                  aria-label="Remover habilidade"
                >
                  <FaTimes />
                </ChipDeleteButton>
              </Chip>
            ))}
          </ChipContainer>
          {errors.stages && <ErrorMessage>{errors.stages.message}</ErrorMessage>}

          <AddItemContainer>
            <AddItemInput
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Adicionar habilidade..."
              onKeyPress={handleKeyPress}
            />
            <AddItemButton
              type="button"
              onClick={handleAddSkill}
              disabled={!newSkill.trim()}
            >
              <FaPlus /> Adicionar
            </AddItemButton>
          </AddItemContainer>
        </FormGroup>
      </FormSection>
    );
  } catch (error) {
    console.error("Erro ao renderizar seção:", error);
    return (
      <ErrorSection role="alert">
        <h4><FaExclamationTriangle /> Erro</h4>
        <p>Ocorreu um erro ao carregar esta seção. Por favor, tente novamente ou contate o suporte.</p>
      </ErrorSection>
    );
  }
};

export default SkillsSection;