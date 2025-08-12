// components/BulkActionsHandler.tsx
import React from 'react';
import { BulkMoveModal } from './BulkMoveModal';
import { CategoryWithId } from './QuestionForm/type';
import ConfirmationModal from './ConfirmationModal';

interface BulkActionsHandlerProps {
  actionType: 'status' | 'move' | 'combine';
  count: number;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  moveCategories?: CategoryWithId[];
  onMoveConfirm?: (discipline: string) => void;
  isLoading?: boolean;
  customMessage?: string;
}

export const BulkActionsHandler: React.FC<BulkActionsHandlerProps> = ({
  actionType,
  count,
  isOpen,
  onConfirm,
  onCancel,
  moveCategories,
  onMoveConfirm,
  isLoading,
  customMessage
}) => {
  const getTitle = () => {
    switch (actionType) {
      case 'status': return 'Alterar status';
      case 'move': return 'Mover questões';
      case 'combine': return 'Combinar questões';
      default: return 'Confirmação';
    }
  };

  const getDefaultMessage = () => {
    switch (actionType) {
      case 'status': return `Deseja alterar o status de ${count} questão(ões)?`;
      case 'move': return `Deseja mover ${count} questão(ões)?`;
      case 'combine': return `Deseja combinar ${count} questão(ões) em uma nova?`;
      default: return `Confirmar ação para ${count} itens?`;
    }
  };

  if (actionType === 'move' && moveCategories && onMoveConfirm) {
    return (
      <BulkMoveModal
        isOpen={isOpen}
        onClose={onCancel}
        onConfirm={onMoveConfirm}
        categories={moveCategories}
        count={count}
      />
    );
  }

  return (
    <ConfirmationModal
      isOpen={isOpen}
      title={getTitle()}
      message={customMessage || getDefaultMessage()}
      confirmText={actionType === 'combine' ? 'Combinar' : 'Confirmar'}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
    />
  );
};