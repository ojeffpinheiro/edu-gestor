import React, { useState, useMemo } from 'react';

import { format, isPast, isToday, isFuture } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaFilter, FaSearch, FaEdit, FaEye } from 'react-icons/fa';
import { CalendarEvent } from '../../types/academic/CalendarEvent';

import {
  ActionButton,
  ActionButtons,
  EmptyStateIcon,
  EventCard,
  EventDescription,
  EventHeader,
  EventTitle,
  EventMeta,
  EventType,
  FilterButton,
  FilterSelect,
  FiltersContainer,
  ListContainer,
  MetaItem,
  SearchInput,
  NoEventsMessage,
  SearchContainer,
  SearchIcon
} from './EventListStyle'

interface EventListProps {
  events: CalendarEvent[];
  onViewEvent?: (event: CalendarEvent) => void;
  onEditEvent?: (event: CalendarEvent) => void;
}

type TimeFilter = 'all' | 'past' | 'today' | 'upcoming';
type EventTypeFilter = 'all' | 'class' | 'meeting' | 'deadline' | 'holiday' | 'other';

const EventList: React.FC<EventListProps> = ({ 
  events, 
  onViewEvent, 
  onEditEvent 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [typeFilter, setTypeFilter] = useState<EventTypeFilter>('all');

  // Apply filters and search to events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Apply search filter
      const matchesSearch = 
        !searchTerm || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (!matchesSearch) return false;
      
      // Apply time filter
      const eventStart = typeof event.start === 'string' ? new Date(event.start) : event.start;
      
      switch (timeFilter) {
        case 'past':
          if (!isPast(eventStart) || isToday(eventStart)) return false;
          break;
        case 'today':
          if (!isToday(eventStart)) return false;
          break;
        case 'upcoming':
          if (!isFuture(eventStart) && !isToday(eventStart)) return false;
          break;
      }
      
      // Apply type filter
      if (typeFilter !== 'all' && event.type !== typeFilter) return false;
      
      return true;
    }).sort((a, b) => {
      const dateA = typeof a.start === 'string' ? new Date(a.start) : a.start;
      const dateB = typeof b.start === 'string' ? new Date(b.start) : b.start;
      return dateA.getTime() - dateB.getTime();
    });
  }, [events, searchTerm, timeFilter, typeFilter]);

  const getEventStatus = (eventDate: Date): 'past' | 'today' | 'future' => {
    if (isToday(eventDate)) return 'today';
    if (isPast(eventDate)) return 'past';
    return 'future';
  };

  const getEventTypeLabel = (type: string): string => {
    switch (type) {
      case 'class': return 'Aula';
      case 'meeting': return 'Reunião';
      case 'deadline': return 'Prazo';
      case 'holiday': return 'Feriado';
      default: return 'Outro';
    }
  };

  const renderEventDate = (start: Date, end: Date, isAllDay: boolean): string => {
    if (isAllDay) {
      return format(start, "dd 'de' MMMM, yyyy", { locale: ptBR });
    }
    
    if (format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd')) {
      return `${format(start, "dd 'de' MMMM, yyyy", { locale: ptBR })} • ${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
    }
    
    return `${format(start, "dd 'de' MMMM", { locale: ptBR })} - ${format(end, "dd 'de' MMMM, yyyy", { locale: ptBR })}`;
  };

  return (
    <ListContainer>
      <FiltersContainer>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            placeholder="Pesquisar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
          <FilterButton 
            active={timeFilter === 'all'} 
            onClick={() => setTimeFilter('all')}
          >
            <FaFilter /> Todos
          </FilterButton>
          <FilterButton 
            active={timeFilter === 'upcoming'} 
            onClick={() => setTimeFilter('upcoming')}
          >
            Próximos
          </FilterButton>
          <FilterButton 
            active={timeFilter === 'today'} 
            onClick={() => setTimeFilter('today')}
          >
            Hoje
          </FilterButton>
          <FilterButton 
            active={timeFilter === 'past'} 
            onClick={() => setTimeFilter('past')}
          >
            Passados
          </FilterButton>
        </div>
        
        <FilterSelect 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value as EventTypeFilter)}
        >
          <option value="all">Todos os tipos</option>
          <option value="class">Aulas</option>
          <option value="meeting">Reuniões</option>
          <option value="deadline">Prazos</option>
          <option value="holiday">Feriados</option>
          <option value="other">Outros</option>
        </FilterSelect>
      </FiltersContainer>
      
      {filteredEvents.length > 0 ? (
        filteredEvents.map(event => {
          const startDate = typeof event.start === 'string' ? new Date(event.start) : event.start;
          const endDate = typeof event.end === 'string' ? new Date(event.end) : event.end;
          const status = getEventStatus(startDate);
          
          return (
            <EventCard key={event.id} status={status}>
              <EventHeader>
                <EventTitle>{event.title}</EventTitle>
                <EventType type={event.type}>{getEventTypeLabel(event.type)}</EventType>
              </EventHeader>
              
              <EventMeta>
                <MetaItem>
                  <FaCalendarAlt />
                  {renderEventDate(startDate, endDate, event.isAllDay || false)}
                </MetaItem>
                {!event.isAllDay && (
                  <MetaItem>
                    <FaClock />
                    {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                  </MetaItem>
                )}
                {event.location && (
                  <MetaItem>
                    <FaMapMarkerAlt />
                    {event.location}
                  </MetaItem>
                )}
              </EventMeta>
              
              {event.description && (
                <EventDescription>
                  {event.description.length > 150 
                    ? `${event.description.substring(0, 150)}...` 
                    : event.description}
                </EventDescription>
              )}
              
              <ActionButtons>
                {onViewEvent && (
                  <ActionButton onClick={() => onViewEvent(event)}>
                    <FaEye /> Visualizar
                  </ActionButton>
                )}
                {onEditEvent && (
                  <ActionButton onClick={() => onEditEvent(event)}>
                    <FaEdit /> Editar
                  </ActionButton>
                )}
              </ActionButtons>
            </EventCard>
          );
        })
      ) : (
        <NoEventsMessage>
          <EmptyStateIcon>
            <FaCalendarAlt />
          </EmptyStateIcon>
          <p>Nenhum evento encontrado com os filtros atuais.</p>
        </NoEventsMessage>
      )}
    </ListContainer>
  );
};

export default EventList;