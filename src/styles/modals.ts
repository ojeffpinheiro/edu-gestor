import styled, { keyframes, css } from "styled-components";

// Enhanced animations for smoother user experience
const modalFadeIn = keyframes`
  from { 
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to { 
    opacity: 1;
    backdrop-filter: blur(8px);
  }
`;

const modalSlideIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
    filter: blur(2px);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
`;

const modalSlideOut = keyframes`
  from { 
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
  to { 
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
    filter: blur(1px);
  }
`;

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

// Enhanced modal sizes with better responsive breakpoints
export const modalSizes = {
  sm: {
    width: '90vw',
    maxWidth: '420px'
  },
  md: {
    width: '92vw',
    maxWidth: '640px'
  },
  lg: {
    width: '94vw',
    maxWidth: '840px'
  },
  xl: {
    width: '96vw',
    maxWidth: '1120px'
  },
  full: {
    width: '98vw',
    maxWidth: '98vw'
  }
};

// Enhanced backdrop with better visual hierarchy
export const ModalContainer = styled.div<{ $isExiting?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal-backdrop, 1000);
  padding: var(--space-md, 1rem);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  animation: ${modalFadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  
  ${({ $isExiting }) => $isExiting && css`
    animation: ${modalFadeIn} 0.2s cubic-bezier(0.4, 0, 1, 1) reverse forwards;
  `}
  
  &.entering {
    animation: ${modalFadeIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  &.exiting {
    animation: ${modalFadeIn} 0.25s cubic-bezier(0.4, 0, 1, 1) reverse forwards;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: var(--space-sm, 0.5rem);
    align-items: flex-end;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%);
      z-index: -1;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    backdrop-filter: none;
    
    &.entering,
    &.exiting {
      animation: none;
    }
  }
`;

// Enhanced modal content with improved glassmorphism and accessibility
export const ModalContent = styled.div<{ 
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  $isExiting?: boolean;
}>`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: var(--border-radius-xl, 12px);
  width: ${props => modalSizes[props.size].width};
  max-width: ${props => modalSizes[props.size].maxWidth};
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  transform-origin: center center;
  will-change: transform, opacity;
  
  animation: ${modalSlideIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  
  ${({ $isExiting }) => $isExiting && css`
    animation: ${modalSlideOut} 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
  `}
  
  &.loading {
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      z-index: 10;
      backdrop-filter: blur(2px);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background: rgba(17, 25, 40, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.1);
      
    &.loading::after {
      background: rgba(17, 25, 40, 0.9);
    }
  }

  @media (max-width: 768px) {
    max-height: 95vh;
    width: 100%;
    max-width: 100%;
    border-radius: var(--border-radius-lg, 8px) var(--border-radius-lg, 8px) 0 0;
    margin-top: auto;
    
    animation: ${css`
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    
    @media (max-width: 768px) {
      animation: none;
    }
  }
`;

// Enhanced header with better visual hierarchy and loading states
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg, 1.5rem);
  border-bottom: 1px solid var(--color-border-light, rgba(0, 0, 0, 0.1));
  background-color: var(--color-surface-elevated, rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 2;

  .modal-title-container {
    display: flex;
    align-items: center;
    gap: var(--space-md, 1rem);
    flex: 1;
    
    .loading-indicator {
      display: flex;
      align-items: center;
      color: var(--color-primary, #007bff);
      
      .spinner {
        animation: ${spinAnimation} 1s linear infinite;
      }
    }
  }

  h2 {
    margin: 0;
    font-size: var(--font-size-xl, 1.25rem);
    color: var(--color-title-card, #1a1a1a);
    font-weight: var(--font-weight-semibold, 600);
    line-height: 1.3;
    letter-spacing: -0.025em;
  }

  @media (max-width: 768px) {
    padding: var(--space-md, 1rem);
    
    h2 {
      font-size: var(--font-size-lg, 1.125rem);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(17, 25, 40, 0.9);
    border-bottom-color: rgba(255, 255, 255, 0.1);
    
    h2 {
      color: var(--color-title-card, #ffffff);
    }
  }
`;

// Enhanced body with improved scroll behavior and content spacing
export const ModalBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding: var(--space-lg, 1.5rem);
  scroll-behavior: smooth;
  
  .modal-content-wrapper {
    transition: opacity 0.2s ease, filter 0.2s ease;
    
    &.loading {
      opacity: 0.7;
      filter: blur(1px);
      pointer-events: none;
    }
  }
  
  /* Enhanced scroll snap for mobile */
  @media (max-width: 768px) {
    scroll-snap-type: y proximity;
    padding: var(--space-md, 1rem);
    
    > * {
      scroll-snap-align: start;
    }
  }
  
  /* Improved scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: var(--space-sm, 0.5rem) 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border, rgba(0, 0, 0, 0.2));
    border-radius: var(--radius-full, 9999px);
    border: 2px solid transparent;
    background-clip: content-box;
    transition: background-color 0.2s ease;
    
    &:hover {
      background: var(--color-text-secondary, rgba(0, 0, 0, 0.4));
      background-clip: content-box;
    }
  }
  
  @media (prefers-color-scheme: dark) {
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      background-clip: content-box;
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        background-clip: content-box;
      }
    }
  }
`;

// Enhanced footer with better button management and loading states
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md, 1rem);
  padding: var(--space-lg, 1.5rem);
  border-top: 1px solid var(--color-border-light, rgba(0, 0, 0, 0.1));
  background-color: var(--color-surface-elevated, rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(8px);
  position: sticky;
  bottom: 0;
  z-index: 2;
  
  .navigation-buttons {
    display: flex;
    gap: var(--space-md, 1rem);
    width: 100%;
    align-items: center;
    
    .cancel-button {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
      }
    }
    
    .submit-button {
      position: relative;
      min-width: 120px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover:not(:disabled):not(.loading) {
        transform: translateY(-1px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
      
      &.loading {
        cursor: wait;
        
        .loading-content {
          display: flex;
          align-items: center;
          gap: var(--space-xs, 0.5rem);
          
          .spinner {
            animation: ${spinAnimation} 1s linear infinite;
          }
          
          .loading-text {
            animation: ${pulseAnimation} 1.5s ease-in-out infinite;
          }
        }
      }
    }
    
    > * {
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-md, 1rem);
    flex-direction: column;
    
    .navigation-buttons {
      flex-direction: column-reverse;
      gap: var(--space-sm, 0.5rem);
      
      > * {
        width: 100%;
        flex: none;
      }
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(17, 25, 40, 0.9);
    border-top-color: rgba(255, 255, 255, 0.1);
  }
`;

// Loading overlay for enhanced UX during loading states
export const ModalLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (prefers-color-scheme: dark) {
    background: rgba(17, 25, 40, 0.9);
  }
`;

// Enhanced animations
export const modalEntranceAnimation = css`
  animation: ${modalSlideIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
`;

export const modalExitAnimation = css`
  animation: ${modalSlideOut} 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
  will-change: transform, opacity;
`;

export const backdropAnimation = css`
  animation: ${modalFadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;