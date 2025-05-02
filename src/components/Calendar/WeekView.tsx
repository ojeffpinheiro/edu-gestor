import React from 'react';
import styled from 'styled-components';
import { useCalendar } from '../../contexts/CalendarContext';
import { format, addDays, startOfWeek, isSameDay, isSameWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import EventItem from './EventItem';

const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #ddd;
`;

const WeekdayHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background-color: #f0f0f0;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
`;

const DayColumn = styled.div<{ isCurrentWeek: boolean; isToday: boolean }>`
  border-right: 1px solid #ddd;
  padding: 0.25rem;
  background-color: ${props => props.isToday ? '#e6f7ff' : 'white'};
  ${props => !props.isCurrentWeek && 'background-color: #f9f9f9;'}
  &:last-child {
    border-right: none;
  }
`;

const DayHeader = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const WeekView: React.FC = () => {
  const { currentDate, filterEvents } = useCalendar();
  const weekStart = startOfWeek(currentDate, { locale: ptBR });
  
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }

  const events = filterEvents({});
  const currentWeek = isSameWeek(currentDate, weekStart, { locale: ptBR });

  return (
    <WeekContainer>
      <WeekHeader>
        {days.map(day => (
          <WeekdayHeader key={day.toString()}>
            {format(day, 'EEEE', { locale: ptBR })}
          </WeekdayHeader>
        ))}
      </WeekHeader>
      
      <WeekGrid>
        {days.map(day => {
          const dayEvents = events.filter(event => 
            isSameDay(event.start, day) || 
            (event.isAllDay && isSameDay(event.start, day))
          );
          const isToday = isSameDay(day, new Date());
          
          return (
            <DayColumn 
              key={day.toString()} 
              isCurrentWeek={currentWeek}
              isToday={isToday}
            >
              <DayHeader>
                {format(day, 'd')}
              </DayHeader>
              <EventsContainer>
                {dayEvents.map(event => (
                  <EventItem key={event.id} event={event} />
                ))}
              </EventsContainer>
            </DayColumn>
          );
        })}
      </WeekGrid>
    </WeekContainer>
  );
};

export default WeekView;