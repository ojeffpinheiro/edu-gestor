import styled from 'styled-components';
import { mixins } from '../../styles/mixins';

// Styled Components
export const DayViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

export const DayHeader = styled.div`
  background-color: #2196f3;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
`;

export const HoursContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #bdbdbd;
    border-radius: 3px;
  }
`;

export const HourRow = styled.div`
  display: flex;
  min-height: 60px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const HourLabel = styled.div`
  width: 80px;
  padding: 0.5rem;
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  border-right: 1px solid #e0e0e0;
  background-color: #fafafa;
`;

export const EventsContainer = styled.div`
  flex: 1;
  padding: 0.25rem;
  position: relative;
`;

export const EmptyHourMessage = styled.div`
  color: #bdbdbd;
  font-style: italic;
  font-size: 0.8rem;
  padding: 0.5rem;
`;

export const EventItem = styled.div<{ eventType?: string }>`
  margin: 0.25rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  ${props => mixins.getEventStyles(props.eventType)}
  
  &:hover {
    filter: brightness(0.95);
  }
`;