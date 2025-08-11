import React from 'react';
import { Modal } from '../Modal';
import { Text } from '../../styles/typography';
import { Button } from '../../styles/buttons';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: 'default' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'default',
  size = 'md',
  children,
}) => {
  const variantClasses = {
    default: 'bg-primary-500 hover:bg-primary-600',
    danger: 'bg-red-500 hover:bg-red-600',
    success: 'bg-green-500 hover:bg-green-600',
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <Modal
      isOpen={isOpen} 
      onClose={onCancel}
      className={`${sizeClasses[size]} rounded-lg`}
      title={title}
    >
      <div className="p-6">
        {typeof message === 'string' ? (
          <Text className="mb-6">{message}</Text>
        ) : (
          <div className="mb-6">{message}</div>
        )}
        {children && <div className="mb-6">{children}</div>}
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            className={variantClasses[variant]}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;