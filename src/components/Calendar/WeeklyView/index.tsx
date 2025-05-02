import React from 'react';
import { format, startOfWeek, endOfWeek, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCalendar } from '../../../contexts/CalendarContext';
import { CalendarBase } from '../Base/CalendarBase';
import {
  WeekContainer,
  WeekHeader,
  DayColumn,
  WeekdayHeader,
  DayNumber,
  WeekGrid,
  EmptyDayMessage
} from './styles';
import EventItem from '../EventItem';

const WeeklyView: React.FC = () => {
  const { currentDate, filterEvents, onPrevWeek, onNextWeek, onToday } = useCalendar();
  const weekStart = startOfWeek(currentDate, { locale: ptBR });

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const events = filterEvents({});

  return (
    <CalendarBase
      title={`Semana de ${format(startOfWeek(currentDate), 'dd/MM/yyyy')} a ${format(endOfWeek(currentDate), 'dd/MM/yyyy')}`}
      onPrev={onPrevWeek}
      onNext={onNextWeek}
      onToday={onToday}
    >
      <WeekContainer>
        <WeekHeader>
          {days.map(day => (
            <WeekdayHeader key={day.toString()} isWeekend={[0, 6].includes(day.getDay())}>
              {format(day, 'EEE')}
              <DayNumber>{format(day, 'd')}</DayNumber>
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
                  <EventItem key={event.id} event={event} />
                ))}
                {dayEvents.length === 0 && (
                  <EmptyDayMessage>Nenhum evento</EmptyDayMessage>
                )}
              </DayColumn>
            );
          })}
        </WeekGrid>
      </WeekContainer>
    </CalendarBase>
  );
};

export default WeeklyView;