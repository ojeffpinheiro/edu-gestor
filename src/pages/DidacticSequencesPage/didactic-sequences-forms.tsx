import React, { useState } from 'react';
import { Input, TextArea, Label, InputGroup } from '../../styles/inputs';
import { ActionButton, CancelButton } from '../../styles/buttons';
import { 
  Discipline, 
  DidacticSequence, 
  DidacticSequenceStage,
  ContentSection,
  Exercise 
} from '../../utils/types';

interface DidacticSequenceFormProps {
  discipline: Discipline;
  initialSequence?: DidacticSequence;
  onSave: (sequence: DidacticSequence) => void;
  onCancel: () => void;
}

export const DidacticSequenceForm: React.FC<DidacticSequenceFormProps> = ({
  discipline,
  initialSequence,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(initialSequence?.title || '');
  const [description, setDescription] = useState(initialSequence?.description || '');
  const [grade, setGrade] = useState(initialSequence?.grade || '');

  const handleSubmit = () => {
    const sequence: DidacticSequence = {
      id: initialSequence?.id || Date.now().toString(),
      disciplineId: discipline.id,
      title,
      description,
      grade,
      createdAt: initialSequence?.createdAt || new Date(),
      updatedAt: new Date()
    };
    onSave(sequence);
  };

  return (
    <form>
      <InputGroup>
        <Label>Título da Sequência Didática</Label>
        <Input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da sequência"
        />
      </InputGroup>
      <InputGroup>
        <Label>Descrição</Label>
        <TextArea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva brevemente a sequência didática"
        />
      </InputGroup>
      <InputGroup>
        <Label>Ano/Série</Label>
        <Input 
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Ex: 6º ano, Ensino Médio"
        />
      </InputGroup>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <CancelButton type="button" onClick={onCancel}>
          Cancelar
        </CancelButton>
        <ActionButton type="button" onClick={handleSubmit}>
          Salvar Sequência
        </ActionButton>
      </div>
    </form>
  );
};

interface DidacticSequenceStageFormProps {
  sequence: DidacticSequence;
  initialStage?: DidacticSequenceStage;
  onSave: (stage: DidacticSequenceStage) => void;
  onCancel: () => void;
}

export const DidacticSequenceStageForm: React.FC<DidacticSequenceStageFormProps> = ({
  sequence,
  initialStage,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(initialStage?.title || '');
  const [learningObjectives, setLearningObjectives] = useState(
    initialStage?.learningObjectives || ['']
  );
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);

  const handleAddObjective = () => {
    setLearningObjectives([...learningObjectives, '']);
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...learningObjectives];
    newObjectives[index] = value;
    setLearningObjectives(newObjectives);
  };

  const handleAddContentSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      stageId: initialStage?.id || '',
      type: 'text',
      content: '',
      order: contentSections.length
    };
    setContentSections([...contentSections, newSection]);
  };

  const handleSubmit = () => {
    const stage: DidacticSequenceStage = {
      id: initialStage?.id || Date.now().toString(),
      sequenceId: sequence.id,
      title,
      learningObjectives: learningObjectives.filter(obj => obj.trim() !== ''),
      order: initialStage?.order || 0
    };
    onSave(stage);
  };

  return (
    <form>
      <InputGroup>
        <Label>Título da Etapa</Label>
        <Input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da etapa"
        />
      </InputGroup>
      
      <InputGroup>
        <Label>Objetivos de Aprendizagem</Label>
        {learningObjectives.map((objective, index) => (
          <Input 
            key={index}
            value={objective}
            onChange={(e) => handleObjectiveChange(index, e.target.value)}
            placeholder={`Objetivo ${index + 1}`}
          />
        ))}
        <ActionButton type="button" onClick={handleAddObjective}>
          Adicionar Objetivo
        </ActionButton>
      </InputGroup>

      <InputGroup>
        <Label>Conteúdo da Etapa</Label>
        {contentSections.map((section, index) => (
          <div key={section.id}>
            {/* Implement content section editor */}
          </div>
        ))}
        <ActionButton type="button" onClick={handleAddContentSection}>
          Adicionar Seção de Conteúdo
        </ActionButton>
      </InputGroup>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <CancelButton type="button" onClick={onCancel}>
          Cancelar
        </CancelButton>
        <ActionButton type="button" onClick={handleSubmit}>
          Salvar Etapa
        </ActionButton>
      </div>
    </form>
  );
};