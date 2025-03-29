// src/components/modals/EvaluationForm/styles.ts
import styled, { css } from "styled-components";
import { fadeIn, pulse, shake } from "../../../styles/animations";

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

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-lg, 1.5rem);
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
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

export const Label = styled.label`
    display: block;
    font-size: var(--font-size-sm, 0.875rem);
    font-weight: 500;
    color: var(--color-text-secondary, #4a5568);
    margin-bottom: var(--space-xs, 0.25rem);
    
    .required {
        color: var(--color-error);
        margin-left: 4px;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: var(--space-sm, 0.5rem) var(--space-md);
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--border-radius-md, 0.375rem);
    background-color: var(--color-input, #ffffff);
    color: var(--color-text, #2d3748);
    font-size: var(--font-size-md, 1rem);
    transition: all 0.2s ease-in-out;
    line-height: 1.5;

    &:focus {
        outline: none;
        border-color: var(--color-primary, #4299e1);
        box-shadow: var(--shadow-focus, 0 0 0 3px rgba(66, 153, 225, 0.2));
    }
    
    &::placeholder {
        color: var(--color-text-third, #a0aec0);
    }
    
    &:disabled {
        background-color: var(--color-background-third);
        cursor: not-allowed;
        opacity: 0.8;
    }
    
    &.error {
        border-color: var(--color-error);
        animation: ${shake} 0.5s ease-in-out;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: var(--space-sm, 0.5rem) var(--space-md);
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--border-radius-md, 0.375rem);
    background-color: var(--color-input, #ffffff);
    color: var(--color-text, #2d3748);
    font-size: var(--font-size-md, 1rem);
    resize: vertical;
    min-height: 100px;
    transition: all 0.2s ease-in-out;
    line-height: 1.5;

    &:focus {
        outline: none;
        border-color: var(--color-primary, #4299e1);
        box-shadow: var(--shadow-focus, 0 0 0 3px rgba(66, 153, 225, 0.2));
    }
    
    &::placeholder {
        color: var(--color-text-third, #a0aec0);
    }
    
    &.error {
        border-color: var(--color-error);
        animation: ${shake} 0.5s ease-in-out;
    }
`;

export const ErrorMessage = styled.div`
    color: var(--color-error, #e53e3e);
    font-size: var(--font-size-sm, 0.875rem);
    padding: var(--space-md, 1rem);
    background-color: rgba(254, 226, 226, 0.7);
    border-radius: var(--border-radius-md, 0.375rem);
    border-left: 3px solid var(--color-error, #e53e3e);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    box-shadow: var(--shadow-sm);
    animation: ${fadeIn} 0.3s ease-out;
    
    svg {
        flex-shrink: 0;
        font-size: var(--font-size-lg);
    }
`;

export const SuccessMessage = styled.div`
    color: var(--color-success, #38a169);
    font-size: var(--font-size-sm, 0.875rem);
    padding: var(--space-md, 1rem);
    background-color: rgba(240, 255, 244, 0.7);
    border-radius: var(--border-radius-md, 0.375rem);
    border-left: 3px solid var(--color-success, #38a169);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    box-shadow: var(--shadow-sm);
    animation: ${fadeIn} 0.3s ease-out;
    
    svg {
        flex-shrink: 0;
        font-size: var(--font-size-lg);
    }
`;

export const FeedbackContainer = styled.div`
    padding: var(--space-md) var(--space-lg);
    animation: ${fadeIn} 0.3s ease-out;
`;

// Navegação de passos do formulário
export const FormStepsNav = styled.div`
    display: flex;
    overflow-x: auto;
    padding: var(--space-md) 0;
    background-color: var(--color-background-secondary);
    gap: var(--space-xs);
    align-items: center;
    margin-bottom: var(--space-lg);
    border-radius: var(--border-radius-md);
    
    @media (max-width: 768px) {
        flex-wrap: nowrap;
        padding: var(--space-sm);
        
        /* Esconde textos em telas pequenas, mostra apenas ícones */
        .step-text {
            display: none;
        }
    }
    
    /* Barra de rolagem estilizada */
    &::-webkit-scrollbar {
        height: 4px;
    }
    
    &::-webkit-scrollbar-track {
        background: var(--color-background-third);
    }
    
    &::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: var(--border-radius-full);
    }
`;

interface FormStepButtonProps {
    $isActive: boolean;
    $isValid: boolean;
}

export const FormStepButton = styled.button<FormStepButtonProps>`
    background: ${props => props.$isActive 
        ? 'var(--color-primary)' 
        : props.$isValid 
            ? 'var(--color-background-secondary)' 
            : 'var(--color-background-secondary)'
    };
    color: ${props => props.$isActive 
        ? 'var(--color-text-on-primary)' 
        : props.$isValid 
            ? 'var(--color-success)'
            : 'var(--color-text-secondary)'
    };
    
    border: 1px solid ${props => props.$isActive 
        ? 'var(--color-primary)'
        : props.$isValid
            ? 'var(--color-success)'
            : 'var(--color-border)'
    };
    
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
    flex-shrink: 0;
    transition: all 0.2s ease;
    position: relative;
    min-width: 80px;
    flex: 1;
    
    ${props => props.$isActive && css`
        animation: ${pulse} 2s infinite;
    `}
    
    &:hover {
        background: ${props => props.$isActive 
            ? 'var(--color-primary-hover)'
            : 'var(--color-background-third)'
        };
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm);
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--color-background-secondary), 0 0 0 4px var(--color-primary);
    }
    
    .step-icon {
        font-size: var(--font-size-lg);
    }
    
    .status-indicator {
        position: absolute;
        top: -6px;
        right: -6px;
        background-color: var(--color-success);
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @media (max-width: 768px) {
        padding: var(--space-sm);
        min-width: 60px;
    }
`;

export const FormStepDivider = styled.div`
    height: 1px;
    width: 20px;
    background-color: var(--color-border);
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 10px;
    }
`;

// Barra de progresso
export const FormProgress = styled.div`
    height: 4px;
    width: 100%;
    background-color: var(--color-border-light);
    overflow: auto;
`;

export const FormProgressIndicator = styled.div<{ progress: number }>`
    height: 100%;
    width: ${props => props.progress}%;
    background-color: var(--color-primary);
    transition: width 0.3s ease;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
        );
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        from { transform: translateX(-100%); }
        to { transform: translateX(100%); }
    }
`;