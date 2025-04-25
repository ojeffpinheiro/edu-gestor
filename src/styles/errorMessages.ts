// Mensagens de erro amigáveis para o usuário
// src/utils/errorMessages.ts

import styled from "styled-components";
import { fadeIn } from "./animations";

/**
 * Mapeamento dos códigos de erro do Firebase Auth para mensagens amigáveis
 * Facilita a exibição de mensagens de erro compreensíveis para o usuário
 */
export const ErrorMessages: Record<string, string> = {
    'auth/user-not-found': 'Usuário não encontrado'
}

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