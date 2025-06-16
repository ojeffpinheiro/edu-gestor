import styled from "styled-components";
import { Button } from "../../../../styles/buttons";

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);

  @media (max-width: var(--breakpoint-md)) {
    grid-template-columns: 1fr;
  }
`;

export const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const TeamIcon = styled.span`
  margin-right: var(--space-sm);
  color: var(--color-text-secondary);
  display: inline-flex;
  align-items: center;
`;

export const SectionTitle = styled.h4`
  font-weight: 500;
  margin: var(--space-md) 0 var(--space-sm);
  color: var(--color-text-secondary);
`;

export const ClassesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

export const ClassItem = styled.div`
  background-color: var(--color-background-secondary);
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
`;

export const ClassHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-xs);
  font-weight: 500;
`;

export const ClassTime = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
`;

export const EditButton = styled.button`
  margin-top: var(--space-md);
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  padding: var(--space-xs) 0;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-primary-hover);
    text-decoration: underline;
  }
`;

export const AddCard = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-xl);
  border: 2px dashed var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    background-color: var(--color-background-secondary);
  }
`;

export const AddContent = styled.div`
  text-align: center;
`;

export const IconCircle = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--border-radius-full);
  background-color: var(--color-background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-sm);
  color: var(--color-primary);
`;

export const AddText = styled.p`
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--color-primary);
`;

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: #2d3748;
  font-weight: 600;
`;

export const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const TeamCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const TeamTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const TeamSession = styled.span`
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

export const TeamDetails = styled.div`
  margin-bottom: 1.5rem;
`;

export const DetailItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const DetailLabel = styled.span`
  font-weight: 500;
  color: #4a5568;
  margin-right: 0.5rem;
`;

export const DetailValue = styled.span`
  color: #2d3748;
`;

export const TeamActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
  h2 {
    font-size: 1.5rem;
    color: #2d3748;
    margin: 0;
  }
`;

export const FormGroup = styled.div<{ fullWidth?: boolean }>`
  margin-bottom: 1rem;
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'auto'};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

export const FileInput = styled.label`
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px dashed #cbd5e0;
  border-radius: 0.375rem;
  background-color: #f7fafc;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #a0aec0;
    background-color: #edf2f7;
  }
  
  input {
    display: none;
  }
`;

export const ObjectivesSection = styled.div`
  margin-top: 1.5rem;
  h3 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }
`;

export const ObjectiveInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const AddButton = styled.button`
  padding: 0 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #3182ce;
  }
`;

export const ObjectivesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ObjectiveItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #edf2f7;
`;

export const Checkbox = styled.input`
  margin-right: 0.75rem;
`;

export const ObjectiveText = styled.span<{ completed: boolean }>`
  flex: 1;
  color: ${props => props.completed ? '#a0aec0' : '#2d3748'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;