import styled from 'styled-components';
import { BaseButton, BaseInput } from '../../styles/baseComponents';

// Form styled components
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
`;

export const FormTitle = styled.h2`
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: var(--font-size-xl);
  
  &:hover {
    color: var(--color-text-primary);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

export const Label = styled.label`
  font-weight: 500;
  color: var(--color-text-primary);
`;

export const Input = styled(BaseInput)`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  background-color: var(--color-input);
  color: var(--color-text);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  min-height: 100px;
  resize: vertical;
  background-color: var(--color-input);
  color: var(--color-text);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin: 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-lg);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-md);
`;

export const SaveButton = styled(BaseButton)`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:hover:not(:disabled) {
    background-color: var(--color-background-third);
  }
`;

export const DeleteButton = styled(BaseButton)`
  background-color: var(--color-error);
  color: white;
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:hover:not(:disabled) {
    background-color: var(--color-error-hover);
  }
`;