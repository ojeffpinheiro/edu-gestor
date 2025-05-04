import React, { useMemo, useRef, useState } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  isSameMonth,
  isSameDay,
  format
} from 'date-fns';
import { CalendarEvent } from '../../../utils/types/CalendarEvent';
import EventItem from '../Base/EventItem';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import {
  MonthGridContainer,
  DayCell,
  DayNumber,
  EventsContainer,
  AllDayEventsContainer,
  AllDayEventItem,
  ExpandButton,
  AllDayExpandButton
} from './styles';
import EventPopup from '../Base/EventPopup';

interface MonthGridProps {
  date: Date;
  today: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onShowMoreEvents: (day: Date, count: number) => void;
}

interface ExpandedDaysState {
  allDay: Record<string, boolean>;
  timed: Record<string, boolean>;
}

const MAX_EVENTS_TO_SHOW = 2;

export const MonthGrid: React.FC<MonthGridProps> = ({
  date,
  today,
  events,
  onSelectEvent,
  onShowMoreEvents
}) => {
  const [expandedDays, setExpandedDays] = useState<ExpandedDaysState>({
    allDay: {},
    timed: {}
  });
  const [popupEvent, setPopupEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const eventRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const daysInRange = useMemo(() => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [date]);

  const toggleExpandAllDay = (dayStr: string) => {
    setExpandedDays(prev => ({
      ...prev,
      allDay: {
        ...prev.allDay,
        [dayStr]: !prev.allDay[dayStr]
      }
    }));
  };

  const toggleExpandTimed = (dayStr: string) => {
    setExpandedDays(prev => ({
      ...prev,
      timed: {
        ...prev.timed,
        [dayStr]: !prev.timed[dayStr]
      }
    }));
  };

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
    <>
      <MonthGridContainer>
        {daysInRange.map((day) => {
          const dayStr = day.toString();
          const isCurrentMonth = isSameMonth(day, date);
          const isToday = isSameDay(day, today);
          const dayEvents = events.filter(event => isSameDay(new Date(event.start), day));
          const allDayEvents = dayEvents.filter(event => event.isAllDay);
          const timedEvents = dayEvents.filter(event => !event.isAllDay);
          const isAllDayExpanded = expandedDays.allDay[dayStr] || false;
          const isTimedExpanded = expandedDays.timed[dayStr] || false;

          return (
            <DayCell
              key={dayStr}
              isCurrentMonth={isCurrentMonth}
            >
              <DayNumber isToday={isToday}>
                {format(day, 'd')}
              </DayNumber>

              <AllDayEventsContainer>
                {allDayEvents.slice(0, isAllDayExpanded ? allDayEvents.length : MAX_EVENTS_TO_SHOW).map(event => (
                  <AllDayEventItem
                    key={event.id}
                    ref={el => { eventRefs.current[event.id] = el; }}
                    onClick={(e) => handleEventClick(event, e)}
                  >
                    {event.title}
                  </AllDayEventItem>
                ))}
                
                {allDayEvents.length > MAX_EVENTS_TO_SHOW && (
                  <AllDayExpandButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpandAllDay(dayStr);
                    }}
                  >
                    {isAllDayExpanded ? <FaAngleUp /> : <FaAngleDown />}
                    {!isAllDayExpanded && `+${allDayEvents.length - MAX_EVENTS_TO_SHOW}`}
                  </AllDayExpandButton>
                )}
              </AllDayEventsContainer>

              <EventsContainer>
                {timedEvents.slice(0, isTimedExpanded ? timedEvents.length : MAX_EVENTS_TO_SHOW).map(event => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onClick={(e) => handleEventClick(event, e)}
                    size="xs"
                    ref={el => { eventRefs.current[event.id] = el; }}
                  />
                ))}

                {timedEvents.length > MAX_EVENTS_TO_SHOW && (
                  <ExpandButton onClick={(e) => {
                    e.stopPropagation();
                    toggleExpandTimed(dayStr);
                  }}>
                    {isTimedExpanded ? <FaAngleUp /> : <FaAngleDown />}
                    {!isTimedExpanded && `+${timedEvents.length - MAX_EVENTS_TO_SHOW}`}
                  </ExpandButton>
                )}
              </EventsContainer>
            </DayCell>
          );
        })}
      </MonthGridContainer>

      {popupEvent && (
        <EventPopup
          event={popupEvent}
          onEdit={() => onSelectEvent(popupEvent)}
          onClose={closePopup}
          onDuplicate={() => {/* Add duplicate logic here */}}
          onDelete={() => {/* Add delete logic here */}}
          style={{
            position: 'absolute',
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            zIndex: 1000
          }}
        />
      )}
    </>
  );
};