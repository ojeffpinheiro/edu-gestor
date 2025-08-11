import styled from 'styled-components';

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SortLabel = styled.span`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: var(--color-background-secondary);
`;

export const SortButtonGroup = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const SortButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: ${({ $active }) => 
    $active ? 'var(--color-primary)' : 'white'};
  color: ${({ $active }) => 
    $active ? 'white' : 'var(--color-text)'};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active }) => 
      $active ? 'var(--color-primary-dark)' : 'var(--color-background-secondary)'};
  }
`;

export const DirectionButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: ${({ $active }) => 
    $active ? 'var(--color-primary)' : 'white'};
  color: ${({ $active }) => 
    $active ? 'white' : 'var(--color-text)'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active }) => 
      $active ? 'var(--color-primary-dark)' : 'var(--color-background-secondary)'};
  }
`;