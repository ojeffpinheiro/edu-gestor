import styled from "styled-components";

export const WeekdayHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background-color: #f0f0f0;
`;

export const DayCell = styled.div<{ isCurrentMonth: boolean }>`
  padding: 0.25rem;
  min-height: 100px;
  background-color: ${props => props.isCurrentMonth ? '#fff' : '#f9f9f9'};
`;

export const DayNumber = styled.div`
  text-align: right;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export const MoreEvents = styled.div`
  font-size: 0.8rem;
  color: #3182ce;
  cursor: pointer;
  text-align: center;
  
  &:hover {
    text-decoration: underline;
  }
`;