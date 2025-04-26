import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

import { CalendarEvent, EventType } from '../../utils/types/CalendarEvent';

import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';
import { Flex, Grid } from '../../styles/layoutUtils';
import { Input, InputGroup, Label, Select, TextArea } from '../../styles/inputs';
import { Checkbox, CheckboxContainer, DeleteButton, SaveButton } from './EventCreationStyle';
import { CancelButton, CloseButton } from '../../styles/buttons';
import { ErrorMessage } from '../../styles/errorMessages';

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
    <ModalContainer onSubmit={handleSubmit(onFormSubmit)}>
      <ModalContent size='sm' >
        <ModalHeader>
          <h2>{isEditing ? 'Editar Evento' : 'Novo Evento'}</h2>
          <CloseButton type="button" onClick={onCancel}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <form>
          <ModalBody>
            <Grid columns={2} gap='md' >
              <InputGroup>
                <Label htmlFor="title">Título</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Título do evento"
                  {...register('title')}
                />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="type">Tipo de Evento</Label>
                <Select id="type" {...register('type')}>
                  <option value="class">Aula</option>
                  <option value="meeting">Reunião</option>
                  <option value="deadline">Prazo</option>
                  <option value="holiday">Feriado</option>
                  <option value="other">Outro</option>
                </Select>
                {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
              </InputGroup>
            </Grid>

            <Flex direction='column' >
              <span>Período</span>
              <Grid columns={2} gap='md' >
                <InputGroup>
                  <Label htmlFor="start">Início</Label>
                  <Input
                    type="datetime-local"
                    id="start"
                    {...register('start')}
                  />
                  {errors.start && <ErrorMessage>{errors.start.message}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="end">Término</Label>
                  <Input
                    type="datetime-local"
                    id="end"
                    {...register('end')}
                  />
                  {errors.end && <ErrorMessage>{errors.end.message}</ErrorMessage>}
                </InputGroup>
              </Grid>
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
            </Flex>

            <InputGroup>
              <Label htmlFor="location">Local</Label>
              <Input
                type="text"
                id="location"
                placeholder="Local do evento"
                {...register('location')}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="description">Descrição</Label>
              <TextArea
                id="description"
                placeholder="Descrição detalhada do evento"
                {...register('description')}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <div>
              {onDelete && (
                <DeleteButton type="button" onClick={onDelete}>
                  <FaTrash /> Excluir
                </DeleteButton>
              )}
            </div>
            <CancelButton type="button" onClick={onCancel}>
              <FaTimes /> Cancelar
            </CancelButton>
            <SaveButton type="submit" disabled={isSubmitting}>
              <FaSave /> Salvar
            </SaveButton>
          </ModalFooter>

        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default EventCreation;