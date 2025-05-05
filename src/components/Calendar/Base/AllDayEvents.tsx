// components/Calendar/MonthlyView/AllDayEvents.tsx
import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { CalendarEvent } from '../../../utils/types/CalendarEvent';
import { AllDayEventItem, AllDayEventsContainer } from '../Views/WeeklyView/styles';
import { AllDayExpandButton } from '../Views/MonthlyView/styles';

interface AllDayEventsProps {
  events: CalendarEvent[];
  maxEvents: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void;
  eventRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

export const AllDayEvents: React.FC<AllDayEventsProps> = ({
  events,
  maxEvents,
  expanded,
  onToggleExpand,
  onEventClick,
  eventRefs
}) => {
  if (events.length === 0) return null;

  return (
    <AllDayEventsContainer>
      {events.slice(0, expanded ? events.length : maxEvents).map(event => (
        <AllDayEventItem
          key={event.id}
          ref={el => { eventRefs.current[event.id] = el; }}
          onClick={(e) => onEventClick(event, e)}
        >
          {event.title}
        </AllDayEventItem>
      ))}
      
      {events.length > maxEvents && (
        <AllDayExpandButton onClick={onToggleExpand}>
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
          {!expanded && `+${events.length - maxEvents}`}
        </AllDayExpandButton>
      )}
    </AllDayEventsContainer>
  );
};