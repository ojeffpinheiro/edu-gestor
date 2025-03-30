import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FaSave, FaTimes, FaTrash, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { useCalendar } from '../../hooks/useCalendar';

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  color: var(--color-primary, #2196f3);
  font-size: 1.25rem;
  margin: 0;
`;

const HolidayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
`;

const HolidayItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const HolidayInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const HolidayName = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
`;

const HolidayDate = styled.span`
  font-size: 0.75rem;
  color: #666;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #333;
  }
  
  &.delete:hover {
    color: #f44336;
  }
  
  &.edit:hover {
    color: #2196f3;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid #e0e0e0;
  padding-top: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: a.5rem;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 0.75rem;
  margin: 0.25rem 0 0 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
`;

const SaveButton = styled(Button)`
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

const CancelButton = styled(Button)`
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const AddButton = styled(Button)`
  background-color: #ff9800;
  color: white;
  border: none;
  font-size: 0.75rem;
  padding: 0.4rem 0.75rem;
  
  &:hover {
    background-color: #f57c00;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
  border: none;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const NoHolidaysMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  color: #666;
  font-style: italic;
  font-size: 0.875rem;
`;

// Form schema for validation
const holidaySchema = z.object({
  title: z.string().min(1, { message: 'Nome do feriado é obrigatório' }),
  date: z.string().min(1, { message: 'Data do feriado é obrigatória' }),
  isRecurringYearly: z.boolean().default(false),
  description: z.string().optional(),
});

type HolidayFormValues = z.infer<typeof holidaySchema>;

const HolidayManager: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<CalendarEvent | null>(null);

  const { events, isLoading, error, createEvent, updateEvent, deleteEvent } = useCalendar();

  // Filter only holiday type events
  const holidays = events?.filter(event => event.type === 'holiday') || [];

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      isRecurringYearly: false,
      description: '',
    },
  });

  useEffect(() => {
    if (editingHoliday) {
      // Transform the date format for the form
      const date = typeof editingHoliday.start === 'string'
        ? editingHoliday.start.slice(0, 10)
        : format(editingHoliday.start, 'yyyy-MM-dd');

      reset({
        title: editingHoliday.title,
        date,
        isRecurringYearly: editingHoliday.recurrence !== undefined,
        description: editingHoliday.description || '',
      });

      setIsAdding(true);
    }
  }, [editingHoliday, reset]);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingHoliday(null);
    reset();
  };

  const handleEdit = (holiday: CalendarEvent) => {
    setEditingHoliday(holiday);
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
  };

  const onFormSubmit = (data: HolidayFormValues) => {
    const dateObj = new Date(data.date);

    // Create event date objects
    const startDate = new Date(dateObj);
    const endDate = new Date(dateObj);
    endDate.setHours(23, 59, 59);

    // Create recurrence config if needed
    const recurrence = data.isRecurringYearly
      ? {
        frequency: 'yearly' as const,
        interval: 1,
      }
      : undefined;

    if (editingHoliday) {
      updateEvent({
        id: editingHoliday.id,
        data: {
          title: data.title,
          description: data.description,
          start: startDate,
          end: endDate,
          isAllDay: true,
          type: 'holiday',
          recurrence,
          color: '#ff9800', // Orange color for holidays
        },
      });
    } else {
      createEvent({
        title: data.title,
        description: data.description,
        start: startDate,
        end: endDate,
        isAllDay: true,
        type: 'holiday',
        recurrence,
        color: '#ff9800', // Orange color for holidays
      });
    }

    setIsAdding(false);
    setEditingHoliday(null);
    reset();
  };

  // Group holidays by month to display them more organized
  const groupedHolidays = holidays.reduce((acc, holiday) => {
    const date = new Date(typeof holiday.start === 'string' ? holiday.start : holiday.start);
    const month = date.getMonth();

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(holiday);
    return acc;
  }, {} as Record<number, CalendarEvent[]>);

  // Sort holidays by date within each month
  Object.keys(groupedHolidays).forEach(month => {
    const monthIndex = parseInt(month);
    groupedHolidays[monthIndex].sort((a, b) => {
      const dateA = new Date(typeof a.start === 'string' ? a.start : a.start);
      const dateB = new Date(typeof b.start === 'string' ? b.start : b.start);
      return dateA.getDate() - dateB.getDate();
    });
  });

  // Format month names for display
  const getMonthName = (monthIndex: number) => {
    const date = new Date();
    date.setMonth(monthIndex);
    return date.toLocaleString('pt-BR', { month: 'long' });
  };

  return (
    <Container>
    <Header>
    <Title>
    <FaCalendarAlt style= {{ marginRight: '0.5rem' }
} />
Feriados
  </Title>
{
  !isAdding && (
    <AddButton onClick={ () => setIsAdding(true) }>
      <FaPlus /> Adicionar
      </AddButton>
        )
}
</Header>

{
  isLoading ? (
    <p>Carregando feriados...</p>
      ) : error ? (
    <p>Erro ao carregar feriados.Por favor, tente novamente.</p>
      ) : (
    <HolidayList>
    {
      Object.keys(groupedHolidays).length === 0 ? (
        <NoHolidaysMessage>
        Nenhum feriado cadastrado.Clique em "Adicionar" para criar.
            </NoHolidaysMessage>
          ) : (
          Object.keys(groupedHolidays).map(month => {
            const monthIndex = parseInt(month);
            const monthHolidays = groupedHolidays[monthIndex];

            return (
              <div key= { month } >
              <h4 style={
                {
                  fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                      marginTop: '0.5rem',
                        color: '#666',
                          textTransform: 'capitalize'
                }
            }>
              { getMonthName(monthIndex) }
              </h4>

            {
              monthHolidays.map(holiday => (
                <HolidayItem key= { holiday.id } >
                <HolidayInfo>
                <HolidayName>{ holiday.title } </HolidayName>
                <HolidayDate>
                          {
                  typeof holiday.start === 'string'
                    ? new Date(holiday.start).toLocaleDateString('pt-BR')
                    : holiday.start.toLocaleDateString('pt-BR')
                }
                          { holiday.recurrence && ' (Anual)' }
                </HolidayDate>
                </HolidayInfo>
                < ActionButtons >
                <IconButton 
                          className="edit" 
                          onClick = {() => handleEdit(holiday)}
            title = "Editar"
              >
              <FaPlus />
              </IconButton>
              < IconButton
            className = "delete"
            onClick = {() => handleDelete(holiday.id)
          }
                          title = "Excluir"
            >
            <FaTrash />
            </IconButton>
            </ActionButtons>
            </HolidayItem>
          ))}
</div>
              );
            })
          )}
</HolidayList>
      )}

{
  isAdding && (
    <FormContainer onSubmit={ handleSubmit(onFormSubmit) }>
      <FormGroup>
      <Label htmlFor="title" > Nome do Feriado </Label>
        < Input
              type = "text"
              id = "title"
  placeholder = "Ex: Natal, Independência do Brasil"
  {...register('title') }
            />
  { errors.title && <ErrorMessage>{ errors.title.message } </ErrorMessage> }
  </FormGroup>

    < FormGroup >
    <Label htmlFor="date" > Data </Label>
      < Input
  type = "date"
  id = "date"
  {...register('date') }
            />
  { errors.date && <ErrorMessage>{ errors.date.message } </ErrorMessage> }
  </FormGroup>

    < FormGroup >
    <CheckboxContainer>
    <Controller
                name="isRecurringYearly"
  control = { control }
  render = {({ field }) => (
    <Checkbox
                    type= "checkbox"
  id = "isRecurringYearly"
  checked = { field.value }
  onChange = { field.onChange }
    />
                )
}
              />
  < Label htmlFor = "isRecurringYearly" > Repete anualmente </Label>
    </CheckboxContainer>
    </FormGroup>

    < FormGroup >
    <Label htmlFor="description" > Descrição(opcional) </Label>
      < Input
type = "text"
id = "description"
placeholder = "Descrição ou observações sobre o feriado"
{...register('description') }
            />
  </FormGroup>

  < ButtonsContainer >
  <div>
  { editingHoliday && (
    <DeleteButton 
                  type="button"
onClick = {() => handleDelete(editingHoliday.id)}
                >
  <FaTrash /> Excluir
  </DeleteButton>
              )}
</div>
  < div style = {{ display: 'flex', gap: '0.5rem' }}>
    <CancelButton type="button" onClick = { handleCancel } >
      <FaTimes /> Cancelar
      </CancelButton>
      < SaveButton type = "submit" disabled = { isSubmitting } >
        <FaSave /> Salvar
        </SaveButton>
        </div>
        </ButtonsContainer>
        </FormContainer>
      )}
</Container>
  );
};

export default HolidayManager;