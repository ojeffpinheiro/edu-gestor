// EventItem.tsx
import React, { useRef } from 'react';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { EventContainer, EventTitle, TimeLabel } from './styles';
import { format } from 'date-fns';


interface EventItemProps {
  event: CalendarEvent;
  size?: 'sm' | 'md' | 'lg';
  onSelectEventClick?: (event: CalendarEvent) => void;
  children?: React.ReactNode;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  size = 'md',
  onSelectEventClick,
}) => {
  const eventRef = useRef<HTMLDivElement>(null);

  const handleEventClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectEventClick) {
      onSelectEventClick(event);
    }
  };

  return (
      <EventContainer
      eventType={event.type}
      title={event.title}
      eventColor={event.color}
      size={size}
      onClick={handleEventClick}
      ref={eventRef}
      aria-label={`${event.title} - ${format(new Date(event.start), 'HH:mm')}`}>
        <TimeLabel>{!event.isAllDay && `${format(event.start, 'HH:mm')} `}</TimeLabel>
        <EventTitle>{event.title}</EventTitle>
      </EventContainer>
  );
};

export default EventItem;