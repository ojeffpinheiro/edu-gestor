import React from 'react';
import styled, { keyframes } from 'styled-components';

// Tipos de tamanhos disponíveis para o spinner
type SpinnerSize = 'small' | 'medium' | 'large';

// Props para o componente Spinner
interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  label?: string;
}

// Mapeamento de tamanho para valores em pixels
const SIZE_MAP = {
  small: '16px',
  medium: '32px',
  large: '48px'
};

// Animação de rotação para o spinner
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Componente estilizado para o spinner
const SpinnerContainer = styled.div<{ size: string; color: string }>`
  display: inline-block;
  position: relative;
  width: ${props => props.size};
  height: ${props => props.size};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${props => props.size};
    height: ${props => props.size};
    border: 3px solid ${props => props.color};
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${props => props.color} transparent transparent transparent;
  }
`;

/**
 * Componente Spinner para indicar carregamento
 */
const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = 'var(--color-primary)',
  label = 'Carregando...'
}) => {
  const spinnerSize = SIZE_MAP[size];
  
  return (
    <div className="spinner-wrapper" role="status" aria-label={label}>
      <SpinnerContainer size={spinnerSize} color={color}>
        <div />
      </SpinnerContainer>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;