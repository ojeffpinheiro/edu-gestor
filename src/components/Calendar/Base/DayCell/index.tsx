// components/Calendar/MonthlyView/DayCell.tsx
import React, { useRef, useState } from 'react';
import { isSameMonth, isSameDay, format } from 'date-fns';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import EventPopup from '../../Base/EventPopup';
import { groupEventsByType } from '../../../../utils/calendarUtils';
import { DayCellContainer } from '../../Views/MonthlyView/styles';
import { DayNumber } from '../../Views/WeeklyView/styles';
import { AllDayEvents } from '../AllDayEvents';
import { TimedEvents } from '../TimedEvents';

interface DayCellProps {
  day: Date;
  date: Date;
  today: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onShowMoreEvents: (day: Date, count: number) => void;
}

const MAX_EVENTS_TO_SHOW = 2;

export const DayCell: React.FC<DayCellProps> = ({
  day,
  date,
  today,
  events,
  onSelectEvent,
  onShowMoreEvents
}) => {
  const [expanded, setExpanded] = useState({
    allDay: false,
    timed: false
  });
  const [popupEvent, setPopupEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const eventRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isCurrentMonth = isSameMonth(day, date);
  const isToday = isSameDay(day, today);
  const { allDay: allDayEvents, timed: timedEvents } = groupEventsByType(events);

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

  return (
    <DayCellContainer isCurrentMonth={isCurrentMonth}>
      <DayNumber isToday={isToday}>
        {format(day, 'd')}
      </DayNumber>

      <AllDayEvents
        events={allDayEvents}
        maxEvents={MAX_EVENTS_TO_SHOW}
        expanded={expanded.allDay}
        onToggleExpand={() => setExpanded(prev => ({ ...prev, allDay: !prev.allDay }))}
        onEventClick={handleEventClick}
        eventRefs={eventRefs}
      />

      <TimedEvents
        events={timedEvents}
        maxEvents={MAX_EVENTS_TO_SHOW}
        expanded={expanded.timed}
        onToggleExpand={() => setExpanded(prev => ({ ...prev, timed: !prev.timed }))}
        onEventClick={handleEventClick}
        eventRefs={eventRefs}
      />

      {popupEvent && (
        <EventPopup
          event={popupEvent}
          onEdit={() => onSelectEvent(popupEvent)}
          onClose={closePopup}
          onDuplicate={() => {}} // Add implementation as needed
          onDelete={() => {}} // Add implementation as needed
          style={{
            position: 'absolute',
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            zIndex: 1000
          }}
        />
      )}
    </DayCellContainer>
  );
};