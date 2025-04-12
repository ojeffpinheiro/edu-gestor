import styled from "styled-components";

export const CancelButton = styled.button`
  background-color: var(--color-secondary);
  color: var(--color-text-button);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-md);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  
  &:hover {
    background-color: var(--color-secondary-hover);
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;


export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  
  @media (max-width: 576px) {
    flex-direction: column-reverse;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-md);
  
  label {
    display: block;
    margin-bottom: var(--space-xs);
    color: var(--color-text-secondary);
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-md);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
  
  textarea {
    resize: vertical;
  }
`;

export const RemoveVariableButton = styled.button`
  background-color: var(--color-error);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-error-hover);
  }
  
  &:disabled {
    background-color: var(--color-text-third);
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    margin-top: var(--space-xs);
  }
`;

export const VariableInput = styled.div`
  label {
    display: block;
    margin-bottom: var(--space-xs);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
  
  input {
    width: 100%;
    padding: var(--space-xs) var(--space-sm);
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-md);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
`;

export const VariableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr auto;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const VariablesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  
  h3 {
    margin: 0;
    color: var(--color-text);
  }
  
  button {
    background-color: var(--color-secondary);
    color: var(--color-text-button);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    
    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }
`;

export const VariablesSection = styled.div`
  margin-bottom: var(--space-lg);
  padding: var(--space-md);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
`;
