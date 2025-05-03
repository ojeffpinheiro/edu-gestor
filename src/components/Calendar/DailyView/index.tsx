import React from 'react';
import { format, addHours, startOfDay, isSameHour } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useCalendar } from '../../../contexts/CalendarContext';

import EventItem from '../Base/EventItem';

import { 
  DayContainer, 
  HourRow, 
  EmptyHourMessage, 
  HourLabel, 
  EventsContainer
 } from './styles';
import CalendarBase from '../Base/CalendarBase';

const DailyView: React.FC = () => {
  const { currentDate, filterEvents, prevDay, nextDay, onToday } = useCalendar();
  const dayStart = startOfDay(currentDate);
  
  const hours = Array.from({ length: 24 }, (_, i) => addHours(dayStart, i));
  const events = filterEvents({});

  return (
    <CalendarBase
      title={format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
      onPrev={prevDay}
      onNext={nextDay}
      onToday={onToday}
    >
      <DayContainer>
        {hours.map(hour => {
          const hourEvents = events.filter(event => 
            isSameHour(event.start, hour)
          );
          
          return (
            <HourRow key={hour.toString()}>
              <HourLabel>
                {format(hour, 'HH:mm')}
              </HourLabel>
              <EventsContainer>
                {hourEvents.map(event => (
                  <EventItem key={event.id} event={event} size='lg' />
                ))}
                {hourEvents.length === 0 && (
                  <EmptyHourMessage>Nenhum evento</EmptyHourMessage>
                )}
              </EventsContainer>
            </HourRow>
          );
        })}
      </DayContainer>
    </CalendarBase>
  );
};

export default DailyView;