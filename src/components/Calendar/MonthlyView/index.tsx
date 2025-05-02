import React from 'react';
import { format, startOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useCalendar } from '../../../contexts/CalendarContext';

import { formatDate } from '../../../utils/dateFormatter';

import { CalendarGrid } from '../Base/CalendarGrid';
import { CalendarBase } from '../Base/CalendarBase';
import { EventItem } from '../Base/EventItem';

import { DayCell, DayNumber, MoreEvents, WeekdayHeader } from './styles';

const MonthView: React.FC = () => {
  const { currentDate, filterEvents, onPrevMonth, onNextMonth, onToday } = useCalendar();
  
  const monthStart = startOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { locale: ptBR });
  
  const days = [];
  let currentDay = startDate;
  
  for (let i = 0; i < 42; i++) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  const events = filterEvents({});

  return (
    <CalendarBase
      title={format(currentDate, 'MMMM yyyy', { locale: ptBR })}
      onPrev={onPrevMonth}
      onNext={onNextMonth}
      onToday={onToday}
    >
      <CalendarGrid columns={7}>
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
              isCurrentMonth={isSameMonth(day, monthStart)}
            >
              <DayNumber>{formatDate(day, 'd')}</DayNumber>
              {dayEvents.slice(0, 3).map(event => (
                <EventItem key={event.id} event={event} compact />
              ))}
              {dayEvents.length > 3 && (
                <MoreEvents>+{dayEvents.length - 3} mais</MoreEvents>
              )}
            </DayCell>
          );
        })}
      </CalendarGrid>
    </CalendarBase>
  );
};

export default MonthView;