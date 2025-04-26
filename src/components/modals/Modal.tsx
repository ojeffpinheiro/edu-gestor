import React, { useEffect, useRef } from 'react';
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
}

/**
 * Componente Modal reutilizável com animações e variantes de tamanho
 * 
 * @param {ModalProps} props - Propriedades do componente
 * @returns {React.ReactElement | null} - O componente modal ou null se fechado
 */
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
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Manipula a tecla ESC para fechar o modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    // Bloqueia o scroll quando o modal está aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  /**
   * Manipula o clique fora do modal para fechá-lo
   */
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnClickOutside && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContainer 
      onClick={handleBackdropClick} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
      className="modal-backdrop"
    >
      <ModalContent 
        ref={modalRef} 
        className="modal" 
        size={size}
        role="document"
        aria-describedby="modal-content"
      >
        <ModalHeader>
          <h3 id="modal-title">{title}</h3>
          <CloseButton 
            onClick={onClose} 
            aria-label="Fechar modal"
            data-testid="close-modal-button"
            type="button"
          >
            <FaTimes size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody id="modal-content">
          <FormContainer>
            {children}
          </FormContainer>
        </ModalBody>

        {showFooter && (
          <ModalFooter>
            <div className="navigation-buttons">
              <Button 
                variant="secondary" 
                onClick={onClose}
                aria-label={cancelText}
                data-testid="cancel-button"
                type="button"
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