import React from 'react';
import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

// Tipos de variantes de botões suportados
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'error' | 'warning';
// Tamanhos de botão disponíveis
type ButtonSize = 'small' | 'medium' | 'large';

// Definindo propriedades do componente Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

// Componente estilizado para o Button
const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  /* Tamanhos */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: var(--space-xs) var(--space-sm);
          font-size: var(--font-size-sm);
        `;
      case 'large':
        return `
          padding: var(--space-md) var(--space-lg);
          font-size: var(--font-size-lg);
        `;
      default: // medium
        return `
          padding: var(--space-sm) var(--space-md);
          font-size: var(--font-size-md);
        `;
    }
  }}
  
  /* Variantes */
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: var(--color-secondary);
          color: var(--color-text);
          border: none;
          
          &:hover:not(:disabled) {
            background-color: var(--color-secondary-hover);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
          
          &:hover:not(:disabled) {
            background-color: rgba(24, 144, 255, 0.05);
          }
        `;
      case 'success':
        return `
          background-color: var(--color-success);
          color: var(--color-text-on-primary);
          border: none;
          
          &:hover:not(:disabled) {
            background-color: var(--color-success-hover);
          }
        `;
      case 'error':
        return `
          background-color: var(--color-error);
          color: var(--color-text-on-primary);
          border: none;
          
          &:hover:not(:disabled) {
            background-color: var(--color-error-hover);
          }
        `;
      case 'warning':
        return `
          background-color: var(--color-warning);
          color: var(--color-text-on-primary);
          border: none;
          
          &:hover:not(:disabled) {
            background-color: var(--color-warning-hover);
          }
        `;
      default: // primary
        return `
          background-color: var(--color-primary);
          color: var(--color-text-on-primary);
          border: none;
          
          &:hover:not(:disabled) {
            background-color: var(--color-primary-hover);
          }
        `;
    }
  }}
  
  /* Estado de carregamento */
  ${({ isLoading }) => isLoading && `
    position: relative;
    color: transparent;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.2em;
      height: 1.2em;
      margin: -0.6em 0 0 -0.6em;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}
  
  /* Largura completa */
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
  
  /* Estados do botão */
  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  icon,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isLoading={isLoading}
      fullWidth={fullWidth}
      type="button"
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </StyledButton>
  );
};

export default Button;