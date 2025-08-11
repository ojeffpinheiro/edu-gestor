// formControls.ts
import styled, { css } from "styled-components";
import { constants } from "../utils/consts";

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

export const Input = styled.input<{
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'filled';
  error?: boolean;
}>`
  width: 100%;
  font-family: inherit;
  transition: all 0.2s ease;
  
  ${props => {
    switch(props.size) {
      case 'sm':
        return `
          padding: var(--space-xs) var(--space-sm);
          font-size: var(--font-size-sm);
        `;
      case 'lg':
        return `
          padding: var(--space-md) var(--space-lg);
          font-size: var(--font-size-lg);
        `;
      default:
        return `
          padding: var(--space-sm) var(--space-md);
          font-size: var(--font-size-md);
        `;
    }
  }}
  
  ${props => {
    switch(props.variant) {
      case 'bordered':
        return `
          border: 2px solid var(--color-border);
          background-color: transparent;
        `;
      case 'filled':
        return `
          border: 1px solid transparent;
          background-color: var(--color-background-third);
        `;
      default:
        return `
          border: 1px solid var(--color-border);
          background-color: var(--color-input);
        `;
    }
  }}
  
  border-radius: var(--border-radius-md);
  color: var(--color-text);
  
  ${props => props.error && `
    border-color: var(--color-error);
  `}
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
  
  &:hover:not(:focus) {
    border-color: ${constants.colors.border.light};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${constants.colors.background.third};
  }
`;

export const TextArea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 100px;
`;

// background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
export const Select = styled.select`
  ${inputBase}
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 16px 12px;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-md);
  background-color: var(--color-input);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  color: var(--color-text);
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8.825L2.175 5 3.05 4.125 6 7.075 8.95 4.125 9.825 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }

  &:hover:not(:focus) {
    border-color: ${constants.colors.border.light};
  }
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
  margin-bottom: var(--space-md);
  
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
    border-radius: var(--border-radius-md);
    margin-bottom: var(--space-lg);
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

export const FormInput = styled.input`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  
  &:focus {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const FormSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;


  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: var(--color-primary);
      
      &:before {
        transform: translateX(26px);
      }
    }
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
      background-color: var(--color-background-secondary);
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

export const SearchInput = styled(Input)`
  padding-left: 2.5rem;
`;


export const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  
  svg {
    position: absolute;
    left: ${constants.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${constants.colors.text.third};
  }
`;