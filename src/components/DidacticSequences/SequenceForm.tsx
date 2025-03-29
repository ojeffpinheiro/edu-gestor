import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { DidacticSequence, DisciplineType } from '../../utils/types/DidacticSequence';
import StageForm from './StageForm';

interface SequenceFormProps {
  initialData?: DidacticSequence;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #555;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const FormColumn = styled.div`
  flex: 1;
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

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
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

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #2196f3;
  color: white;
  border: none;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const AddButton = styled(Button)`
  background-color: #e3f2fd;
  color: #1976d2;
  border: none;
  margin-bottom: 1.5rem;
  
  &:hover {
    background-color: #bbdefb;
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

// Schema de validação com Zod
const sequenceSchema = z.object({
  id: z.string(),
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres' }),
  discipline: z.nativeEnum(DisciplineType, { required_error: 'Selecione uma disciplina' }),
  targetAudience: z.string().min(1, { message: 'Informe o público-alvo' }),
  overview: z.string().min(10, { message: 'A visão geral deve ter pelo menos 10 caracteres' }),
  objectives: z.array(z.string()).min(1, { message: 'Adicione pelo menos um objetivo' }),
  bnccCodes: z.array(
    z.object({
      id: z.string(),
      description: z.string()
    })
  ),
  skills: z.array(z.string()),
  stages: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(3, { message: 'O título da etapa deve ter pelo menos 3 caracteres' }),
      description: z.string().min(10, { message: 'A descrição deve ter pelo menos 10 caracteres' }),
      duration: z.number().min(1, { message: 'A duração deve ser de pelo menos 1 minuto' }),
      resources: z.array(z.string()),
      activities: z.array(z.string()).min(1, { message: 'Adicione pelo menos uma atividade' }),
      evaluationMethod: z.string().optional()
    })
  ).min(1, { message: 'Adicione pelo menos uma etapa' }),
  author: z.string().min(1, { message: 'Informe o autor' }),
  totalDuration: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

const SequenceForm: React.FC<SequenceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [newObjective, setNewObjective] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newBNCCCode, setNewBNCCCode] = useState({ id: '', description: '' });
  
  const methods = useForm({
    resolver: zodResolver(sequenceSchema),
    defaultValues: initialData || {
      title: '',
      discipline: undefined,
      targetAudience: '',
      overview: '',
      objectives: [],
      bnccCodes: [],
      skills: [],
      stages: [],
      author: ''
    }
  });
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    control, 
    setValue, 
    getValues,
    watch
  } = methods;
  
  const stages = watch('stages');
  
  const handleAddStage = () => {
    const currentStages = getValues('stages') || [];
    setValue('stages', [...currentStages, {
      id: uuidv4(),
      title: '',
      description: '',
      duration: 0,
      resources: [],
      activities: [],
      evaluationMethod: ''
    }]);
  };
  
  const handleRemoveStage = (index: number) => {
    const currentStages = getValues('stages');
    setValue(
      'stages',
      currentStages.filter((_: any, i: number) => i !== index)
    );
  };
  
  const handleAddObjective = () => {
    if (newObjective.trim()) {
      const currentObjectives = getValues('objectives') || [];
      setValue('objectives', [...currentObjectives, newObjective]);
      setNewObjective('');
    }
  };
  
  const handleRemoveObjective = (index: number) => {
    const currentObjectives = getValues('objectives');
    setValue(
      'objectives',
      currentObjectives.filter((_: any, i: number) => i !== index)
    );
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = getValues('skills') || [];
      setValue('skills', [...currentSkills, newSkill]);
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (index: number) => {
    const currentSkills = getValues('skills');
    setValue(
      'skills',
      currentSkills.filter((_ : any, i: number) => i !== index)
    );
  };
  
  const handleAddBNCCCode = () => {
    if (newBNCCCode.id.trim() && newBNCCCode.description.trim()) {
      const currentBNCCCodes = getValues('bnccCodes') || [];
      setValue('bnccCodes', [...currentBNCCCodes, { ...newBNCCCode }]);
      setNewBNCCCode({ id: '', description: '' });
    }
  };
  
  const handleRemoveBNCCCode = (index: number) => {
    const currentBNCCCodes = getValues('bnccCodes');
    setValue(
      'bnccCodes',
      currentBNCCCodes.filter((_, i) => i !== index)
    );
  };
  
  const onFormSubmit = (data: any) => {
    onSubmit(data);
  };
  
  return (
    <FormProvider {...methods}>
      <FormContainer>
        <FormTitle>{initialData ? 'Editar Sequência Didática' : 'Nova Sequência Didática'}</FormTitle>
        
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormSection>
            <SectionTitle>Informações Básicas</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="title">Título da Sequência</Label>
              <Input 
                id="title" 
                {...register('title')} 
                placeholder="Ex: Introdução à Geometria Espacial"
              />
              {errors.title && <ErrorMessage>{errors.title.message as string}</ErrorMessage>}
            </FormGroup>
            
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="discipline">Disciplina</Label>
                  <Select id="discipline" {...register('discipline')}>
                    <option value="">Selecione uma disciplina</option>
                    <option value="Português">Português</option>
                    <option value="Matemática">Matemática</option>
                    <option value="História">História</option>
                    <option value="Geografia">Geografia</option>
                    <option value="Ciências">Ciências</option>
                    <option value="Artes">Artes</option>
                    <option value="Educação Física">Educação Física</option>
                    <option value="Inglês">Inglês</option>
                    <option value="Outro">Outro</option>
                  </Select>
                  {errors.discipline && <ErrorMessage>{errors.discipline.message as string}</ErrorMessage>}
                </FormGroup>
              </FormColumn>
              
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="targetAudience">Público-alvo</Label>
                  <Input 
                    id="targetAudience" 
                    {...register('targetAudience')} 
                    placeholder="Ex: 6º Ano do Ensino Fundamental"
                  />
                  {errors.targetAudience && <ErrorMessage>{errors.targetAudience.message as string}</ErrorMessage>}
                </FormGroup>
              </FormColumn>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="overview">Visão Geral</Label>
              <Textarea 
                id="overview" 
                {...register('overview')} 
                placeholder="Descreva brevemente o que será abordado nesta sequência didática..."
              />
              {errors.overview && <ErrorMessage>{errors.overview.message as string}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="author">Autor</Label>
              <Input 
                id="author" 
                {...register('author')} 
                placeholder="Seu nome"
              />
              {errors.author && <ErrorMessage>{errors.author.message as string}</ErrorMessage>}
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Objetivos</SectionTitle>
            
            <Label>Objetivos de Aprendizagem</Label>
            <ChipContainer>
              {watch('objectives')?.map((objective: string, i: number) => (
                <Chip key={i}>
                  {objective}
                  <ChipDeleteButton
                    type="button"
                    onClick={() => handleRemoveObjective(i)}
                  >
                    ×
                  </ChipDeleteButton>
                </Chip>
              ))}
            </ChipContainer>
            {errors.objectives && <ErrorMessage>{errors.objectives.message as string}</ErrorMessage>}
            
            <AddItemContainer>
              <AddItemInput
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                placeholder="Digite um objetivo de aprendizagem..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddObjective())}
              />
              <AddItemButton type="button" onClick={handleAddObjective}>
                Adicionar
              </AddItemButton>
            </AddItemContainer>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Habilidades</SectionTitle>
            
            <Label>Habilidades Desenvolvidas</Label>
            <ChipContainer>
              {watch('skills')?.map((skill: string, i: number) => (
                <Chip key={i}>
                  {skill}
                  <ChipDeleteButton
                    type="button"
                    onClick={() => handleRemoveSkill(i)}
                  >
                    ×
                  </ChipDeleteButton>
                </Chip>
              ))}
            </ChipContainer>
            
            <AddItemContainer>
              <AddItemInput
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Digite uma habilidade..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <AddItemButton type="button" onClick={handleAddSkill}>
                Adicionar
              </AddItemButton>
            </AddItemContainer>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Códigos BNCC</SectionTitle>
            
            <ChipContainer>
              {watch('bnccCodes')?.map((code: { id: string; description: string }, i: number) => (
                <Chip key={i}>
                  {code.id}: {code.description}
                  <ChipDeleteButton
                    type="button"
                    onClick={() => handleRemoveBNCCCode(i)}
                  >
                    ×
                  </ChipDeleteButton>
                </Chip>
              ))}
            </ChipContainer>
            
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="bnccId">Código BNCC</Label>
                  <Input
                    id="bnccId"
                    value={newBNCCCode.id}
                    onChange={(e) => setNewBNCCCode({ ...newBNCCCode, id: e.target.value })}
                    placeholder="Ex: EF06MA01"
                  />
                </FormGroup>
              </FormColumn>
              
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="bnccDescription">Descrição</Label>
                  <Input
                    id="bnccDescription"
                    value={newBNCCCode.description}
                    onChange={(e) => setNewBNCCCode({ ...newBNCCCode, description: e.target.value })}
                    placeholder="Descrição da habilidade BNCC"
                  />
                </FormGroup>
              </FormColumn>
            </FormRow>
            
            <AddItemButton 
              type="button" 
              onClick={handleAddBNCCCode}
              style={{ marginTop: '0.5rem' }}
            >
              Adicionar Código BNCC
            </AddItemButton>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Etapas da Sequência</SectionTitle>
            
            {errors.stages && typeof errors.stages.message === 'string' && (
              <ErrorMessage>{errors.stages.message}</ErrorMessage>
            )}
            
            {stages?.map((_, index) => (
              <StageForm
                key={index}
                index={index}
                onRemove={() => handleRemoveStage(index)}
              />
            ))}
            
            <AddButton type="button" onClick={handleAddStage}>
              Adicionar Nova Etapa
            </AddButton>
          </FormSection>
          
          <ButtonGroup>
            <CancelButton type="button" onClick={onCancel}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit">
              {initialData ? 'Atualizar' : 'Criar'} Sequência
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    </FormProvider>
  );
};

export default SequenceForm;