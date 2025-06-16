import styled from "styled-components";

export const Content = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  gap: 1px;
  background-color: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
`;

export const CornerEmptyCell = styled.div`
grid-column: '1';
grid-row: '1';
background: 'var(--gradient-primary)';
`;

export const DayHeader = styled.div`
  background: var(--gradient-primary);
  color: var(--color-text-on-primary);
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
`;

export const TimeSlotCell = styled.div`
  background: var(--color-background);
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  border-right: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
`;

export const LessonCellContent = styled.div<{ isEmpty?: boolean }>`
  background: ${props => props.isEmpty ? 'var(--color-background-secondary)' : 'var(--color-card)'};
  padding: 0.75rem;
  min-height: 80px;
  border-right: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
  position: relative;
  transition: all 0.2s ease;

  ${props => !props.isEmpty && `
    &:hover {
      background: var(--color-primary-light);
      cursor: pointer;
    }
  `}
`;
export const LessonInfo = styled.div`
  font-size: 0.875rem;
  
  strong {
    display: block;
    margin-bottom: 0.25rem;
  }
`;

export const EmptyCell = styled.div`
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
