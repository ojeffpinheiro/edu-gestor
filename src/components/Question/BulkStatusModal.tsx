import React, { useState } from 'react'
import { QuestionStatus } from '../../types/evaluation/Question';
import { Modal } from '../Modal';

interface BulkStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: QuestionStatus) => void;
  count: number;
}

export const BulkStatusModal: React.FC<BulkStatusModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  count
}) => {
  const [selectedStatus, setSelectedStatus] = useState<QuestionStatus>('active');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Alterar Status em Massa">
      <p>Alterar status para {count} questões selecionadas:</p>
      
      <select 
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value as QuestionStatus)}
        className="status-select"
      >
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
        <option value="draft">Rascunho</option>
      </select>

      <div className="modal-actions">
        <button onClick={onClose}>Cancelar</button>
        <button 
          onClick={() => onConfirm(selectedStatus)} 
          className="primary"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
};