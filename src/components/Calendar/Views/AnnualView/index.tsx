import React, { useState } from 'react';
import {
  format,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
  isSameDay,
  getDaysInMonth,
  startOfMonth,
  addDays
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCalendar } from '../../../../contexts/CalendarContext';
import { ErrorBoundary } from '../../../shared/ErrorBoundary';
import CalendarBase from '../../Base/CalendarBase';
import { FaTimes, FaFilter } from 'react-icons/fa';
import { constants, EventTypeConfig } from '../../../../utils/consts';
import { EventType } from '../../../../utils/types/CalendarEvent';

import {
  DayCell,
  MonthsGrid,
  MonthContainer,
  MonthHeader,
  DaysGrid,
  WeekdayHeader,
  WeekdayCell,
  PopupContainer,
  EventItem,
  PopupHeader,
  PopupTitle,
  CloseButton,
  FiltersContainer,
  FilterButton,
  ActiveFiltersBadge
} from './styles';

const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface AnnualViewProps {
  eventTypes: EventTypeConfig[];
}

const AnnualView: React.FC<AnnualViewProps> = ({ eventTypes }) => {
  const { currentDate, filterEvents, onSelectEvent, onPrevYear, onToday, onNextYear } = useCalendar();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<EventType, boolean>>(
    eventTypes.reduce((acc, type) => ({ ...acc, [type.id]: true }), {} as Record<EventType, boolean>)
  );
  const today = new Date();

  const months = eachMonthOfInterval({
    start: startOfYear(currentDate),
    end: endOfYear(currentDate)
  });

  const toggleFilter = (typeId: EventType) => {
    setActiveFilters(prev => ({
      ...prev,
      [typeId]: !prev[typeId]
    }));
  };

  const getFilteredEvents = () => {
    const activeTypes = Object.entries(activeFilters)
      .filter(([_, isActive]) => isActive)
      .map(([typeId]) => typeId as EventType);

    // Se não há filtros selecionados, retorna todos os eventos
    if (activeTypes.length === 0) return [];

    // Filtra os eventos para incluir apenas os tipos ativos
    return filterEvents({}).filter(event =>
      activeTypes.includes(event.type)
    );
  };

  const filteredEvents = getFilteredEvents();

  const getDayEvents = (day: Date) => {
    return filteredEvents.filter(event =>
      isSameDay(new Date(event.start), day)
    );
  };

  const getMainEventColor = (events: any[]) => {
    if (events.length === 0) return undefined;
    const eventType = eventTypes.find(et => et.type === events[0].type);
    return eventType?.color;
  };

  const renderMonth = (month: Date) => {
    const monthStart = startOfMonth(month);
    const daysInMonth = getDaysInMonth(month);
    const startDay = monthStart.getDay();

    const days = [];

    // Dias vazios no início do mês
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const day = addDays(monthStart, i - 1);
      const dayEvents = getDayEvents(day);
      const eventColor = getMainEventColor(dayEvents);
      const isToday = isSameDay(day, today);

      days.push(
        <DayCell
          key={day.toString()}
          hasEvents={dayEvents.length > 0}
          isCurrentMonth={true}
          isToday={isToday}
          eventColor={eventColor}
          onClick={() => setSelectedDay(day)}
        >
          {i}
        </DayCell>
      );
    }

    return days;
  };

  const countActiveFilters = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  return (
    <ErrorBoundary fallback={
      <div className="annual-view-error">
        <h3>Erro ao carregar visualização anual</h3>
        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
      </div>
    }>
      <CalendarBase
        title={format(currentDate, "yyyy", { locale: ptBR })}
        onPrev={onPrevYear}
        onNext={onNextYear}
        onToday={onToday}
      >
        <FiltersContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
            <FaFilter />
            <span>Filtrar:</span>
            {countActiveFilters() > 0 && (
              <ActiveFiltersBadge>
                {countActiveFilters()} ativo{countActiveFilters() !== 1 ? 's' : ''}
              </ActiveFiltersBadge>
            )}
          </div>

          {eventTypes.map(({ type, color, name }) => (
            <FilterButton
              key={type}
              color={color}
              isActive={activeFilters[type]}
              onClick={() => toggleFilter(type)}
            >
              {name}
            </FilterButton>
          ))}
        </FiltersContainer>

        <MonthsGrid>
          {months.map(month => (
            <MonthContainer key={month.toString()}>
              <MonthHeader>
                {format(month, "MMMM", { locale: ptBR })}
              </MonthHeader>

              <WeekdayHeader>
                {weekdays.map((day, index) => (
                  <WeekdayCell key={index}>{day}</WeekdayCell>
                ))}
              </WeekdayHeader>

              <DaysGrid>
                {renderMonth(month)}
              </DaysGrid>
            </MonthContainer>
          ))}
        </MonthsGrid>

        {selectedDay && (
          <PopupContainer visible={!!selectedDay}>
            <PopupHeader>
              <PopupTitle>
                {format(selectedDay, 'PPPP', { locale: ptBR })}
              </PopupTitle>
              <CloseButton onClick={() => setSelectedDay(null)}>
                <FaTimes />
              </CloseButton>
            </PopupHeader>

            {getDayEvents(selectedDay).length > 0 ? (
              getDayEvents(selectedDay).map(event => (
                <EventItem
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  style={{
                    borderLeft: `4px solid ${eventTypes.find(c => c.type === event.type)?.color || constants.colors.primary}`
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                  {!event.isAllDay && (
                    <div>
                      {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                    </div>
                  )}
                  {event.location && <div>Local: {event.location}</div>}
                </EventItem>
              ))
            ) : (
              <p>Nenhum evento neste dia</p>
            )}
          </PopupContainer>
        )}
      </CalendarBase>
    </ErrorBoundary>
  );
};

export default AnnualView;