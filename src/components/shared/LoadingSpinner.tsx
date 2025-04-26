import React from 'react';
import styled, { keyframes } from 'styled-components';

// Tipos de props para o componente
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

/**
 * LoadingSpinner - Componente de indicador de carregamento
 * 
 * Exibe um spinner de carregamento com tamanho e cor customizáveis
 * Opcionalmente pode exibir um texto abaixo do spinner
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'var(--color-primary)',
  text,
  fullScreen = false
}) => {
  // Mapeia o tamanho para valores de pixels
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 64
  };

  const spinnerSize = sizeMap[size];

  return (
    <SpinnerContainer fullScreen={fullScreen} aria-busy="true" role="status">
      <SpinnerElement size={spinnerSize} color={color} />
      {text && <SpinnerText>{text}</SpinnerText>}
      <ScreenReaderText>Carregando...</ScreenReaderText>
    </SpinnerContainer>
  );
};

// Animação de rotação
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Container do spinner, pode ser tela cheia ou inline
const SpinnerContainer = styled.div<{ fullScreen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${props => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  `}
  
  padding: var(--space-md);
`;

// Elemento visual do spinner
const SpinnerElement = styled.div<{ size: number; color: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: ${props => Math.max(2, props.size / 10)}px solid rgba(0, 0, 0, 0.1);
  border-top: ${props => Math.max(2, props.size / 10)}px solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Texto abaixo do spinner
const SpinnerText = styled.p`
  margin-top: var(--space-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

// Texto para leitores de tela (acessibilidade)
const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default LoadingSpinner;