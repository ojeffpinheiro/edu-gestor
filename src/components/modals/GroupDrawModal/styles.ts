import styled, { css, keyframes } from "styled-components";

/**
 * Animações reutilizáveis
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/**
 * Estilos comuns para elementos de mensagem (erro e sucesso)
 */
const messageStyles = css`
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  &::before {
    margin-right: 8px;
  }
`;

/**
 * Modal container styling
 * Creates a full-screen overlay for the modal with proper z-index and scrolling behavior
 */
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
  padding: 16px;
`;

/**
 * Modal content container with proper dimensions and scrolling
 */
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

/**
 * Modal header with title and close button
 */
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

/**
 * Modal body containing the main content with proper scrolling
 */
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

/**
 * Error message styling with icon for better visibility
 */
export const ErrorMessage = styled.div`
  ${messageStyles}
  color: var(--color-error, #e53e3e);
  background-color: #fff5f5;
  border-left: 4px solid var(--color-error, #e53e3e);
  
  &::before {
    content: '⚠️';
  }
`;

/**
 * Success message for positive feedback
 */
export const SuccessMessage = styled.div`
  ${messageStyles}
  color: var(--color-success, #38a169);
  background-color: #f0fff4;
  border-left: 4px solid var(--color-success, #38a169);
  
  &::before {
    content: '✅';
  }
`;

/**
 * Container for input controls with clear visual grouping
 */
export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  background-color: var(--color-background-third, #f7fafc);
  border-radius: 6px;
  border: 1px solid var(--color-border-light, #e2e8f0);
  
  label {
    font-weight: 500;
    color: var(--color-text-secondary, #4a5568);
    margin-bottom: 4px;
    font-size: 14px;
  }
`;

/**
 * Radio button group with improved spacing
 */
export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 4px;
  padding: 12px;
  background-color: var(--color-background-third, #f7fafc);
  border-radius: 6px;
  border: 1px solid var(--color-border-light, #e2e8f0);
`;

/**
 * Individual radio option with better visual feedback
 */
export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--color-background-secondary, #edf2f7);
  }
  
  input[type="radio"] {
    margin: 0;
    width: 16px;
    height: 16px;
    accent-color: var(--color-primary, #4299e1);
  }
  
  label {
    cursor: pointer;
    font-size: 14px;
    color: var(--color-text-secondary, #4a5568);
  }
`;

/**
 * Loading indicator styling
 */
export const LoadingIndicator = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s ease-in-out infinite;
  margin-right: 8px;
`;