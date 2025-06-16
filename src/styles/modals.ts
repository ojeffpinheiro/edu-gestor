import styled from "styled-components";
import { modalEntranceAnimation, modalExitAnimation, backdropAnimation, modalSizes } from "./modalAnimation";

export const ModalContainer = styled.div<{ $isExiting?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal-backdrop);
  padding: var(--space-md);
  ${backdropAnimation};
  transition: all 0.3s ease;
  opacity: ${({ $isExiting }) => ($isExiting ? 0 : 1)};
  pointer-events: ${({ $isExiting }) => ($isExiting ? 'none' : 'all')};
  
  @media (max-width: 768px) {
    padding: var(--space-sm);
  }
`;

export const ModalContent = styled.div<{ 
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  $isExiting?: boolean;
}>`
  background: var(--color-surface-elevated);
  border-radius: var(--border-radius-xl);
  width: ${props => modalSizes[props.size].width};
  max-width: ${props => modalSizes[props.size].maxWidth};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-2xl);
  ${({ $isExiting }) => ($isExiting ? modalExitAnimation : modalEntranceAnimation)};
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  transform-origin: center top;
  will-change: transform, opacity;
  
  /* Efeito glassmorphism */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.75);
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(17, 25, 40, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.125);
  }

  @media (max-width: 768px) {
    max-height: 95vh;
    width: 95vw;
    max-width: 95vw;
    border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
  background-color: var(--color-surface-elevated);
  position: sticky;
  top: 0;
  z-index: 1;

  h2 {
    margin: 0;
    font-size: var(--font-size-xl);
    color: var(--color-title-card);
    font-weight: var(--font-weight-semibold);
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    padding: var(--space-md);
  }
`;

export const ModalBody = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: var(--space-lg);
  scroll-behavior: smooth;
  
  /* Scroll snap para mobile */
  @media (max-width: 768px) {
    scroll-snap-type: y proximity;
    padding: var(--space-md);
    
    > * {
      scroll-snap-align: start;
    }
  }
  
  /* Barra de scroll estilizada */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: var(--space-md) 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: var(--radius-full);
    border: 2px solid transparent;
    background-clip: content-box;
    
    &:hover {
      background: var(--color-text-secondary);
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-surface-elevated);
  position: sticky;
  bottom: 0;
  
  .navigation-buttons {
    display: flex;
    gap: var(--space-md);
    width: 100%;
    
    > * {
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-md);
    flex-direction: column;
    
    .navigation-buttons {
      flex-direction: column-reverse;
      gap: var(--space-sm);
    }
  }
`;