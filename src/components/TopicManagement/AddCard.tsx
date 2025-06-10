import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

interface AddCardProps {
  onClick: () => void;
  children: React.ReactNode;
}

const AddCardContent = styled.div`
  border: 1px dashed var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  color: var(--color-text-secondary);
  height: 100%;
  min-height: 100px;
  transition: all var(--transition-normal);
  background-color: var(--color-background-secondary);
  
  &:hover {
    background-color: var(--color-background-third);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
`;

const AddCard: React.FC<AddCardProps> = ({ onClick, children }) => {
  return (
    <AddCardContent onClick={onClick}>
      <FaPlus size={20} />
      {children}
    </AddCardContent>
  );
};

export default AddCard;