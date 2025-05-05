import styled from "styled-components";
import { CalendarGridBase, DayCellBase } from "../../calendarStyles";
import { constants } from "../../../../utils/consts";

export const MonthViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DayCellContainer = styled(DayCellBase)<{ 
  hasEvents?: boolean;
  isToday?: boolean;
  eventColor?: string;
}>`
  position: relative;
  min-height: 100px;
  
  ${({ hasEvents, eventColor }) => hasEvents && `
    border-left: 3px solid ${eventColor || constants.colors.primary};
  `}

  ${({ isToday }) => isToday && `
    border: 2px solid ${constants.colors.border.main};
  `}
`;

export const DayNumber = styled.div<{ isToday: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
  border-radius: var(--border-radius-full);
  background-color: ${props => props.isToday ? 'var(--color-accent)' : 'transparent'};
  color: ${props => props.isToday ? 'var(--color-text-on-accent)' : 'inherit'};
  margin-bottom: var(--space-xs);
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  max-height: calc(100% - 40px);
  overflow: hidden;
`;

export const AllDayEventsContainer = styled.div`
  margin-bottom: var(--space-xs);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;

export const AllDayEventItem = styled.div`
  padding: var(--space-xs) var(--space-xs);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: opacity 0.2s;
  max-width: 13vw;

  &:hover {
    opacity: 0.9;
  }
`;

export const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  width: 100%;
  padding: var(--space-xs);
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const AllDayExpandButton = styled(ExpandButton)`
  margin-top: var(--space-xs);
`;

export const MonthGridContainer = styled(CalendarGridBase)`
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(120px, 1fr);
`;