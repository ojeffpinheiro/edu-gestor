// components/ActionButtons.tsx
import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Button } from '../shared/Button.styles';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  editLabel = '',
  deleteLabel = ''
}) => (
  <>
    {onEdit && (
      <Button $variant="primary" onClick={onEdit}>
        <FaPencilAlt /> {editLabel}
      </Button>
    )}
    {onDelete && (
      <Button $variant="danger" onClick={onDelete}>
        <FaTrash /> {deleteLabel}
      </Button>
    )}
  </>
);