import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { format, isPast, isToday, isFuture } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaFilter, FaSearch, FaEdit, FaEye } from 'react-icons/fa';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { BaseCard, BaseButton, BaseInput } from '../../styles/baseComponents';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-third);
`;

const SearchInput = styled(BaseInput)`
  padding-left: 2.5rem;
  width: 100%;
`;

const FilterButton = styled(BaseButton)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background-color: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border)'};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-background-third)'};
  }
`;

const FilterSelect = styled.select`
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background-color: var(--color-input);
  color: var(--color-text);
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

const EventCard = styled(BaseCard)<{ status: 'past' | 'today' | 'future' }>`
  padding: var(--space-md);
  margin-bottom: var(--space-md);
  border-left: 4px solid 
    ${props => props.status === 'past' 
      ? 'var(--color-text-third)' 
      : props.status === 'today' 
        ? 'var(--color-primary)' 
        : 'var(--color-success)'};
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-sm);
`;

const EventTitle = styled.h3`
  color: var(--color-title-card);
  margin: 0;
  font-size: var(--font-size-lg);
`;

const EventType = styled.span<{ type: string }>`
  background-color: ${props => {
    switch (props.type) {
      case 'class': return 'var(--color-primary)';
      case 'meeting': return 'var(--color-info)';
      case 'deadline': return 'var(--color-warning)';
      case 'holiday': return 'var(--color-error)';
      default: return 'var(--color-text-third)';
    }
  }};
  color: white;
  font-size: var(--font-size-xs);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
  text-transform: uppercase;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin: var(--space-sm) 0;
  color: var(--color-text-secondary);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-sm);
`;

const EventDescription = styled.p`
  color: var(--color-text-secondary);
  margin: var(--space-sm) 0;
  font-size: var(--font-size-md);
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-md);
`;

const ActionButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
`;

const NoEventsMessage = styled.div`
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-secondary);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-lg);
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: var(--color-text-third);
  margin-bottom: var(--space-md);
`;

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