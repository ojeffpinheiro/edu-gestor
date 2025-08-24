import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FaPlus, FaExclamationTriangle } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

import { SequenceFormData } from '../../types/academic/DidacticSequence';

import StageForm from './StageForm';
import { SequenceFormStyle } from './style';

const { FormSection, SectionTitle, AddButton, ErrorMessage, ErrorSection } = SequenceFormStyle;

const StagesSection: React.FC = () => {
  const { 
    control, 
    formState: { errors } 
  } = useFormContext<SequenceFormData>();

  const {
    fields: stagesFields,
    append: appendStage,
    remove: removeStage
  } = useFieldArray({ control, name: 'stages' });

  // Add a new stage
  const handleAddStage = () => {
    appendStage({
      id: uuidv4(),
      title: '',
      description: '',
      duration: 1,
      status: 'draft',
      type: 'aula',
      objectives: [],
      skills: [],
      evaluationCriteria: [],
      methodologies: [],
      bnccCodes: [],
      prerequisites: [],
      comments: [],
      attachments: [],
      estimatedTime: 0,
      difficulty: 'easy',
      resources: [],
      activities: [],
      contentExplanation: '',
      evaluationType: 'formativa',
      evaluationMethod: '',
      evaluationWeight: 1,
      evaluationNotes: ''
    });
  };

  try {
    return (
      <FormSection>
        <SectionTitle>Etapas da Sequência</SectionTitle>

        {stagesFields.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma etapa adicionada. Adicione etapas para sua sequência didática.</p>
          </div>
        ) : (
          stagesFields.map((field, index) => (
            <StageForm
              key={field.id}
              stageIndex={index}
              onRemove={() => removeStage(index)}
            />
          ))
        )}

        <AddButton type="button" onClick={handleAddStage}>
          <FaPlus /> Adicionar Nova Etapa
        </AddButton>

        {errors.stages &&
          <ErrorMessage>
            É necessário adicionar pelo menos uma etapa com informações válidas
          </ErrorMessage>
        }
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

export default StagesSection;