import React from 'react';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { EventContainer, EventTitle } from './styles';
import { TimeLabel } from '../../styles';

interface EventItemProps {
  event: CalendarEvent;
  onClick?: () => void;
  compact?: boolean;
}

export const EventItem: React.FC<EventItemProps> = ({ event, onClick, compact = false }) => {
  return (
    <EventContainer 
      type={event.type} 
      onClick={onClick}
      compact={compact}
      title={`${event.title} - ${new Date(event.start).toLocaleTimeString()}`}
    >
      {!compact && (
        <TimeLabel>
          {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </TimeLabel>
      )}
      <EventTitle>{event.title}</EventTitle>
    </EventContainer>
  );
};