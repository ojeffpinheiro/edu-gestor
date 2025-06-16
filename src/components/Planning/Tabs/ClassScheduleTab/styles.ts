import styled from 'styled-components';
import { Container } from '../../../../styles/layoutUtils';
import { Card } from '../../../../styles/card';
import { Table, TableCell, TableHeader, TableRow } from '../../../../styles/table';
import { Button } from '../../../../styles/buttons';
import { Input, Select } from '../../../../styles/inputs';

export const ModernContainer = styled(Container)`
  max-width: 1200px;
  padding: 2rem 1rem;
`;

export const ModernCard = styled(Card)`
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 2rem;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

export const ModernTable = styled(Table)`
  border-radius: 8px;
  overflow: hidden;
  
  ${TableHeader} {
    background: var(--gradient-primary);
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 1rem;
  }
  
  ${TableCell} {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border-light);
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: var(--color-primary-light);
    }
  }
  
  ${TableRow}:nth-child(even) {
    background-color: var(--color-background-secondary);
  }
  
  ${TableRow}:hover {
    background-color: var(--color-background-third);
  }
`;

export const ModernButton = styled(Button)`
  background: var(--gradient-primary);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: var(--shadow-sm);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const ModernInput = styled(Input)`
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const ModernSelect = styled(Select)`
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const ScheduleContainer = styled(Container)`
  max-width: 1200px;
  padding: 1rem;
`;

export const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const AddButton = styled(Button)`
  background: var(--gradient-primary);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  gap: 1px;
  background-color: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
`;

export const TimeSlotCell = styled.div`
  background: var(--color-background);
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  border-right: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
`;

export const DayHeader = styled.div`
  background: var(--gradient-primary);
  color: var(--color-text-on-primary);
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
`;

export const LessonCell = styled.div<{ isEmpty?: boolean }>`
  background: ${props => props.isEmpty ? 'var(--color-background-secondary)' : 'var(--color-card)'};
  padding: 0.75rem;
  min-height: 80px;
  border-right: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
  position: relative;
  transition: all 0.2s ease;

  ${props => !props.isEmpty && `
    &:hover {
      background: var(--color-primary-light);
      cursor: pointer;
    }
  `}
`;

export const LessonInfo = styled.div`
  font-size: 0.875rem;
  
  strong {
    display: block;
    margin-bottom: 0.25rem;
  }
`;

export const EmptyCell = styled.div`
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: var(--color-background);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-title-card);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  
  &:hover {
    color: var(--color-text);
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
