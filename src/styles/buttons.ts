import styled, { css } from "styled-components";
import { flexRow } from "./layoutUtils";
import { BaseButton, buttonBaseCss } from "./baseComponents";
import { getButtonColor } from "../utils/styles";
import { constants } from "../utils/consts";
import { ButtonVariant } from "../types/ui/UIComponent";

type ButtonSize = 'xs' | "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  active?: boolean;
  disabled?: boolean;
}

interface TabButtonProps {
  active?: boolean;
}

const buttonSizes = {
  xs: css ``,
  sm: css`
    padding: ${constants.spacing.xs} ${constants.spacing.sm};
    font-size: ${constants.fontSize.xs};
  `,
  md: css`
    padding: ${constants.spacing.sm} ${constants.spacing.md};
    font-size: ${constants.fontSize.sm};
  `,
  lg: css`
    padding: ${constants.spacing.md} ${constants.spacing.lg};
    font-size: ${constants.fontSize.md};
  `,
};

const buttonVariants = {
  primary: css`
    background-color: ${constants.colors.primary};
    color: ${constants.colors.text.onPrimary};
    border: 1px solid ${constants.colors.primary};
  `,
  secondary: css`
    background-color: transparent;
    color: ${constants.colors.primary};
    border: 1px solid ${constants.colors.primary};
  `,
  third: css`
    background-color: ${constants.colors.background.third};
    color: ${constants.colors.text};
    border: 1px solid ${constants.colors.border.light};
  `,
  info: css`
    background-color: transparent;
    color: ${constants.colors.text};
    border: none;
  `,
  warning: css`
    background-color: ${constants.colors.status.error};
    color: white;
    border: 1px solid ${constants.colors.status.error};
  `,
  success: css``,
  error: css``,
  link: css``
};

// Button variants
export const Button = styled(BaseButton) <ButtonProps>`
  padding: var(--space-sm) var(--space-md);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-xs);
  width: ${props => props.fullWidth ? "100%" : "auto"};
  max-width: 13rem;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => buttonSizes[props.size || "md"]};
  ${props => buttonVariants[props.variant || "primary"]};

  ${({ variant = 'primary' }) => getButtonColor(variant)}
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary': return 'var(--color-primary)';
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      case 'info': return 'var(--color-info)';
      default: return 'var(--color-background-third)';
    }
  }};
  color: ${({ variant }) =>
    variant ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  
  &:hover:not(:disabled) {
    opacity: 0.8;
  };
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: var(--color-background-third);
          color: var(--color-text);
          border: 1px solid var(--color-border);
        `;
      case 'success':
        return `
          background-color: var(--color-success);
          color: var(--color-text-on-primary);
        `;
      case 'error':
        return `
          background-color: var(--color-error);
          color: var(--color-text-on-primary);
        `;
      case 'info':
        return `
          background-color: var(--color-info);
          color: var(--color-text-on-primary);
        `;
      case 'warning':
        return `
          background-color: var(--color-warning);
          color: var(--color-text-on-primary);
        `;
      case 'link':
        return `
          background-color: transparent;
          color: var(--color-primary);
          padding: 0;
          
          &:hover:not(:disabled) {
            text-decoration: underline;
          }
        `;
      default:
        return `
          background-color: var(--color-primary);
          color: var(--color-text-on-primary);
        `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'xs':
        return `
          padding: var(--space-xs) var(--space-sm);
          font-size: var(--font-size-xs);
        `;
      case 'sm':
        return `
          padding: var(--space-xs) var(--space-md);
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
  
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  }
`;

// Botão de ícone
export const IconButton = styled(Button)`
  ${flexRow}
  align-items: center;
  gap: var(--space-xs);
  background-color: transparent;
  color: var(--color-text);
  transition: all 0.2s;
  border-radius: var(--border-radius-sm);

  width: ${props => props.size === 'lg' ? '48px' : props.size === 'sm' ? '32px' : '40px'};
  height: ${props => props.size === 'lg' ? '48px' : props.size === 'sm' ? '32px' : '40px'};

  display: inline-flex;
  justify-content: center;

  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);
  padding: var(--space-xs);
  
  &.edit { color: ${constants.colors.status.info}; }
  &.delete { color: ${constants.colors.status.error}; }
  &.view { color: ${constants.colors.status.success}; }
  
  &:hover {
      opacity: 0.8;
      box-shadow: none;
    }
`;

// Botão de link estilizado
export const LinkButton = styled.button`
  background: transparent;
  border: none;
  padding: var(--space-xs) var(--space-sm);
  cursor: pointer;
  color: var(--color-primary);
  font-size: var(--font-size-md);
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const CloseButton = styled.button`
    top: var(--space-md);
    right: var(--space-md);
    background-color: transparent;
    border: none;
    font-size: var(--font-size-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.7rem;
    height: 2.7rem;
    border-radius: var(--border-radius-full);
    cursor: pointer;
    color: var(--color-text);
    transition: all 0.2s;

    &:hover {
        transform: rotate(90deg);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const ActionButton = styled(BaseButton)`
  padding: ${constants.spacing.xs} ${constants.spacing.md};
  border: none;
  border-radius: ${constants.borderRadius.sm};
  
  background-color: ${constants.colors.primary};
  color: ${constants.colors.text.onPrimary};
  cursor: pointer;
  display: flex;
  transition: background-color ${constants.transitions.fast};
  font-size: ${constants.fontSize.sm};
  align-items: center;
  gap: var(--space-sm);
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(ActionButton)`
    background-color: var(--color-secondary);
    color: var(--color-text-button);
`;

// Novo botão para ações em destaque
export const PrimaryActionButton = styled(ActionButton)`
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
    box-shadow: var(--shadow-sm);
    color: var(--color-text-on-primary);
    max-width: 13rem;
    border: none;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(ActionButton)`
  ${buttonBaseCss}
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
`;

// Botão com indicador de carregamento
export const LoadingButton = styled(Button)`
    position: relative;
    
    &.loading {
        color: transparent;
        pointer-events: none;
        
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s linear infinite;
        }
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

export const TabButton = styled.button<TabButtonProps>`
    padding: var(--space-sm) var(--space-md);
    border: none;
    background-color: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
    color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;
    
    &:hover:not(:disabled) {
        background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-background-third)'};
    }
    
    &.atividade {
        &:hover {
            color: var(--color-success);
        }
        ${props => props.active && `
            background-color: var(--color-success);
            &:hover {
                background-color: var(--color-success-hover);
                color: var(--color-text-on-primary);
            }
        `}
    }
    
    &.avaliacao {
        &:hover {
            color: var(--color-error);
        }
        ${props => props.active && `
            background-color: var(--color-error);
            &:hover {
                background-color: var(--color-error-hover);
                color: var(--color-text-on-primary);
            }
        `}
    }
    
    &.evento {
        &:hover {
            color: var(--color-info);
        }
        ${props => props.active && `
            background-color: var(--color-info);
        `}
    }
`;

export const ViewToggleButton = styled.button<{ active: boolean }>`
  padding: ${constants.spacing.xs} ${constants.spacing.md};
  border-radius: ${constants.borderRadius.sm};
  font-size: ${constants.fontSize.sm};
  cursor: pointer;
  transition: all ${constants.transitions.fast};
  background-color: ${props => props.active ? constants.colors.primary : constants.colors.background.third};
  color: ${props => props.active ? constants.colors.text.onPrimary : constants.colors.text.secondary};
  border: 1px solid ${props => props.active ? constants.colors.primary : constants.colors.border.main};
  margin-right: ${constants.spacing.xs};
  
  &:hover {
    background-color: ${props => props.active ? constants.colors.primaryHover : constants.colors.border.light};
  }
`;

export const FilterButton = styled(Button)<{ active?: boolean }>`
  background-color: ${props => props.active ? constants.colors.primary : constants.colors.background.third};
  color: ${props => props.active ? constants.colors.text.onPrimary : constants.colors.text.secondary};
  border: 1px solid ${props => props.active ? constants.colors.primary : constants.colors.border.light};
  font-size: ${constants.fontSize.sm};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: ${constants.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${props => props.active ? constants.colors.primary : constants.colors.background.secondary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
  width: 100%;
  
  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: var(--font-size-sm);
    
    &:focus-visible {
      outline: 2px solid var(--color-primary-light);
      outline-offset: 2px;
    }
    
    &.secondary {
      background-color: var(--color-background-third);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border);
      
      &:hover {
        background-color: var(--color-border-light);
        border-color: var(--color-border-dark);
      }
      
      &:active {
        transform: translateY(1px);
      }
    }
    
    &:not(.secondary) {
      background-color: var(--color-primary);
      color: var(--color-text-on-primary);
      
      &:hover {
        background-color: var(--color-primary-hover);
        box-shadow: var(--shadow-sm);
      }
      
      &:disabled {
        background-color: var(--color-border);
        cursor: not-allowed;
        opacity: 0.7;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;
