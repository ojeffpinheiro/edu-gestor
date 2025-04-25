// formControls.ts
import styled, { css } from "styled-components";
import { BaseInput } from "./baseComponents";

// Shared input styles
const inputBase = css`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);
  font-size: var(--font-size-md);
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled):not(:focus) {
    border-color: var(--color-input-border-dark);
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

export const Input = styled(BaseInput)`
  ${inputBase}
`;

export const TextArea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 100px;
`;

export const Select = styled.select`
  ${inputBase}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 16px 12px;
  padding-right: 2.5rem;
`;

export const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
  transition: color 0.2s ease;

  .required {
        color: var(--color-error);
        margin-left: 4px;
    }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-lg);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${Label} + ${Input}, ${Label} + ${TextArea}, ${Label} + ${Select} {
    margin-top: var(--space-xs);
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-md);
`;

export const FormError = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
`;


export const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-md, 1rem);
    padding: var(--space-lg);
    background-color: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    margin-bottom: var(--space-lg);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    
    &:hover {
        box-shadow: var(--shadow-md);
        border-left-color: var(--color-primary);
        transform: translateY(-2px);
    }
`;

export const FormSectionTitle = styled.h2`
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-bottom: var(--space-xs);
    display: flex;
    align-items: center;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 50px;
        height: 3px;
        background-color: var(--color-primary);
        border-radius: 3px;
    }
    
    .section-status {
        margin-left: var(--space-sm);
        display: inline-flex;
        align-items: center;
    }
`;

export const FormSectionDescription = styled.p`
    color: var(--color-text-secondary);
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-md);
    line-height: 1.5;
`;

export const InputGroup = styled.div`
    margin-bottom: var(--space-md, 1rem);
    position: relative;
    
    &:last-child {
        margin-bottom: 0;
    }
    
    &.mt-6 {
        margin-top: var(--space-2xl, 3rem);
    }
    
    .space-y-2 {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm, 0.5rem);
    }
    
    .flex.items-center {
        display: flex;
        align-items: center;
        gap: var(--space-sm, 0.5rem);
    }
    
    .ml-2 {
        margin-left: var(--space-sm, 0.5rem);
    }
    
    .error-tooltip {
        position: absolute;
        right: 0;
        top: 0;
        color: var(--color-error);
        cursor: pointer;
    }
`;