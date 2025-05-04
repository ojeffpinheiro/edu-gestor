// EventItem.tsx
import React from 'react';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { EventContainer, EventTitle, TimeLabel } from './styles';
import { format } from 'date-fns';


interface EventItemProps {
  event: CalendarEvent;
  onClick?: (e: React.MouseEvent) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ref?: React.Ref<HTMLDivElement>;
}

const EventItem: React.FC<EventItemProps> = React.forwardRef(({ event, onClick, size = 'md' }, ref) => {
  return (
    <EventContainer
      ref={ref}
      onClick={onClick}
      eventType={event.type}
      title={event.title}
      eventColor={event.color}
      size={size}
      aria-label={`${event.title} - ${format(new Date(event.start), 'HH:mm')}`}
    >
      <TimeLabel>{!event.isAllDay && `${format(new Date(event.start), 'HH:mm')} `}</TimeLabel>
      <EventTitle>{event.title}</EventTitle>
    </EventContainer>
  );
});

EventItem.displayName = 'EventItem';

export default EventItem;