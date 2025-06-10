import styled from "styled-components";
import { Button } from "../../styles/buttons";

export const ItemType = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-button);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  white-space: nowrap;
`;

export const AddButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  
  &:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  flex: 1;
  color: var(--color-text-secondary);
  text-align: center;
  gap: var(--space-md);
  
  svg {
    color: var(--color-text-third);
  }
  
  p {
    font-size: var(--font-size-md);
    max-width: 400px;
  }
`;

export const ErrorText = styled.span`
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin-top: var(--space-xs);
  display: block;
`;

export const SaveButton = styled(Button)`
  background-color: var(--color-success);
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background-color: var(--color-success-hover);
  }
`;