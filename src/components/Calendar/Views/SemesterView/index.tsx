import React, { useState } from 'react';
import { addDays, eachMonthOfInterval, format, getDaysInMonth, getYear, isSameDay, isSameMonth, startOfMonth } from 'date-fns';

import { ptBR } from 'date-fns/locale';
import { useCalendar } from '../../../../contexts/CalendarContext';
import { ErrorBoundary } from '../../../shared/ErrorBoundary';
import CalendarBase from '../../Base/CalendarBase';
import { EventType } from '../../../../utils/types/CalendarEvent';

import { 
  ActiveFiltersBadge, DayCell, 
  DaysGrid, EventItem, FilterButton, 
  FiltersContainer, 
  MonthHeader, PopupContainer, 
  PopupHeader, PopupTitle, WeekdayCell, WeekdayHeader } from '../AnnualView/styles';
import { constants, EventTypeConfig } from '../../../../utils/consts';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { MonthContainer, MonthsGrid, 
  NavigationButton, 
  SemesterContainer, SemesterHeader } from './styles';
import { CloseButton } from '../../../../styles/buttons';


const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface SemesterViewProps {
  eventTypes: EventTypeConfig[];
}

const SemesterView: React.FC<SemesterViewProps> = ({ eventTypes }) => {
  const { currentDate, filterEvents, onSelectEvent, onPrevYear, onToday, onNextYear } = useCalendar();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<EventType, boolean>>(
    eventTypes.reduce((acc, type) => ({ ...acc, [type.id]: true }), {} as Record<EventType, boolean>)
  );
  const today = new Date();
  const currentYear = getYear(currentDate);

  // Definir os intervalos dos semestres
  const firstSemester = eachMonthOfInterval({
    start: new Date(currentYear, 0, 1), // Janeiro
    end: new Date(currentYear, 5, 30)   // Junho
  });

  const secondSemester = eachMonthOfInterval({
    start: new Date(currentYear, 6, 1),  // Julho
    end: new Date(currentYear, 11, 31)   // Dezembro
  });

  const [activeSemester, setActiveSemester] = useState<number>(
    isSameMonth(currentDate, today) ? 
      (today.getMonth() < 6 ? 1 : 2) : 
      (currentDate.getMonth() < 6 ? 1 : 2)
  );

  const toggleFilter = (typeId: EventType) => {
    setActiveFilters(prev => ({
      ...prev,
      [typeId]: !prev[typeId]
    }));
  };

  const countActiveFilters = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  const getFilteredEvents = () => {
    const activeTypes = Object.entries(activeFilters)
      .filter(([_, isActive]) => isActive)
      .map(([typeId]) => typeId as EventType);

    if (activeTypes.length === 0) return [];

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

  return (
    <ErrorBoundary fallback={
      <div className="semester-view-error">
        <h3>Erro ao carregar visualização semestral</h3>
        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
      </div>
    }>
      <CalendarBase
        title={`${currentYear}`}
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

        <SemesterContainer>
          <SemesterHeader>
            <NavigationButton 
              onClick={() => setActiveSemester(1)} 
              isActive={activeSemester === 1}
            >
              1º Semestre
            </NavigationButton>
            <NavigationButton 
              onClick={() => setActiveSemester(2)} 
              isActive={activeSemester === 2}
            >
              2º Semestre
            </NavigationButton>
          </SemesterHeader>

          <MonthsGrid>
            {(activeSemester === 1 ? firstSemester : secondSemester).map(month => (
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
        </SemesterContainer>

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

export default SemesterView;