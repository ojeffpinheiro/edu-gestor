import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { CalendarEvent, EventType } from '../../utils/types/CalendarEvent';

import Modal from '../modals/Modal';

import { Flex, Grid } from '../../styles/layoutUtils';
import { Input, InputGroup, Label, Select, TextArea } from '../../styles/inputs';
import { ErrorMessage } from '../../styles/feedback';

import { Checkbox, CheckboxContainer } from './EventCreationStyle';

// Create a schema for form validation
const eventSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  description: z.string().optional(),
  location: z.string().optional(),
  type: z.enum([
    'class', 'assessment', 'holiday', 'break', 'meeting',
    'results_delivery', 'training', 'important_date', 'external_assessment',
    'thematic_week', 'asynchronous_class', 'participatory_council', 'deadline',
    'saturday_class', 'personal', 'other'
  ]),
  isAllDay: z.boolean(),
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
  mode: 'create' | 'edit' | 'view';
  onModeChange: (mode: 'create' | 'edit' | 'view') => void;
}


const EventCreation: React.FC<EventCreationProps> = ({
  initialData,
  startDate,
  endDate,
  onSubmit,
  onCancel,
  onDelete,
  mode,
  onModeChange,
}) => {
  // Initialize form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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

  const onFormSubmit = (data: EventFormValues) => {
    onSubmit({
      ...data,
      id: initialData?.id || '',
    });
  };

  const isViewMode = mode === 'view';

  return (
    <Modal
      isOpen
      showFooter={!isViewMode}
      size="sm"
      onSubmit={handleSubmit(onFormSubmit)}
      submitText="Salvar"
      title={mode === 'create'
        ? 'Novo Evento'
        : mode === 'edit'
          ? 'Editar Evento'
          : 'Detalhes do Evento'}
      onClose={onCancel}>

      <form>
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
            <Select id="type" {...register('type')} disabled={isViewMode}>
              <option value="class">Aula</option>
              <option value="assessment">Avaliação</option>
              <option value="holiday">Feriado</option>
              <option value="break">Recesso</option>
              <option value="meeting">Reunião</option>
              <option value="results_delivery">Entrega de Resultados</option>
              <option value="training">Formação</option>
              <option value="important_date">Data Importante</option>
              <option value="external_assessment">Avaliação Externa</option>
              <option value="thematic_week">Semana Temática</option>
              <option value="asynchronous_class">Aula Assíncrona</option>
              <option value="participatory_council">Conselho Participativo</option>
              <option value="deadline">Prazo</option>
              <option value="saturday_class">Aula de Sábado</option>
              <option value="personal">Pessoal</option>
              <option value="other">Outro</option>
            </Select>
          </InputGroup>
        </Grid>

        <Flex direction="column" gap="md" style={{ marginTop: '1rem' }}>
          <span>Período</span>
          <Grid columns={2} gap="md">
            <InputGroup>
              <Label htmlFor="start">Início</Label>
              <Input
                type="datetime-local"
                id="start"
                {...register('start')}
                disabled={isViewMode}
              />
              {errors.start && <ErrorMessage>{errors.start.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="end">Término</Label>
              <Input
                type="datetime-local"
                id="end"
                {...register('end')}
                disabled={isViewMode}
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
                  disabled={isViewMode}
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
      </form>
    </Modal>
  );
};

export default EventCreation;