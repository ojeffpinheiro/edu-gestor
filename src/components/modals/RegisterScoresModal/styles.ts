// src/components/modals/RegisterScoresModal/styles.ts
import styled, { keyframes } from 'styled-components';

// Animação de fade-in para o modal
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;

// Container do modal
export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// Conteúdo do modal
export const ModalContent = styled.div`
    background: var(--color-card);
    border-radius: var(--border-radius-md);
    width: 90%;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-lg);
    overflow-y: auto;
    animation: ${fadeIn} 0.3s ease;

    @media (max-width: 576px) {
        max-height: 95vh;
    }
`;

// Cabeçalho do modal
export const ModalHeader = styled.div`
    display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light, #eaeaea);
  background-color: var(--color-background-third, #f7f9fc);
  border-radius: 8px 8px 0 0;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-text, #2d3748);
    font-weight: 600;
  }
`;

// Corpo do modal
export const ModalBody = styled.div`
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
`;

// Rodapé do modal
export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: var(--space-md);
    border-top: 1px solid var(--color-border-light);
`;

// Botão estilizado
export const Button = styled.button`
    padding: var(--space-sm) var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: var(--color-primary-hover);
    }

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const TableHeader = styled.th`
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    text-align: left;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: var(--color-background-secondary);
    }
`;

export const Td = styled.td`
    padding: var(--space-md);
    border: 1px solid var(--color-border);
`;

export const Th = styled.th`
    padding: var(--space-md);
    border: 1px solid var(--color-border);
`;