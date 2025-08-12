import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
`;

const PrimaryButton = styled(Button)`
  background-color: var(--color-primary);
  color: white;
  border: none;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);

  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

interface ConfirmationDialogProps {
  title: string;
  message: string;
  additionalMessage?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  additionalMessage,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel
}) => (
  <>
    <h3>{title}</h3>
    <p>{message}</p>
    {additionalMessage && <p>{additionalMessage}</p>}
    <ButtonGroup>
      <SecondaryButton onClick={onCancel}>{cancelText}</SecondaryButton>
      <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
    </ButtonGroup>
  </>
);