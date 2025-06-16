import styled from 'styled-components';
import { Grid } from '../../../../styles/layoutUtils';


export const Card = styled.div`
  background: var(--glass-background);
  backdrop-filter: var(--backdrop-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-xl);
  margin-bottom: 1rem;
`;

export const Content = styled(Grid)`
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 1rem 0;
`;

export const CardTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.025em;
  margin-bottom: 1.5rem;
  color: var(--color-title-card);
`;

export const CheckboxContainer = styled.div`
  transition: var(--transition-all);
  &:hover {
    transform: scale(1.02);
    background-color: var(--color-input);
  }
`;

export const Checkbox = styled.div<{ checked: boolean }>`
  background: ${props => props.checked 
    ? 'var(--gradient-primary)' 
    : 'transparent'};
  
  transition: var(--transition-bounce);
  &:active {
    transform: scale(0.95);
  }
`;

export const CheckboxLabel = styled.span<{ checked: boolean }>`
  font-size: 0.9375rem;
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  color: ${props => props.checked ? 'var(--color-text-secondary, #888)' : 'var(--color-text, #333)'};
  transition: all 0.2s ease-in-out;
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const DayCard = styled.div`
  background: var(--glass-background);
  backdrop-filter: var(--backdrop-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 0.75rem;
`;

export const DayTitle = styled.h4`
  font-family: var(--font-family-display);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.015em;
`;

export const ClassItem = styled.div`
  transition: var(--transition-all);
  color: var(--color-text);
  background: var(--gradient-surface);
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ClassTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const ClassTime = styled.div`
  font-size: 0.75rem;
    color: var(--color-text-secondary, #888);
  margin-bottom: 0.25rem;
`;

export const ClassInfo = styled.div`
    color: var(--color-text-secondary, #888);
    
    font-size: 0.8rem;
    margin-top: var(--space-xs, 0.25rem);
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto repeat(5, 1fr);
  gap: 0.5rem;
  overflow-x: auto;
  background: var(--color-background-secondary);
  border-radius: var(--radius-lg);
  padding: 1rem;
  box-shadow: var(--shadow-md);
`;

export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DayHeader = styled.div`
  font-weight: var(--font-weight-semibold);
  text-align: center;
  padding: 0.75rem;
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  border-radius: var(--radius-md);
  position: sticky;
  top: 0;
`;

export const TimeLabel = styled.div`
  padding: 0.75rem;
  text-align: right;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid var(--color-border-light);
`;

export const HourSlot = styled.div`
  height: 60px;
  padding: 0.25rem;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: var(--transition-all);
  
  &:hover {
    background: var(--color-surface-elevated);
    box-shadow: var(--shadow-sm);
  }
`;

export const AddButton = styled.button`
  background: var(--gradient-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--radius-full);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-all);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background: var(--color-background);
  border-radius: var(--radius-xl);
  width: 90%;
  max-width: 500px;
  box-shadow: var(--shadow-2xl);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalClose = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: var(--font-size-xl);
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalForm = styled.form`
  display: grid;
  gap: 1rem;
`;

export const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  transition: var(--transition-all);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const FormSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  transition: var(--transition-all);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const FormButton = styled.button`
  padding: 0.75rem;
  background: var(--gradient-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-all);
  margin-top: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;