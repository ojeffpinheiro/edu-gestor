import React from 'react';
import { Button } from '../shared/Button.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

interface PaginationControlsProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}


const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <PaginationContainer>
      <Button
        $variant="text"
        $size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FaChevronLeft /> Anterior
      </Button>

      <PageInfo>
        Página {currentPage} de {totalPages}
      </PageInfo>

      <Button
        $variant="text"
        $size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima <FaChevronRight />
      </Button>

      <ItemsPerPageSelect
        value={itemsPerPage}
        onChange={(e) => {
          onItemsPerPageChange(Number(e.target.value));
          onPageChange(1);
        }}
      >
        {[5, 10, 20, 50].map(size => (
          <option key={size} value={size}>
            {size} itens
          </option>
        ))}
      </ItemsPerPageSelect>
    </PaginationContainer>
  );
};

export default PaginationControls;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-lg);
`;

export const PageInfo = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const ItemsPerPageSelect = styled.select`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
`;

export const PaginationSummary = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin: var(--space-md) 0;
`;