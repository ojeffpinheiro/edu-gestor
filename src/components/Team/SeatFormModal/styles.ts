// components/Team/SeatFormModal/styles.ts
import styled, { css, keyframes } from 'styled-components';

// Animações
const modalSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const overlayFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Modal Container
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${overlayFadeIn} 0.2s ease-out;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  max-width: min(600px, 90vw);
  width: 100%;
  max-height: min(90vh, 800px);
  overflow-y: auto;
  animation: ${modalSlideIn} 0.3s ease-out;
  border: 1px solid var(--color-border-light);
  
  // Melhorias para mobile
  @media (max-width: 576px) {
    border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
    max-height: 85vh;
    margin-bottom: 0;
  }
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  span {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 24px 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 16px 20px 20px;
    flex-direction: column;
    
    > div {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
`;

// Form Elements
export const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
`;

interface FormInputProps {
  hasError?: boolean;
}

export const FormInput = styled.input<FormInputProps>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#f44336' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#f44336' : '#2196f3'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(244, 67, 54, 0.1)' : 'rgba(33, 150, 243, 0.1)'};
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #999;
  }
`;

export const FormSelect = styled.select<FormInputProps>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#f44336' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#f44336' : '#2196f3'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(244, 67, 54, 0.1)' : 'rgba(33, 150, 243, 0.1)'};
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

// Action Buttons
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ActionButtonProps {
  variant: ButtonVariant;
}

export const ActionButton = styled.button<ActionButtonProps>`
  // Estilos base
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 120px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  
  // Variantes
  ${props => props.variant === 'primary' && css`
    background: var(--color-primary);
    color: var(--color-text-on-primary);
    border: 2px solid var(--color-primary);
    
    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
    }
    
    &:active:not(:disabled) {
      background: var(--color-primary-active);
    }
  `}
  
  // Estados
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  // Ícones
  svg {
    width: 1em;
    height: 1em;
  }
`;

export const ValidationMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '⚠️';
    font-size: 10px;
  }
`;

// Em SeatFormModal/styles.ts
interface PriorityCardProps {
  selected?: boolean;
  color?: string;
  onClick?: () => void;
}

export const PriorityCard = styled.div<PriorityCardProps>`
  padding: 16px;
  border: 2px solid;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background: white;

  ${props => props.selected ? css`
    border-color: ${props.color || '#2196f3'};
    background: ${props.color ? `${props.color}10` : '#e3f2fd'};
    box-shadow: 0 0 0 3px ${props.color ? `${props.color}20` : 'rgba(33, 150, 243, 0.1)'};
  ` : css`
    border-color: #e0e0e0;
    
    &:hover {
      border-color: ${props.color || '#2196f3'};
      background: ${props.color ? `${props.color}05` : '#f8f9fa'};
    }
  `}

  strong {
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
    color: #333;
  }

  p {
    font-size: 12px;
    color: #666;
    margin: 0;
    line-height: 1.3;
  }

  ${props => props.selected && css`
    &::after {
      content: '✓';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      background: ${props.color || '#2196f3'};
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
  `}
`;

export const PriorityOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
  padding: 8px 0;

  h4 {
    grid-column: 1 / -1;
    margin-bottom: 8px;
    font-size: 15px;
    color: #444;
  }
`;