// baseComponents.ts
import styled, { css } from "styled-components";

// Shared styles as mixins
export const buttonBaseCss = css`
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const hoverEffectCss = css`
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Base components
export const BaseButton = styled.button`
  ${buttonBaseCss}
  ${hoverEffectCss}
`;

export const BaseCard = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
`;

export const BaseInput = styled.input`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

export const ModalContent = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-modal);
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
`;