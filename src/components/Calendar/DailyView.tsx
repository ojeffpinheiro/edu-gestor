import React, { useMemo } from 'react';
import styled from 'styled-components';
import { format, addHours, startOfDay, isSameHour } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { ErrorBoundary } from '../ui/ErrorBoundary';

// Constants
const HOURS_IN_DAY = 24;

// Styled Components
const DayViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  background-color: #2196f3;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
`;

const HoursContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #bdbdbd;
    border-radius: 3px;
  }
`;

const HourRow = styled.div`
  display: flex;
  min-height: 60px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const HourLabel = styled.div`
  width: 80px;
  padding: 0.5rem;
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  border-right: 1px solid #e0e0e0;
  background-color: #fafafa;
`;

const EventsContainer = styled.div`
  flex: 1;
  padding: 0.25rem;
  position: relative;
`;

const EmptyHourMessage = styled.div`
  color: #bdbdbd;
  font-style: italic;
  font-size: 0.8rem;
  padding: 0.5rem;
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
  margin: 0.25rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  ${({ eventType }) => {
    const styles = getEventStyles(eventType);
    return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
      border-left: ${styles.borderLeft};
    `;
  }}
  
  &:hover {
    filter: brightness(0.95);
  }
`;

// Types
interface DailyViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

interface HourData {
  hour: Date;
  events: CalendarEvent[];
}

/**
 * DailyView Component
 * 
 * Displays a daily calendar view with hourly slots and events.
 * 
 * @param date - The current date to display
 * @param events - List of calendar events
 * @param onSelectEvent - Callback for when an event is selected
 */
const DailyView: React.FC<DailyViewProps> = ({ date, events, onSelectEvent }) => {
  // Calculate hours of the day and associated events
  const hoursData: HourData[] = useMemo(() => {
    const hours = [];
    const dayStart = startOfDay(date);
    
    for (let i = 0; i < HOURS_IN_DAY; i++) {
      const currentHour = addHours(dayStart, i);
      
      try {
        const hourEvents = events.filter((event) => {
          const eventStart = new Date(event.start);
          return isSameHour(eventStart, currentHour);
        });
        
        hours.push({
          hour: currentHour,
          events: hourEvents,
        });
      } catch (error) {
        console.error(`Error filtering events for hour ${i}:`, error);
        hours.push({
          hour: currentHour,
          events: [],
        });
      }
    }
    
    return hours;
  }, [date, events]);

  // Render events for a given hour
  const renderEvents = (hourEvents: CalendarEvent[]) => {
    if (hourEvents.length === 0) {
      return <EmptyHourMessage>No events</EmptyHourMessage>;
    }
    
    return hourEvents.map((event) => (
      <EventItem 
        key={event.id} 
        eventType={event.type}
        onClick={() => onSelectEvent(event)}
        aria-label={`Event: ${event.title}`}
        title={event.title}
      >
        {event.title}
      </EventItem>
    ));
  };
  
  // Render an hour row with its events
  const renderHourRow = ({ hour, events }: HourData) => (
    <HourRow key={hour.toString()} data-hour={format(hour, 'HH')}>
      <HourLabel>{format(hour, 'HH:mm')}</HourLabel>
      <EventsContainer>
        {renderEvents(events)}
      </EventsContainer>
    </HourRow>
  );
  
  // Format the day header
  const formattedDayHeader = format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  
  return (
    <ErrorBoundary fallback={<div>Error loading daily view</div>}>
      <DayViewContainer data-testid="daily-view">
        <DayHeader>
          {formattedDayHeader}
        </DayHeader>
        <HoursContainer>
          {hoursData.map(hourData => renderHourRow(hourData))}
        </HoursContainer>
      </DayViewContainer>
    </ErrorBoundary>
  );
};

export default DailyView;