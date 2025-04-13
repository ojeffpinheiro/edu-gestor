import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { 
  FaCalendar, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaPen, 
  FaPlus, 
  FaRedo, 
  FaSave, 
  FaTimes, 
  FaTrash
 } from 'react-icons/fa';

import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { useCalendar } from '../../hooks/useCalendar';

import { CancelButton, IconButton } from '../../styles/buttons';
import { FormGroup } from '../../styles/formControls';
import { Input, Label, TextArea } from '../../styles/inputs';
import { Flex } from '../../styles/layoutUtils';
import { 
  HolidayManagerContainer, 
  AddHolidayButton, 
  ButtonsContainer, 
  Checkbox, 
  CheckboxContainer, 
  ConfirmationDialog, 
  DeleteButton, 
  ErrorAlert, 
  HolidayList,
  ErrorMessage,
  HolidayFormContainer,
  HolidayActions,
  HolidayDate,
  HolidayInfo,
  HolidayName,
  HolidayItem,
  HolidayManagerHeader,
  HolidayTitle,
  LoadingSpinner,
  SaveButton,
  MonthSection,
  MonthTitle,
  NoHolidaysMessage,
  RecurringBadge
} from './HolidayManagerStyles';

// Schema de validação para o formulário de feriados
const holidaySchema = z.object({
  title: z.string().min(1, { message: 'Nome do feriado é obrigatório' }),
  date: z.string().min(1, { message: 'Data do feriado é obrigatória' }),
  isRecurringYearly: z.boolean().default(false),
  description: z.string().optional(),
});

// Tipagem derivada do schema
type HolidayFormValues = z.infer<typeof holidaySchema>;

/**
 * Componente HolidayManager
 * 
 * Permite gerenciar (visualizar, adicionar, editar e excluir) feriados
 * no calendário da aplicação.
 */
const HolidayManager: React.FC = () => {
  // Estados
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<CalendarEvent | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  // Hook personalizado para acesso aos dados do calendário
  const { events, isLoading, error, createEvent, updateEvent, deleteEvent } = useCalendar();

  // Filtra apenas eventos do tipo feriado
  const holidays = events?.filter(event => event.type === 'holiday') || [];

  // Configuração do formulário com React Hook Form e Zod
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

  /**
   * Efeito para preencher o formulário quando um feriado é selecionado para edição
   */
  useEffect(() => {
    if (editingHoliday) {
      const date = typeof editingHoliday.start === 'string'
        ? editingHoliday.start.slice(0, 10)
        : format(editingHoliday.start, 'yyyy-MM-dd');

      reset({
        title: editingHoliday.title,
        date,
        isRecurringYearly: editingHoliday.recurrence !== undefined,
        description: editingHoliday.description || '',
      });

      setIsAddingOrEditing(true);
    }
  }, [editingHoliday, reset]);

  /**
   * Cancela a adição/edição e reseta o formulário
   */
  const handleCancel = () => {
    setIsAddingOrEditing(false);
    setEditingHoliday(null);
    reset();
  };

  /**
   * Configura estado para edição de um feriado
   */
  const handleEdit = (holiday: CalendarEvent) => {
    setEditingHoliday(holiday);
  };

  /**
   * Solicita confirmação para exclusão ou exclui se já confirmado
   */
  const handleDelete = (id: string, confirmDelete = false) => {
    if (!confirmDelete) {
      setDeleteConfirmation(id);
      return;
    }
    
    try {
      deleteEvent(id);
      setDeleteConfirmation(null);
      // Se estiver editando o feriado que está sendo excluído, feche o formulário
      if (editingHoliday?.id === id) {
        setIsAddingOrEditing(false);
        setEditingHoliday(null);
        reset();
      }
    } catch (error) {
      console.error('Erro ao excluir feriado:', error);
      // Aqui poderia ser adicionado um toast ou notificação de erro
    }
  };

  /**
   * Processa o envio do formulário (criação ou edição de feriado)
   */
  const onFormSubmit = async (data: HolidayFormValues) => {
    try {
      const dateObj = new Date(data.date);

      // Cria objetos de data para início e fim do evento
      const startDate = new Date(dateObj);
      const endDate = new Date(dateObj);
      endDate.setHours(23, 59, 59);

      // Configura recorrência se necessário
      const recurrence = data.isRecurringYearly
        ? {
            frequency: 'yearly' as const,
            interval: 1,
          }
        : undefined;

      // Define os dados comuns para criação/atualização
      const eventData = {
        title: data.title,
        description: data.description,
        start: startDate,
        end: endDate,
        isAllDay: true,
        type: 'holiday' as const,
        recurrence,
        color: '#ff9800', // Cor laranja para feriados
      };

      if (editingHoliday) {
        // Atualiza feriado existente
        await updateEvent({
          id: editingHoliday.id,
          data: eventData,
        });
      } else {
        // Cria novo feriado
        await createEvent(eventData);
      }

      // Limpa o estado e fecha o formulário
      setIsAddingOrEditing(false);
      setEditingHoliday(null);
      reset();
    } catch (error) {
      console.error('Erro ao salvar feriado:', error);
      // Aqui poderia ser adicionado um toast ou notificação de erro
    }
  };

  /**
   * Agrupa feriados por mês para melhor organização visual
   */
  const getGroupedHolidays = () => {
    const grouped = holidays.reduce((acc, holiday) => {
      const date = new Date(typeof holiday.start === 'string' ? holiday.start : holiday.start);
      const month = date.getMonth();

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(holiday);
      return acc;
    }, {} as Record<number, CalendarEvent[]>);

    // Ordena feriados por data dentro de cada mês
    Object.keys(grouped).forEach(month => {
      const monthIndex = parseInt(month);
      grouped[monthIndex].sort((a, b) => {
        const dateA = new Date(typeof a.start === 'string' ? a.start : a.start);
        const dateB = new Date(typeof b.start === 'string' ? b.start : b.start);
        return dateA.getDate() - dateB.getDate();
      });
    });

    return grouped;
  };

  /**
   * Obtém o nome do mês em português
   */
  const getMonthName = (monthIndex: number) => {
    const date = new Date();
    date.setMonth(monthIndex);
    return date.toLocaleString('pt-BR', { month: 'long' });
  };

  /**
   * Formata a data para exibição
   */
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR');
  };

  // Agrupamento de feriados por mês
  const groupedHolidays = getGroupedHolidays();

  return (
    <HolidayManagerContainer>
      <HolidayManagerHeader>
        <HolidayTitle>
          <FaCalendar size={22} />
          Feriados
        </HolidayTitle>
        {!isAddingOrEditing && (
          <AddHolidayButton 
            onClick={() => setIsAddingOrEditing(true)}
            aria-label="Adicionar novo feriado"
          >
            <FaPlus size={18} /> Adicionar
          </AddHolidayButton>
        )}
      </HolidayManagerHeader>

      {/* Exibe mensagem de carregamento, erro ou a lista de feriados */}
      {isLoading ? (
        <LoadingSpinner>Carregando feriados...</LoadingSpinner>
      ) : error ? (
        <ErrorAlert>
          <Flex align="center" gap="sm">
            <FaExclamationCircle size={18} />
            Erro ao carregar feriados. Por favor, tente novamente.
          </Flex>
          <details>
            <summary>Detalhes do erro</summary>
            {error.toString()}
          </details>
        </ErrorAlert>
      ) : (
        <HolidayList>
          {Object.keys(groupedHolidays).length === 0 ? (
            <NoHolidaysMessage>
              <FaCalendar size={48} />
              <p>Nenhum feriado cadastrado. Clique em "Adicionar" para criar.</p>
            </NoHolidaysMessage>
          ) : (
            // Renderiza seções de meses com seus respectivos feriados
            Object.keys(groupedHolidays).map(month => {
              const monthIndex = parseInt(month);
              const monthHolidays = groupedHolidays[monthIndex];

              return (
                <MonthSection key={month}>
                  <MonthTitle>
                    {getMonthName(monthIndex)}
                  </MonthTitle>

                  {monthHolidays.map(holiday => (
                    <HolidayItem key={holiday.id}>
                      <HolidayInfo>
                        <HolidayName>{holiday.title}</HolidayName>
                        <HolidayDate>
                          <FaCalendar size={14} />
                          {formatDate(holiday.start)}
                          {holiday.recurrence && (
                            <RecurringBadge>
                              <FaRedo size={12} />
                              Anual
                            </RecurringBadge>
                          )}
                        </HolidayDate>
                        {holiday.description && (
                          <HolidayDate>
                            <FaInfoCircle size={14} />
                            {holiday.description}
                          </HolidayDate>
                        )}
                      </HolidayInfo>
                      <HolidayActions>
                        <IconButton 
                          className="edit" 
                          onClick={() => handleEdit(holiday)}
                          aria-label={`Editar ${holiday.title}`}
                        >
                          <FaPen size={18} />
                        </IconButton>
                        <IconButton
                          className="delete"
                          onClick={() => handleDelete(holiday.id)}
                          aria-label={`Excluir ${holiday.title}`}
                        >
                          <FaTrash size={18} />
                        </IconButton>
                      </HolidayActions>
                      
                      {/* Modal de confirmação de exclusão */}
                      {deleteConfirmation === holiday.id && (
                        <ConfirmationDialog>
                          <p>
                            <FaExclamationCircle size={18} />
                            Deseja realmente excluir este feriado?
                          </p>
                          <div>
                            <CancelButton onClick={() => setDeleteConfirmation(null)}>
                              <FaTimes size={18} /> Cancelar
                            </CancelButton>
                            <DeleteButton onClick={() => handleDelete(holiday.id, true)}>
                              <FaTrash size={18} /> Confirmar
                            </DeleteButton>
                          </div>
                        </ConfirmationDialog>
                      )}
                    </HolidayItem>
                  ))}
                </MonthSection>
              );
            })
          )}
        </HolidayList>
      )}

      {/* Formulário de adição/edição */}
      {isAddingOrEditing && (
        <HolidayFormContainer onSubmit={handleSubmit(onFormSubmit)}>
          <FormGroup>
            <Label htmlFor="title">Nome do Feriado</Label>
            <Input
              type="text"
              id="title"
              placeholder="Ex: Natal, Independência do Brasil"
              {...register('title')}
              aria-invalid={errors.title ? 'true' : 'false'}
            />
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="date">Data</Label>
            <Input
              type="date"
              id="date"
              {...register('date')}
              aria-invalid={errors.date ? 'true' : 'false'}
            />
            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <CheckboxContainer>
              <Controller
                name="isRecurringYearly"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    type="checkbox"
                    id="isRecurringYearly"
                    checked={field.value}
                    onChange={field.onChange}
                    aria-label="Repetir anualmente"
                  />
                )}
              />
              <Label htmlFor="isRecurringYearly" style={{ margin: 0 }}>Repete anualmente</Label>
            </CheckboxContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Descrição (opcional)</Label>
            <TextArea
              id="description"
              placeholder="Descrição ou observações sobre o feriado"
              {...register('description')}
            />
          </FormGroup>

          <ButtonsContainer>
            <div>
              {editingHoliday && (
                <DeleteButton 
                  type="button"
                  onClick={() => handleDelete(editingHoliday.id)}
                  aria-label="Excluir feriado"
                >
                  <FaTrash size={18} /> Excluir
                </DeleteButton>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <CancelButton 
                type="button" 
                onClick={handleCancel}
                aria-label="Cancelar"
              >
                <FaTimes size={18} /> Cancelar
              </CancelButton>
              <SaveButton 
                type="submit" 
                disabled={isSubmitting}
                aria-label="Salvar feriado"
              >
                <FaSave size={18} /> {isSubmitting ? 'Salvando...' : 'Salvar'}
              </SaveButton>
            </div>
          </ButtonsContainer>
        </HolidayFormContainer>
      )}
    </HolidayManagerContainer>
  );
};

export default HolidayManager;