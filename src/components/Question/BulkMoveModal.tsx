import React, { useState } from 'react'
import { Modal } from '../Modal';
import { Category } from './QuestionForm/type';

interface BulkMoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (categoryId: string) => void;
  categories: Category[];
  count: number;
}

export const BulkMoveModal: React.FC<BulkMoveModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  categories,
  count
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mover Questões">
      <p>Mover {count} questões para:</p>
      
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="">Selecione uma categoria</option>
        {categories.map(category => (
          <option key={category.i} value={category.i}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="modal-actions">
        <button onClick={onClose}>Cancelar</button>
        <button 
          onClick={() => onConfirm(selectedCategory)} 
          className="primary"
          disabled={!selectedCategory}
        >
          Mover
        </button>
      </div>
    </Modal>
  );
};