import styled from 'styled-components';
// Styled Components
export const WeekViewContainer = styled.div`
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const WeekHeader = styled.div`
  display: flex;
  background-color: #2196f3;
  color: white;
`;

export const DayHeaderCell = styled.div<{ isWeekend: boolean }>`
  flex: 1;
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: 500;
  background-color: ${props => props.isWeekend ? '#1976d2' : '#2196f3'};
`;

export const WeekDaysContainer = styled.div`
  flex: 1;
  display: flex;
`;

export const DayColumn = styled.div<{ isWeekend: boolean }>`
  flex: 1;
  padding: 0.5rem;
  background-color: ${props => props.isWeekend ? '#f5f5f5' : 'white'};
  min-height: 500px;
  border-right: 1px solid #e0e0e0;
  
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

// Event styling by type
const getEventStyles = (eventType?: string) => {
  const eventStyles = {
    class: {
      backgroundColor: '#c8e6c9',
      color: '#2e7d32',
      borderLeft: '4px solid #2e7d32',
    },
    meeting: {
      backgroundColor: '#bbdefb',
      color: '#0d47a1',
      borderLeft: '4px solid #0d47a1',
    },
    deadline: {
      backgroundColor: '#ffccbc',
      color: '#bf360c',
      borderLeft: '4px solid #bf360c',
    },
    holiday: {
      backgroundColor: '#d1c4e9',
      color: '#4527a0',
      borderLeft: '4px solid #4527a0',
    },
    default: {
      backgroundColor: '#e1f5fe',
      color: '#0288d1',
      borderLeft: '4px solid #0288d1',
    },
  };

  return eventStyles[eventType as keyof typeof eventStyles] || eventStyles.default;
};

export const EventItem = styled.div<{ eventType?: string }>`
  margin: 0.25rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  
  ${({ eventType }) => {
    const styles = getEventStyles(eventType);
    return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
      border-left: ${styles.borderLeft};
    `;
  }}
`;

export const TimeLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  color: #666;
  margin-right: 0.5rem;
`;