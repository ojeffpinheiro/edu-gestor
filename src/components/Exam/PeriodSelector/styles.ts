import styled from 'styled-components';

export const PeriodLabel = styled.span`
  display: block;
  margin-bottom: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: var(--space-xs);
  background: var(--color-background-secondary);
  padding: var(--space-xs);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
`;

export const PeriodOption = styled.button<{ $active: boolean }>`
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: ${props => props.$active 
    ? 'var(--color-primary)' 
    : 'transparent'};
  color: ${props => props.$active 
    ? 'var(--color-text-on-primary)' 
    : 'var(--color-text-secondary)'};
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: var(--font-size-sm);
  font-weight: ${props => props.$active 
    ? 'var(--font-weight-semibold)' 
    : 'var(--font-weight-medium)'};
  white-space: nowrap;

  &:hover {
    background: ${props => props.$active 
      ? 'var(--color-primary-hover)' 
      : 'var(--color-background-third)'};
  }
`;