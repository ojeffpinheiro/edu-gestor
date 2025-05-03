// EventDetails.tsx
import React from 'react';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import EventItem from '../EventItem';
import Modal from '../../../modals/Modal';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EventDetailsProps {
  events: CalendarEvent[];
  day: Date;
  onClose: () => void;
  onSelectEvent: (event: CalendarEvent) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ events, day, onSelectEvent, onClose }) => {
  const allDayEvents = events.filter(event => event.isAllDay);
  const timedEvents = events.filter(event => !event.isAllDay);

  return (
    <Modal 
      title={`Eventos do dia ${format(day, 'd MMM', { locale: ptBR })}`}
      size='sm'
      isOpen
      onClose={onClose}>
        <h3>Todos os eventos</h3>
        
        {allDayEvents.length > 0 && (
          <div>
            <h4>Dia todo</h4>
            {allDayEvents.map(event => (
              <EventItem 
                key={event.id}
                event={event}
                onSelectEventClick={onSelectEvent}
                size="lg"
              />
            ))}
          </div>
        )}
        
        {timedEvents.length > 0 && (
          <div>
            <h4>Horários específicos</h4>
            {timedEvents
              .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
              .map(event => (
                <EventItem 
                  key={event.id}
                  event={event}
                  onSelectEventClick={onSelectEvent}
                  size="lg"
                />
              ))}
          </div>
        )}
        
        {events.length === 0 && (
          <p>Nenhum evento agendado para este dia.</p>
        )}
    </Modal>
  );
};

export default EventDetails;