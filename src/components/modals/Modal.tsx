import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';

import { FormContainer } from '../../styles/containers';
import { Button, CloseButton } from '../../styles/buttons';
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '../../styles/modals';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnClickOutside?: boolean;
  showFooter?: boolean;
  cancelText?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
  disableSubmit?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  submitText = 'Confirmar',
  size = 'lg',
  closeOnClickOutside = true,
  showFooter = true,
  cancelText = 'Cancelar',
  children,
  footer,
  isLoading = false,
  disableSubmit = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Enhanced close handler with better animation feedback
  const handleClose = useCallback(() => {
    if (isLoading) return; // Prevent closing during loading
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
      setIsAnimatingIn(false);
    }, 250);
  }, [isLoading, onClose]);

  // Enhanced keyboard and focus management
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape' && !isLoading) {
        handleClose();
      }
    };

    const handleTabKey = (event: KeyboardEvent) => {
      if (!isOpen || !modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('keydown', handleTabKey);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimatingIn(true);
      // Enhanced focus management with delay for better UX
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          modalRef.current?.focus();
        }
      }, 100);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose, isLoading]);

  // Enhanced backdrop click with better detection
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnClickOutside && 
        event.target === event.currentTarget && 
        !isLoading && 
        !isAnimatingIn) {
      handleClose();
    }
  };

  // Enhanced form submission with loading state
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && !disableSubmit && onSubmit) {
      onSubmit();
    }
  }, [isLoading, disableSubmit, onSubmit]);

  // Improved conditional rendering
  if (!isOpen && !isExiting) return null;

  return (
    <ModalContainer 
      onClick={handleBackdropClick} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      className={`modal-backdrop ${isExiting ? 'exiting' : ''} ${isAnimatingIn ? 'entering' : ''}`}
      $isExiting={isExiting}
    >
      <ModalContent 
        ref={modalRef}
        size={size}
        role="document"
        tabIndex={-1}
        $isExiting={isExiting}
        className={isLoading ? 'loading' : ''}
      >
        {/* Enhanced header with better loading state indication */}
        <ModalHeader>
          <div className="modal-title-container">
            <h2 id="modal-title">{title}</h2>
            {isLoading && (
              <div className="loading-indicator" aria-label="Carregando...">
                <FaSpinner className="spinner" size={16} />
              </div>
            )}
          </div>
          <CloseButton 
            onClick={handleClose} 
            aria-label="Fechar modal"
            data-testid="close-modal-button"
            type="button"
            disabled={isLoading}
            className={isLoading ? 'disabled' : ''}
          >
            <FaTimes size={20} />
          </CloseButton>
        </ModalHeader>

        {/* Enhanced body with better scroll behavior */}
        <ModalBody id="modal-content">
          <FormContainer 
            as={onSubmit ? 'form' : 'div'} 
            onSubmit={onSubmit ? handleSubmit : undefined}
            noValidate
          >
            <div className={`modal-content-wrapper ${isLoading ? 'loading' : ''}`}>
              {children}
            </div>
          </FormContainer>
        </ModalBody>

        {/* Enhanced footer with better button management */}
        {footer ? footer : showFooter && (
          <ModalFooter>
            <div className="navigation-buttons">
              <Button 
                variant="secondary" 
                onClick={handleClose}
                aria-label={cancelText}
                data-testid="cancel-button"
                type="button"
                disabled={isLoading}
                className="cancel-button"
              >
                {cancelText}
              </Button>
              {onSubmit && (
                <Button 
                  variant="primary" 
                  onClick={onSubmit}
                  aria-label={submitText}
                  data-testid="submit-button"
                  type="submit"
                  disabled={isLoading || disableSubmit}
                  className={`submit-button ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? (
                    <span className="loading-content" aria-live="polite">
                      <FaSpinner className="spinner" size={16} />
                      <span className="loading-text">Processando...</span>
                    </span>
                  ) : (
                    submitText
                  )}
                </Button>
              )}
            </div>
          </ModalFooter>
        )}

        {/* Loading overlay for better UX */}
        {isLoading && (
          <div 
            className="modal-loading-overlay" 
            aria-hidden="true"
            role="presentation"
          />
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;