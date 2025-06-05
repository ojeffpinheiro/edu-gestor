import styled from 'styled-components';

export const FiltersContainer = styled.div`
  background: var(--color-card);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-lg);
  box-shadow: var(--shadow-sm);
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
`;

export const FilterGroup = styled.div`
  margin-bottom: var(--space-md);
`;

export const FilterLabel = styled.label`
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-medium);
`;