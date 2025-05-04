import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaFilter } from 'react-icons/fa';
import { useCalendar } from '../../../contexts/CalendarContext';
import { CalendarEvent, CalendarViewType, EventType } from '../../../utils/types/CalendarEvent';
import { ErrorBoundary } from '../../shared/ErrorBoundary';
import { constants, eventTypeColors } from '../../../utils/consts';
import {
  AgendaContainer,
  Header,
  Title,
  Controls,
  SearchBar,
  SearchInput,
  SearchIcon,
  FilterButton,
  ViewToggle,
  ViewButton,
  FilterPanel,
  FilterTitle,
  FilterSection,
  FilterOption,
  EventsContainer,
  EventsList,
  DayGroup,
  DayDate,
  DayLine,
  DayHeader,
  NoEvents
} from './styles';
import EventItemDetailed from '../Base/EventItemDetailed';
import { ptBR } from 'date-fns/locale';

const ScheduleView: React.FC = () => {
  const { filterEvents, onSelectEvent } = useCalendar();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<CalendarViewType>('week');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);

  const events = filterEvents({});

  // Group events by day
  const groupEventsByDay = (events: CalendarEvent[]) => {
    const grouped: Record<string, CalendarEvent[]> = {};

    events.forEach((event) => {
      const dateKey = format(new Date(event.start), 'yyyy-MM-dd');
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });

    return grouped;
  };

  useEffect(() => {
    let result = [...events];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          (event.description && event.description.toLowerCase().includes(term)) ||
          (event.location && event.location.toLowerCase().includes(term))
      );
    }

    if (selectedTypes.length > 0) {
      result = result.filter((event) => selectedTypes.includes(event.type));
    }

    result.sort((a, b) => {
      const dateA = new Date(a.start).getTime();
      const dateB = new Date(b.start).getTime();
      return dateA - dateB;
    });

    if (JSON.stringify(result) !== JSON.stringify(filteredEvents)) {
      setFilteredEvents(result);
    }
  }, [events, searchTerm, selectedTypes, filteredEvents]);

  const handleTypeToggle = (type: EventType) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
  };

  const groupedEvents = groupEventsByDay(filteredEvents);

  return (
    <ErrorBoundary fallback={<div>Erro ao carregar a agenda</div>}>
      <AgendaContainer>
        <Header>
          <Title>Agenda</Title>
          <Controls>
            <SearchBar>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Pesquisar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>

            <FilterButton onClick={() => setFilterOpen(!filterOpen)}>
              <FaFilter size={14} />
              Filtros
            </FilterButton>

            <ViewToggle>
              <ViewButton
                active={viewType === 'day'}
                onClick={() => setViewType('day')}
              >
                Dia
              </ViewButton>
              <ViewButton
                active={viewType === 'week'}
                onClick={() => setViewType('week')}
              >
                Semana
              </ViewButton>
              <ViewButton
                active={viewType === 'month'}
                onClick={() => setViewType('month')}
              >
                Mês
              </ViewButton>
            </ViewToggle>

            <FilterPanel isOpen={filterOpen}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: constants.spacing.md
              }}>
                <FilterTitle>Filtrar por:</FilterTitle>
                <button
                  onClick={clearFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-primary)',
                    fontSize: constants.fontSize.sm
                  }}
                >
                  Limpar
                </button>
              </div>

              <FilterSection>
                <FilterTitle>Tipo de Evento</FilterTitle>
                {eventTypeColors.map(({ type, name }) => (
                  <FilterOption key={type}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      style={{
                        accentColor: 'var(--color-primary)',
                        cursor: 'pointer'
                      }}
                    />
                    {name}
                  </FilterOption>
                ))}
              </FilterSection>
            </FilterPanel>
          </Controls>
        </Header>

        <EventsContainer>
  {Object.keys(groupedEvents).length > 0 ? (
    Object.entries(groupedEvents).map(([date, dayEvents]) => (
      <DayGroup key={date}>
        <DayHeader>
          <DayDate>
            <span>{format(new Date(date), 'EEE', { locale: ptBR })}</span>
            <span>{format(new Date(date), 'd')}</span>
          </DayDate>
          <DayLine />
        </DayHeader>
        
        <EventsList>
          {dayEvents.map((event) => (
            <EventItemDetailed 
              key={event.id}
              event={event}
              onClick={(e) => {
                e.stopPropagation();
                onSelectEvent?.(event);
              }}
            />
          ))}
        </EventsList>
      </DayGroup>
    ))
  ) : (
    <NoEvents>Nenhum evento encontrado</NoEvents>
  )}
</EventsContainer>
      </AgendaContainer>
    </ErrorBoundary>
  );
};

export default ScheduleView;