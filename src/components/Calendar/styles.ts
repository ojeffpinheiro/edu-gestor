import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
`;

export const MonthDisplay = styled.h3`
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
`;

export const NavigationButtons = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--border-radius-full);
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--color-text-on-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: var(--space-sm) 0;
  background-color: var(--color-background-third);
  border-bottom: 1px solid var(--color-border-light);
`;

export const WeekdayLabel = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  height: 32px;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 2px;
  padding: var(--space-sm);
`;

export const DayCell = styled.button<{ isToday?: boolean; isSelected?: boolean; isOutsideMonth?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: ${props => 
    props.isSelected ? 'var(--color-primary)' : 
    props.isToday ? 'var(--color-background-third)' : 
    'transparent'
  };
  color: ${props => 
    props.isSelected ? 'var(--color-text-on-primary)' : 
    props.isOutsideMonth ? 'var(--color-text-third)' : 
    'var(--color-text)'
  };
  font-weight: ${props => props.isToday ? '600' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${props => 
      props.isSelected ? 'var(--color-primary-hover)' : 
      'var(--color-background-third)'
    };
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CalendarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--space-md);
  border-top: 1px solid var(--color-border-light);
`;

export const TodayButton = styled.button`
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background-third);
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-border-light);
  }
`;

export const EventIndicator = styled.div`
  width: 4px;
  height: 4px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary);
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
`;

export const DayCellContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

// Para calendários de range de datas
export const RangeDay = styled(DayCell)<{ isRangeStart?: boolean; isRangeEnd?: boolean; isInRange?: boolean }>`
  background-color: ${props => 
    (props.isRangeStart || props.isRangeEnd) ? 'var(--color-primary)' :
    props.isInRange ? 'var(--color-primary-hover)' : 
    'transparent'
  };
  color: ${props => 
    (props.isRangeStart || props.isRangeEnd || props.isInRange) ? 
    'var(--color-text-on-primary)' : 
    props.isOutsideMonth ? 'var(--color-text-third)' : 
    'var(--color-text)'
  };
  
  border-radius: ${props =>
    props.isRangeStart ? 'var(--border-radius-sm) 0 0 var(--border-radius-sm)' :
    props.isRangeEnd ? '0 var(--border-radius-sm) var(--border-radius-sm) 0' :
    props.isInRange ? '0' : 'var(--border-radius-sm)'
  };
`;

// Mini-calendário para dropdowns
export const MiniCalendarContainer = styled(CalendarContainer)`
  max-width: 280px;
  box-shadow: var(--shadow-lg);
`;

export const MiniCalendarHeader = styled(CalendarHeader)`
  padding: var(--space-sm);
`;

export const MiniDaysGrid = styled(DaysGrid)`
  padding: var(--space-xs);
`;

export const MiniDayCell = styled(DayCell)`
  height: 30px;
  font-size: var(--font-size-sm);
`;

// Para múltipla seleção de datas
export const MultiSelectDay = styled(DayCell)<{ isSelected?: boolean }>`
  position: relative;
  
  &:after {
    content: '';
    display: ${props => props.isSelected ? 'block' : 'none'};
    position: absolute;
    top: 6px;
    right: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-success);
  }
`;