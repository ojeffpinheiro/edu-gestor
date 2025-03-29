import React, { useState } from 'react';
import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface StageFormProps {
  index: number;
  onRemove: () => void;
}
const FormContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #eee;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4dabf7;
    box-shadow: 0 0 0 2px rgba(77, 171, 247, 0.2);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4dabf7;
    box-shadow: 0 0 0 2px rgba(77, 171, 247, 0.2);
  }
`;

const StageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StageTitle = styled.h3`
  font-size: 1.125rem;
  color: #444;
  margin: 0;
`;

const RemoveButton = styled.button`
  background-color: #f8d7da;
  color: #d32f2f;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f5c2c7;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Chip = styled.div`
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 0.5rem;
  border-radius: 16px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`;

const ChipDeleteButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(25, 118, 210, 0.1);
  }
`;

const AddItemContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const AddItemInput = styled(Input)`
  flex-grow: 1;
`;

const AddItemButton = styled.button`
  background-color: #e3f2fd;
  color: #1976d2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #bbdefb;
  }
`;

const StageForm: React.FC<StageFormProps> = ({ index, onRemove }) => {
  const [newResource, setNewResource] = useState('');
  const [newActivity, setNewActivity] = useState('');

  const { control, setValue, getValues } = useFormContext();

  const handleAddResource = () => {
    if (newResource.trim()) {
      const currentResources = getValues(`stages.${index}.resources`) || [];
      setValue(`stages.${index}.resources`, [...currentResources, newResource]);
      setNewResource('');
    }
  };

  const handleRemoveResource = (resourceIndex: number) => {
    const currentResources = getValues(`stages.${index}.resources`) || [];
    setValue(
      `stages.${index}.resources`,
      currentResources.filter((_: any, i: number) => i !== resourceIndex)
    );
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      const currentActivities = getValues(`stages.${index}.activities`) || [];
      setValue(`stages.${index}.activities`, [...currentActivities, newActivity]);
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (activityIndex: number) => {
    const currentActivities = getValues(`stages.${index}.activities`) || [];
    setValue(
      `stages.${index}.activities`,
      currentActivities.filter((_: any, i: number) => i !== activityIndex)
    );
  };

  return (
    <FormContainer>
      <StageHeader>
        <StageTitle>Etapa {index + 1}</StageTitle>
        <RemoveButton type="button" onClick={onRemove}>Remover</RemoveButton>
      </StageHeader>

      <Controller
        name={`stages.${index}.id`}
        control={control}
        defaultValue={uuidv4()}
        render={() => <></>}
      />

      <FormGroup>
        <Label htmlFor={`stages.${index}.title`}>Título da Etapa</Label>
        <Controller
          name={`stages.${index}.title`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input id={`stages.${index}.title`} {...field} />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor={`stages.${index}.description`}>Descrição</Label>
        <Controller
          name={`stages.${index}.description`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea id={`stages.${index}.description`} {...field} />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor={`stages.${index}.duration`}>Duração (minutos)</Label>
        <Controller
          name={`stages.${index}.duration`}
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Input
              id={`stages.${index}.duration`}
              type="number"
              min="1"
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
            />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Label>Recursos</Label>
        <Controller
          name={`stages.${index}.resources`}
          control={control}
          defaultValue={[]}
          render={({ field: { value } }) => (
            <ChipContainer>
              {value?.map((resource: string, i: number) => (
                <Chip key={i}>
                  {resource}
                  <ChipDeleteButton
                    type="button"
                    onClick={() => handleRemoveResource(i)}
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
            placeholder="Digite um recurso..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResource())}
          />
          <AddItemButton type="button" onClick={handleAddResource}>
            Adicionar
          </AddItemButton>
        </AddItemContainer>
      </FormGroup>

      <FormGroup>
        <Label>Atividades</Label>
        <Controller
          name={`stages.${index}.activities`}
          control={control}
          defaultValue={[]}
          render={({ field: { value } }) => (
            <ChipContainer>
              {value?.map((activity: string, i: number) => (
                <Chip key={i}>
                  {activity}
                  <ChipDeleteButton
                    type="button"
                    onClick={() => handleRemoveActivity(i)}
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
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddActivity())}
          />
          <AddItemButton type="button" onClick={handleAddActivity}>
            Adicionar
          </AddItemButton>
        </AddItemContainer>
      </FormGroup>

      <FormGroup>
        <Label htmlFor={`stages.${index}.evaluationMethod`}>Método de Avaliação</Label>
        <Controller
          name={`stages.${index}.evaluationMethod`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea id={`stages.${index}.evaluationMethod`} {...field} />
          )}
        />
      </FormGroup>
    </FormContainer>
  );
};

export default StageForm;