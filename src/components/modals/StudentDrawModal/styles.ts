import styled, { keyframes } from "styled-components";

/**
 * Animações reutilizáveis
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: var(--color-card, #ffffff);
  border-radius: 8px;
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg, 0 4px 20px rgba(0, 0, 0, 0.15));
  animation: ${fadeIn} 0.2s ease-out;
  
  @media (max-width: 576px) {
    max-height: 90vh;
    max-width: 95%;
  }
`;

export const ModalHeader = styled.div`
    display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
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

export const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  max-height: calc(85vh - 130px);
`;

/**
 * Modal footer with action buttons
 */
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 0 0 8px 8px;
`;

export const DrawnStudentContainer = styled.div`
    font-size: var(--font-size-xl);
    font-weight: bold;
    padding: var(--space-md);
    background: var(--color-background-third);
    color: var(--color-text-on-primary);
    border-radius: var(--border-radius-md);
    margin: var(--space-xs) 0;
    text-align: center;
`;

export const Icon = styled.span`
    display: flex;
    align-items: center;
`;

export const EmptyState = styled.p`
    font-size: var(--font-size-md);
    color: var(--color-text);
    padding: var(--spacing-md);
`;
