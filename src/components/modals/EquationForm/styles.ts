import styled from "styled-components";


export const RemoveVariableButton = styled.button`
  background-color: var(--color-error);
  color: var(--color-title-card)
  border: none;
  border-radius: var(--border-radius-sm);
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: var(--space-xs);
  
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
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }
`;

export const VariablesContainer = styled.div`
  margin-top: var(--space-md);
`;

export const AddVariableButton = styled.button`
  background-color: var(--color-background-secondary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-xs) var(--space-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third);
    color: var(--color-text);
  }
`;

export const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding: var(--space-sm);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  min-height: 42px;
  
  &:focus-within {
    border-color: var(--color-primary);
  }
  
  input {
    flex: 1;
    min-width: 100px;
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
  }
`;

export const Tag = styled.div`
  background-color: var(--color-background-secondary);
  color: var(--color-text-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  span {
    cursor: pointer;
    
    &:hover {
      color: var(--color-danger);
    }
  }
`;

export const PreviewHeader = styled.h3`
  margin-top: 0;
  margin-bottom: var(--space-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
`;
