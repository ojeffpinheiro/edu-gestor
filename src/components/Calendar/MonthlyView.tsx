import React, { useMemo, useCallback } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  isSameMonth,
  isSameDay,
  isWeekend
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { StyleMonthlyView } from './styles';


// Constantes para melhorar a manutenção
const MAX_EVENTS_TO_SHOW = 3;
const WEEKDAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

/**
 * Interface de props para o componente MonthlyView
 */
interface MonthlyViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

/**
 * Componente de visualização mensal do calendário
 * Mostra um grid com os dias do mês e os eventos para cada dia
 */
const MonthlyView: React.FC<MonthlyViewProps> = ({ date, events, onSelectEvent }) => {
  const { 
    DayCell,
    DayNumber,
    EmptyDayMessage,
    EventItem,
    EventsContainer,
    MonthGrid,
    MonthViewContainer,
    MoreEventsLabel,
    WeekHeader,
    WeekdayCell
   } = StyleMonthlyView;

  // Data atual para destacar o dia de hoje
  const today = new Date();
  
  /**
   * Renderiza o cabeçalho da semana com os nomes dos dias
   */
  const renderWeekdayHeader = useCallback(() => {
    return WEEKDAY_NAMES.map((dayName, index) => {
      const isWeekendDay = index === 0 || index === 6;
      return (
        <WeekdayCell 
          key={index} 
          isWeekend={isWeekendDay}
          aria-label={dayName}
        >
          {dayName}
        </WeekdayCell>
      );
    });
  }, []);
  
  /**
   * Filtra os eventos para um dia específico
   * @param day - Dia para filtrar os eventos
   */
  const filterEventsByDay = useCallback((day: Date): CalendarEvent[] => {
    try {
      return events.filter((event) => {
        const eventDate = new Date(event.start);
        return isSameDay(eventDate, day);
      });
    } catch (error) {
      console.error(`Erro ao filtrar eventos para ${format(day, 'dd/MM/yyyy')}:`, error);
      return [];
    }
  }, [events]);
  
  /**
   * Renderiza o grid mensal com os dias e eventos
   */
  const renderMonthGrid = useMemo(() => {
    try {
      // Calcula o intervalo de dias para exibir
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
      
      // Obtém todos os dias no intervalo
      const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });
      
      return daysInRange.map((day) => {
        // Verifica se o dia está no mês atual
        const isCurrentMonth = isSameMonth(day, date);
        // Verifica se é um dia do fim de semana
        const isWeekendDay = isWeekend(day);
        // Verifica se é o dia atual
        const isTodayDate = isSameDay(day, today);
        
        // Filtra eventos para este dia
        const dayEvents = filterEventsByDay(day);
        
        // Determina se há mais eventos do que podemos mostrar
        const hasMoreEvents = dayEvents.length > MAX_EVENTS_TO_SHOW;
        const visibleEvents = hasMoreEvents 
          ? dayEvents.slice(0, MAX_EVENTS_TO_SHOW) 
          : dayEvents;
        
        return (
          <DayCell 
            key={day.toString()} 
            isCurrentMonth={isCurrentMonth} 
            isWeekend={isWeekendDay}
            aria-label={format(day, 'PPPP', { locale: ptBR })}
          >
            <DayNumber isToday={isTodayDate} aria-current={isTodayDate ? "date" : undefined}>
              {format(day, 'd')}
            </DayNumber>
            
            <EventsContainer>
              {visibleEvents.length > 0 ? (
                <>
                  {visibleEvents.map((event) => (
                    <EventItem 
                      key={event.id} 
                      eventType={event.type}
                      eventColor={event.color}
                      onClick={() => onSelectEvent(event)}
                      aria-label={`${event.title} - ${format(new Date(event.start), 'HH:mm')}`}
                    >
                      {event.title}
                    </EventItem>
                  ))}
                  
                  {hasMoreEvents && (
                    <MoreEventsLabel onClick={() => {
                      // Aqui poderia abrir um modal com todos os eventos do dia
                      alert(`Total de ${dayEvents.length} eventos para ${format(day, 'dd/MM/yyyy')}`);
                    }}>
                      +{dayEvents.length - MAX_EVENTS_TO_SHOW} mais
                    </MoreEventsLabel>
                  )}
                </>
              ) : (
                isCurrentMonth && (
                  <EmptyDayMessage>Sem eventos</EmptyDayMessage>
                )
              )}
            </EventsContainer>
          </DayCell>
        );
      });
    } catch (error) {
      console.error('Erro ao renderizar grade mensal:', error);
      return (
        <div className="error-message">
          Erro ao carregar visualização mensal. Recarregue a página.
        </div>
      );
    }
  }, [date, today, filterEventsByDay, onSelectEvent]);
  
  return (
    <ErrorBoundary fallback={
      <div className="monthly-view-error">
        <h3>Erro ao carregar visualização mensal</h3>
        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
      </div>
    }>
      <MonthViewContainer>
        <WeekHeader>
          {renderWeekdayHeader()}
        </WeekHeader>
        <MonthGrid>
          {renderMonthGrid}
        </MonthGrid>
      </MonthViewContainer>
    </ErrorBoundary>
  );
};

export default MonthlyView;