import styled, { css } from 'styled-components';
import { fadeIn, slideUp } from '../../../styles/animations';
import Button from '../../shared/Button';

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

export const FormCard = styled.section`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  animation: ${slideUp} 0.3s ease;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  color: var(--color-text-primary);
`;

export const ValidationError = styled.div`
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  animation: ${fadeIn} 0.3s ease;
  
  svg {
    flex-shrink: 0;
  }
`;

// Componentes para campos radio
export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-right: var(--space-md);
  
  input[type="radio"] {
    accent-color: var(--color-primary);
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:checked {
      border-color: #3f51b5;
      
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #3f51b5;
        transition: all 0.2s ease;
        box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
        animation: ${fadeIn} 0.2s ease;
      }
    }
    
    &:hover:not(:checked) {
      border-color: #9fa8da;
    }
  }
  
  label {
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    cursor: pointer;
  }
`;

export const StatusToggle = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--space-md);
  gap: var(--space-md);
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-bottom: var(--space-md);
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  bottom: var(--space-md);
  right: var(--space-md);
  background-color: var(--color-danger);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--space-xs) var(--space-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-danger-dark);
  }
`;

export const FormSection = styled.div`
  margin-bottom: var(--space-xl);
  
  h3 {
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-xs);
    border-bottom: 1px solid var(--color-border-light);
    font-size: var(--font-size-md);
    font-weight: 600;
    color: var(--color-text-primary);
  }
`;

// Estilos para alternativas
export const AlternativesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin: var(--space-md) 0;
`;

export const AlternativeItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-sm);
  padding: var(--space-sm);
  border: 1px solid var(--color-border-light);
  transition: all 0.2s;
  
  &.correct {
    border-color: var(--color-success);
    background-color: var(--color-success-light);
  }
  
  &:hover {
    box-shadow: var(--shadow-sm);
  }
`;

export const DragHandle = styled.div`
  cursor: grab;
  color: var(--color-text-third);
  display: flex;
  align-items: center;
  padding: 0 var(--space-xs);
  
  &:active {
    cursor: grabbing;
  }
`;

export const AlternativeContent = styled.div`
  flex: 1;
  
  input {
    width: 100%;
  }
`;

export const AlternativeActions = styled.div`
  display: flex;
  gap: var(--space-xs);
  align-items: center;
  
  button {
    padding: 6px;
    background: none;
    color: #555;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.05);
      color: #333;
    }
    
    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const CorrectBadge = styled.span`
  background-color: var(--color-success);
  color: white;
  font-size: var(--font-size-sm);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  
  font-weight: 500;
`;

export const ImageUploadContainer = styled.div`
  border: 2px dashed var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--color-background-primary);
  
  &:hover {
    border-color: var(--color-primary);
    background-color: var(--color-background-hover);
  }
  
  p {
    margin: var(--space-md) 0 var(--space-xs) 0;
    font-weight: 500;
    color: var(--color-text-secondary);
  }
  
  small {
    color: var(--color-text-third);
  }
  
  svg {
    color: var(--color-text-third);
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: var(--space-md);
`;

export const StepItem = styled.div<{ active: boolean, completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  
  ${props => props.active && css`
    color: var(--color-primary);
    font-weight: 600;
  `}
  
  ${props => props.completed && css`
    color: var(--color-success);
  `}
  
  ${props => !props.active && !props.completed && css`
    color: var(--color-text-third);
  `}
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 12px;
    right: -50%;
    width: 100%;
    height: 2px;
    background-color: ${props => props.completed ? 'var(--color-success)' : 'var(--color-border-light)'};
    z-index: 1;
  }
`;

export const StepCircle = styled.div<{ active: boolean, completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props =>
    props.active ? 'var(--color-primary)' :
      props.completed ? 'var(--color-success)' : 'var(--color-background-secondary)'
  };
  color: ${props => (props.active || props.completed) ? 'white' : 'var(--color-text-third)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-xs);
  border: 2px solid ${props =>
    props.active ? 'var(--color-primary)' :
      props.completed ? 'var(--color-success)' : 'var(--color-border-light)'
  };
  z-index: 2;
  transition: all 0.3s ease;
  
  svg {
    font-size: 14px;
  }
`;

export const StepLabel = styled.span`
  font-size: var(--font-size-sm);
  text-align: center;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StepControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-lg);
`;

export const StepContent = styled.div`
  animation: ${fadeIn} 0.4s ease;
`;

export const StepperButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;