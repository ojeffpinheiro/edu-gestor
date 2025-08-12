import React from 'react';
import { Question } from '../../utils/types/Question';
import { Button } from '../shared/Button.styles';

interface PaginationControlsProps {
  filteredQuestions: Question[]; // Ou use o tipo específico das suas questões
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  filteredQuestions,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage
}) => {
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  return (
    <div className="pagination-controls">
      <Button
        $variant="text"
        $size="sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      >
        Anterior
      </Button>

      <span>Página {currentPage} de {totalPages}</span>

      <Button
        $variant="text"
        $size="sm"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Próxima
      </Button>

      <select
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={5}>5 itens</option>
        <option value={10}>10 itens</option>
        <option value={20}>20 itens</option>
        <option value={50}>50 itens</option>
      </select>
    </div>
  );
};

export default PaginationControls;