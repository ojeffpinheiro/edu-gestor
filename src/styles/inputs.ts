import styled from "styled-components";
import { BaseInput } from "./baseComponents";
import { flexRow } from "./layoutUtils";
import { slideIn } from "./animations";

export const Input = styled(BaseInput)`
  font-size: var(--font-size-md);
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled):not(:focus) {
    border-color: var(--color-input-border-dark, var(--color-primary-hover));
  }
  
  &:focus {
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: var(--color-text-third);
    transition: opacity 0.2s ease;
  }
  
  &:focus::placeholder {
    opacity: 0.7;
  }
`;

export const Label = styled.label`
    display: block;
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xs);
    transition: color 0.2s ease;
    
    &:has(+ input:focus) {
        color: var(--color-primary);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-input);
    color: var(--color-text);
    font-size: var(--font-size-md);
    resize: vertical;
    min-height: 100px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled):not(:focus) {
        border-color: var(--color-input-border-dark, var(--color-primary-hover));
    }

    &:focus {
        outline: none;
        border-color: var(--color-input-focus);
        box-shadow: var(--shadow-focus);
        transform: translateY(-1px);
    }
    
    &:disabled {
        background-color: var(--color-background-third);
        cursor: not-allowed;
        opacity: 0.7;
    }
    
    &::placeholder {
        color: var(--color-text-third);
        transition: opacity 0.2s ease;
    }
    
    &:focus::placeholder {
        opacity: 0.7;
    }
`;

export const InputRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-md);
`;

export const InputGroup = styled.div`
    margin-bottom: var(--space-md);
    
    &:last-child {
        margin-bottom: 0;
    }
    
    &.mt-6 {
        margin-top: var(--space-2xl);
    }
    
    .space-y-2 {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }
    
    .flex.items-center {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
    }
    
    .ml-2 {
        margin-left: var(--space-sm);
    }
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  color: var(--color-text);
  font-size: var(--font-size-base);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--border-radius-sm); 
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-input);
`;

export const Checkbox = styled.div<{ checked: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--border-radius-sm);
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.checked
    ? 'var(--color-primary, #4a6fa5)'
    : 'transparent'};
  border: 1px solid ${props => props.checked
    ? 'var(--color-primary, #4a6fa5)'
    : 'var(--color-border, #ccc)'};
`;

export const CheckboxLabel = styled.span<{ checked: boolean }>`
  font-size: 0.9375rem;
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  color: ${props => props.checked ? 'var(--color-text-secondary, #888)' : 'var(--color-text, #333)'};
  transition: all 0.2s ease-in-out;
`;

export const SwitchRow = styled.div`
  ${flexRow}
  margin-bottom: var(--space-md);
  animation: ${slideIn} 0.3s ease-out;
  
  label {
    margin-left: var(--space-sm);
    color: var(--color-text);
    cursor: pointer;
    user-select: none;
  }
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-border);
    transition: .4s;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--color-primary);
    
    &:before {
      transform: translateX(26px);
    }
  }
  
  input:focus + span {
    box-shadow: var(--shadow-focus);
  }
`;