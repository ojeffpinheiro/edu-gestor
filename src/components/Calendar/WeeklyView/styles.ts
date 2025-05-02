import styled from "styled-components";

export const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #ddd;
`;

export const WeekdayHeader = styled.div<{ isWeekend: boolean }>`
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background-color: ${props => props.isWeekend ? '#f5f5f5' : '#f0f0f0'};
`;

export const DayNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.25rem;
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
`;

export const DayColumn = styled.div<{ isWeekend: boolean }>`
  border-right: 1px solid #ddd;
  padding: 0.5rem;
  background-color: ${props => props.isWeekend ? '#fafafa' : 'white'};
  min-height: 500px;
  
  &:last-child {
    border-right: none;
  }
`;

export const EmptyDayMessage = styled.div`
  color: #757575;
  font-style: italic;
  text-align: center;
  padding: 1rem 0;
`;