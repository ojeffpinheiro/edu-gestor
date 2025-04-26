import { keyframes, css } from 'styled-components';
import { fadeIn } from './animations';

// Animações específicas para modais
export const modalFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const modalSlideDown = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(-30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

export const modalScaleUp = keyframes`
  from { 
    opacity: 0; 
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

// Estilos CSS reutilizáveis para animações modais
export const modalEntranceAnimation = css`
  animation: ${modalFadeIn} 0.25s ease-in-out,
             ${modalScaleUp} 0.25s ease-in-out;
`;

export const modalExitAnimation = css`
  animation: ${modalFadeIn} 0.25s ease-in-out reverse,
             ${modalScaleUp} 0.25s ease-in-out reverse;
`;

export const backdropAnimation = css`
  animation: ${fadeIn} 0.2s ease-in-out;
`;

// Utilitário para controlar animações com base no estado de abertura do modal
export const getModalAnimationStyle = (isOpen: boolean, isExiting: boolean) => {
  if (!isOpen && !isExiting) return { display: 'none' };
  
  if (isExiting) {
    return {
      animation: `${modalFadeIn} 0.2s ease-in-out reverse, 
                  ${modalScaleUp} 0.2s ease-in-out reverse`
    };
  }
  
  return {
    animation: `${modalFadeIn} 0.25s ease-in-out, 
                ${modalScaleUp} 0.25s ease-in-out`
  };
};

// Definições de tamanho para os modais
export const modalSizes = {
  sm: {
    width: '30vw'
  },
  md: {
    width: '50vw'
  },
  lg: {
    width: '75vw'
  },
  xl: {
    width: '80vw'
  },
  full: {
    width: '95vw'
  }
};