import styled from "styled-components";
import { getButtonColor } from "../utils/styles";

export const Button = styled.button<{ variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info" }>`
    padding: var(--space-sm) var(--space-md);
    border: none;
    border-radius: var(--border-radius-md); // Aumentado para uma aparência mais moderna
    cursor: pointer;
    font-weight: 500;
    font-size: var(--font-size-sm);
    color: var(--color-text-on-primary);
    transition: all 0.2s ease;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .75rem;
    max-width: 13rem;
    justify-content: center;
    position: relative;
    overflow: hidden;

    ${({ variant = 'primary' }) => getButtonColor(variant)}

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-sm);
    }
    
    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
        opacity: 0.7;
    }
    
    // Efeito de ripple ao clicar
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%, -50%);
        transform-origin: 50% 50%;
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
    width: 36px;
    height: 36px;
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

export const ActionButton = styled.button`
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-size: var(--font-size-md);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    transition: all 0.3s;
    white-space: nowrap;
    position: relative;
    overflow: hidden;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-2px);
        box-shadow: var(--shadow-sm);
    }
    
    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
        opacity: 0.7;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
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
    width: 40px;
    height: 40px;
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