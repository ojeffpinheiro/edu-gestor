import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

interface FilterChipProps {
  children: React.ReactNode;
  onClick: () => void;
  onDelete?: () => void;
}

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: #e3f2fd;
  border-radius: 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #bbdefb;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 0.25rem;
    color: #555;
    
    &:hover {
      color: #333;
    }
  }
`;

const FilterChip: React.FC<FilterChipProps> = ({ children, onClick, onDelete }) => {
  return (
    <Chip onClick={onClick}>
      {children}
      {onDelete && (
        <button onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}>
          <FaTimes size={12} />
        </button>
      )}
    </Chip>
  );
};

export default FilterChip;