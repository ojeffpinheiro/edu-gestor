import React, { useMemo } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  isSameMonth,
  isSameDay,
  isWeekend,
  format
} from 'date-fns';
import { CalendarEvent } from '../../../utils/types/CalendarEvent';
import { DayCell } from '../Base/DayCell';
import styled from 'styled-components';

interface MonthGridProps {
  date: Date;
  today: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onShowMoreEvents: (day: Date, count: number) => void;
}

export const MonthGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
`;

export const MonthGrid: React.FC<MonthGridProps> = ({
  date,
  today,
  events,
  onSelectEvent,
  onShowMoreEvents
}) => {
  const daysInRange = useMemo(() => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [date]);

  const filterEventsByDay = (day: Date): CalendarEvent[] => {
    try {
      return events.filter((event) => {
        const eventDate = new Date(event.start);
        return isSameDay(eventDate, day);
      });
    } catch (error) {
      console.error(`Erro ao filtrar eventos para ${format(day, 'dd/MM/yyyy')}:`, error);
      return [];
    }
  };

  return (
    <MonthGridContainer>
      {daysInRange.map((day) => {
        const isCurrentMonth = isSameMonth(day, date);
        const isWeekendDay = isWeekend(day);
        const isTodayDate = isSameDay(day, today);
        const dayEvents = filterEventsByDay(day);

        return (
          <DayCell
            key={day.toString()}
            day={day}
            isCurrentMonth={isCurrentMonth}
            isWeekend={isWeekendDay}
            isToday={isTodayDate}
            events={dayEvents}
            onSelectEvent={onSelectEvent}
            onShowMoreEvents={onShowMoreEvents}
          />
        );
      })}
    </MonthGridContainer>
  );
};