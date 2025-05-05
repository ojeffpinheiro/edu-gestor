// components/Calendar/MonthlyView/TimedEvents.tsx
import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { CalendarEvent } from '../../../utils/types/CalendarEvent';
import { EventsContainer } from '../ScheduleView/styles';
import EventItem from './EventItem';
import { ExpandButton } from '../Views/WeeklyView/styles';

interface TimedEventsProps {
  events: CalendarEvent[];
  maxEvents: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void;
  eventRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

export const TimedEvents: React.FC<TimedEventsProps> = ({
  events,
  maxEvents,
  expanded,
  onToggleExpand,
  onEventClick,
  eventRefs
}) => {
  if (events.length === 0) return null;

  return (
    <EventsContainer>
      {events.slice(0, expanded ? events.length : maxEvents).map(event => (
        <EventItem
          key={event.id}
          event={event}
          onClick={(e) => onEventClick(event, e)}
          size="xs"
          ref={el => { eventRefs.current[event.id] = el; }}
        />
      ))}

      {events.length > maxEvents && (
        <ExpandButton onClick={onToggleExpand}>
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
          {!expanded && `+${events.length - maxEvents}`}
        </ExpandButton>
      )}
    </EventsContainer>
  );
};