import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const FilterLabel = styled.label`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const FilterSelect = styled.select`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-input);
  color: var(--color-text);
  
  &:focus {
    border-color: var(--color-input-focus);
    outline: none;
    box-shadow: var(--shadow-focus);
  }
`;