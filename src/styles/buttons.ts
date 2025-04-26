import styled from "styled-components";
import { BaseButton } from "./baseComponents";
import { getButtonColor } from "../utils/styles";

interface TabButtonProps {
    active?: boolean;
}

export const Button = styled(BaseButton)<{ variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info" }>`
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text-on-primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .75rem;
  max-width: 13rem;
  justify-content: center;
  position: relative;
  overflow: hidden;

  ${({ variant = 'primary' }) => getButtonColor(variant)}
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
        background-color: var(--color-button);
        transform: rotate(90deg);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const ActionButton = styled(BaseButton)`
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  white-space: nowrap;
`;

export const CancelButton = styled(ActionButton)`
    background-color: var(--color-secondary);
    color: var(--color-text-button);
    
    &:hover:not(:disabled) {
        background-color: var(--color-secondary-hover);
    }
`;

// Novo botão para ações em destaque
export const PrimaryActionButton = styled(ActionButton)`
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
    box-shadow: var(--shadow-sm);
    max-width: 13rem;
    
    &:hover:not(:disabled) {
        box-shadow: var(--shadow-md);
    }
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

// Botão de link estilizado
export const LinkButton = styled.button`
    background: transparent;
    border: none;
    color: var(--color-primary);
    padding: var(--space-xs) var(--space-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    
    &:hover {
        color: var(--color-primary-hover);
        text-decoration: underline;
    }
    
    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

// Botão de ícone
export const IconButton = styled.button`
    width: 2.7rem;
    height: 2.7rem;
    border-radius: var(--border-radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: var(--color-text);
    transition: all 0.2s;
    
    &:hover {
        background-color: var(--color-button);
    }
    
    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
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
    
    &:hover {
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
            &:hover {
                background-color: var(--color-info-hover);
                color: var(--color-text-on-primary);
            }
        `}
    }
`;