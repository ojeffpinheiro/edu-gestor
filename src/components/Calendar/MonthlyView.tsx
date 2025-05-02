import React from 'react';
import styled from 'styled-components';
import { useCalendar } from '../../contexts/CalendarContext';
import { startOfWeek, addDays, isSameMonth, isSameDay, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DayCell from './DayCell';
import { CalendarEvent } from '../../utils/types/CalendarEvent';

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(6, 1fr);
  height: 100%;
`;

const WeekdayHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`;

interface MonthlyViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ date, events, onSelectEvent }) => {
  const { currentDate } = useCalendar();
  
  const monthStart = startOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { locale: ptBR });
  
  const days = [];
  let currentDay = startDate;
  
  for (let i = 0; i < 42; i++) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  return (
    <MonthGrid>
      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
        <WeekdayHeader key={day}>{day}</WeekdayHeader>
      ))}
      
      {days.map(day => {
        const dayEvents = events.filter(event => 
          isSameDay(event.start, day) || 
          (event.isAllDay && isSameDay(event.start, day))
        );
        
        return (
          <DayCell 
            key={day.toString()}
            day={day}
            isCurrentMonth={isSameMonth(day, monthStart)}
            events={dayEvents}
          />
        );
      })}
    </MonthGrid>
  );
};

export default MonthlyView;