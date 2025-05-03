import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCalendar } from '../../../contexts/CalendarContext';
import { CalendarEvent } from '../../../utils/types/CalendarEvent';
import { CalendarBase } from '../Base/CalendarBase';
import EventItem from '../Base/EventItem';

import {
  WeekContainer,
  WeekHeader,
  WeekdayHeader,
  DayNumber,
  WeekGrid,
  DayColumn
} from './styles';

interface WeeklyViewProps {
  onSelectEvent: (event: CalendarEvent) => void;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ onSelectEvent }) => {
  const { currentDate, filterEvents, onPrevWeek, onNextWeek, onToday } = useCalendar();
  const weekStart = startOfWeek(currentDate, { locale: ptBR });

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const events = filterEvents({});

  return (
    <CalendarBase
      title=''
      onPrev={onPrevWeek}
      onNext={onNextWeek}
      onToday={onToday}
    >
      <WeekContainer>
        <WeekHeader>
          {days.map(day => (
            <WeekdayHeader key={day.toString()} isWeekend={[0, 6].includes(day.getDay())}>
              {format(day, 'EEE')}
              <DayNumber isToday={isSameDay(day, new Date())}>
                {format(day, 'd')}
              </DayNumber>
            </WeekdayHeader>
          ))}
        </WeekHeader>

        <WeekGrid>
          {days.map(day => {
            const dayEvents = events.filter(event =>
              isSameDay(event.start, day) ||
              (event.isAllDay && isSameDay(event.start, day))
            );
            const isWeekend = [0, 6].includes(day.getDay());

            return (
              <DayColumn key={day.toString()} isWeekend={isWeekend}>
                {dayEvents.map(event => (
                  <EventItem 
                    key={event.id} 
                    event={event}
                    onSelectEventClick={onSelectEvent} />
                ))}
              </DayColumn>
            );
          })}
        </WeekGrid>
      </WeekContainer>
    </CalendarBase>
  );
};

export default WeeklyView;