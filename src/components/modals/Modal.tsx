import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '../../styles/modals';
import { Button, CloseButton } from '../../styles/buttons';
import { FormContainer } from '../../styles/containers';
import { modalEntranceAnimation, modalExitAnimation, backdropAnimation } from '../../styles/modalAnimation';

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

  // Fechamento animado
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 250); // Tempo correspondente à duração da animação
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Foco automático para acessibilidade
      setTimeout(() => modalRef.current?.focus(), 50);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnClickOutside && event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  if (!isOpen && !isExiting) return null;

  return (
    <ModalContainer 
      onClick={handleBackdropClick} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
      className={`modal-backdrop ${isExiting ? 'exiting' : ''}`}
      $isExiting={isExiting}
    >
      <ModalContent 
        ref={modalRef}
        size={size}
        role="document"
        aria-describedby="modal-content"
        tabIndex={-1}
        $isExiting={isExiting}
      >
        <ModalHeader>
          <h2 id="modal-title">{title}</h2>
          <CloseButton 
            onClick={handleClose} 
            aria-label="Fechar modal"
            data-testid="close-modal-button"
            type="button"
            disabled={isLoading}
          >
            <FaTimes size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody id="modal-content">
          <FormContainer as={onSubmit ? 'form' : 'div'} onSubmit={onSubmit ? handleSubmit : undefined}>
            {children}
          </FormContainer>
        </ModalBody>

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
                >
                  {submitText}
                </Button>
              )}
            </div>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;