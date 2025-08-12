// Filter.styles.ts
import styled, { css } from 'styled-components';
import { buttonVariants } from '../../styles/variants';

export const FilterContainer = styled.div`
  background-color: var(--color-background-paper);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-md);
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  ${buttonVariants.text}
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-md);
  
  ${({ $active }) => 
    $active && css`
      ${buttonVariants.primary}
    `}
`;

export const FilterSelect = styled.select`
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  width: 100%;
  transition: var(--transition-all);
  
  &:focus {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;