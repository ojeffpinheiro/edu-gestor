import styled, { keyframes } from 'styled-components';

/**
 * Animations for UI elements
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/**
 * Modal container - Creates a full-screen overlay
 */
export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: var(--space-md);
`;

export const ModalContent = styled.div`
    background: var(--color-card, #ffffff);
    border-radius: var(--border-radius-md);
    width: 100%;
    max-width: 80vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-lg, 0 4px 20px rgba(0, 0, 0, 0.15));
    animation: ${fadeIn} 0.2s ease-out;
    overflow-y: auto;
    
    @media (max-width: var(--breakpoint-md)) {
        padding: var(--space-md);
        max-width: 100%;
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
 * Modal body containing the main content
 */
export const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  max-height: calc(90vh - 130px); /* Adjust for header and footer */
`;

/**
 * Modal footer with action buttons
 */
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--color-border-light, #eaeaea);
  
  .export-hint {
    font-size: 14px;
    color: var(--color-warning, #dd6b20);
  }
`;