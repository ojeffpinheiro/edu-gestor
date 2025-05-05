import styled from "styled-components";

export const CalendarGridBase = styled.div`
  display: grid;
  gap: var(--space-xs);
`;

export const WeekHeader = styled(CalendarGridBase)`
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--space-sm);
`;

export const DayCellBase = styled.div<{ isCurrentMonth: boolean }>`
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