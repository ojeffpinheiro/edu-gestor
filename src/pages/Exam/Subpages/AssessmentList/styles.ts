import styled from 'styled-components';

export const Card = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
  transition: var(--transition-all);
  border: 1px solid var(--color-border);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  h3 {
    margin: 0 0 var(--space-sm) 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-title-card);
    line-height: var(--line-height-md);
  }

  .status-badge {
    display: inline-block;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--border-radius-xl);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);

    &.draft {
      background-color: var(--color-warning);
      color: var(--color-text-on-primary);
    }

    &.published {
      background-color: var(--color-success);
      color: var(--color-text-on-primary);
    }

    &.archived {
      background-color: var(--color-error);
      color: var(--color-text-on-primary);
    }
  }

  .assessment-meta {
    margin: var(--space-md) 0;
    p {
      margin: var(--space-xs) 0;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: var(--line-height-md);

      strong {
        color: var(--color-text);
        margin-right: var(--space-xs);
        font-weight: var(--font-weight-medium);
      }
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-md);
  gap: var(--space-sm);
`;

export const CardBody = styled.div`
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm);
    margin-top: var(--space-md);
    padding-top: var(--space-md);
    border-top: 1px solid var(--color-border-light);
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-button);
  border: none;
  border-radius: var(--border-radius-md);
  color: var(--color-text);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-colors);
  line-height: var(--line-height-sm);

  &:hover {
    background: var(--color-button-hover);
  }

  &:active {
    transform: scale(0.98);
  }

  &.danger {
    background: var(--color-error);
    color: var(--color-text-on-primary);

    &:hover {
      background: var(--color-error-hover);
    }
  }

  &:disabled {
    background: var(--color-button-disabled);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }
`;