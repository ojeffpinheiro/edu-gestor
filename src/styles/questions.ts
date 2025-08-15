import styled, { css } from 'styled-components';
import { constants } from '../utils/consts';

// Botão com variantes baseado nas constantes
export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${constants.spacing.sm} ${constants.spacing.md};
  border-radius: ${constants.borderRadius.md};
  font-size: ${constants.fontSize.md};
  transition: ${constants.transitions.normal};

  ${({ variant = 'primary' }) => variant === 'primary' ? `
    background: var(--color-primary);
    color: var(--color-text-on-primary);
  ` : `
    background: var(--color-secondary);
    color: var(--color-text);
  `}

  &:hover {
    filter: brightness(0.9);
  }
`;

// Input integrando variáveis CSS e constantes
export const Input = styled.input`
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.sm};
  font-size: ${constants.fontSize.md};

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-focus-ring);
  }
`;

// Card usando variáveis de tema
export const Card = styled.div`
  background: var(--color-card);
  border-radius: ${constants.borderRadius.lg};
  padding: ${constants.spacing.lg};
  box-shadow: ${constants.shadows.sm};
  transition: ${constants.transitions.normal};

  &:hover {
    box-shadow: ${constants.shadows.md};
  }
`;

export const Badge = styled.span<{ type: 'success' | 'error' | 'warning' }>`
  display: inline-block;
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  border-radius: ${constants.borderRadius.full};
  font-size: ${constants.fontSize.sm};

  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: var(--color-success-bg);
          color: var(--color-success);
        `;
      case 'error':
        return `
          background: var(--color-error-bg);
          color: var(--color-error);
        `;
      case 'warning':
        return `
          background: var(--color-warning-bg);
          color: var(--color-warning);
        `;
    }
  }}
`;
interface FormButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
  $isLoading?: boolean;
}

export const FormButton = styled.button<FormButtonProps>`
  min-width: 120px;
  flex: 1;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${constants.spacing.sm};
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};

  ${({ $isLoading }) => $isLoading && css`
    &::after {
      content: '';
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}
`;
export const ConditionalField = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'block' : 'none'};
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: ${props => props.isVisible ? '1000px' : '0'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

// Add input mask support
export const MaskedInput = styled(Input)`
  &[data-mask]::placeholder {
    color: transparent;
  }
  
  &[data-mask]:focus::placeholder {
    color: var(--color-text-third);
  }
`;