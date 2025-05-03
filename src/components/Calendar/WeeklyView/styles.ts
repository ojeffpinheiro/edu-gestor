// styles.ts (first file)
import styled from "styled-components";

export const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid var(--color-border-light);
  background-color: var(--color-primary);
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

export const DayNumber = styled.div<{ isToday: boolean }>`
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
  border-radius: var(--border-radius-full);
  background-color: ${props => props.isToday ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.isToday ? 'var(--color-text-on-primary)' : 'inherit'};
  margin-bottom: var(--space-xs);
  margin-left: var(--space-md);
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
`;

export const DayColumn = styled.div<{ isWeekend: boolean }>`
  flex: 1;
  border: 1px solid var(--color-border-light);
  padding: var(--space-sm);
  background-color: ${props => props.isWeekend ? 'var(--color-background-secondary)' : 'var(--color-background)'};
  min-height: 500px;
  
  &:last-child {
    border-right: none;
  }
`;