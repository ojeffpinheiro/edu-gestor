import React from 'react'
import { format } from "date-fns";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";

import { constants } from '../../../../utils/consts';

import { CalendarEvent } from "../../../../types/academic/CalendarEvent";
import { EventItem, ActionButton, EventActions } from './styles';

// components/EventListItem.tsx
interface EventListItemProps {
    event: CalendarEvent;
    color: string;
    onEdit: (event: CalendarEvent) => void;
    onDuplicate: (event: CalendarEvent) => void;
    onDelete: (event: CalendarEvent) => void;
  }
  
const EventListItem: React.FC<EventListItemProps> = ({ event, color, onEdit, onDuplicate, onDelete }) => (
    <EventItem style={{ borderLeft: `4px solid ${color}` }}>
      <EventActions>
        <ActionButton onClick={() => onEdit(event)} color={color}>
          <FaEdit size={12} />
        </ActionButton>
        <ActionButton onClick={() => onDuplicate(event)} color={constants.colors.status.info}>
          <FaCopy size={12} />
        </ActionButton>
        <ActionButton onClick={() => onDelete(event)} color={constants.colors.status.error}>
          <FaTrash size={12} />
        </ActionButton>
      </EventActions>
      <div style={{ fontWeight: 'bold' }}>{event.title}</div>
      {!event.isAllDay && (
        <div>
          {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
        </div>
      )}
      {event.location && <div>Local: {event.location}</div>}
    </EventItem>
  );

export default EventListItem;