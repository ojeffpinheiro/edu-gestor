import React from 'react';
import styled from 'styled-components';
import { useCalendar } from '../../contexts/CalendarContext';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import EventItem from './EventItem';

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
`;

const DayHeader = styled.h2`
  margin: 0 0 1rem 0;
  text-align: center;
`;

const HourGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 0.5rem;
`;

const HourLabel = styled.div`
  text-align: right;
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const HourSlot = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  min-height: 60px;
  padding: 0.25rem;
`;

const AllDaySection = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const DayView: React.FC = () => {
  const { currentDate, filterEvents } = useCalendar();
  const events = filterEvents({});
  
  const dayEvents = events.filter(event => 
    isSameDay(event.start, currentDate) || 
    (event.isAllDay && isSameDay(event.start, currentDate))
  );
  
  const allDayEvents = dayEvents.filter(event => event.isAllDay);
  const timedEvents = dayEvents.filter(event => !event.isAllDay);
  
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  return (
    <DayContainer>
      <DayHeader>
        {format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </DayHeader>
      
      {allDayEvents.length > 0 && (
        <AllDaySection>
          <SectionTitle>Dia Inteiro</SectionTitle>
          <div>
            {allDayEvents.map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        </AllDaySection>
      )}
      
      <HourGrid>
        {hours.map(hour => {
          const hourEvents = timedEvents.filter(event => 
            (event.start instanceof Date ? event.start : new Date(event.start)).getHours() === hour
          );
          
          return (
            <React.Fragment key={hour}>
              <HourLabel>{hour}:00</HourLabel>
              <HourSlot>
                {hourEvents.map(event => (
                  <EventItem key={event.id} event={event} />
                ))}
              </HourSlot>
            </React.Fragment>
          );
        })}
      </HourGrid>
    </DayContainer>
  );
};

export default DayView;