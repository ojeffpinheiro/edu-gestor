// components/Calendar/MonthlyView/MonthGrid.tsx
import React, { useMemo } from 'react';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { getDayEvents, getDaysInMonthGrid } from '../../../../utils/calendarUtils';
import { DayCell } from '../../Base/DayCell';
import { MonthGridContainer } from './styles';

interface MonthGridProps {
  date: Date;
  today: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onShowMoreEvents: (day: Date, count: number) => void;
}

export const MonthGrid: React.FC<MonthGridProps> = ({
  date,
  today,
  events,
  onSelectEvent,
  onShowMoreEvents
}) => {
  const daysInRange = useMemo(() => getDaysInMonthGrid(date), [date]);
  
  return (
    <MonthGridContainer>
      {daysInRange.map((day) => (
        <DayCell
          key={day.toString()}
          day={day}
          date={date}
          today={today}
          events={getDayEvents(day, events)}
          onSelectEvent={onSelectEvent}
          onShowMoreEvents={onShowMoreEvents}
        />
      ))}
    </MonthGridContainer>
  );
};