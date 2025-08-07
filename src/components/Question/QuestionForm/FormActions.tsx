import React, { FormEvent } from 'react'
import styled from 'styled-components';

const FormActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
`;

const FormButton = styled.button<{ $variant?: 'primary' | 'outline' }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant = 'outline' }) =>
    $variant === 'outline'
      ? `
          border: 1px solid var(--color-border);
          background-color: var(--color-background-secondary);
          color: var(--color-text);
          
          &:hover {
            opacity: 0.8;
          }
        `
      : `
          background-color: var(--color-primary);
          color: white;
          border: 1px solid var(--color-primary);
          
          &:hover {
            opacity: 0.9;
          }
        `}
`;

interface FormActionsProps {
  onCancel?: () => void;
  onSubmit?: (e?: FormEvent) => void;
  submitText?: string;
  cancelText?: string;
  className?: string;
  submitDisabled?: boolean;
}

export const FormActions = ({
  onCancel,
  onSubmit,
  submitText = 'Salvar',
  cancelText = 'Cancelar',
  className,
  submitDisabled = false
}: FormActionsProps) => {
  return (
    <FormActionsContainer className={className}>
      {onCancel && (
        <FormButton
          type="button"
          onClick={onCancel}
          $variant="outline"
        >
          {cancelText}
        </FormButton>
      )}
      <FormButton
        type={onSubmit ? 'button' : 'submit'}
        onClick={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
        $variant="primary"
        disabled={submitDisabled}
      >
        {submitText}
      </FormButton>
    </FormActionsContainer>
  );
};