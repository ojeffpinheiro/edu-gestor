import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

const Overlay = styled.div`
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
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const DialogContainer = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 450px;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const DialogHeader = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
  background-color: ${props => 
    props.type === 'danger' ? 'var(--color-error-light)' : 
    props.type === 'warning' ? 'var(--color-warning-light)' : 
    'var(--color-background-third)'};
  
  h2 {
    margin: 0;
    font-size: var(--font-size-lg);
    color: ${props => 
      props.type === 'danger' ? 'var(--color-error)' : 
      props.type === 'warning' ? 'var(--color-warning)' : 
      'var(--color-text)'};
  }
  
  svg {
    color: ${props => 
      props.type === 'danger' ? 'var(--color-error)' : 
      props.type === 'warning' ? 'var(--color-warning)' : 
      'var(--color-primary)'};
    font-size: 24px;
  }
`;

const DialogContent = styled.div`
  padding: var(--space-lg);
  color: var(--color-text-secondary);
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  border-top: 1px solid var(--color-border-light);
`;

const CancelButton = styled.button`
  background-color: var(--color-background-secondary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-border);
  }
`;

const ConfirmButton = styled.button<{ type: string }>`
  background-color: ${props => 
    props.type === 'danger' ? 'var(--color-error)' : 
    props.type === 'warning' ? 'var(--color-warning)' : 
    'var(--color-primary)'};
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => 
      props.type === 'danger' ? 'var(--color-error-dark)' : 
      props.type === 'warning' ? 'var(--color-warning-dark)' : 
      'var(--color-primary-hover)'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => 
      props.type === 'danger' ? 'var(--color-error-light)' : 
      props.type === 'warning' ? 'var(--color-warning-light)' : 
      'var(--color-primary-light)'};
  }
`;

/**
 * Componente de diálogo de confirmação para ações críticas
 * como exclusão ou alterações importantes
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  type = 'danger'
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  
  // Foco no botão de cancelamento quando o diálogo é exibido
  useEffect(() => {
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, []);

  // Manipulador para fechar o diálogo ao clicar fora dele
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  // Manipulador para fechar o diálogo com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  return (
    <Overlay onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <DialogContainer ref={dialogRef}>
        <DialogHeader type={type}>
          <FaExclamationTriangle />
          <h2 id="dialog-title">{title}</h2>
        </DialogHeader>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onCancel} aria-label={cancelLabel}>
            {cancelLabel}
          </CancelButton>
          <ConfirmButton 
            ref={confirmButtonRef}
            onClick={onConfirm} 
            type={type}
            aria-label={confirmLabel}
          >
            {confirmLabel}
          </ConfirmButton>
        </DialogActions>
      </DialogContainer>
    </Overlay>
  );
};

export default ConfirmDialog;