import React, { useRef, useState } from 'react';
import { format, addHours, startOfDay, isSameHour, parseISO, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useCalendar } from '../../../../contexts/CalendarContext';
import EventItem from '../../Base/EventItem';
import CalendarBase from '../../Base/CalendarBase';
import EventPopup from '../../Base/EventPopup';

import { 
  DayContainer,
  HourRow,
  HourLabel,
  EventsContainer,
  AllDayEventsContainer,
  AllDayEventItem,
  EmptyHourMessage
} from './styles';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { FaAngleDown } from 'react-icons/fa';

const DailyView: React.FC = () => {
  const { currentDate, filterEvents, prevDay, nextDay, onToday } = useCalendar();
  const dayStart = startOfDay(currentDate);
  const [popupEvent, setPopupEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const eventRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const hours = Array.from({ length: 24 }, (_, i) => addHours(dayStart, i));
  const events = filterEvents({});

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const eventElement = eventRefs.current[event.id];
    if (eventElement) {
      const rect = eventElement.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
      setPopupEvent(event);
    }
  };

  const closePopup = () => {
    setPopupEvent(null);
  };

  const allDayEvents = events.filter(event => {
    const eventDate = event.start instanceof Date ? event.start : parseISO(event.start); // Converte string para Date
    return event.isAllDay && isSameDay(eventDate, currentDate);
  });

  const timedEvents = events.filter(event => {
    const eventDate = event.start instanceof Date ? event.start : parseISO(event.start); // Converte string para Date
    return !event.isAllDay && isSameDay(eventDate, currentDate);
  });

  // Corrigindo a filtragem por hora
  const getHourEvents = (hour: Date) => {
    return timedEvents.filter(event => {
      const eventDate = event.start instanceof Date ? event.start : parseISO(event.start);
      return isSameHour(eventDate, hour);
    });
  };

  return (
    <CalendarBase
      title={format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
      onPrev={prevDay}
      onNext={nextDay}
      onToday={onToday}
    >
      <DayContainer>
        {/* Seção para eventos All Day */}
          <HourRow>
            <FaAngleDown />
            <HourLabel></HourLabel>
            <AllDayEventsContainer>
              {allDayEvents.map(event => (
                <AllDayEventItem
                  key={event.id}
                  ref={(el: HTMLDivElement | null) => { eventRefs.current[event.id] = el; }}
                  onClick={(e) => handleEventClick(event, e)}
                >
                  {event.title}
                </AllDayEventItem>
              ))}
            </AllDayEventsContainer>
          </HourRow>

        {/* Seção para eventos por hora */}
        {hours.map(hour => {
          const hourEvents = getHourEvents(hour); // Usa a função corrigida
          
          return (
            <HourRow key={hour.toString()}>
              <HourLabel>
                {format(hour, 'HH:mm')}
              </HourLabel>
              <EventsContainer>
                {hourEvents.length > 0 ? (
                  hourEvents.map(event => (
                    <EventItem
                      key={event.id}
                      event={event}
                      onClick={(e) => handleEventClick(event, e)}
                      size="lg"
                      ref={el => { eventRefs.current[event.id] = el; }}
                    />
                  ))
                ) : (
                  <EmptyHourMessage>Nenhum evento</EmptyHourMessage>
                )}
              </EventsContainer>
            </HourRow>
          );
        })}
      </DayContainer>

      {/* Popup de detalhes do evento */}
      {popupEvent && (
        <EventPopup
          event={popupEvent}
          onEdit={() => {}}
          onClose={closePopup}
          onDuplicate={() => {}}
          onDelete={() => {}}
          style={{
            position: 'absolute',
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            zIndex: 1000
          }}
        />
      )}
    </CalendarBase>
  );
};

export default DailyView;