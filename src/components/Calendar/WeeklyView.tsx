import React, { useMemo } from 'react';
import styled from 'styled-components';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { ErrorBoundary } from '../ui/ErrorBoundary';

// Constants
const DAYS_IN_WEEK = 7;
const WEEKEND_DAYS = [0, 6]; // Sunday and Saturday

// Styled Components
const WeekViewContainer = styled.div`
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const WeekHeader = styled.div`
  display: flex;
  background-color: #2196f3;
  color: white;
`;

const DayHeaderCell = styled.div<{ isWeekend: boolean }>`
  flex: 1;
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: 500;
  background-color: ${props => props.isWeekend ? '#1976d2' : '#2196f3'};
`;

const WeekDaysContainer = styled.div`
  flex: 1;
  display: flex;
`;

const DayColumn = styled.div<{ isWeekend: boolean }>`
  flex: 1;
  padding: 0.5rem;
  background-color: ${props => props.isWeekend ? '#f5f5f5' : 'white'};
  min-height: 500px;
  border-right: 1px solid #e0e0e0;
  
  &:last-child {
    border-right: none;
  }
`;

const EmptyDayMessage = styled.div`
  color: #757575;
  font-style: italic;
  text-align: center;
  padding: 1rem 0;
`;

// Event styling by type
const getEventStyles = (eventType?: string) => {
  const eventStyles = {
    class: {
      backgroundColor: '#c8e6c9',
      color: '#2e7d32',
      borderLeft: '4px solid #2e7d32',
    },
    meeting: {
      backgroundColor: '#bbdefb',
      color: '#0d47a1',
      borderLeft: '4px solid #0d47a1',
    },
    deadline: {
      backgroundColor: '#ffccbc',
      color: '#bf360c',
      borderLeft: '4px solid #bf360c',
    },
    holiday: {
      backgroundColor: '#d1c4e9',
      color: '#4527a0',
      borderLeft: '4px solid #4527a0',
    },
    default: {
      backgroundColor: '#e1f5fe',
      color: '#0288d1',
      borderLeft: '4px solid #0288d1',
    },
  };

  return eventStyles[eventType as keyof typeof eventStyles] || eventStyles.default;
};

const EventItem = styled.div<{ eventType?: string }>`
  margin: 0.25rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  
  ${({ eventType }) => {
    const styles = getEventStyles(eventType);
    return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
      border-left: ${styles.borderLeft};
    `;
  }}
`;

const TimeLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  color: #666;
  margin-right: 0.5rem;
`;

// Types
interface WeeklyViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

/**
 * WeeklyView Component
 * 
 * Displays a week view of a calendar with events.
 * 
 * @param date - The current date
 * @param events - List of calendar events
 * @param onSelectEvent - Callback for when an event is selected
 */
const WeeklyView: React.FC<WeeklyViewProps> = ({ date, events, onSelectEvent }) => {
  // Calculate week days and associated events
  const weekDays = useMemo(() => {
    const days = [];
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      const currentDay = addDays(weekStart, i);
      const isWeekend = WEEKEND_DAYS.includes(currentDay.getDay());
      
      const dayEvents = events.filter((event) => {
        try {
          const eventDate = new Date(event.start);
          return isSameDay(eventDate, currentDay);
        } catch (error) {
          console.error(`Error filtering events for ${currentDay}:`, error);
          return false;
        }
      });
      
      days.push({
        day: currentDay,
        isWeekend,
        events: dayEvents
      });
    }
    
    return days;
  }, [date, events]);

  // Render an individual event
  const renderEvent = (event: CalendarEvent) => {
    try {
      return (
        <EventItem 
          key={event.id} 
          eventType={event.type}
          onClick={() => onSelectEvent(event)}
          aria-label={`Event: ${event.title} at ${format(new Date(event.start), 'HH:mm')}`}
        >
          <TimeLabel>
            {format(new Date(event.start), 'HH:mm')}
          </TimeLabel>
          {event.title}
        </EventItem>
      );
    } catch (error) {
      console.error(`Error rendering event ${event.id}:`, error);
      return (
        <EventItem 
          key={event.id} 
          eventType="default"
          onClick={() => onSelectEvent(event)}
        >
          Error displaying event
        </EventItem>
      );
    }
  };
  
  // Render a day column with its events
  const renderDayColumn = ({ day, isWeekend, events }: { day: Date, isWeekend: boolean, events: CalendarEvent[] }) => (
    <DayColumn key={day.toString()} isWeekend={isWeekend}>
      {events.length > 0 ? (
        events.map(event => renderEvent(event))
      ) : (
        <EmptyDayMessage>No events</EmptyDayMessage>
      )}
    </DayColumn>
  );
  
  // Render the week header
  const renderWeekHeader = () => (
    <WeekHeader>
      {weekDays.map(({ day, isWeekend }) => (
        <DayHeaderCell key={day.toString()} isWeekend={isWeekend}>
          {format(day, "EEE, d", { locale: ptBR })}
        </DayHeaderCell>
      ))}
    </WeekHeader>
  );
  
  return (
    <ErrorBoundary fallback={<div>Error loading weekly view</div>}>
      <WeekViewContainer data-testid="weekly-view">
        {renderWeekHeader()}
        <WeekDaysContainer>
          {weekDays.map(dayData => renderDayColumn(dayData))}
        </WeekDaysContainer>
      </WeekViewContainer>
    </ErrorBoundary>
  );
};

export default WeeklyView;