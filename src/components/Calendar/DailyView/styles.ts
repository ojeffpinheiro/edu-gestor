import styled from "styled-components";

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HourRow = styled.div`
  display: flex;
  min-height: 60px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const HourLabel = styled.div`
  width: 80px;
  padding: 0.5rem;
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  border-right: 1px solid #eee;
`;

export const EventsContainer = styled.div`
  flex: 1;
  padding: 0.25rem;
`;

export const EmptyHourMessage = styled.div`
  color: #999;
  font-style: italic;
  padding: 0.5rem;
`;