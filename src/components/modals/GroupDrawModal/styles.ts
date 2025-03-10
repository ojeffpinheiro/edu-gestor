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
 * Close button for the modal with hover effects
 */
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-text-third, #64748b);
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--color-text, #1e293b);
  }
  
  &:focus {
    outline: none;
    box-shadow: var(--shadow-focus, 0 0 0 2px rgba(66, 153, 225, 0.5));
  }
`;

/**
 * Input field styling with focus and hover states
 */
export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid var(--color-input-border, #cbd5e0);
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  max-width: 150px;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--color-border-dark, #a0aec0);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus, #4299e1);
    box-shadow: var(--shadow-focus, 0 0 0 3px rgba(66, 153, 225, 0.3));
  }

  &:disabled {
    background-color: var(--color-button-disabled, #edf2f7);
    cursor: not-allowed;
  }
`;

/**
 * Button component with variant support and clear visual feedback
 */
export const Button = styled.button<{ variant: string }>`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  background: ${({ variant }) =>
    variant === "primary" ? "var(--color-primary, #4299e1)" : "var(--color-secondary, #e2e8f0)"};
  color: ${({ variant }) =>
    variant === "primary" ? "var(--color-text-on-primary, #ffffff)" : "var(--color-text, #1e293b)"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ variant }) =>
      variant === "primary" ? "var(--color-primary-hover, #3182ce)" : "var(--color-secondary-hover, #cbd5e0)"};
  }
  
  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ variant }) =>
      variant === "primary" ? "rgba(66, 153, 225, 0.3)" : "rgba(160, 174, 192, 0.3)"};
  }
`;

/**
 * Container for groups list with proper scrolling and visual separation
 */
export const GroupsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  background-color: var(--color-background-third, #f7fafc);
  border-radius: 6px;
  border: 1px solid var(--color-border-light, #e2e8f0);

  h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: var(--color-text, #2d3748);
    font-weight: 600;
  }
  
  /* Custom scrollbar for better user experience */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-background-third, #f7fafc);
    border-radius: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-border, #cbd5e0);
    border-radius: 6px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-border-dark, #a0aec0);
  }
`;

/**
 * Individual group item with visual hierarchy
 */
export const GroupItem = styled.div`
  padding: 12px;
  background-color: var(--color-card, #ffffff);
  border-radius: 6px;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  border: 1px solid var(--color-border-light, #edf2f7);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: var(--shadow-md, 0 2px 5px rgba(0, 0, 0, 0.08));
  }

  h5 {
    margin: 0 0 8px 0;
    font-size: 15px;
    color: var(--color-primary, #3182ce);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &::before {
      content: '•';
      color: var(--color-primary, #3182ce);
    }
  }
`;

/**
 * List of students within a group
 */
export const StudentsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

/**
 * Individual student item with subtle visual distinction
 */
export const StudentItem = styled.li`
  padding: 8px 12px;
  background-color: var(--color-background-secondary, #f8fafc);
  border-radius: 4px;
  font-size: 14px;
  color: var(--color-text-secondary, #4a5568);
  border-left: 3px solid var(--color-border-light, #e2e8f0);
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third, #edf2f7);
    border-left-color: var(--color-primary, #4299e1);
  }
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