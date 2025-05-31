import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  gap: var(--space-lg);
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-md);
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ViewButton = styled.button<{ $active: boolean }>`
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: ${props => props.$active ? 'var(--color-primary)' : 'var(--color-surface)'};
  color: ${props => props.$active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-normal);
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$active ? 'var(--color-primary-hover)' : 'var(--color-background)'};
  }
  
  &:not(:last-child) {
    border-right: 1px solid var(--color-border);
    
    @media (max-width: 768px) {
      border-right: none;
      border-bottom: 1px solid var(--color-border);
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--space-md);
  }
`;