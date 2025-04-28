import styled from 'styled-components';

// Styled Components
export const Container = styled.div`
  min-height: 100vh;
  background-color: var(--color-background, #f3f4f6);
`;

export const Header = styled.header`
  background-color: var(--color-primary, #1d4ed8);
  color: var(--color-text-on-primary, white);
  padding: var(--space-md, 1rem);
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: var(--font-size-xl, 1.5rem);
  font-weight: 700;
`;

export const Subtitle = styled.p`
  color: var(--color-text-secondary, #93c5fd);
`;

export const Nav = styled.nav`
  background-color: var(--color-background-secondary, white);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const NavList = styled.ul`
  display: flex;
  overflow-x: auto;
`;

export const NavItem = styled.li`
  list-style: none;
`;

export const NavButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: var(--space-md, 0.75rem) var(--space-lg, 1rem);
  border: none;
  background: transparent;
  border-bottom: 2px solid;
  border-bottom-color: ${props => props.active ? 'var(--color-primary, #1d4ed8)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-primary, #1d4ed8)' : 'inherit'};
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-background-third, #f9fafb);
  }
`;

export const IconWrapper = styled.span`
  margin-right: var(--space-sm, 0.5rem);
`;

export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-md, 1rem);
`;

export const Card = styled.div`
  background-color: var(--color-background-secondary, white);
  border-radius: var(--border-radius-md, 0.375rem);
  padding: var(--space-lg, 1rem);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  margin-bottom: var(--space-md, 1rem);
  animation: slideUp 0.3s ease;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const CardTitle = styled.h3`
  font-size: var(--font-size-lg, 1.125rem);
  font-weight: 600;
  margin-bottom: var(--space-sm, 0.5rem);
  padding-bottom: var(--space-sm, 0.5rem);
  border-bottom: 1px solid var(--color-border-light, #e5e7eb);
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-xl, 1.25rem);
  font-weight: 700;
  margin-bottom: var(--space-md, 1rem);
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: start;
  cursor: pointer;
`;

export const Checkbox = styled.div<{ checked: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.checked ? 'var(--color-success, #22c55e)' : 'transparent'};
  border: 1px solid ${props => props.checked ? 'var(--color-success, #22c55e)' : 'var(--color-border, #d1d5db)'};
`;

export const CheckboxLabel = styled.span<{ checked: boolean }>`
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  color: ${props => props.checked ? 'var(--color-text-secondary, #6b7280)' : 'var(--color-text, #1f2937)'};
`;

export const Grid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 1}, 1fr);
  gap: var(--space-sm, 0.5rem);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-sm, 0.5rem);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const DayCard = styled.div`
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: var(--border-radius-sm, 0.25rem);
  padding: var(--space-sm, 0.5rem);
`;

export const DayTitle = styled.h4`
  font-weight: 500;
  text-align: center;
  padding-bottom: var(--space-xs, 0.25rem);
  border-bottom: 1px solid var(--color-border-light, #e5e7eb);
  margin-bottom: var(--space-sm, 0.5rem);
`;

export const ClassItem = styled.div`
  background-color: var(--color-info-bg, #eff6ff);
  padding: var(--space-xs, 0.25rem);
  border-radius: var(--border-radius-sm, 0.25rem);
  margin-bottom: var(--space-xs, 0.25rem);
  font-size: var(--font-size-sm, 0.875rem);
`;

export const ClassTitle = styled.div`
  font-weight: 500;
`;

export const ClassInfo = styled.div`
  color: var(--color-info, #3b82f6);
`;

export const ClassTime = styled.div`
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--font-size-xs, 0.75rem);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--color-background-secondary, white);
  border-radius: var(--border-radius-md, 0.375rem);
  overflow: hidden;
`;

export const Th = styled.th`
  padding: var(--space-md, 0.75rem);
  background-color: var(--color-background-third, #f9fafb);
  text-align: left;
  font-weight: 600;
  border: 1px solid var(--color-border, #d1d5db);
`;

export const Td = styled.td`
  padding: var(--space-md, 0.75rem);
  border: 1px solid var(--color-border, #d1d5db);
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-background-third, #f9fafb);
  }

  &:hover {
    background-color: var(--color-background-secondary, #f3f4f6);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-md, 1rem);
`;

export const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: 500;
  margin-bottom: var(--space-xs, 0.25rem);
`;

export const Input = styled.input`
  width: 100%;
  padding: var(--space-sm, 0.5rem);
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: var(--border-radius-sm, 0.25rem);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary, #1d4ed8);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm, 0.5rem);
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: var(--border-radius-sm, 0.25rem);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary, #1d4ed8);
  }
`;

export const Button = styled.button`
  background-color: var(--color-primary, #1d4ed8);
  color: white;
  padding: var(--space-sm, 0.5rem) var(--space-md, 1rem);
  border: none;
  border-radius: var(--border-radius-sm, 0.25rem);
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--color-primary-dark, #1e40af);
  }
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: var(--color-primary, #1d4ed8);
  font-size: var(--font-size-sm, 0.875rem);
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const FlexBox = styled.div<{ justify?: string; align?: string; gap?: string }>`
  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'center'};
  gap: ${props => props.gap || 'var(--space-sm, 0.5rem)'};
`;

export const Badge = styled.span<{ variant?: 'feriado' | 'prazo' | 'reuniao' | 'evento' }>`
  padding: var(--space-xs, 0.25rem) var(--space-sm, 0.5rem);
  border-radius: var(--border-radius-full, 999px);
  font-size: var(--font-size-xs, 0.75rem);
  font-weight: 500;
  
  ${props => {
    switch (props.variant) {
      case 'feriado':
        return `
          background-color: var(--color-error-bg, #fee2e2);
          color: var(--color-error, #ef4444);
        `;
      case 'prazo':
        return `
          background-color: var(--color-warning-bg, #fef3c7);
          color: var(--color-warning, #f59e0b);
        `;
      case 'reuniao':
      case 'evento':
      default:
        return `
          background-color: var(--color-info-bg, #eff6ff);
          color: var(--color-info, #3b82f6);
        `;
    }
  }}
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 1rem);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const CalendarMain = styled.div`
  flex: 2;
`;

export const CalendarSidebar = styled.div`
  flex: 1;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs, 0.25rem);
`;

export const CalendarHeader = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: var(--font-size-sm, 0.875rem);
  padding: var(--space-xs, 0.25rem);
`;

export const CalendarDay = styled.div<{ isCurrentMonth?: boolean; hasEvent?: boolean }>`
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: var(--border-radius-sm, 0.25rem);
  padding: var(--space-sm, 0.5rem);
  min-height: 3.5rem;
  background-color: ${props => props.isCurrentMonth ? 'var(--color-background-secondary, white)' : 'var(--color-background-third, #f9fafb)'};
  color: ${props => props.isCurrentMonth ? 'var(--color-text, #1f2937)' : 'var(--color-text-secondary, #6b7280)'};
  ${props => props.hasEvent ? 'box-shadow: 0 0 0 1px var(--color-info, #3b82f6);' : ''}
`;

export const CalendarDayNumber = styled.div`
  text-align: right;
  font-size: var(--font-size-sm, 0.875rem);
  margin-bottom: var(--space-xs, 0.25rem);
`;

export const EventItem = styled.div<{ tipo: string }>`
  font-size: var(--font-size-xs, 0.75rem);
  padding: 0 var(--space-xs, 0.25rem);
  border-radius: var(--border-radius-xs, 0.125rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  
  ${props => {
    switch (props.tipo) {
      case 'Feriado':
        return `
          background-color: var(--color-error-bg, #fee2e2);
          color: var(--color-error, #ef4444);
        `;
      case 'Prazo':
        return `
          background-color: var(--color-warning-bg, #fef3c7);
          color: var(--color-warning, #f59e0b);
        `;
      case 'Reunião':
      default:
        return `
          background-color: var(--color-info-bg, #eff6ff);
          color: var(--color-info, #3b82f6);
        `;
    }
  }}
`;

export const EventCard = styled.div`
  border-left: 4px solid var(--color-info, #3b82f6);
  padding-left: var(--space-md, 0.75rem);
  padding-top: var(--space-xs, 0.25rem);
  padding-bottom: var(--space-xs, 0.25rem);
  margin-bottom: var(--space-md, 0.75rem);
`;

export const EventTitle = styled.div`
  font-weight: 500;
`;

export const EventDate = styled.div`
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-text-secondary, #6b7280);
`;

export const EventTypeBadge = styled(Badge)`
  display: inline-block;
  margin-top: var(--space-xs, 0.25rem);
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid var(--color-border, #d1d5db);
  margin: var(--space-md, 1rem) 0;
`;

export const NewItemCard = styled.div`
  background-color: var(--color-background-secondary, white);
  border-radius: var(--border-radius-md, 0.375rem);
  padding: var(--space-lg, 1rem);
  border: 2px dashed var(--color-border, #d1d5db);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    border-color: var(--color-primary, #1d4ed8);
    background-color: var(--color-background-third, #f9fafb);
  }
`;

export const IconCircle = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-info-bg, #eff6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-sm, 0.5rem);
`;

export const NewItemText = styled.p`
  color: var(--color-primary, #1d4ed8);
  font-size: var(--font-size-lg, 1.125rem);
  font-weight: 500;
`;