import React from 'react';
import styled from 'styled-components';
import { isSameDay, format } from 'date-fns';
import { useCalendar } from '../../contexts/CalendarContext';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import EventItem from './EventItem';

interface DayCellProps {
  day: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

const DayCellContainer = styled.div<{ isCurrentMonth: boolean; isToday: boolean }>`
  border: 1px solid #ddd;
  padding: 0.25rem;
  min-height: 100px;
  background-color: ${props => props.isCurrentMonth ? '#fff' : '#f9f9f9'};
  position: relative;
  
  ${props => props.isToday && `
    background-color: #e6f7ff;
    border: 1px solid #1890ff;
  `}
`;

const DayNumber = styled.div<{ isCurrentMonth: boolean }>`
  text-align: right;
  font-weight: bold;
  color: ${props => props.isCurrentMonth ? '#333' : '#aaa'};
  margin-bottom: 0.25rem;
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DayCell: React.FC<DayCellProps> = ({ day, isCurrentMonth, events }) => {
  const { currentDate } = useCalendar();
  const isToday = isSameDay(day, new Date());
  
  return (
    <DayCellContainer isCurrentMonth={isCurrentMonth} isToday={isToday}>
      <DayNumber isCurrentMonth={isCurrentMonth}>
        {format(day, 'd')}
      </DayNumber>
      <EventsList>
        {events.slice(0, 3).map(event => (
          <EventItem key={event.id} event={event} />
        ))}
        {events.length > 3 && (
          <small>+{events.length - 3} mais</small>
        )}
      </EventsList>
    </DayCellContainer>
  );
};

export default DayCell;