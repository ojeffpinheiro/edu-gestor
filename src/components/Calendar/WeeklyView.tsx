import React from 'react';
import styled from 'styled-components';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';

const WeekViewContainer = styled.div`
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const WeekHeader = styled.div`
  display: flex;
  background-color: #2196f3;
  color: white;
`;

const DayHeaderCell = styled.div<{ isWeekend: boolean }>`
  flex: 1;
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: 500;
  background-color: ${props => props.isWeekend ? '#1976d2' : '#2196f3'};
`;

const WeekDaysContainer = styled.div`
  flex: 1;
  display: flex;
`;

const DayColumn = styled.div<{ isWeekend: boolean }>`
  flex: 1;
  padding: 0.5rem;
  background-color: ${props => props.isWeekend ? '#f5f5f5' : 'white'};
  min-height: 500px;
  border-right: 1px solid #e0e0e0;
  
  &:last-child {
    border-right: none;
  }
`;

const EventItem = styled.div<{ eventType?: string }>`
  margin: 0.25rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  
  ${({ eventType }) => {
    switch (eventType) {
      case 'class':
        return `
          background-color: #c8e6c9;
          color: #2e7d32;
          border-left: 4px solid #2e7d32;
        `;
      case 'meeting':
        return `
          background-color: #bbdefb;
          color: #0d47a1;
          border-left: 4px solid #0d47a1;
        `;
      case 'deadline':
        return `
          background-color: #ffccbc;
          color: #bf360c;
          border-left: 4px solid #bf360c;
        `;
      case 'holiday':
        return `
          background-color: #d1c4e9;
          color: #4527a0;
          border-left: 4px solid #4527a0;
        `;
      default:
        return `
          background-color: #e1f5fe;
          color: #0288d1;
          border-left: 4px solid #0288d1;
        `;
    }
  }}
`;

const TimeLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  color: #666;
  margin-right: 0.5rem;
`;

interface WeeklyViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ date, events, onSelectEvent }) => {
  const renderWeekDays = () => {
    const days = [];
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    
    for (let i = 0; i < 7; i++) {
      const currentDay = addDays(weekStart, i);
      const isWeekend = [0, 6].includes(currentDay.getDay());
      
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.start);
        return isSameDay(eventDate, currentDay);
      });
      
      days.push(
        <DayColumn key={i} isWeekend={isWeekend}>
          {dayEvents.map((event) => (
            <EventItem 
              key={event.id} 
              eventType={event.type}
              onClick={() => onSelectEvent(event)}
            >
              <TimeLabel>
                {format(new Date(event.start), 'HH:mm')}
              </TimeLabel>
              {event.title}
            </EventItem>
          ))}
        </DayColumn>
      );
    }
    
    return days;
  };
  
  const renderWeekHeader = () => {
    const days = [];
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    
    for (let i = 0; i < 7; i++) {
      const currentDay = addDays(weekStart, i);
      const isWeekend = [0, 6].includes(currentDay.getDay());
      
      days.push(
        <DayHeaderCell key={i} isWeekend={isWeekend}>
          {format(currentDay, "EEE, d", { locale: ptBR })}
        </DayHeaderCell>
      );
    }
    
    return days;
  };
  
  return (
    <WeekViewContainer>
      <WeekHeader>
        {renderWeekHeader()}
      </WeekHeader>
      <WeekDaysContainer>
        {renderWeekDays()}
      </WeekDaysContainer>
    </WeekViewContainer>
  );
};

export default WeeklyView;