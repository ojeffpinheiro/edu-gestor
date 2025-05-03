import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import EventItem from '../EventItem';

import {
  Content,
  DayNumber,
  EventsContainer,
  MoreEventsLabel
} from './styles';

interface DayCellProps {
  day: Date;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  isToday: boolean;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onShowMoreEvents: (day: Date, count: number) => void;
}

const MAX_EVENTS_TO_SHOW = 3;

export const DayCell: React.FC<DayCellProps> = ({
  day,
  isCurrentMonth,
  isWeekend,
  isToday,
  events,
  onSelectEvent,
  onShowMoreEvents
}) => {
  const hasMoreEvents = events.length > MAX_EVENTS_TO_SHOW;
  const visibleEvents = hasMoreEvents ? events.slice(0, MAX_EVENTS_TO_SHOW) : events;

  return (
    <Content
      isCurrentMonth={isCurrentMonth}
      hasEvent={events.length > 0}
      aria-label={format(day, 'PPPP', { locale: ptBR })}>
      <DayNumber isToday={isToday} aria-current={isToday ? "date" : undefined}>
        {format(day, 'd')}
      </DayNumber>

      <EventsContainer>
        {visibleEvents.length > 0 && (
          <>
            {visibleEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onSelectEventClick={() => onSelectEvent(event)}
                aria-label={`${event.title} - ${format(new Date(event.start), 'HH:mm')}`}
              >
                {event.title}
              </EventItem>
            ))}

            {hasMoreEvents && (
              <MoreEventsLabel onClick={() => onShowMoreEvents(day, events.length)}>
                +{events.length - MAX_EVENTS_TO_SHOW} mais
              </MoreEventsLabel>
            )}
          </>
        )}
      </EventsContainer>
    </Content>
  );
};