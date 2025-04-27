import React, { useMemo } from 'react';

import { format, addHours, startOfDay, isSameHour } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { ErrorBoundary } from '../shared/ErrorBoundary';

import { 
  EmptyHourMessage, 
  EventItem, 
  DayHeader,
  DayViewContainer,
  EventsContainer,
  HourLabel,
  HourRow,
  HoursContainer
 } from './DailyViewStyle';

// Constants
const HOURS_IN_DAY = 24;

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