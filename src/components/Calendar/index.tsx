import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isValid,
  Locale
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Importações dos componentes estilizados
import {
  CalendarHeader,
  MonthDisplay,
  NavigationButtons,
  NavButton,
  WeekdaysRow,
  WeekdayLabel,
  DaysGrid,
  DayCellContent,
  EventIndicator,
  CalendarFooter,
  TodayButton
} from './styles';

// Constantes
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// Tipos
export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type?: 'default' | 'meeting' | 'deadline' | 'holiday' | 'personal';
  color?: string;
}

export interface CalendarProps {
  /** Função chamada quando uma data é selecionada */
  onSelectDate?: (date: Date) => void;
  /** Data inicialmente selecionada */
  initialSelectedDate?: Date;
  /** Lista de eventos para mostrar no calendário */
  events?: CalendarEvent[];
  /** Data mínima selecionável */
  minSelectableDate?: Date;
  /** Data máxima selecionável */
  maxSelectableDate?: Date;
  /** Classes CSS adicionais */
  className?: string;
  /** Locale para formatação de datas (padrão: ptBR) */
  locale?: Locale;
  /** Função para formatar a exibição do mês e ano (padrão: 'MMMM yyyy') */
  monthYearFormat?: string;
  /** Indica se o botão "Hoje" deve ser exibido */
  showTodayButton?: boolean;
}

/**
 * Componente de calendário com seleção de data e exibição de eventos
 */
const Calendar: React.FC<CalendarProps> = ({
  onSelectDate,
  initialSelectedDate,
  events = [],
  minSelectableDate,
  maxSelectableDate,
  className,
  locale = ptBR,
  monthYearFormat = 'MMMM yyyy',
  showTodayButton = true
}) => {
  // Validação da data inicial
  const validInitialDate = useMemo(() => {
    if (!initialSelectedDate || !isValid(initialSelectedDate)) {
      return new Date();
    }
    return initialSelectedDate;
  }, [initialSelectedDate]);

  // Estados
  const [currentMonth, setCurrentMonth] = useState<Date>(validInitialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(validInitialDate);

  // Sincronizar com a data inicial quando ela mudar
  useEffect(() => {
    if (initialSelectedDate && isValid(initialSelectedDate)) {
      setSelectedDate(initialSelectedDate);
      setCurrentMonth(initialSelectedDate);
    }
  }, [initialSelectedDate]);

  // Verificar se uma data está desabilitada
  const isDateDisabled = useCallback((date: Date): boolean => {
    if (!isValid(date)) return true;
    
    const isBeforeMinDate = minSelectableDate && date < minSelectableDate;
    const isAfterMaxDate = maxSelectableDate && date > maxSelectableDate;
    
    return Boolean(isBeforeMinDate || isAfterMaxDate);
  }, [minSelectableDate, maxSelectableDate]);

  // Verificar se um dia tem eventos
  const getDayEvents = useCallback((day: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(event.date, day));
  }, [events]);

  // Manipuladores de eventos
  const handleDateClick = useCallback((day: Date) => {
    if (!isDateDisabled(day) && isSameMonth(day, currentMonth)) {
      setSelectedDate(day);
      if (onSelectDate) {
        onSelectDate(day);
      }
    }
  }, [isDateDisabled, currentMonth, onSelectDate]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  }, []);

  const handleGoToToday = useCallback(() => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
    if (onSelectDate) {
      onSelectDate(today);
    }
  }, [onSelectDate]);

  // Renderizar o cabeçalho do calendário
  const renderHeader = useCallback(() => (
    <CalendarHeader>
      <MonthDisplay>
        {format(currentMonth, monthYearFormat, { locale })}
      </MonthDisplay>
      <NavigationButtons>
        <NavButton 
          onClick={handlePrevMonth} 
          aria-label="Mês anterior"
        >
          &lt;
        </NavButton>
        <NavButton 
          onClick={handleNextMonth} 
          aria-label="Próximo mês"
        >
          &gt;
        </NavButton>
      </NavigationButtons>
    </CalendarHeader>
  ), [currentMonth, handleNextMonth, handlePrevMonth, locale, monthYearFormat]);

  // Renderizar os dias da semana
  const renderWeekDays = useCallback(() => (
    <WeekdaysRow>
      {WEEKDAYS.map(day => (
        <WeekdayLabel key={day}>{day}</WeekdayLabel>
      ))}
    </WeekdaysRow>
  ), []);

  // Calcular os dias a serem renderizados
  const daysToRender = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  // Renderizar a grade de dias
  const renderDays = useCallback(() => {
    return (
      <DaysGrid>
        {daysToRender.map(day => {
          const isCurrentMonthDay = isSameMonth(day, currentMonth);
          const isSelectedDay = isSameDay(day, selectedDate);
          const isTodayDay = isToday(day);
          const dayEvents = getDayEvents(day);
          const hasEvents = dayEvents.length > 0;
          const isDisabled = isDateDisabled(day) || !isCurrentMonthDay;

          // Interface para as props do DayCell
          interface DayCellProps {
            isToday: boolean;
            isSelected: boolean;
            isOutsideMonth: boolean;
            disabled: boolean;
            onClick: () => void;
            children: React.ReactNode;
            [key: string]: any;
          }

          // Componente de célula do dia
          const DayCell = ({ 
            isToday, 
            isSelected, 
            isOutsideMonth, 
            disabled,
            onClick,
            children,
            ...props 
          }: DayCellProps) => (
            <button
              type="button"
              className={`
                day-cell
                ${isToday ? 'is-today' : ''}
                ${isSelected ? 'is-selected' : ''}
                ${isOutsideMonth ? 'is-outside-month' : ''}
                ${disabled ? 'is-disabled' : ''}
              `}
              disabled={disabled}
              onClick={onClick}
              {...props}
            >
              {children}
            </button>
          );

          return (
            <DayCell
              key={day.toString()}
              isToday={isTodayDay}
              isSelected={isSelectedDay}
              isOutsideMonth={!isCurrentMonthDay}
              disabled={isDisabled}
              onClick={() => handleDateClick(day)}
              aria-label={format(day, 'PPP', { locale })}
              aria-selected={isSelectedDay}
              aria-disabled={isDisabled}
            >
              <DayCellContent>
                {format(day, 'd')}
                {hasEvents && <EventIndicator title={`${dayEvents.length} eventos`} />}
              </DayCellContent>
            </DayCell>
          );
        })}
      </DaysGrid>
    );
  }, [
    currentMonth, 
    daysToRender, 
    getDayEvents, 
    handleDateClick, 
    isDateDisabled, 
    locale, 
    selectedDate
  ]);

  // Renderizar o rodapé do calendário
  const renderFooter = useCallback(() => {
    if (!showTodayButton) return null;
    
    return (
      <CalendarFooter>
        <TodayButton 
          onClick={handleGoToToday} 
          aria-label="Ir para hoje"
        >
          Hoje
        </TodayButton>
      </CalendarFooter>
    );
  }, [handleGoToToday, showTodayButton]);

  // Componente Container com fallback
  const CalendarContainer: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
    <div className={`calendar-container ${className || ''}`}>
      {children}
    </div>
  );

  return (
    <CalendarContainer className={className}>
      {renderHeader()}
      {renderWeekDays()}
      {renderDays()}
      {renderFooter()}
    </CalendarContainer>
  );
};

export default Calendar;