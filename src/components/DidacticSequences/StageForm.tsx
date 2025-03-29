import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Input, Label, TextArea, Select } from '../../styles/inputs';
import { StageFormStyle } from './style';

const { 
  AddItemButton, 
  AddItemContainer, 
  AddItemInput, 
  FormContainer, 
  Chip, 
  ChipContainer, 
  ChipDeleteButton, 
  FormGroup, 
  RemoveButton, 
  StageHeader, 
  StageTitle,
  FormSection,
  SectionTitle
} = StageFormStyle;

interface StageFormProps {
  stageIndex: number;
  onRemove: () => void;
}

const StageForm: React.FC<StageFormProps> = ({ stageIndex, onRemove }) => {
  // State for various input fields that require temporary storage before adding to form
  const [newResource, setNewResource] = useState('');
  const [newActivity, setNewActivity] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newBnccCode, setNewBnccCode] = useState('');
  const [newMethod, setNewMethod] = useState('');

  const { control, setValue, getValues } = useFormContext();

  // Generic handler for adding items to arrays in the form
  const handleAddItem = (fieldName: string, newItem: string, setNewItem: React.Dispatch<React.SetStateAction<string>>) => {
    if (newItem.trim()) {
      const currentItems = getValues(`stages.${stageIndex}.${fieldName}`) || [];
      setValue(`stages.${stageIndex}.${fieldName}`, [...currentItems, newItem]);
      setNewItem('');
    }
  };

  // Generic handler for removing items from arrays in the form
  const handleRemoveItem = (fieldName: string, itemIndex: number) => {
    const currentItems = getValues(`stages.${stageIndex}.${fieldName}`) || [];
    setValue(
      `stages.${stageIndex}.${fieldName}`,
      currentItems.filter((_: any, i: number) => i !== itemIndex)
    );
  };

  return (
    <FormContainer>
      <StageHeader>
        <StageTitle>Etapa {stageIndex + 1}</StageTitle>
        <RemoveButton type="button" onClick={onRemove}>Remover</RemoveButton>
      </StageHeader>

      <Controller
        name={`stages.${stageIndex}.id`}
        control={control}
        defaultValue={uuidv4()}
        render={() => <></>}
      />

      {/* Basic Information Section */}
      <FormSection>
        <SectionTitle>Informações Básicas</SectionTitle>
        
        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.title`}>Título da Etapa</Label>
          <Controller
            name={`stages.${stageIndex}.title`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input id={`stages.${stageIndex}.title`} {...field} />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.description`}>Descrição</Label>
          <Controller
            name={`stages.${stageIndex}.description`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea id={`stages.${stageIndex}.description`} {...field} />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.duration`}>Duração (minutos)</Label>
          <Controller
            name={`stages.${stageIndex}.duration`}
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Input
                id={`stages.${stageIndex}.duration`}
                type="number"
                min="1"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.status`}>Status</Label>
          <Controller
            name={`stages.${stageIndex}.status`}
            control={control}
            defaultValue="em_planejamento"
            render={({ field }) => (
              <Select id={`stages.${stageIndex}.status`} {...field}>
                <option value="em_planejamento">Em Planejamento</option>
                <option value="planejada">Planejada</option>
                <option value="em_aplicacao">Em Aplicação</option>
                <option value="aplicada">Aplicada</option>
                <option value="lancada">Lançada</option>
              </Select>
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.type`}>Tipo</Label>
          <Controller
            name={`stages.${stageIndex}.type`}
            control={control}
            defaultValue="aula"
            render={({ field }) => (
              <Select id={`stages.${stageIndex}.type`} {...field}>
                <option value="aula">Aula</option>
                <option value="avaliacao">Avaliação</option>
              </Select>
            )}
          />
        </FormGroup>
      </FormSection>

      {/* Learning Objectives Section */}
      <FormSection>
        <SectionTitle>Objetivos e Habilidades</SectionTitle>
        
        <FormGroup>
          <Label>Objetivos de Aprendizagem</Label>
          <Controller
            name={`stages.${stageIndex}.objectives`}
            control={control}
            defaultValue={[]}
            render={({ field: { value } }) => (
              <ChipContainer>
                {value?.map((objective: string, i: number) => (
                  <Chip key={i}>
                    {objective}
                    <ChipDeleteButton
                      type="button"
                      onClick={() => handleRemoveItem('objectives', i)}
                    >
                      ×
                    </ChipDeleteButton>
                  </Chip>
                ))}
              </ChipContainer>
            )}
          />
          <AddItemContainer>
            <AddItemInput
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              placeholder="Digite um objetivo de aprendizagem..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('objectives', newObjective, setNewObjective))}
            />
            <AddItemButton 
              type="button" 
              onClick={() => handleAddItem('objectives', newObjective, setNewObjective)}
            >
              Adicionar
            </AddItemButton>
          </AddItemContainer>
        </FormGroup>

        <FormGroup>
          <Label>Habilidades Desenvolvidas</Label>
          <Controller
            name={`stages.${stageIndex}.skills`}
            control={control}
            defaultValue={[]}
            render={({ field: { value } }) => (
              <ChipContainer>
                {value?.map((skill: string, i: number) => (
                  <Chip key={i}>
                    {skill}
                    <ChipDeleteButton
                      type="button"
                      onClick={() => handleRemoveItem('skills', i)}
                    >
                      ×
                    </ChipDeleteButton>
                  </Chip>
                ))}
              </ChipContainer>
            )}
          />
          <AddItemContainer>
            <AddItemInput
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Digite uma habilidade..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('skills', newSkill, setNewSkill))}
            />
            <AddItemButton 
              type="button" 
              onClick={() => handleAddItem('skills', newSkill, setNewSkill)}
            >
              Adicionar
            </AddItemButton>
          </AddItemContainer>
        </FormGroup>

        <FormGroup>
          <Label>Códigos BNCC</Label>
          <Controller
            name={`stages.${stageIndex}.bnccCodes`}
            control={control}
            defaultValue={[]}
            render={({ field: { value } }) => (
              <ChipContainer>
                {value?.map((code: string, i: number) => (
                  <Chip key={i}>
                    {code}
                    <ChipDeleteButton
                      type="button"
                      onClick={() => handleRemoveItem('bnccCodes', i)}
                    >
                      ×
                    </ChipDeleteButton>
                  </Chip>
                ))}
              </ChipContainer>
            )}
          />
          <AddItemContainer>
            <AddItemInput
              value={newBnccCode}
              onChange={(e) => setNewBnccCode(e.target.value)}
              placeholder="Digite um código BNCC..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('bnccCodes', newBnccCode, setNewBnccCode))}
            />
            <AddItemButton 
              type="button" 
              onClick={() => handleAddItem('bnccCodes', newBnccCode, setNewBnccCode)}
            >
              Adicionar
            </AddItemButton>
          </AddItemContainer>
        </FormGroup>
      </FormSection>

      {/* Methodology Section */}
      <FormSection>
        <SectionTitle>Metodologia e Recursos</SectionTitle>
        
        <FormGroup>
          <Label>Metodologias</Label>
          <Controller
            name={`stages.${stageIndex}.methods`}
            control={control}
            defaultValue={[]}
            render={({ field: { value } }) => (
              <ChipContainer>
                {value?.map((method: string, i: number) => (
                  <Chip key={i}>
                    {method}
                    <ChipDeleteButton
                      type="button"
                      onClick={() => handleRemoveItem('methods', i)}
                    >
                      ×
                    </ChipDeleteButton>
                  </Chip>
                ))}
              </ChipContainer>
            )}
          />
          <AddItemContainer>
            <AddItemInput
              value={newMethod}
              onChange={(e) => setNewMethod(e.target.value)}
              placeholder="Digite uma metodologia..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('methods', newMethod, setNewMethod))}
            />
            <AddItemButton 
              type="button" 
              onClick={() => handleAddItem('methods', newMethod, setNewMethod)}
            >
              Adicionar
            </AddItemButton>
          </AddItemContainer>
        </FormGroup>

        <FormGroup>
          <Label>Recursos Necessários</Label>
          <Controller
            name={`stages.${stageIndex}.resources`}
            control={control}
            defaultValue={[]}
            render={({ field: { value } }) => (
              <ChipContainer>
                {value?.map((resource: string, i: number) => (
                  <Chip key={i}>
                    {resource}
                    <ChipDeleteButton
                      type="button"
                      onClick={() => handleRemoveItem('resources', i)}
                    >
                      ×
                    </ChipDeleteButton>
                  </Chip>
                ))}
              </ChipContainer>
            )}
          />
          <AddItemContainer>
            <AddItemInput
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              placeholder="Digite um recurso necessário..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('resources', newResource, setNewResource))}
            />
            <AddItemButton 
              type="button" 
              onClick={() => handleAddItem('resources', newResource, setNewResource)}
            >
              Adicionar
            </AddItemButton>
          </AddItemContainer>
        </FormGroup>
      </FormSection>

      {/* Activities Section */}
      <FormSection>
        <SectionTitle>Atividades e Conteúdo</SectionTitle>
        
        <FormGroup>
          <Label>Atividades</Label>
          <Controller
            name={`stages.${stageIndex}.activities`}
            control={control}
            defaultValue={[]}
            render={({ field: { value } }) => (
              <ChipContainer>
                {value?.map((activity: string, i: number) => (
                  <Chip key={i}>
                    {activity}
                    <ChipDeleteButton
                      type="button"
                      onClick={() => handleRemoveItem('activities', i)}
                    >
                      ×
                    </ChipDeleteButton>
                  </Chip>
                ))}
              </ChipContainer>
            )}
          />
          <AddItemContainer>
            <AddItemInput
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Digite uma atividade..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('activities', newActivity, setNewActivity))}
            />
            <AddItemButton 
              type="button" 
              onClick={() => handleAddItem('activities', newActivity, setNewActivity)}
            >
              Adicionar
            </AddItemButton>
          </AddItemContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.contentExplanation`}>Explicação do Conteúdo</Label>
          <Controller
            name={`stages.${stageIndex}.contentExplanation`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea 
                id={`stages.${stageIndex}.contentExplanation`} 
                rows={6}
                {...field} 
              />
            )}
          />
        </FormGroup>
      </FormSection>

      {/* Evaluation Section */}
      <FormSection>
        <SectionTitle>Avaliação</SectionTitle>
        
        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.evaluationType`}>Tipo de Avaliação</Label>
          <Controller
            name={`stages.${stageIndex}.evaluationType`}
            control={control}
            defaultValue="formativa"
            render={({ field }) => (
              <Select id={`stages.${stageIndex}.evaluationType`} {...field}>
                <option value="formativa">Formativa</option>
                <option value="somativa">Somativa</option>
                <option value="diagnostica">Diagnóstica</option>
                <option value="lista_exercicios">Lista de Exercícios</option>
              </Select>
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.evaluationMethod`}>Critérios de Avaliação</Label>
          <Controller
            name={`stages.${stageIndex}.evaluationMethod`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea id={`stages.${stageIndex}.evaluationMethod`} {...field} />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.evaluationWeight`}>Peso da Avaliação</Label>
          <Controller
            name={`stages.${stageIndex}.evaluationWeight`}
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <Input
                id={`stages.${stageIndex}.evaluationWeight`}
                type="number"
                min="0"
                step="0.1"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`stages.${stageIndex}.evaluationNotes`}>Texto para Registro</Label>
          <Controller
            name={`stages.${stageIndex}.evaluationNotes`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea id={`stages.${stageIndex}.evaluationNotes`} {...field} />
            )}
          />
        </FormGroup>
      </FormSection>
    </FormContainer>
  );
};

export default StageForm;