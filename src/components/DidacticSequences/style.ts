import styled from "styled-components";
import { Input } from "../../styles/inputs";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
`;

const DisciplineTag = styled.span`
  background-color: #e0f7fa;
  color: #00838f;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
`;

const AudienceTag = styled.span`
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-left: 0.5rem;
`;

const Overview = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #777;
`;

const Duration = styled.span`
  display: flex;
  align-items: center;
  
  &:before {
    content: '⏱️';
    margin-right: 0.25rem;
  }
`;

const StageCount = styled.span`
  display: flex;
  align-items: center;
  
  &:before {
    content: '📋';
    margin-right: 0.25rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const EditButton = styled(Button)`
  background-color: #e3f2fd;
  color: #1976d2;
  border: none;
  
  &:hover {
    background-color: #bbdefb;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ffebee;
  color: #d32f2f;
  border: none;
  
  &:hover {
    background-color: #ffcdd2;
  }
`;

const FormContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #eee;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: var(--space-md);
`;

const StageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StageTitle = styled.h3`
  font-size: 1.125rem;
  color: #444;
  margin: 0;
`;

const RemoveButton = styled.button`
  background-color: #f8d7da;
  color: #d32f2f;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f5c2c7;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Chip = styled.div`
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 0.5rem;
  border-radius: 16px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`;

const AddItemContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

// NEW
const FormTitle = styled.h2`
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
  font-weight: 600;
`;
const SectionTitle = styled.h3`
  color: var(--color-info);
  font-size: 1.125rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const FormColumn = styled.div`
  flex: 1;
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const SubmitButton = styled(Button)`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const ChipDeleteButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(25, 118, 210, 0.1);
  }
`;

const AddItemInput = styled(Input)`
  flex-grow: 1;
`;

const AddItemButton = styled.button`
  background-color: #e3f2fd;
  color: #1976d2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #bbdefb;
  }
`;

export const SequenceCardStyle = {
  Card,
  StageCount,
  ButtonGroup,
  Button,
  EditButton,
  DeleteButton,
  AudienceTag,
  Duration,
  MetaInfo,
  Overview,
  DisciplineTag,
  Title,
  CardHeader
};

const FormSection = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: white;
  `;

export const StageFormStyle = {
  FormContainer,
  FormGroup,
  StageHeader,
  StageTitle,
  RemoveButton,
  AddItemButton,
  AddItemInput,
  AddItemContainer,
  Chip,
  ChipContainer,
  FormSection,
  SectionTitle,
  ChipDeleteButton
}

export const SequenceFormStyle = {
  FormContainer,
  FormTitle,
  SectionTitle,
  FormGroup,
  FormRow,
  FormColumn,
  ErrorMessage,
  ButtonGroup,
  SubmitButton,
  ChipContainer,
  Chip,
  FormSection,
  ChipDeleteButton,
  AddItemContainer,
  AddItemInput,
  AddItemButton,

  SuccessMessage: styled.div`
    align-items: center;
    background-color: #d1fae5;
    border-radius: 0.25rem;
    color: #047857;
    display: flex;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    
    svg {
      margin-right: 0.5rem;
    }
  `,

  // Novos componentes para a navegação de etapas e para manter consistência com EvaluationForm
  FormStepsNav: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
  `,

  FormStepButton: styled.button<{ $isActive: boolean; $isValid: boolean }>`
    background: ${props => props.$isActive ? '#f0f9ff' : 'white'};
    border: 1px solid ${props => props.$isActive ? '#3b82f6' : props.$isValid ? '#10b981' : '#e5e7eb'};
    border-radius: 0.5rem;
    color: ${props => props.$isActive ? '#3b82f6' : props.$isValid ? '#10b981' : '#4b5563'};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
    transition: all 0.2s;
    min-width: 5.5rem;
    position: relative;
    
    &:hover {
      background: ${props => props.$isActive ? '#e0f2fe' : '#f9fafb'};
    }
    
    .step-icon {
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
    }
    
    .step-text {
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .status-indicator {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #10b981;
      color: var(--color-text-on-primary);
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 0.625rem;
    }
  `,

  FormStepDivider: styled.div`
    height: 1px;
    background-color: #e5e7eb;
    flex-grow: 1;
    margin: 0 0.5rem;
    align-self: center;
  `,

  FormProgress: styled.div`
    width: 100%;
    height: 0.5rem;
    background-color: #f3f4f6;
    border-radius: 9999px;
    margin-bottom: 1.5rem;
    overflow: auto;
  `,

  FormProgressIndicator: styled.div<{ progress: number }>`
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #3b82f6;
    border-radius: 9999px;
    transition: width 0.3s ease;
  `,

  // Para os botões de navegação
  NavigationButtons: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    button {
      margin-left: 0.5rem;
    }
  `,

  // Mantenha os outros componentes de estilo existentes aqui...

  AddButton: styled.button`
    background-color: #f3f4f6;
    border: 1px dashed #9ca3af;
    border-radius: 0.375rem;
    color: #4b5563;
    cursor: pointer;
    display: block;
    font-weight: 500;
    margin-top: 1rem;
    padding: 0.625rem 1rem;
    text-align: center;
    transition: all 0.2s;
    width: 100%;
    
    &:hover {
      background-color: #e5e7eb;
      color: #1f2937;
    }
  `,

  // Seção exibida quando há erro no formulário
  ErrorSection: styled.div`
    background-color: #fee2e2;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    
    h4 {
      color: #b91c1c;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    ul {
      color: #b91c1c;
      list-style-type: disc;
      margin-left: 1.5rem;
    }
  `
}