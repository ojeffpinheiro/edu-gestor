import styled from 'styled-components';

export const FiltersContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

export const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
`;

export const FiltersTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FiltersContent = styled.div`
  padding: 1.5rem;
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

export const FilterInput = styled.input`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const AdvancedFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background-color: var(--color-background);
  }
`;