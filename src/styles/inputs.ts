import styled from "styled-components";
import { BaseInput } from "./baseComponents";

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