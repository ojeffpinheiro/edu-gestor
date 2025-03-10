import React from 'react';
import styled from 'styled-components';
import { ActionButton, ButtonsContainer } from '../modals/ModalStudent/styles';

// Definição das props do componente
interface ConfirmationDialogProps {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

// Estilos específicos para o dialog de confirmação
const DialogOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const DialogContainer = styled.div`
    background-color: var(--color-card);
    padding: var(--space-xl);
    border-radius: var(--border-radius-md);
    max-width: 400px;
    width: 100%;
    box-shadow: var(--shadow-lg);
`;

const DialogTitle = styled.h3`
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-md);
    color: var(--color-title-card);
`;

const DialogMessage = styled.p`
    margin-bottom: var(--space-lg);
    color: var(--color-text);
`;

const CancelButton = styled(ActionButton)`
    background-color: var(--color-secondary);
    color: var(--color-text-button);
    
    &:hover:not(:disabled) {
        background-color: var(--color-secondary-hover);
    }
`;

/**
 * Componente para diálogos de confirmação
 * Usado para ações críticas que precisam de confirmação do usuário
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel
}) => {
    // Manipulador para fechar com tecla Esc
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <DialogOverlay 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="dialog-title"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
        >
            <DialogContainer>
                <DialogTitle id="dialog-title">{title}</DialogTitle>
                <DialogMessage>{message}</DialogMessage>
                <ButtonsContainer>
                    <CancelButton 
                        onClick={onCancel}
                        data-testid="cancel-button"
                    >
                        {cancelText}
                    </CancelButton>
                    <ActionButton 
                        onClick={onConfirm}
                        data-testid="confirm-button"
                    >
                        {confirmText}
                    </ActionButton>
                </ButtonsContainer>
            </DialogContainer>
        </DialogOverlay>
    );
};

export default ConfirmationDialog;