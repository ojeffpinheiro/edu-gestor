import React, { ReactNode, useCallback, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  isOpen: boolean;
}

const ModalAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContainer = styled.div<{ size: string }>`
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  width: 100%;
  max-width: ${({ size }) => {
    switch (size) {
      case 'sm': return '400px';
      case 'md': return '600px';
      case 'lg': return '800px';
      case 'xl': return '1140px';
      default: return '600px';
    }
  }};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
  animation: ${ModalAnimation} 0.3s ease-out;

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  padding: 0.25rem;
  line-height: 1;
  
  &:hover {
    color: var(--color-text);
  }
`;

export const ModalContent = styled.div`
  padding: 1.5rem;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
`;

export const Modal = ({
  title,
  onClose,
  children,
  actions,
  size = 'md',
  className,
  closeOnOverlayClick = true,
  showCloseButton = true,
  isOpen
}: ModalProps) => {
  // Fechar modal ao pressionar ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer size={size} className={className}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {showCloseButton && (
            <ModalCloseButton onClick={onClose} aria-label="Fechar modal">
              <FiX />
            </ModalCloseButton>
          )}
        </ModalHeader>

        <ModalContent>{children}</ModalContent>

        {actions && <ModalActions>{actions}</ModalActions>}
      </ModalContainer>
    </ModalOverlay>
  );
};