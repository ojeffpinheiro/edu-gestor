import styled from "styled-components";

// Styled Components
export const Container = styled.div`
  padding: var(--space-md);
`;

export const Title = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--space-md);
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  
  @media (min-width: var(--breakpoint-md)) {
    flex-direction: row;
  }
`;

export const CalendarSection = styled.div`
  width: 100%;
  background-color: var(--color-card);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  
  @media (min-width: var(--breakpoint-md)) {
    width: 66.666667%;
  }
`;

export const EventsSection = styled.div`
  width: 30vw;
  background-color: var(--color-card);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  
  @media (min-width: var(--breakpoint-md)) {
    width: 33.333333%;
  }
`;

export const SectionTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-sm);
`;

export const WeekdaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
`;

export const WeekdayCell = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: var(--font-size-sm);
  padding: var(--space-xs) 0;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
`;

export const DayCell = styled.div<{ isCurrentMonth?: boolean; hasEvent?: boolean }>`
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  padding: var(--space-sm);
  min-height: 3.5rem;
  background-color: ${props => props.isCurrentMonth ? 'var(--color-card)' : 'var(--color-background-secondary)'};
  color: ${props => props.isCurrentMonth ? 'var(--color-text)' : 'var(--color-text-third)'};
  ${props => props.hasEvent && 'box-shadow: 0 0 0 1px var(--color-info);'}
`;

export const DayNumber = styled.div`
  text-align: right;
  font-size: var(--font-size-sm);
`;

export const EventIndicator = styled.div<{ type: string }>`
  font-size: var(--font-size-xs);
  padding: var(--space-xs) var(--space-xs);
  border-radius: var(--border-radius-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: var(--space-xs);
  
  background-color: ${props => {
    switch (props.type) {
      case 'Feriado': return 'var(--color-error-hover)';
      case 'Prazo': return 'var(--color-warning)';
      default: return 'var(--color-info)';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'Feriado': return 'white';
      case 'Prazo': return 'var(--color-text-on-primary)';
      default: return 'var(--color-text-on-primary)';
    }
  }};
`;

export const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
`;

export const EventItem = styled.div`
  border-left: 4px solid var(--color-primary);
  padding-left: var(--space-sm);
  padding-top: var(--space-xs);
  padding-bottom: var(--space-xs);
`;

export const EventTitle = styled.div`
  font-weight: 500;
  color: var(--color-text);
`;

export const EventDate = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const EventTagContainer = styled.div`
  font-size: var(--font-size-xs);
  margin-top: var(--space-xs);
`;

export const EventTag = styled.div<{ type: string }>`
  padding: var(--space-xs) var(--space-sm);
  border-radius: 9999px;
  
  background-color: ${props => {
    switch (props.type) {
      case 'Feriado': return 'var(--color-error)';
      case 'Prazo': return 'var(--color-warning)';
      default: return 'var(--color-info)';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'Feriado': return 'white';
      case 'Prazo': return 'var(--color-text-on-primary)';
      default: return 'var(--color-text-on-primary)';
    }
  }};
`;

export const FormSection = styled.div`
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--space-sm);
`;

export const FormTitle = styled.h4`
  font-weight: 500;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

export const Input = styled.input`
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);

  &:focus {
    border-color: var(--color-input-focus);
    outline: none;
    box-shadow: var(--shadow-focus);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);

  &:focus {
    border-color: var(--color-input-focus);
    outline: none;
    box-shadow: var(--shadow-focus);
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-sm);
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;