import React from 'react';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { EventContainer, EventTitle, TimeLabel } from './styles';
import { format } from 'date-fns';

/**
 * Props do componente EventItem
 * @typedef {Object} EventItemProps
 * @property {CalendarEvent} event - Dados do evento a ser exibido
 * @property {function} [onClick] - Callback quando o evento é clicado
 * @property {'xs'|'sm'|'md'|'lg'} [size='md'] - Tamanho do item de evento
 * @property {React.Ref} [ref] - Referência para o elemento DOM
 * @property {boolean} [more=false] - Indica se há mais eventos não exibidos
 */
interface EventItemProps {
  event: CalendarEvent;
  onClick?: (e: React.MouseEvent) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ref?: React.Ref<HTMLDivElement>;
  more?: boolean;
}

/**
 * Componente que renderiza um item de evento no calendário
 * @param {EventItemProps} props - Props do componente
 * @returns {JSX.Element} Item de evento estilizado
 */
const EventItem: React.FC<EventItemProps> = React.forwardRef(({ event, onClick, size = 'md', more = false }, ref) => {
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