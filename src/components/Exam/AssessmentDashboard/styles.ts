import styled from 'styled-components';

export const Container = styled.div`
  padding: var(--space-xl);
  max-width: var(--breakpoint-xl);
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2xl);
  flex-wrap: wrap;
  gap: var(--space-md);
  width: 100%;
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: var(--space-sm);
  background: var(--color-background-secondary);
  padding: var(--space-xs);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  button {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    background: transparent;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: var(--transition-colors);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);

    &.active, &:hover {
      background: var(--color-primary);
      color: var(--color-text-on-primary);
      box-shadow: var(--shadow-sm);
    }

    &.active {
      font-weight: var(--font-weight-semibold);
    }
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: var(--space-xs);
  background: var(--color-background-secondary);
  padding: var(--space-xs);
  border-radius: var(--border-radius-md);
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
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: var(--transition-colors);
  font-size: var(--font-size-sm);
  font-weight: ${props => props.$active 
    ? 'var(--font-weight-semibold)' 
    : 'var(--font-weight-medium)'};

  &:hover {
    background: ${props => props.$active 
      ? 'var(--color-primary-hover)' 
      : 'var(--color-background-third)'};
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: var(--transition-colors);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: var(--color-button-disabled);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: var(--transition-all);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;