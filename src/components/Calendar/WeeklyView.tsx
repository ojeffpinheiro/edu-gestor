import React, { useMemo } from 'react';

import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import {
  DayColumn,
  DayHeaderCell,
  EmptyDayMessage,
  EventItem,
  TimeLabel,
  WeekDaysContainer,
  WeekHeader,
  WeekViewContainer
} from './WeeklyViewStyle'

// Constants
const DAYS_IN_WEEK = 7;
const WEEKEND_DAYS = [0, 6]; // Sunday and Saturday

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