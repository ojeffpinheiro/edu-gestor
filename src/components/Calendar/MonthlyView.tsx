import React from 'react';
import styled from 'styled-components';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  isSameMonth,
  isSameDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../../utils/types/CalendarEvent';

const MonthViewContainer = styled.div`
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #2196f3;
  color: white;
`;

const WeekdayCell = styled.div<{ isWeekend: boolean }>`
  padding: 0.75rem 0.5rem;
  text-align: center;
  font-weight: 500;
  background-color: ${props => props.isWeekend ? '#1976d2' : '#2196f3'};
`;

const MonthGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, 1fr);
`;

const DayCell = styled.div<{ isCurrentMonth: boolean; isWeekend: boolean }>`
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.5rem;
  background-color: ${props => 
    !props.isCurrentMonth ? '#f9f9f9' : 
    props.isWeekend ? '#f5f5f5' : 'white'
  };
  color: ${props => !props.isCurrentMonth ? '#bdbdbd' : 'inherit'};
  
  &:nth-child(7n) {
    border-right: none;
  }
  
  &:nth-last-child(-n+7) {
    border-bottom: none;
  }
`;

const DayNumber = styled.div<{ isToday: boolean }>`
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
  border-radius: 50%;
  background-color: ${props => props.isToday ? '#2196f3' : 'transparent'};
  color: ${props => props.isToday ? 'white' : 'inherit'};
  margin-bottom: 0.5rem;
`;

const EventsContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 30px);
`;

const EventItem = styled.div<{ eventType?: string }>`
  margin: 0.125rem 0;
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  
  ${({ eventType }) => {
    switch (eventType) {
      case 'class':
        return `
          background-color: #c8e6c9;
          color: #2e7d32;
          border-left: 2px solid #2e7d32;
        `;
      case 'meeting':
        return `
          background-color: #bbdefb;
          color: #0d47a1;
          border-left: 2px solid #0d47a1;
        `;
      case 'deadline':
        return `
          background-color: #ffccbc;
          color: #bf360c;
          border-left: 2px solid #bf360c;
        `;
      case 'holiday':
        return `
          background-color: #d1c4e9;
          color: #4527a0;
          border-left: 2px solid #4527a0;
        `;
      default:
        return `
          background-color: #e1f5fe;
          color: #0288d1;
          border-left: 2px solid #0288d1;
        `;
    }
  }}
`;

const MoreEventsLabel = styled.div`
  font-size: 0.75rem;
  color: #2196f3;
  cursor: pointer;
  text-align: center;
  margin-top: 0.25rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface MonthlyViewProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ date, events, onSelectEvent }) => {
  const today = new Date();
  
  const renderWeekdayHeader = () => {
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    return weekdays.map((day, index) => {
      const isWeekend = index === 0 || index === 6;
      return (
        <WeekdayCell key={index} isWeekend={isWeekend}>
          {day}
        </WeekdayCell>
      );
    });
  };
  
  const renderMonthGrid = () => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map((day) => {
      const isCurrentMonth = isSameMonth(day, date);
      const isWeekend = [0, 6].includes(day.getDay());
      const isToday = isSameDay(day, today);
      
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.start);
        return isSameDay(eventDate, day);
      });
      
      // Limit the number of events to display
      const maxEventsToShow = 3;
      const hasMoreEvents = dayEvents.length > maxEventsToShow;
      const visibleEvents = hasMoreEvents 
        ? dayEvents.slice(0, maxEventsToShow) 
        : dayEvents;
      
      return (
        <DayCell key={day.toString()} isCurrentMonth={isCurrentMonth} isWeekend={isWeekend}>
          <DayNumber isToday={isToday}>
            {format(day, 'd')}
          </DayNumber>
          
          <EventsContainer>
            {visibleEvents.map((event) => (
              <EventItem 
                key={event.id} 
                eventType={event.type}
                onClick={() => onSelectEvent(event)}
              >
                {event.title}
              </EventItem>
            ))}
            
            {hasMoreEvents && (
              <MoreEventsLabel>
                +{dayEvents.length - maxEventsToShow} mais
              </MoreEventsLabel>
            )}
          </EventsContainer>
        </DayCell>
      );
    });
  };
  
  return (
    <MonthViewContainer>
      <WeekHeader>
        {renderWeekdayHeader()}
      </WeekHeader>
      <MonthGrid>
        {renderMonthGrid()}
      </MonthGrid>
    </MonthViewContainer>
  );
};

export default MonthlyView;