import React from 'react';
import { format } from 'date-fns';
import { EventContainer } from './styles';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';

interface EventItemProps {
  event: CalendarEvent;
  onSelectEventClick?: (event: CalendarEvent) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

const EventItem: React.FC<EventItemProps> = ({ event, onSelectEventClick, size }) => {
  return (
    <EventContainer 
      eventType={event.type}  
      title={event.title}
      eventColor={event.color}
      size={size}
      onClick={() => onSelectEventClick && onSelectEventClick(event)}
      aria-label={`${event.title} - ${format(new Date(event.start), 'HH:mm')}`}>
        {!event.isAllDay && `${format(event.start, 'HH:mm')} `}
        {event.title}
    </EventContainer>
  );
};

export default EventItem;