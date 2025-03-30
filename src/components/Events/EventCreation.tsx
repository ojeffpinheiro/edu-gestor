import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import styled from 'styled-components';
import { BaseButton, BaseInput } from '../../styles/baseComponents';
import { CalendarEvent, EventType } from '../../utils/types/CalendarEvent';

// Form styled components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
`;

const FormTitle = styled.h2`
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: var(--font-size-xl);
  
  &:hover {
    color: var(--color-text-primary);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-text-primary);
`;

const Input = styled(BaseInput)`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
`;

const Select = styled.select`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  background-color: var(--color-input);
  color: var(--color-text);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  min-height: 100px;
  resize: vertical;
  background-color: var(--color-input);
  color: var(--color-text);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-lg);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-md);
`;

const SaveButton = styled(BaseButton)`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:hover:not(:disabled) {
    background-color: var(--color-background-third);
  }
`;

const DeleteButton = styled(BaseButton)`
  background-color: var(--color-error);
  color: white;
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:hover:not(:disabled) {
    background-color: var(--color-error-hover);
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
        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            <FaTimes /> Cancelar
          </CancelButton>
          <SaveButton type="submit" disabled={isSubmitting}>
            <FaSave /> Salvar
          </SaveButton>
        </ButtonGroup>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default EventCreation;