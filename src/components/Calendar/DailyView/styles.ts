import styled from "styled-components";

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HourRow = styled.div`
  display: flex;
  min-height: 60px;
  border-bottom: 1px solid var(--color-border-light);
  
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
`;

export const EventsContainer = styled.div`
  flex: 1;
  padding: var(--space-xs);
`;

export const EmptyHourMessage = styled.div`
  color: var(--color-text-third);
  font-style: italic;
  padding: var(--space-sm);
`;