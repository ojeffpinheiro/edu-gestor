import styled from "styled-components";

export const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: 3rem repeat(7, 1fr);
  border-bottom: 1px solid var(--color-border-light);
  color: var(--color-text-on-primary);
`;

export const WeekdayHeader = styled.div<{ isWeekend: boolean }>`
  padding: var(--space-sm);
  text-align: center;
  background-color: ${props => props.isWeekend 
    ? 'var(--color-background-secondary)' 
    : 'var(--color-background-third)'};
  
  font-weight: 500;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-right: none;
  }
`;

export const DayHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DayName = styled.div`
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-xs);
`;

export const DayNumber = styled.div<{ isToday: boolean }>`
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: var(--font-size-md);
  cursor: pointer;
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
  border-radius: var(--border-radius-full);
  background-color: ${props => props.isToday ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.isToday ? 'var(--color-text-on-primary)' : 'inherit'};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: 3rem repeat(7, 1fr);
  flex: 1;
  overflow-y: auto;
`;

export const TimeColumn = styled.div`
  position: relative;
  background-color: var(--color-background);
  
  :first-child {
    padding-top: var(--space-sm);
  }
`;

export const DayColumn = styled.div<{ isWeekend: boolean }>`
  position: relative;
  border-right: 1px solid var(--color-border-light);
  background-color: ${props => props.isWeekend ? 'var(--color-background-secondary)' : 'var(--color-background)'};
  min-height: 100%;
  
  &:last-child {
    border-right: none;
  }
`;

export const TimeSlot = styled.div`
  height: 60px;
  border-bottom: 1px solid var(--color-border-light);
  position: relative;
`;

export const TimeLabel = styled.div`
  position: absolute;
  top: -10px;
  left: 4px;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
`;

export const AllDayEventsContainer = styled.div`
  grid-column: 2 / span 7;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-xs) 0;
  min-height: 40px;
`;

export const AllDayEventsCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-primary-light);
  color: var(--color-text-on-primary);
  font-size: var(--font-size-xs);
  margin-left: var(--space-xs);
  cursor: pointer;
`;

export const AllDayExpandButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: var(--space-sm);
  height: 40px;
`;

export const AllDayEventItem = styled.div`
  padding: var(--space-xs) var(--space-sm);
  margin: var(--space-xs) var(--space-xs);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  transition: opacity 0.3s ease-in-out;
  max-width: 12vw;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const TimeSlotEventCounter = styled(ExpandButton)`
  margin-top: var(--space-xs);
  margin-left: var(--space-xs);
`;

export const MultipleEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;