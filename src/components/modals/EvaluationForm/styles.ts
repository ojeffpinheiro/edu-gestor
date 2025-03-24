// src/components/modals/EvaluationForm/styles.ts
import styled, { keyframes, css } from "styled-components";

/**
 * Animações reutilizáveis aprimoradas
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(24, 144, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(24, 144, 255, 0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: var(--space-md);
    backdrop-filter: blur(3px);
    transition: all 0.3s ease;
`;

export const ModalContent = styled.div`
    background: var(--color-card, #ffffff);
    border-radius: var(--border-radius-lg, 0.75rem);
    width: 90vw;
    max-width: 1200px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-xl, 0 8px 30px rgba(0, 0, 0, 0.25));
    animation: ${fadeIn} 0.3s ease-out;
    overflow: hidden;
    border: 1px solid var(--color-border-light);
  
    @media (max-width: 576px) {
        max-height: 95vh;
        max-width: 100%;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md, 1rem) var(--space-lg, 1.5rem);
    border-bottom: 1px solid var(--color-border-light);
    background-color: var(--color-background-third, #f7f9fc);
    border-radius: var(--border-radius-lg, 0.75rem) var(--border-radius-lg, 0.75rem) 0 0;

    h3 {
        margin: 0;
        font-size: var(--font-size-xl, 1.25rem);
        color: var(--color-text, #2d3748);
        font-weight: 600;
    }
`;

export const ModalBody = styled.div`
    padding: var(--space-lg, 1.5rem);
    overflow-y: auto;
    flex: 1;
    animation: ${slideIn} 0.3s ease-out;
    position: relative;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: var(--color-background-secondary);
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: var(--color-text-third);
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md, 1rem);
    padding: var(--space-md, 1rem) var(--space-lg, 1.5rem);
    border-top: 1px solid var(--color-border-light);
    background-color: var(--color-background-secondary, #ffffff);
    
    .navigation-buttons {
        display: flex;
        gap: var(--space-md);
        margin-left: auto;
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
    overflow: hidden;
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