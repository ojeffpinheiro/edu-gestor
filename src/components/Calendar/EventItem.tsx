import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { CalendarEvent } from '../../utils/types/CalendarEvent';

const EventContainer = styled.div<{ type: string }>`
  padding: 0.1rem 0.25rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  
  ${props => {
    switch (props.type) {
      case 'aula':
        return 'background-color: #d4edda; color: #155724;';
      case 'avaliacao':
        return 'background-color: #f8d7da; color: #721c24;';
      case 'feriado':
        return 'background-color: #fff3cd; color: #856404;';
      case 'recesso':
        return 'background-color: #e2e3e5; color: #383d41;';
      case 'reuniao':
        return 'background-color: #cce5ff; color: #004085;';
      default:
        return 'background-color: #f8f9fa; color: #212529;';
    }
  }}
`;

interface EventItemProps {
  event: CalendarEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <EventContainer type={event.type} title={event.title}>
      {!event.isAllDay && `${format(event.start, 'HH:mm')} `}
      {event.title}
    </EventContainer>
  );
};

export default EventItem;