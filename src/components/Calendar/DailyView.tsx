import React from 'react';
import styled from 'styled-components';
import { format, addHours, startOfDay, isSameHour } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';

const DayViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  background-color: #2196f3;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
`;

const HoursContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const HourRow = styled.div`
  display: flex;
  min-height: 60px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const HourLabel = styled.div`
  width: 80px;
  padding: 0.5rem;
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  border-right: 1px solid #e0e0e0;
`;

const EventsContainer = styled.div`
  flex: 1;
  padding: 0.25rem;
  position: relative;
`;

const EventItem = styled.div<{ eventType?: string }>`
  margin: 0.25rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
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

interface DailyViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

const DailyView: React.FC<DailyViewProps> = ({ date, events, onSelectEvent }) => {
  const renderHours = () => {
    const hours = [];
    const dayStart = startOfDay(date);
    
    for (let i = 0; i < 24; i++) {
      const currentHour = addHours(dayStart, i);
      const hourEvents = events.filter((event) => {
        const eventStart = new Date(event.start);
        return isSameHour(eventStart, currentHour);
      });
      
      hours.push(
        <HourRow key={i}>
          <HourLabel>{format(currentHour, 'HH:mm')}</HourLabel>
          <EventsContainer>
            {hourEvents.map((event) => (
              <EventItem 
                key={event.id} 
                eventType={event.type}
                onClick={() => onSelectEvent(event)}
              >
                {event.title}
              </EventItem>
            ))}
          </EventsContainer>
        </HourRow>
      );
    }
    
    return hours;
  };
  
  return (
    <DayViewContainer>
      <DayHeader>
        {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </DayHeader>
      <HoursContainer>
        {renderHours()}
      </HoursContainer>
    </DayViewContainer>
  );
};

export default DailyView;