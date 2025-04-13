import styled from "styled-components";
import { BaseCard } from "../../styles/baseComponents";
import { fadeIn, slideUp } from "../../styles/animations";

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
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

export const CalendarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--space-md);
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-background-secondary);
  border-bottom-left-radius: var(--border-radius-md);
  border-bottom-right-radius: var(--border-radius-md);
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

export const CalendarContainer = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-in-out;
  
  .rbc-calendar {
    background-color: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
  }
  
  .rbc-event {
    background-color: var(--color-primary);
    border-color: var(--color-primary-hover);
  }
  
  .rbc-today {
    background-color: var(--color-background-third);
  }
  
  .rbc-toolbar button {
    color: var(--color-text);
  }
  
  .rbc-toolbar button.rbc-active {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }
`;

export const ViewToggleButton = styled.button<{ active: boolean }>`
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-background-third)'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border)'};
  margin-right: var(--space-xs);
  
  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-border-light)'};
  }
`;

export const ViewToggleContainer = styled.div`
  display: flex;
  margin-bottom: var(--space-md);
`;

export const EventModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-modal);
  backdrop-filter: blur(3px);
`;

export const EventModal = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: var(--shadow-lg);
`;

export const CalendarLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--space-lg);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

// Component styles for MonthView
export const MonthViewContainer = styled.div`
  height: 100%;
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-secondary);
  box-shadow: var(--shadow-sm);
`;

export const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
`;

export const WeekdayCell = styled.div<{ isWeekend: boolean }>`
  padding: var(--space-md) var(--space-xs);
  text-align: center;
  font-weight: 500;
  background-color: ${props => props.isWeekend ? 'var(--color-primary-hover)' : 'var(--color-primary)'};
`;

export const MonthGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, 1fr);
`;

export const DayCell = styled.div<{ isCurrentMonth: boolean; isWeekend: boolean }>`
  border-right: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-xs);
  background-color: ${props => 
    !props.isCurrentMonth ? 'var(--color-background-third)' : 
    props.isWeekend ? 'var(--color-background-secondary)' : 'var(--color-card)'
  };
  color: ${props => !props.isCurrentMonth ? 'var(--color-text-third)' : 'var(--color-text)'};
  
  &:nth-child(7n) {
    border-right: none;
  }
  
  &:nth-last-child(-n+7) {
    border-bottom: none;
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
`;

export const EventsContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 30px);
`;

export const EventItem = styled.div<{ eventType?: string; eventColor?: string }>`
  margin: 0.125rem 0;
  padding: var(--space-xs) var(--space-xs);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: filter var(--transition-fast);
  
  ${({ eventType, eventColor }) => {
    // Se uma cor personalizada foi fornecida, use-a
    if (eventColor) {
      return `
        background-color: ${eventColor}20;
        color: ${eventColor};
        border-left: 2px solid ${eventColor};
      `;
    }
    
    // Cores padrão para tipos de eventos usando as variáveis do tema
    const typeStyles = {
      class: `
        background-color: var(--color-success)20;
        color: var(--color-success);
        border-left: 2px solid var(--color-success);
      `,
      meeting: `
        background-color: var(--color-info)20;
        color: var(--color-info);
        border-left: 2px solid var(--color-info);
      `,
      deadline: `
        background-color: var(--color-error)20;
        color: var(--color-error);
        border-left: 2px solid var(--color-error);
      `,
      holiday: `
        background-color: var(--color-primary)20;
        color: var(--color-primary);
        border-left: 2px solid var(--color-primary);
      `,
      personal: `
        background-color: var(--color-warning)20;
        color: var(--color-warning);
        border-left: 2px solid var(--color-warning);
      `,
      default: `
        background-color: var(--color-info)20;
        color: var(--color-info);
        border-left: 2px solid var(--color-info);
      `
    };
    
    // @ts-ignore - Acessando propriedade dinâmica
    return typeStyles[eventType] || typeStyles.default;
  }}
  
  &:hover {
    filter: brightness(0.95);
  }
`;

export const MoreEventsLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  cursor: pointer;
  text-align: center;
  margin-top: var(--space-xs);
  
  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyDayMessage = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-third);
  text-align: center;
  margin-top: var(--space-md);
  font-style: italic;
`;

export const StyleCalendarView = {
  ViewToggleButton,
  ViewToggleContainer,
  CalendarContainer,
  EventModalContainer,
  EventModal,
  CalendarLayout,
  SidebarContainer
};

export const StyleMonthlyView = {
  MonthViewContainer,
  WeekHeader,
  WeekdayCell,
  MonthGrid,
  DayCell,
  DayNumber,
  EventsContainer,
  EventItem,
  MoreEventsLabel,
  EmptyDayMessage
};