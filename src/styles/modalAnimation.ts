import { keyframes, css } from 'styled-components';

// Animações mais suaves e modernas
export const modalFadeIn = keyframes`
  from { 
    opacity: 0;
    backdrop-filter: blur(0);
  }
  to { 
    opacity: 1;
    backdrop-filter: blur(4px);
  }
`;

export const modalSlideDown = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const modalScaleUp = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.97) translateZ(0);
  }
  to { 
    opacity: 1;
    transform: scale(1) translateZ(0);
  }
`;

// Efeito glassmorphism moderno
export const backdropBlur = css`
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

// Transições mais fluidas com will-change
export const modalEntranceAnimation = css`
  animation: ${modalFadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards,
             ${modalSlideDown} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
`;

export const modalExitAnimation = css`
  animation: ${modalFadeIn} 0.2s ease-in-out reverse forwards,
             ${modalSlideDown} 0.2s ease-in-out reverse forwards;
  will-change: transform, opacity;
`;

export const backdropAnimation = css`
  animation: ${modalFadeIn} 0.3s ease-out forwards;
  ${backdropBlur};
`;

// Definições de tamanho responsivas
export const modalSizes = {
  sm: {
    width: '90vw',
    maxWidth: '400px'
  },
  md: {
    width: '90vw',
    maxWidth: '600px'
  },
  lg: {
    width: '90vw',
    maxWidth: '800px'
  },
  xl: {
    width: '90vw',
    maxWidth: '1000px'
  },
  full: {
    width: '95vw',
    maxWidth: '95vw'
  }
};