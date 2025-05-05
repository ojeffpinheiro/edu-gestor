import styled from "styled-components";

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

export const HourRow = styled.div`
  display: flex;
  min-height: 60px;
  border-bottom: 1px solid var(--color-border-light);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--color-background-secondary);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const HourLabel = styled.div`
  width: 80px;
  padding: var(--space-sm);
  text-align: right;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  border-right: 1px solid var(--color-border-light);
  background-color: var(--color-background);
`;

export const EventsContainer = styled.div`
  flex: 1;
  padding: var(--space-xs);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  background-color: var(--color-background);
`;

export const AllDayEventItem = styled.div`
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const AllDayHeader = styled.div`
  display: flex;
  align-items: center;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border-light);
`;

export const AllDayTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-right: var(--space-sm);
`;

export const AllDayEventsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding: var(--space-xs);
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border-light);
  min-height: 40px;
`;

export const AllDayExpandButton = styled.button`
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

export const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xxs);
  width: 100%;
  padding: var(--space-xxs);
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-dark);
  }
`;

export const EmptyHourMessage = styled.div`
  color: var(--color-text-third);
  font-style: italic;
  padding: var(--space-sm);
`;