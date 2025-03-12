import styled, { keyframes } from "styled-components";

/**
 * Animations for UI elements
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
`;

export const ModalContent = styled.div`
  background: var(--color-card, #ffffff);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg, 0 4px 20px rgba(0, 0, 0, 0.15));
  animation: ${fadeIn} 0.2s ease-out;
  
  @media (max-width: 576px) {
    max-height: 95vh;
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
  max-height: calc(90vh - 130px);
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-size: 0.9rem;
    font-weight: bold;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border-radius: 6px;
`;

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

export const ErrorMessage = styled.p`
    font-size: 0.85rem;
`;

export const SuccessMessage = styled.p`
   font-size: 0.85rem;
`;

export const LoadingIndicator = styled.span`
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid white;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
