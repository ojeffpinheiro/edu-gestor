import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styled from 'styled-components';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { CalendarEvent, EventType } from '../../utils/types/CalendarEvent';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FormTitle = styled.h2`
  color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.25rem;
  
  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
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
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
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
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 0.85rem;
  margin: 0.25rem 0 0 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
`;

const SaveButton = styled(ActionButton)`
  background-color: #2196f3;
  color: white;
  border: none;
  
  &:hover {
    background-color: #1976d2;
  }
  
  &:disabled {
    background-color: #bbdefb;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #f44336;
  color: white;
  border: none;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

// Create a schema for form validation
const eventSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  description: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(['class', 'meeting', 'deadline', 'holiday', 'other'] as const),
  isAllDay: z.boolean().default(false),
  start: z.string().min(1, { message: 'Data de início é obrigatória' }),
  end: z.string().min(1, { message: 'Data de término é obrigatória' }),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventCreationProps {
  initialData?: Partial<CalendarEvent>;
  startDate?: Date;
  endDate?: Date;
  onSubmit: (data: Partial<CalendarEvent>) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const EventCreation: React.FC<EventCreationProps> = ({
  initialData,
  startDate,
  endDate,
  onSubmit,
  onCancel,
  onDelete,
}) => {
  // Initialize form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      location: initialData?.location || '',
      type: (initialData?.type as EventType) || 'other',
      isAllDay: initialData?.isAllDay || false,
      start: initialData?.start 
        ? typeof initialData.start === 'string' 
          ? initialData.start.slice(0, 16) 
          : format(initialData.start, "yyyy-MM-dd'T'HH:mm") 
        : startDate 
          ? format(startDate, "yyyy-MM-dd'T'HH:mm") 
          : '',
      end: initialData?.end 
        ? typeof initialData.end === 'string' 
          ? initialData.end.slice(0, 16) 
          : format(initialData.end, "yyyy-MM-dd'T'HH:mm") 
        : endDate 
          ? format(endDate, "yyyy-MM-dd'T'HH:mm") 
          : '',
    },
  });

  const isEditing = !!initialData?.id;

  const onFormSubmit = (data: EventFormValues) => {
    onSubmit({
      ...data,
      id: initialData?.id || '',
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit(onFormSubmit)}>
      <FormHeader>
        <FormTitle>{isEditing ? 'Editar Evento' : 'Novo Evento'}</FormTitle>
        <CloseButton type="button" onClick={onCancel}>
          <FaTimes />
        </CloseButton>
      </FormHeader>

      <FormGroup>
        <Label htmlFor="title">Título</Label>
        <Input
          type="text"
          id="title"
          placeholder="Título do evento"
          {...register('title')}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="type">Tipo de Evento</Label>
        <Select id="type" {...register('type')}>
          <option value="class">Aula</option>
          <option value="meeting">Reunião</option>
          <option value="deadline">Prazo</option>
          <option value="holiday">Feriado</option>
          <option value="other">Outro</option>
        </Select>
        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <CheckboxContainer>
          <Controller
            name="isAllDay"
            control={control}
            render={({ field }) => (
              <Checkbox
                type="checkbox"
                id="isAllDay"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="isAllDay">O dia todo</Label>
        </CheckboxContainer>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="start">Início</Label>
        <Input
          type="datetime-local"
          id="start"
          {...register('start')}
        />
        {errors.start && <ErrorMessage>{errors.start.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="end">Término</Label>
        <Input
          type="datetime-local"
          id="end"
          {...register('end')}
        />
        {errors.end && <ErrorMessage>{errors.end.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="location">Local</Label>
        <Input
          type="text"
          id="location"
          placeholder="Local do evento"
          {...register('location')}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descrição detalhada do evento"
          {...register('description')}
        />
      </FormGroup>

      <ButtonsContainer>
        <div>
          {onDelete && (
            <DeleteButton type="button" onClick={onDelete}>
              <FaTrash /> Excluir
            </DeleteButton>
          )}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <CancelButton type="button" onClick={onCancel}>
            <FaTimes /> Cancelar
          </CancelButton>
          <SaveButton type="submit" disabled={isSubmitting}>
            <FaSave /> Salvar
          </SaveButton>
        </div>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default EventCreation;