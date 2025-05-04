import styled from "styled-components";

export const MonthGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(120px, 1fr);
  gap: var(--space-xs);
`;

export const DayCell = styled.div<{ isCurrentMonth: boolean }>`
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  padding: var(--space-xs);
  background-color: ${props => 
    props.isCurrentMonth 
      ? 'var(--color-background)' 
      : 'var(--color-background-secondary)'};
  color: ${props => 
    props.isCurrentMonth 
      ? 'var(--color-text)' 
      : 'var(--color-text-secondary)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
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

export const MultipleEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;

export const AllDayExpandButton = styled.button`
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
  margin-top: var(--space-xs);

  &:hover {
    opacity: 0.8;
  }
`;